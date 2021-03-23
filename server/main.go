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

	// Creates a test entry in mongodb
	/*

		m := mongo{"Leon", 2}


		fmt.Println(res.InsertedID)
	*/

	Command := command.New()
	Command.Description = "Leon stinkt hart nach MAGGI!"
	Command.Name = "Bullshit"
	Command.RequiresRoot = true
	Command.TemplateValues["penis"] = command.CommandTemplateValue{
		Type:        "penis",
		Description: "whatever",
	}

	sum, err := bson.Marshal(Command)
	if err != nil {
		panic(err)
	}

	res, err := db.Client.Database("Test").Collection("Mongo").InsertOne(context.TODO(), sum)
	if err != nil {
		panic(err)
	}

	fmt.Println(res.InsertedID)

	var bson bson.M
	id := db.Client.Database("Test").Collection("Mongo").FindOne(context.TODO(), struct{}{})
	id.Decode(&bson)
	fmt.Println(bson["_id"])

	server.Start()
}
