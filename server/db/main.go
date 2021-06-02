package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"paqman-backend/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Client holds a wrapper type instance of the MongoDB
// connection to support mocking for unit tests
var Client *Mongo

// MongoCRUD defines the functions that follow the CRUD
// paradigm, but with a more fitting relation to mongos
// No-SQL approach
type MongoCRUD interface {
	CreateOne(string, interface{}) (primitive.ObjectID, error)
	// CreateMany is not defined as it is simpler to handle
	// ObjectIDs when calling CreateOne multiple times
	ReadOne(string, bson.M, interface{}) error
	ReadMany(string, bson.M) (*mongo.Cursor, error)
	// Update(string, bson.M, ...) // TODO
	DeleteOne(string, bson.M) (*mongo.DeleteResult, error)
	DeleteMany(string, bson.M) (*mongo.DeleteResult, error)
}

// Mongo is the wrapper around a MongoDB connection
// that allows mocking
//
// (implements MongoCRUD interface)
type Mongo struct {
	Mocked     bool
	connection *mongo.Client
}

// Interface guard for Mongo struct
var _ MongoCRUD = (*Mongo)(nil)

// Connect creates a database connection
// and assignes it to the Client variable
//
// It uses the config.json file to retreive the
// connection details so make sure config.LoadFrom(path)
// is called before Connect().
func Connect(mocked bool) error {

	var client *mongo.Client

	if !mocked { // only establish a real connection, if the database should not be mocked

		connectString := fmt.Sprintf("mongodb://%s:%s@%s/?authSource=admin",
			config.Current.MongoDBUser,
			config.Current.MongoDBPass,
			config.Current.MongoDBAddress,
		)
		connectStringNoPass := fmt.Sprintf("mongodb://%s:***@%s/?authSource=admin",
			config.Current.MongoDBUser,
			config.Current.MongoDBAddress,
		)

		log.Printf("Connecting to MongoDB at %s\n", connectStringNoPass)

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var err error
		client, err = mongo.Connect(ctx, options.Client().ApplyURI(connectString))
		if err != nil {
			return err
		}
		if err := client.Ping(ctx, nil); err != nil {
			return err
		}

		log.Println("Connected to MongoDB!")

	}

	Client = &Mongo{
		Mocked:     mocked,
		connection: client,
	}
	return nil
}

// CheckConnection pings the database to determine
// if it is still reachable. Returns nil, if it is
// reachable or returns the error otherwise
func (m *Mongo) CheckConnection() error {

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second) // TODO maybe this is not sufficient
	defer cancel()

	if err := m.connection.Ping(ctx, nil); err != nil {
		return err
	}

	return nil
}

// Disconnect closes the db connection properly
//
// It is encouraged to call this method in a
// defer statement or goroutine
func (m *Mongo) Disconnect() error {

	log.Println("Disconnecting MongoDB")

	if m.Mocked {
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := m.connection.Disconnect(ctx); err != nil {
		return err
	}

	log.Println("DB connection closed")
	return nil

}
