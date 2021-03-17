package main

import (
	"fmt"
	"paqman-backend/config"
	"paqman-backend/server"
)

func main() {

	if err := config.LoadFrom("config.json"); err != nil {
		panic(err)
	}

	fmt.Println(config.Current.BindAddress)
	fmt.Println(config.Current.MongoDBAddress.ConfiguredOr("172.0.0.1:27017"))

	server.Start()

}
