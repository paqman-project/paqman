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

	fmt.Println(
		config.Defaults().BindAddress,
	)

	server.Start()

}
