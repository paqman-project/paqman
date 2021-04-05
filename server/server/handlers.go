package server

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"paqman-backend/command"
	"paqman-backend/db"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	b, err := json.Marshal(
		struct {
			ID string `json:"_id"`
		}{
			ids[0].Hex(),
		},
	)
	if err != nil {
		respondError(&w, err, 500)
	}
	respondJSON(&w, b, 200)
}

func getAllCommandsHandler(w http.ResponseWriter, r *http.Request) {

	type smallCommand struct {
		ID          primitive.ObjectID `bson:"_id" json:"_id"`
		Name        string             `bson:"name" json:"name"`
		Description string             `bson:"description" json:"description"`
	}

	cursor, err := db.Client.Database("Test").Collection("commands").Find(context.TODO(), bson.M{})
	if err != nil {
		respondError(&w, err, 500)
		return
	}

	var results []smallCommand

	for cursor.Next(context.TODO()) {
		var result smallCommand
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

func getCommandByIDHandler(w http.ResponseWriter, r *http.Request) {
	commandID := mux.Vars(r)
	type commandWithID struct {
		ID              primitive.ObjectID `bson:"_id" json:"_id"`
		command.Command `bson:",inline"`
	}
	var c commandWithID
	if id, ok := commandID["id"]; ok {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			respondError(&w, err, 400)
			return
		}
		err = db.Client.Database("Test").Collection("commands").FindOne(context.TODO(), bson.M{
			"_id": objectID,
		}).Decode(&c)
		if err != nil {
			respondError(&w, err, 404)
			return
		}
	} else {
		err := errors.New("id not present")
		respondError(&w, err, 400)
		return
	}

	respondObject(&w, c, 200)
}
