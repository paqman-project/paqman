package config

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

// A Config is an instance of an unmarshalled
// configuration file
type Config struct {
	HostAddress string `json:"host_address"`
}

// Defaults returns an instance of Config
// initialized with the default values
func Defaults() *Config {
	return &Config{
		// DEFINE DEFAULTS HERE
		HostAddress: "0.0.0.0:3002",
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

	Current = c
	return nil

}
