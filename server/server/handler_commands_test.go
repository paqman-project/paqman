package server

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"paqman-backend/db"
	"paqman-backend/structs"
	"testing"
)

func TestNewCommandHandler(t *testing.T) {

	db.ConnectMocked()

	// this is intended to always work!
	j, _ := json.Marshal(structs.ExampleCommandDislocker)

	// request that will be tested
	req, err := http.NewRequest("POST", "/api/command", bytes.NewReader(j))
	if err != nil {
		t.Fatalf("Error creating the request: %s", err.Error())
	}

	// test server that uses the handler that will be tested
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(newCommandHandler)
	handler.ServeHTTP(rec, req)

	// check status code
	expectedSC := 201
	if sc := rec.Code; sc != expectedSC {
		t.Errorf("Handler returned wrong status code: got %v want %v", sc, expectedSC)
	}

	// check if body contains a new ObjectID
	var body struct {
		ID string `json:"_id"`
	}
	err = json.NewDecoder(rec.Body).Decode(&body)
	if err != nil {
		t.Errorf("Error while decoding the body: %s", err.Error())
	}
	if body.ID == "" {
		t.Error("Couldn't get new Object ID")
	}

}
