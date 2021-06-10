package server

import "net/http"

// status function for API
func pingHandler(w http.ResponseWriter, r *http.Request) {
	respondJSON(&w, []byte(`{"response": "pong"}`), 200)
}
