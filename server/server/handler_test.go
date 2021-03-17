package server

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPingHandler(t *testing.T) {

	// request to test
	req, err := http.NewRequest("GET", "/api/ping", nil)
	if err != nil {
		t.Fatal(err)
	}

	// test http server that uses the handler that will be tested
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(pingHandler)
	handler.ServeHTTP(rec, req)

	// check status code
	if sc := rec.Code; sc != 200 {
		t.Errorf("handler returned wrong status code: got %v want %v", sc, 200)
	}

	// check body
	expected := `{"response": "pong"}`
	if body := rec.Body.String(); body != expected {
		t.Errorf("handler returned unexpected body: got %v want %v", body, expected)
	}

}
