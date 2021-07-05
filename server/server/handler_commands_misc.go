package server

import (
	"paqman-backend/db"
	"paqman-backend/structs"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// recursive response struct
type commandWithChildren struct {
	CommandID string                 `json:"command_id"`
	Children  []*commandWithChildren `json:"_children"`
}

func recurseWithHaveOnly(current structs.Parameter, children *[]*commandWithChildren, depth int) {

	// stop condition
	if (current.UsedIn == nil || len(current.UsedIn) == 0) || depth >= 5 { // TODO depth may change
		return
	}

	// create children array
	*children = make([]*commandWithChildren, 0)

	// iterate over every child of this parameter
	for _, usedIn := range current.UsedIn {
		// add used command to chain
		usedCommand := &commandWithChildren{
			CommandID: usedIn.CommandID,
			Children:  nil,
		}
		*children = append(*children, usedCommand)

		// get this next parameter from database
		if usedIn.ToCreate == "" {
			continue
		}
		id, err := primitive.ObjectIDFromHex(usedIn.ToCreate)
		if err != nil {
			panic(err) // TODO maybe this is bad
		}
		var next structs.Parameter
		if err := db.Client.ReadOne("parameters", bson.M{"_id": id}, &next); err != nil {
			panic(err) // TODO maybe this is bad
		}

		// continue recursion
		recurseWithHaveOnly(next, &usedCommand.Children, depth+1)
	}

}
