package config

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

// A Config is an instance of an unmarshalled
// configuration file
type Config struct {
	BindAddress    string `json:"bind_address"` // Default 0.0.0.0:3002
	MongoDBAddress string `json:"db_address"`   // Default 127.0.0.1:27017
	MongoDBUser    string `json:"db_username"`
	MongoDBPass    string `json:"db_password"`
}

// setDefaults sets all uninitialized fields
// to their default values
func (c *Config) setDefaults() {
	if c.BindAddress == "" {
		c.BindAddress = "0.0.0.0:3002"
	}
	if c.MongoDBAddress == "" {
		c.MongoDBAddress = "127.0.0.1:27017"
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
	return nil

}
