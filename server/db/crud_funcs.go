package db

import (
	"context"
	"encoding/json"
	"errors"
	"paqman-backend/structs"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Store stores command structs in the DB.
// Multiple commands can be passed.
func (m *Mongo) CreateOne(collection string, v interface{}) (primitive.ObjectID, error) {

	if m.Mocked {
		return primitive.NewObjectID(), nil
	}

	res, err := m.connection.Database("Test").Collection(collection).InsertOne(context.TODO(), v)
	if err != nil {
		return primitive.ObjectID{}, err
	}

	if tmp, ok := res.InsertedID.(primitive.ObjectID); ok {
		return tmp, nil
	}
	return primitive.ObjectID{}, errors.New("type assertion was not successful")
}

func (m *Mongo) ReadOne(collection string, filter bson.M, v interface{}) error {

	if m.Mocked {
		b, _ := json.Marshal(structs.ExampleCommandDislocker)
		json.Unmarshal(b, v)
		return nil
	}

	return m.connection.Database("Test").Collection(collection).FindOne(context.TODO(), filter).Decode(v)
}

func (m *Mongo) ReadMany(collection string, filter bson.M) (*mongo.Cursor, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.Cursor{}, nil
	}

	return m.connection.Database("Test").Collection(collection).Find(context.TODO(), filter)
}

func (m *Mongo) DeleteOne(collection string, filter bson.M) (*mongo.DeleteResult, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.DeleteResult{}, nil
	}

	return m.connection.Database("Test").Collection(collection).DeleteOne(context.TODO(), filter)
}

func (m *Mongo) DeleteMany(collection string, filter bson.M) (*mongo.DeleteResult, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.DeleteResult{}, nil
	}

	return m.connection.Database("Test").Collection(collection).DeleteMany(context.TODO(), filter)
}
