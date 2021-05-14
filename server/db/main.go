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

var Client *mongo.Client

// Connect creates a database connection
// and assignes it to the Client variable.
//
// MongoDB URI uses values from config.json
// so make sure config.LoadFrom() is called before Connect().
func Connect() error {

	connectString := fmt.Sprintf("mongodb://%s:%s@%s/?authSource=admin", config.Current.MongoDBUser, config.Current.MongoDBPass, config.Current.MongoDBAddress)
	connectStringNoPass := fmt.Sprintf("mongodb://%s:%s@%s/?authSource=admin", config.Current.MongoDBUser, "***", config.Current.MongoDBAddress)

	log.Printf("Connecting to MongoDB at %s\n", connectStringNoPass)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectString))
	if err != nil {
		return err
	}

	if err := client.Ping(ctx, nil); err != nil {
		return err
	}

	log.Println("Connected to MongoDB")

	Client = client
	return nil
}

// Disconnect closes the db connection.
// Applies to the Client object.
func Disconnect() error {

	log.Println("Disconnecting MongoDB")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := Client.Disconnect(ctx); err != nil {
		return err
	}

	log.Println("DB connection closed")

	return nil
}

// Store stores command structs in the DB.
// Multiple commands can be passed.
func Store(collection string, v ...interface{}) ([]primitive.ObjectID, error) {
	var bsonElements []interface{}
	for _, e := range v {
		bsonElement, err := bson.Marshal(e)
		if err != nil {
			return nil, err
		}
		bsonElements = append(bsonElements, bsonElement)
	}
	res, err := Client.Database("Test").Collection(collection).InsertMany(context.TODO(), bsonElements)
	if err != nil {
		return nil, err
	}

	var output []primitive.ObjectID
	for _, e := range res.InsertedIDs {

		if tmp, ok := e.(primitive.ObjectID); !ok {
			return nil, errors.New("type assertion was not successful")
		} else {
			output = append(output, tmp)
		}
	}
	return output, nil
}
