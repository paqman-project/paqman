package server

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"

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

	// copy TemplateValues map for checking if more template values in template_values are given then in template specified
	copyTemplateValue := c.TemplateValues

	// regex, parses all template values out of a template specified with the syntax %{}
	re := regexp.MustCompile(`\%\{.*?\}`)
	// checks if any template_values are present
	matches := re.FindAllString(string(c.Template), -1)

	// check if more template values under template are given then in template_values map specified
	missingInTemplateValues := make([]string, 0)
	for _, match := range matches {
		match = strings.Trim(match, "%{")
		match = strings.Trim(match, "}")
		if _, ok := c.TemplateValues[match]; ok {
			delete(copyTemplateValue, match)
		} else {
			missingInTemplateValues = append(missingInTemplateValues, match)
		}
	}
	if len(missingInTemplateValues) > 0 {
		err := fmt.Errorf("there are more template values in the template argument defined, following values in the template_values map are missing: %v", strings.Join(missingInTemplateValues, ", "))
		respondError(&w, err, 400)
		return
	}

	// check if more template values in the template_values map are given then in template specified
	if len(copyTemplateValue) != 0 {
		missingInTemplates := make([]string, 0)
		for key, _ := range copyTemplateValue {
			missingInTemplates = append(missingInTemplates, key)

		}
		err := fmt.Errorf("there are more template values in the template_values map given than initially specified in the template argument, following values in template are missing: %v", strings.Join(missingInTemplates, ", "))
		respondError(&w, err, 400)
		return
	}

	// checks done, store command in db
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
		switch {
		case err == io.EOF:
			respondError(&w, errors.New("missing body"), 400)
		case err != nil:
			respondError(&w, err, 500)
		}
		return
	}

	plain, err := c.FillTemplate(v)
	if err != nil {
		respondError(&w, err, 400)
		return
	}

	respondString(&w, plain, 200)

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
