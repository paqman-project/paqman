package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"paqman-backend/config"
)

// Start starts the API and frontend server.
// This function is blocking.
func Start() error {
	// router
	router := mux.NewRouter()
	// API routes
	apiRouter := router.PathPrefix("/api").Subrouter()
	apiRouter.HandleFunc("/ping", pingHandler).Methods("GET")

	// Get test value
	apiRouter.HandleFunc("/show", showHandler).Methods("GET")

	// Frontend route
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("../frontend/build")))

	// start server
	server := &http.Server{
		Addr:    config.Current.BindAddress,
		Handler: router,
	}
	log.Println("Starting server...")
	return server.ListenAndServe() // ListenAndServer never returns a non-nil error
}
