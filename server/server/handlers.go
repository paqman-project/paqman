package server

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"paqman-backend/db"
	"paqman-backend/structs"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// status function for API
func pingHandler(w http.ResponseWriter, r *http.Request) {
	respondJSON(&w, []byte(`{"response": "pong"}`), 200)
}

// gets all Commands
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

// creates a new Command
func newCommandHandler(w http.ResponseWriter, r *http.Request) {

	var c structs.Command
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

// gets a Command by ID
func getCommandByIDHandler(w http.ResponseWriter, r *http.Request) {

	commandID := mux.Vars(r)
	var c struct {
		ID              primitive.ObjectID `bson:"_id" json:"_id"`
		structs.Command `bson:",inline"`
	}
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
	respondObject(&w, c, 201)
}

// returns a Command with filled template values
func fillCommandHandler(w http.ResponseWriter, r *http.Request) {
	// get a command by ID
	commandID := mux.Vars(r)
	var c struct {
		ID              primitive.ObjectID `bson:"_id" json:"_id"`
		structs.Command `bson:",inline"`
	}
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

	var v map[string]interface{}

	// parses the request body into a map of key and value pairs
	if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
		respondError(&w, err, 400)
		return
	}
	if plain, err := c.FillTemplate(v); err != nil {
		respondString(&w, plain, 200)
		return
	}
	respondError(&w, errors.New("Broken"), 500)

}

// gets a parameter by ID
func getParameterByIDHandler(w http.ResponseWriter, r *http.Request) {
	paramID := mux.Vars(r)
	var c struct {
		ID                primitive.ObjectID `bson:"_id" json:"_id"`
		structs.Parameter `bson:",inline"`
	}
	if id, ok := paramID["id"]; ok {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			respondError(&w, err, 400)
			return
		}
		err = db.Client.Database("Test").Collection("parameter").FindOne(context.TODO(), bson.M{
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
	respondObject(&w, c, 201)
}
