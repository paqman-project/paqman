package structs

import (
	"paqman-backend/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Parameter struct {
	MongoModel   `json:",inline" bson:",inline"`
	Name         string             `json:"name" bson:"name"`
	Description  string             `json:"description" bson:"description"`
	Type         string             `json:"type" bson:"type"`
	ReturnedFrom []ReturnedFromData `json:"returned_from" bson:"returned_from"`
	UsedIn       []UsedInData       `json:"used_in" bson:"used_in"`
}

type ReturnedFromData struct {
	CommandID primitive.ObjectID `json:"command_id" bson:"command_id"`
	At        string             `json:"at" bson:"at"`
}

type UsedInData struct {
	CommandID  primitive.ObjectID `json:"command_id" bson:"command_id"`
	At         string             `json:"at" bson:"at"`
	WithValues []WithValues       `json:"with_values" bson:"with_values"`
	ToCreate   primitive.ObjectID `json:"to_create" bson:"to_create"`
}

type WithValues struct {
	Name  string `json:"name" bson:"name"`
	Value string `json:"value" bson:"value"`
}

// FindPreviousParameters searches for parameters that are used by
// commands that produce this parameter
//
// Mongo DB Query for getting previous parameters:
// db.parameters.find({ "used_in.to_create": "60bfa496d1fa49424407f3b7" }, { "used_in.command_id": true })
func (p *Parameter) FindPreviousParameters() []Parameter {
	query := bson.M{
		"used_in.to_create": p.ID,
	}
	var params []Parameter
	if err := db.Client.ReadMany("parameters", query, &params); err != nil {
		panic(err) // TODO this may never happen
	}
	return params
}

// FindSubsequentParameters searches for parameters that can be created
// if this parameter is used in any command
//
// Mongo DB Query for getting subsequent parameters:
// db.parameters.find({ "used_in.to_create": "60bfa496d1fa49424407f3b7" }, { "used_in.command_id": true })
func (p *Parameter) FindSubsequentParameters() []Parameter {
	possibleIds := []bson.M{}
	for _, possibleId := range p.UsedIn {
		possibleIds = append(possibleIds, bson.M{
			"returned_from.command_id": possibleId.CommandID,
		})
	}
	query := bson.M{
		"$or": possibleIds,
	}
	var params []Parameter
	if err := db.Client.ReadMany("parameters", query, &params); err != nil {
		panic(err) // TODO this may never happen
	}
	return params
}
