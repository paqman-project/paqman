package server

import (
	"log"
	"net/http"

	"paqman-backend/config"

	"github.com/gorilla/mux"
)

var frontendRoutes = []string{
	"/static",
	"/manifest.json",
	"/asset-manifest.json",
	"/favicon.ico",
	"/robots.txt",
	"/paqman192.png",
	"/paqman512.png",
}

// Start starts the API and frontend server.
// This function is blocking.
func Start() error {

	// router
	router := mux.NewRouter()

	// route logging
	router.Use(mux.MiddlewareFunc(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			log.Printf("%s %s %s%s from %s\n", r.Proto, r.Method, r.Host, r.RequestURI, r.RemoteAddr)
			next.ServeHTTP(rw, r)
		})
	}))

	// API routes
	apiRouter := router.PathPrefix("/api").Subrouter()
	apiRouter.HandleFunc("/ping", pingHandler).Methods("GET")
	apiRouter.HandleFunc("/commands", getAllCommandsHandler).Methods("GET")
	apiRouter.HandleFunc("/command", newCommandHandler).Methods("POST")
	apiRouter.HandleFunc("/command/{id}", getCommandByIDHandler).Methods("GET")
	//apiRouter.HandleFunc("/command/{id}/fill", fillCommandHandler).Methods("POST")
	apiRouter.HandleFunc("/parameter", newParameterHandler).Methods("POST")
	apiRouter.HandleFunc("/parameter/{id}", getParameterByIDHandler).Methods("GET")
	apiRouter.PathPrefix("/").HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		respondString(&rw, "Endpoint not found", 404)
	})

	// frontend routes
	// add static routes from frontendRoutes to be redirected to the frontend
	for _, route := range frontendRoutes {
		router.PathPrefix(route).Handler(http.FileServer(http.Dir("../frontend/build")))
	}
	// catch-all router that always serves the build directory to make the react browser router work
	router.PathPrefix("/").HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, "../frontend/build")
	})

	// start server
	server := &http.Server{
		Addr:    config.Current.BindAddress,
		Handler: router,
	}
	log.Println("Started API and frontend server, ready to handle connections")
	return server.ListenAndServe() // ListenAndServer never returns a non-nil error

}
