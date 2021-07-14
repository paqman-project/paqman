package db

import (
	"context"
	"encoding/json"
	"errors"

	"paqman-backend/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CreateOne creates a BSON document from v and stores it in collection.
// On success, the newly created ObjectID is returned.
//
// Returns an error if v cannot be marshalled into BSON or an error occurs
// while inserting the document.
//
// If mocked, it always returns a random, valid ObjectID and nil
func (m *Mongo) CreateOne(collection string, v interface{}, opts ...*options.InsertOneOptions) (primitive.ObjectID, error) {

	if m.Mocked {
		return primitive.NewObjectID(), nil
	}

	res, err := m.InnerConnection.Database(config.Current.MongoDBName).Collection(collection).InsertOne(context.TODO(), v, opts...)
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
// Returns an error if the value found could not be decoded into v.
//
// If mocked, it unmarshalls the dislocker example command (structs/examples.go)
// into v an returns nil
func (m *Mongo) ReadOne(collection string, filter bson.M, v interface{}, opts ...*options.FindOneOptions) error {

	if m.Mocked {
		b, _ := json.Marshal(m.mockedExample)
		json.Unmarshal(b, v)
		return nil
	}

	return m.InnerConnection.Database(config.Current.MongoDBName).Collection(collection).FindOne(context.TODO(), filter, opts...).Decode(v)
}

// ReadMany works just like ReadOne. v must be a pointer to a slice into
// which the found values in the cursor will be decoded.
//
// Returns an error if the cursor could not be decoded into v.
//
// If mocked, it unmarshalls the dislocker example command (structs/examples.go)
// as the only value into v an returns nil
func (m *Mongo) ReadMany(collection string, filter bson.M, v interface{}, opts ...*options.FindOptions) error {

	if m.Mocked {
		commands := []interface{}{m.mockedExample}
		b, _ := json.Marshal(commands)
		json.Unmarshal(b, v)
		return nil
	}

	cursor, err := m.InnerConnection.Database(config.Current.MongoDBName).Collection(collection).Find(context.TODO(), filter, opts...)
	if err != nil {
		return err
	}

	//
	if err := cursor.All(context.TODO(), v); err != nil {
		return err
	}

	return nil
}

// DeleteOne finds the first match for filter in collection and deletes it.
// It returns a *mongo.DeleteResult and an error type.
//
// If mocked, it returns an empty DeleteResult and nil (MAY NOT WORK YET)
func (m *Mongo) DeleteOne(collection string, filter bson.M) (*mongo.DeleteResult, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.DeleteResult{}, nil
	}

	return m.InnerConnection.Database(config.Current.MongoDBName).Collection(collection).DeleteOne(context.TODO(), filter)
}

// DeleteMany finds all matches for filter in collection and deletes them.
// It returns a *mongo.DeleteResult and an error type.
//
// If mocked, it returns an empty DeleteResult and nil (MAY NOT WORK YET)
func (m *Mongo) DeleteMany(collection string, filter bson.M) (*mongo.DeleteResult, error) {

	if m.Mocked { // TODO may not work for testing
		return &mongo.DeleteResult{}, nil
	}

	return m.InnerConnection.Database(config.Current.MongoDBName).Collection(collection).DeleteMany(context.TODO(), filter)
}

// Aggregate groups data from multiple documents into one combined result.
// Returns an error if the cursor could not be decoded into v.
//
// If mocked, it unmarshalls the dislocker example command (structs/examples.go)
// as the only value into v an returns nil
func (m *Mongo) Aggregate(collection string, pipeline mongo.Pipeline, v interface{}, opts ...*options.AggregateOptions) error {

	if m.Mocked {
		commands := []interface{}{m.mockedExample}
		b, _ := json.Marshal(commands)
		json.Unmarshal(b, v)
		return nil
	}

	cursor, err := m.InnerConnection.Database(config.Current.MongoDBName).Collection(collection).Aggregate(context.TODO(), pipeline, opts...)
	if err != nil {
		return err
	}

	if err := cursor.All(context.TODO(), v); err != nil {
		return err
	}

	return nil

}
