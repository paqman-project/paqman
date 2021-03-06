package server

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPingHandler(t *testing.T) {

	// request that will be tested
	req, err := http.NewRequest("GET", "/api/ping", nil)
	if err != nil {
		t.Fatalf("Error creating the request: %s", err.Error())
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
