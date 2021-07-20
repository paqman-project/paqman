package structs

import (
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
