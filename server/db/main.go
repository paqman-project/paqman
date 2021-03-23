package db

import (
	"context"
	"fmt"
	"log"
	"paqman-backend/command"
	"paqman-backend/config"
	"time"

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
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%s@%s/?authSource=admin", config.Current.MongoDBUser, config.Current.MongoDBPass, config.Current.MongoDBAddress)))
	if err != nil {
		return err
	}

	if err := client.Ping(ctx, nil); err != nil {
		return err
	}

	log.Println("Connected to MongoDB!")

	Client = client
	return nil
}

// Disconnect closes the db connection.
// Applies to the client obeject.
func Disconnect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := Client.Disconnect(ctx); err != nil {
		return err
	}
	log.Println("Connection closed!")
	return nil
}

// Store stores command structs in the TODO DB.
// Multiple commands can be passed.
func Store(collection string, command ...command.Command) {
	// TODO
}
