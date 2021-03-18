package server

import (
	"context"
	"encoding/json"
	"net/http"
	"paqman-backend/db"

	"go.mongodb.org/mongo-driver/bson"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	respondJSON(&w, []byte(`{"response": "pong"}`), 200)
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
