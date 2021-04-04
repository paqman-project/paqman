package server

import (
	"encoding/json"
	"net/http"
)

func respondString(w *http.ResponseWriter, s string, statusCode int) {
	(*w).Header().Set("Content-Type", "text/plain")
	(*w).WriteHeader(statusCode)
	(*w).Write([]byte(s))
}

func respondJSON(w *http.ResponseWriter, json []byte, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).WriteHeader(statusCode)
	(*w).Write(json)
}

func respondError(w *http.ResponseWriter, err error, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).WriteHeader(statusCode)
	(*w).Write([]byte(`{"error": "` + err.Error() + `"}`))
}

func respondObject(w *http.ResponseWriter, v interface{}, statusCode int) {

	o, err := json.Marshal(v)
	if err != nil {
		respondError(w, err, 500)
	}

	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).WriteHeader(statusCode)
	(*w).Write(o)
}
