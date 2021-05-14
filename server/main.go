package main

import (
	"paqman-backend/config"
	"paqman-backend/db"
	"paqman-backend/server"
)

func main() {

	if err := config.LoadFrom("config.json"); err != nil {
		panic(err)
	}

	if err := db.Connect(false); err != nil {
		panic(err)
	}

	server.Start()
}
