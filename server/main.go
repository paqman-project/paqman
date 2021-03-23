package main

import (
	"context"
	"fmt"
	"paqman-backend/command"
	"paqman-backend/config"
	"paqman-backend/db"
	"paqman-backend/server"

	"go.mongodb.org/mongo-driver/bson"
)

func main() {

	if err := config.LoadFrom("config.json"); err != nil {
		panic(err)
	}

	fmt.Println("BindAdress: " + config.Current.BindAddress)
	fmt.Println("DBAddress: " + config.Current.MongoDBAddress)

	if err := db.Connect(); err != nil {
		panic(err)
	}
	defer db.Disconnect()

	// example command
	Command := command.New()
	Command.Description = "Leon stinkt hart nach MAGGI!"
	Command.Name = "NewTest"
	Command.RequiresRoot = true
	Command.TemplateValues["penis"] = command.CommandTemplateValue{
		Type:        "penis",
		Description: "whatever",
	}

	sum, err := bson.Marshal(Command)
	if err != nil {
		panic(err)
	}

	// creates a Command entry at DB Test, Collection Mongo
	res, err := db.Client.Database("Test").Collection("Mongo").InsertOne(context.TODO(), sum)
	if err != nil {
		panic(err)
	}

	fmt.Println(res.InsertedID)

	// example get one DB entry as struct
	var out command.Command
	id := db.Client.Database("Test").Collection("Mongo").FindOne(context.TODO(), bson.D{{"name", "NewTest"}})
	id.Decode(&out)
	fmt.Println(out)

	// example get all DB entries
	outAll := make([]command.Command, 0)
	cursor, err := db.Client.Database("Test").Collection("Mongo").Find(context.TODO(), bson.D{})
	if err != nil {
		panic(err)
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var tmp command.Command
		if err := cursor.Decode(&tmp); err != nil {
			panic(err)
		}
		outAll = append(outAll, tmp)
	}

	fmt.Println(outAll)

	server.Start()
}
