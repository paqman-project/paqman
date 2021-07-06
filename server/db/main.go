package db

import (
	"context"
	"errors"
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
	CreateOne(string, interface{}, ...*options.InsertOneOptions) (primitive.ObjectID, error)
	// CreateMany is not defined as it is simpler to handle
	// ObjectIDs when calling CreateOne multiple times
	ReadOne(string, bson.M, interface{}, ...*options.FindOneOptions) error
	ReadMany(string, bson.M, interface{}, ...*options.FindOptions) error
	// Update(string, bson.M, ...) // TODO
	DeleteOne(string, bson.M) (*mongo.DeleteResult, error)
	DeleteMany(string, bson.M) (*mongo.DeleteResult, error)
}

// Mongo is the wrapper around a MongoDB connection
// that allows mocking
//
// (implements MongoCRUD interface)
type Mongo struct {
	Mocked bool
	// mockedExample is the object, that will be returned,
	// if a mocked CRUD operation takes place
	mockedExample   interface{}
	InnerConnection *mongo.Client
}

// Interface guard for Mongo struct
var _ MongoCRUD = (*Mongo)(nil)

// Connect creates a database connection
// and assignes it to the Client variable
//
// It uses the config.json file to retreive the
// connection details so make sure config.LoadFrom(path)
// is called before Connect().
func Connect() error {

	var client *mongo.Client

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

	Client = &Mongo{
		InnerConnection: client,
	}
	return nil
}

// ConnectMocked creates a mocked database for testing
// (no database conncetion will be established)
//
// Call `SetMockedExample` to provide an example object
// that should be returned for CRUD operations
func ConnectMocked() {
	Client = &Mongo{
		Mocked:          true,
		InnerConnection: nil,
	}
}

// SetMockedExample sets (overwriting the previous value) an
// object, that will be returned in mocked CRUD operations
func (m *Mongo) SetMockedExample(v interface{}) error {
	if m.Mocked {
		m.mockedExample = v
		return nil
	}
	return errors.New("Database is not mocked!")
}

// CheckConnection pings the database to determine
// if it is still reachable. Returns nil, if it is
// reachable or returns the error otherwise
func (m *Mongo) CheckConnection() error {

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second) // TODO maybe this is not sufficient
	defer cancel()

	if err := m.InnerConnection.Ping(ctx, nil); err != nil {
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

	if err := m.InnerConnection.Disconnect(ctx); err != nil {
		return err
	}

	log.Println("DB connection closed")
	return nil

}
