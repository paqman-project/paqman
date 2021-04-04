package server

import (
	"context"
	"encoding/json"
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
	respondString(&w, "Command added as "+ids[0], 200)
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
			respondError(&w, err, 500)
			return
		}
		err = db.Client.Database("Test").Collection("commands").FindOne(context.TODO(), bson.M{
			"_id": objectID,
		}).Decode(&c)
		if err != nil {
			w.WriteHeader(404)
			w.Write(nil)
			return
		}
	} else {
		w.WriteHeader(400)
		w.Write(nil)
		return
	}

	respondObject(&w, c, 200)
}
