package server

import (
	"os"
	"testing"

	"paqman-backend/db"
)

// TestMain sets up the database connection for all other tests in this package
func TestMain(m *testing.M) {
	// setup
	if os.Getenv("CI") == "true" {
		db.Connect("mongodb://root:toor@mongo:27017/PAQMAN?authSource=admin")
	} else {
		db.Connect("mongodb://root:toor@localhost:27017/PAQMAN?authSource=admin")
	}
	// start all other tests
	code := m.Run()
	// teardown
	db.Client.Disconnect()
	// done
	os.Exit(code)
}
