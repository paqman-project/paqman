package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

type MongoModel struct {
	ID primitive.ObjectID `json:"_id" bson:"_id"`
}
