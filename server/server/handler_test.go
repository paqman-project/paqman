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

func TestPingHandler(t *testing.T) {

	// request that will be tested
	req, err := http.NewRequest("GET", "/api/ping", nil)
	if err != nil {
		t.Fatal(err)
	}

	// test server that uses the handler that will be tested
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(pingHandler)
	handler.ServeHTTP(rec, req)

	// check status code
	expectedSC := 200
	if sc := rec.Code; sc != expectedSC {
		t.Errorf("Handler returned wrong status code: got %v want %v", sc, expectedSC)
	}

	// check body
	expectedBody := `{"response": "pong"}`
	if body := rec.Body.String(); body != expectedBody {
		t.Errorf("Handler returned unexpected body: got %v want %v", body, expectedBody)
	}

}

func TestNewCommandHandler(t *testing.T) {

	db.Connect(true)

	j, _ := json.Marshal(structs.ExampleCommandDislocker)

	// request that will be tested
	req, err := http.NewRequest("POST", "/api/command", bytes.NewReader(j))
	if err != nil {
		t.Fatal(err)
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

	// check if body contains new ObjectID
	type MongoID struct {
		ID string `json:"_id"`
	}
	var mID MongoID
	err = json.NewDecoder(rec.Body).Decode(&mID)
	if err != nil {
		t.Error(err.Error())
	}
	if mID.ID == "" {
		t.Error("Couldn't get new Object ID")
	}

}
