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
	structs.SmallCommand `json:",inline"`
	Creates              structs.Parameter      `json:"creates"`
	Children             []*commandWithChildren `json:"children"`
}

type aggregatedParameter struct {
	structs.Parameter    `json:",inline" bson:",inline"`
	ReturnedFromLookup   []structs.SmallCommand `json:"returned_from_lookup" bson:"returned_from_lookup"`
	UsedInLookup         []structs.SmallCommand `json:"used_in_lookup" bson:"used_in_lookup"`
	UsedInToCreateLookup []structs.Parameter    `json:"used_in_to_create_lookup" bson:"used_in_to_create_lookup"`
}

func getAggregatedParameter(id primitive.ObjectID) aggregatedParameter {

	var v []aggregatedParameter

	// get the current parameter
	aggPipeline := mongo.Pipeline{
		{{
			Key:   "$match",
			Value: bson.M{"_id": id},
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
	if err := db.Client.Aggregate("parameters", aggPipeline, &v); err != nil {
		panic(err)
	}

	return v[0] // this special aggreate function always returns one result only

}

func recurseWithHaveOnly(currentParamID primitive.ObjectID, children *[]*commandWithChildren, depth int) {

	currentParam := getAggregatedParameter(currentParamID)

	// stop condition
	if (currentParam.UsedIn == nil || len(currentParam.UsedIn) == 0) || depth >= 5 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every child of this parameter
	for i := range currentParam.UsedIn {
		// add used command to chain
		usedCommand := &commandWithChildren{
			SmallCommand: currentParam.UsedInLookup[i],
			Creates:      currentParam.UsedInToCreateLookup[i],
			Children:     nil,
		}
		*children = append(*children, usedCommand)

		// recurse with the next parameter
		recurseWithHaveOnly(currentParam.UsedInToCreateLookup[i].ID, &usedCommand.Children, depth+1)
	}

}

func recurseWithWantOnly(currentParamID primitive.ObjectID, children *[]*commandWithChildren, depth int) {

	currentParam := getAggregatedParameter(currentParamID)

	// stop condition
	if (currentParam.ReturnedFrom == nil || len(currentParam.ReturnedFrom) == 0) || depth >= 15 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every parent of this parameter
	for _, returnedFrom := range currentParam.ReturnedFrom {
		// add used command to chain
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
			recurseWithWantOnly(prevParam.ID, &loc, depth+1)
			completePredecessors = append(completePredecessors, loc...)
		}
		children = &completePredecessors

	}

}

func recurseWithBoth(currentParamID primitive.ObjectID, children *[]*commandWithChildren, depth int, targetID primitive.ObjectID) {

	currentParam := getAggregatedParameter(currentParamID)

	// stop condition
	if (currentParam.UsedIn == nil || len(currentParam.UsedIn) == 0) || currentParam.ID.Hex() == targetID.Hex() || depth >= 15 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every child of this parameter
	for i := range currentParam.UsedIn {
		// add used command to chain
		usedCommand := &commandWithChildren{
			SmallCommand: currentParam.UsedInLookup[i],
			Creates:      currentParam.UsedInToCreateLookup[i],
			Children:     nil,
		}
		*children = append(*children, usedCommand)

		// recurse with the next parameter
		recurseWithHaveOnly(currentParam.UsedInToCreateLookup[i].ID, &usedCommand.Children, depth+1)
	}

}
