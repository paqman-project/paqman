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

var Client *Mongo

type MongoCRUD interface {
	CreateOne(string, interface{}) (primitive.ObjectID, error)
	ReadOne(string, bson.M, interface{}) error
	ReadMany(string, bson.M) (*mongo.Cursor, error)
	// Update(string, bson.M, ...) // TODO
	DeleteOne(string, bson.M) (*mongo.DeleteResult, error)
	DeleteMany(string, bson.M) (*mongo.DeleteResult, error)
}

type Mongo struct {
	Mocked     bool
	connection *mongo.Client
}

var _ MongoCRUD = (*Mongo)(nil)

// Connect creates a database connection
// and assignes it to the Client variable.
//
// MongoDB URI uses values from config.json
// so make sure config.LoadFrom() is called before Connect().
func Connect(mocked bool) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var client *mongo.Client

	if !mocked {
		var err error
		client, err = mongo.Connect(ctx, options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%s@%s/?authSource=admin", config.Current.MongoDBUser, config.Current.MongoDBPass, config.Current.MongoDBAddress)))
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

// Disconnect closes the db connection.
// Applies to the client obeject.
func (m *Mongo) Disconnect() error {

	if m.Mocked {
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := m.connection.Disconnect(ctx); err != nil {
		return err
	}

	log.Println("Connection closed!")
	return nil
}
