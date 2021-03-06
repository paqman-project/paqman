package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"paqman-backend/config"
	"paqman-backend/db"
	"paqman-backend/server"
)

var (
	configPath = flag.String("config", "config.json", "Defines the path to the config.json")
)

func main() {

	fmt.Println("-------------------------")
	fmt.Println("  ~ WELCOME TO PAQMAN ~  ")
	fmt.Println("-------------------------")

	// handle SIGHUB, SIGINT, SIGTERM, SIGQUIT
	termSigChan := make(chan os.Signal, 1)
	signal.Notify(termSigChan,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT,
	)
	go func() { // function that listens for termination signals
		s := <-termSigChan
		fmt.Println()
		log.Printf("Starting cleanup jobs (got %s)", s.String())

		// do cleanup jobs
		if err := db.Client.Disconnect(); err != nil {
			panic(err)
		}

		os.Exit(0)
	}()

	// load the configuration
	if err := config.LoadFrom(*configPath); err != nil {
		panic(err)
	}

	connectString := fmt.Sprintf("mongodb://%s:%s@%s/%s?authSource=admin",
		config.Current.MongoDBUser,
		config.Current.MongoDBPass,
		config.Current.MongoDBAddress,
		config.Current.MongoDBName,
	)

	if err := db.Connect(connectString); err != nil {
		panic(err)
	}

	// start the API and frontend server
	panic(server.Start(
		config.Current.BindAddress,
		config.Current.FrontendPath,
	))

}
