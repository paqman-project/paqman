package main

import (
	"context"
	"fmt"
	"paqman-backend/config"
	"paqman-backend/db"
	"paqman-backend/server"
)

func main() {

	if err := config.LoadFrom("config.json"); err != nil {
		panic(err)
	}

	fmt.Println(config.Current.BindAddress)
	fmt.Println(config.Current.MongoDBAddress)

	if err := db.Connect(); err != nil {
		panic(err)
	}
	defer db.Disconnect()

	type mongo struct {
		Name  string `json:"name"`
		Alter int    `json:"alter"`
	}
	m := mongo{"Leon", 2}

	res, err := db.Client.Database("Test").Collection("Mongo").InsertOne(context.TODO(), m)
	if err != nil {
		panic(err)
	}

	fmt.Println(res.InsertedID)

	server.Start()
}
