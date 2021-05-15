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

// CreateOne creates a BSON document from v and stores it in collection.
// On success, the newly created ObjectID is returned.
//
// Returns an error if v cannot be marshalled into BSON or an error occurs
// while inserting the document.
//
// If mocked, it always returns a random, valid ObjectID and nil
func (m *Mongo) CreateOne(collection string, v interface{}) (primitive.ObjectID, error) {

	if m.Mocked {
		return primitive.NewObjectID(), nil
	}

	res, err := m.connection.Database(DatabaseName).Collection(collection).InsertOne(context.TODO(), v)
	if err != nil {
		return primitive.ObjectID{}, err
	}

	if tmp, ok := res.InsertedID.(primitive.ObjectID); ok {
		return tmp, nil
	}
	return primitive.ObjectID{}, errors.New("type assertion was not successful")
}

// ReadOne searches documents in collection that match filter. The first match is
// then unmarshalled to the value of v.
//
// Returns an error if the value found could not be decoded into v
//
// If mocked, it unmarshalls the dislocker example command (structs/examples.go)
// into v an returns nil
func (m *Mongo) ReadOne(collection string, filter bson.M, v interface{}) error {

	if m.Mocked {
		b, _ := json.Marshal(structs.ExampleCommandDislocker)
		json.Unmarshal(b, v)
		return nil
	}

	return m.connection.Database(DatabaseName).Collection(collection).FindOne(context.TODO(), filter).Decode(v)
}

// ReadMany works just like ReadOne, but returns a *mongo.Cursor instead of
// decoding the found values
//
// If mocked, it returns an empty cursor and nil (MAY NOT WORK YET)
func (m *Mongo) ReadMany(collection string, filter bson.M) (*mongo.Cursor, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.Cursor{}, nil
	}

	return m.connection.Database(DatabaseName).Collection(collection).Find(context.TODO(), filter)
}

// DeleteOne finds the first match for filter in collection and deletes it.
// It returns a *mongo.DeleteResult and an error type.
//
// If mocked, it returns an empty DeleteResult and nil (MAY NOT WORK YET)
func (m *Mongo) DeleteOne(collection string, filter bson.M) (*mongo.DeleteResult, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.DeleteResult{}, nil
	}

	return m.connection.Database(DatabaseName).Collection(collection).DeleteOne(context.TODO(), filter)
}

// DeleteMany finds all matches for filter in collection and deletes them.
// It returns a *mongo.DeleteResult and an error type.
//
// If mocked, it returns an empty DeleteResult and nil (MAY NOT WORK YET)
func (m *Mongo) DeleteMany(collection string, filter bson.M) (*mongo.DeleteResult, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.DeleteResult{}, nil
	}

	return m.connection.Database(DatabaseName).Collection(collection).DeleteMany(context.TODO(), filter)
}
