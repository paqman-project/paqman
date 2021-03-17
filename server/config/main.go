package config

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

type DefaultableString string

func (d DefaultableString) ConfiguredOr(def string) string {
	if d != "" {
		return string(d)
	}
	return def
}

// A Config is an instance of an unmarshalled
// configuration file
type Config struct {
	BindAddress    DefaultableString `json:"bind_address"`    // Default 0.0.0.0:3002
	MongoDBAddress DefaultableString `json:"mongodb_address"` // Default 127.0.0.1:27017
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
