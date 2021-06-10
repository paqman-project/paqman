package server

import (
	"encoding/json"
	"errors"
	"net/http"
	"paqman-backend/db"
	"paqman-backend/structs"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
		err = db.Client.ReadOne("parameters", bson.M{
			"_id": objectID,
		}, &c)
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

// creates a new parameter
func newParameterHandler(w http.ResponseWriter, r *http.Request) {

	var p structs.Parameter
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		respondError(&w, err, 400)
		return
	}

	// check if "name", "type", "returned_from" and "used_in" are provided
	type missErr struct {
		Error string `json:"error"`
	}
	if p.Name == "" {
		respondObject(&w, missErr{`Missing "name" field`}, 400)
		return
	}
	if p.Type == "" {
		respondObject(&w, missErr{`Missing "type" field`}, 400)
		return
	}
	if p.ReturnedFrom == nil {
		respondObject(&w, missErr{`Missing "returned_from" field`}, 400)
		return
	}
	if p.UsedIn == nil {
		respondObject(&w, missErr{`Missing "used_in" field`}, 400)
		return
	}

	// all checks done, store parameter in db
	id, err := db.Client.CreateOne("parameters", p)
	if err != nil {
		respondError(&w, err, 400)
		return
	}

	b, err := json.Marshal(
		struct {
			ID string `json:"_id"`
		}{
			id.Hex(),
		},
	)
	if err != nil {
		respondError(&w, err, 500)
	}
	respondJSON(&w, b, 201)
}
