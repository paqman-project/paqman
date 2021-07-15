package server

import (
	"paqman-backend/db"
	"paqman-backend/structs"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// recursive response struct
type commandWithChildren struct {
	Command  structs.Command        `json:"command"`
	Creates  structs.Parameter      `json:"creates"`
	Children []*commandWithChildren `json:"children"`
}

func recurseWithHaveOnly(currentParamID primitive.ObjectID, children *[]*commandWithChildren, depth int) {

	var currentParamLookedUp []struct {
		structs.Parameter    `json:",inline" bson:",inline"`
		ReturedFromLookup    []structs.Command   `json:"returned_from_lookup" bson:"returned_from_lookup"`
		UsedInLookup         []structs.Command   `json:"used_in_lookup" bson:"used_in_lookup"`
		UsedInToCreateLookup []structs.Parameter `json:"used_in_to_create_lookup" bson:"used_in_to_create_lookup"`
	}

	// get the current parameter
	aggPipeline := mongo.Pipeline{
		{{
			Key:   "$match",
			Value: bson.M{"_id": currentParamID},
		}},
		{{ // lookup returned_from commands
			Key: "$lookup",
			Value: bson.M{
				"from":         "commands",
				"localField":   "returned_from.command_id",
				"foreignField": "_id",
				"as":           "returned_from_lookup",
			},
		}},
		{{ // lookup used_in commands
			Key: "$lookup",
			Value: bson.M{
				"from":         "commands",
				"localField":   "used_in.command_id",
				"foreignField": "_id",
				"as":           "used_in_lookup",
			},
		}},
		{{ // lookup used_in.to_create parameter (possible, as it has the same length as used_in_lookup)
			Key: "$lookup",
			Value: bson.M{
				"from":         "parameters",
				"localField":   "used_in.to_create",
				"foreignField": "_id",
				"as":           "used_in_to_create_lookup",
			},
		}},
	}
	if err := db.Client.Aggregate("parameters", aggPipeline, &currentParamLookedUp); err != nil {
		panic(err)
	}

	// stop condition
	if (currentParamLookedUp[0].UsedIn == nil || len(currentParamLookedUp[0].UsedIn) == 0) || depth >= 5 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every child of this parameter
	for i := range currentParamLookedUp[0].UsedIn {
		// add used command to chain
		usedCommand := &commandWithChildren{
			Command:  currentParamLookedUp[0].UsedInLookup[i],
			Creates:  currentParamLookedUp[0].UsedInToCreateLookup[i],
			Children: nil,
		}
		*children = append(*children, usedCommand)

		// recurse with the next parameter
		recurseWithHaveOnly(currentParamLookedUp[0].UsedInToCreateLookup[i].ID, &usedCommand.Children, depth+1)
	}

}

func recurseWithWantOnly(current structs.Parameter, children *[]*commandWithChildren, depth int) {

	// stop condition
	if (current.ReturnedFrom == nil || len(current.ReturnedFrom) == 0) || depth >= 15 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every parent of this parameter
	for _, returnedFrom := range current.ReturnedFrom {
		// get and add used command to chain
		var c structs.SmallCommand
		if err := db.Client.ReadOne("commands", bson.M{"_id": returnedFrom.CommandID}, &c); err != nil {
			panic(err) // TODO maybe this is bad
		}
		usedCommand := &commandWithChildren{
			Children: nil,
		}
		*children = append(*children, usedCommand)

		// get this previous parameter from database
		query := bson.M{
			"used_in.command_id": returnedFrom.CommandID,
		}
		var prevParams []structs.Parameter
		if err := db.Client.ReadMany("parameters", query, &prevParams); err != nil {
			panic(err) // TODO maybe this is bad
		}

		completePredecessors := make([]*commandWithChildren, 0)
		for _, prevParam := range prevParams {
			var loc []*commandWithChildren
			//fmt.Println(prevParam.Name, "at", depth)
			recurseWithWantOnly(prevParam, &loc, depth+1)
			completePredecessors = append(completePredecessors, loc...)
		}
		children = &completePredecessors

	}

}

func recurseWithBoth(current structs.Parameter, children *[]*commandWithChildren, depth int, targetID primitive.ObjectID) {

	// stop condition
	if (current.UsedIn == nil || len(current.UsedIn) == 0) || current.ID.Hex() == targetID.Hex() || depth >= 15 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every child of this parameter
	for _, usedIn := range current.UsedIn {
		// get and add used command to chain
		var c structs.SmallCommand
		if err := db.Client.ReadOne("commands", bson.M{"_id": usedIn.CommandID}, &c); err != nil {
			panic(err) // TODO maybe this is bad
		}
		usedCommand := &commandWithChildren{
			Children: nil,
		}
		*children = append(*children, usedCommand)

		// get this next parameter from database
		if usedIn.ToCreate == primitive.NilObjectID {
			continue
		}
		var next structs.Parameter
		if err := db.Client.ReadOne("parameters", bson.M{"_id": usedIn.ToCreate}, &next); err != nil {
			panic(err) // TODO maybe this is bad
		}

		// continue recursion
		recurseWithBoth(next, &usedCommand.Children, depth+1, targetID)
	}

}
