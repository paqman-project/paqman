package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSearchHandler(t *testing.T) {

	// test server that uses the handler that will be tested
	handler := http.HandlerFunc(searchHandler)

	tests := []struct {
		Query          string // Query string for API URL
		ExpectedStatus int
		ExpectedName   string
	}{
		{
			Query:          fmt.Sprintf("?for=%s&term=%s", "commands", "disl"),
			ExpectedStatus: 200,
			ExpectedName:   "dislocker",
		},
		{
			Query:          fmt.Sprintf("?for=%s&term=%s", "parameters", "fve"),
			ExpectedStatus: 200,
			ExpectedName:   "fvek",
		},
	}

	for _, test := range tests {

		// init request recorder
		rec := httptest.NewRecorder()
		req, err := http.NewRequest("GET", "/api/search"+test.Query, nil)
		if err != nil {
			t.Fatalf("Error creating the request: %s", err.Error())
		}
		handler.ServeHTTP(rec, req)

		// check status code
		if rec.Code != test.ExpectedStatus {
			t.Errorf("Handler returned wrong status code: got %v want %v", rec.Code, test.ExpectedStatus)
		}

		// check if name in response matches
		var body []struct {
			Name string `json:"name"`
		}
		err = json.NewDecoder(rec.Body).Decode(&body)
		if err != nil {
			t.Errorf("Error while decoding the body: %s", err.Error())
		}
		for _, b := range body {
			if b.Name == test.ExpectedName {
				return // success
			}
		}
		t.Errorf("Handler responded with wrong command name: got %v want %v", body, test.ExpectedName)

	}

}
