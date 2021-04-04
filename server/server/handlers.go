package server

import (
	"context"
	"encoding/json"
	"net/http"
	"paqman-backend/command"
	"paqman-backend/db"

	"go.mongodb.org/mongo-driver/bson"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	respondJSON(&w, []byte(`{"response": "pong"}`), 200)
}

func newCommandHandler(w http.ResponseWriter, r *http.Request) {
	var c command.Command
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		respondError(&w, err, 400)
		return
	}
	ids, err := db.Store("commands", c)
	if err != nil {
		respondError(&w, err, 400)
		return
	}
	respondString(&w, "Command added with id: "+ids[0], 200)
}

func showHandler(w http.ResponseWriter, r *http.Request) {
	cursor, err := db.Client.Database("Test").Collection("Mongo").Find(context.TODO(), struct{}{})
	if err != nil {
		respondError(&w, err, 500)
		return
	}

	var results []bson.M

	for cursor.Next(context.TODO()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			respondError(&w, err, 500)
			return
		}
		results = append(results, result)
	}

	response, err := json.Marshal(results)
	if err != nil {
		respondError(&w, err, 500)
		return
	}
	respondJSON(&w, response, 200)
}
