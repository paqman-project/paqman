package main

import (
	"fmt"
	"paqman-backend/config"
	"paqman-backend/db"
	"paqman-backend/server"
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
	*/

	server.Start()
}
