package config

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

// A Config is an instance of an unmarshalled
// configuration file
type Config struct {
	BindAddress    string `json:"bind_address"`  // Default 0.0.0.0:3002
	FrontendPath   string `json:"frontend_path"` // Default ../frontend/build
	MongoDBAddress string `json:"db_address"`    // Default 127.0.0.1:27017
	MongoDBName    string `json:"db_name"`       // Default PAQMAN
	MongoDBUser    string `json:"db_username"`
	MongoDBPass    string `json:"db_password"`
}

// setDefaults sets all uninitialized fields
// to their default values
func (c *Config) setDefaults() {
	if c.BindAddress == "" {
		log.Println(`"bind_address" not set, using default "0.0.0.0:3002"`)
		c.BindAddress = "0.0.0.0:3002"
	}
	if c.FrontendPath == "" {
		log.Println(`"frontend_path" not set, using default "../frontend/build"`)
		c.FrontendPath = "../frontend/build"
	}
	if c.MongoDBAddress == "" {
		log.Println(`"db_address" not set, using default "127.0.0.1:27017"`)
		c.MongoDBAddress = "127.0.0.1:27017"
	}
	if c.MongoDBName == "" {
		log.Println(`"db_name" not set, using default "PAQMAN"`)
		c.MongoDBName = "PAQMAN"
	}
}

// Current holds an instance of the lastest loaded
// configuration. Must be initialized and can be
// refreshed with config.LoadFrom()
var Current Config

// LoadFrom load the config.json file from the given path
// and saves it in config.Current. Returns nil, if successful.
// This can be called multiple times to reload the configuration.
func LoadFrom(path string) error {

	log.Println("Loading configuration from", path)

	jsonFile, err := os.Open(path)
	if err != nil {
		return err
	}

	jsonBytes, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return err
	}

	c := Config{}

	if err := json.Unmarshal(jsonBytes, &c); err != nil {
		return err
	}

	c.setDefaults()
	Current = c

	log.Println("Configuration loaded successfully")

	return nil

}
