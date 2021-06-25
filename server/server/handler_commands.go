package server

import (
	"encoding/json"
	"errors"
	"net/http"
	"paqman-backend/db"
	"paqman-backend/structs"
	"regexp"
	"strings"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// gets all Commands
func getAllCommandsHandler(w http.ResponseWriter, r *http.Request) {

	type smallCommandWithID struct {
		ID                   primitive.ObjectID `bson:"_id" json:"_id"`
		structs.SmallCommand `bson:",inline" json:",inline"`
	}

	var results []smallCommandWithID

	if err := db.Client.ReadMany("commands", bson.M{}, &results); err != nil {
		respondError(&w, err, 500)
		return
	}

	response, err := json.Marshal(results)
	if err != nil {
		respondError(&w, err, 500)
		return
	}
	respondJSON(&w, response, 200)
}

func getCommandsByParameterHandler(w http.ResponseWriter, r *http.Request) {

	// parse request body
	type requestBody struct {
		Have []string `json:"have"`
		Want string   `json:"want"`
	}
	var reqBody requestBody
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		respondError(&w, err, 400)
		return
	}

	// check if either "have" or "want" are provided
	if reqBody.Have == nil && reqBody.Want == "" {
		respondObject(&w, errorResponse{`Both "have" and "want" were not provided`}, 400)
		return
	}

	// recursive response struct
	type commandWithChildren struct {
		CommandID            primitive.ObjectID `json:"command_id"`
		structs.SmallCommand `json:",inline"`
		Children             []*commandWithChildren `json:"_children"`
	}

	/*c := commandWithChildren{
		primitive.NewObjectID(),
		structs.SmallCommand{
			Name:        "Senf",
			Description: "Was geht ab",
		},
		[]*commandWithChildren{
			{
				primitive.NewObjectID(),
				structs.SmallCommand{},
				[]*commandWithChildren{
					{
						primitive.NewObjectID(),
						structs.SmallCommand{
							Name: "Very inner command",
						},
						nil,
					},
				},
			},
		},
	}*/

	// Mongo DB Query for getting previous parameters:
	// db.parameters.find({ "used_in.to_create": "60bfa496d1fa49424407f3b7" }, { "used_in.command_id": true })
	_ = func() {

	}

}

// creates a new Command
func newCommandHandler(w http.ResponseWriter, r *http.Request) {

	var c structs.Command
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		respondError(&w, err, 400)
		return
	}

	// check if "name", "template" and "template_values are provided"
	if c.Name == "" {
		respondObject(&w, errorResponse{`Missing "name" field`}, 400)
		return
	}
	if c.Template == "" {
		respondObject(&w, errorResponse{`"template" field is empty`}, 400)
		return
	}
	if c.TemplateValues == nil {
		respondObject(&w, errorResponse{`"template_values" field is empty`}, 400)
		return
	}

	// copy TemplateValues map for checking if more template values in template_values are given then in template specified
	copyTemplateValue := make(map[string]structs.CommandTemplateValue)
	for k, v := range c.TemplateValues {
		copyTemplateValue[k] = v
	}

	// regex, parses all template values out of a template specified with the syntax %{}
	re := regexp.MustCompile(`\%\{.*?\}`)
	// checks if any template_values are present
	matches := re.FindAllString(string(c.Template), -1)

	// following checks have to be passed before the command will be stored in the database, there are three error cases
	// undefinedTemplates: specified template type does not exist
	// missingFields: more template values under template are given then in template_values map specified
	// wrongTypedTemplates: specified templates have a wrong type
	undefinedTemplates := make([]string, 0)
	missingFields := make(map[string][]string)
	wrongTypedTemplates := make([]string, 0)
	for _, match := range matches {
		match = strings.Trim(match, "%{")
		match = strings.Trim(match, "}")
		if value, ok := c.TemplateValues[match]; ok {
			delete(copyTemplateValue, match)
			missing, err := value.CheckTypeCompleteness()
			if err != nil {
				wrongTypedTemplates = append(wrongTypedTemplates, match)
			} else {
				if len(missing) > 0 {
					missingFields[match] = missing
				}
			}
		} else {
			undefinedTemplates = append(undefinedTemplates, match)
		}
	}

	if len(wrongTypedTemplates) > 0 {
		respondObject(&w, struct {
			Error               string   `json:"error"`
			WrongTypedTemplates []string `json:"wrong_typed_templates"`
		}{
			"found templates with unknown type",
			wrongTypedTemplates,
		}, 400)
		return
	}

	if len(undefinedTemplates) > 0 {
		respondObject(&w, struct {
			Error              string   `json:"error"`
			UndefinedTemplates []string `json:"undefined_templates"`
		}{
			"undefined templates",
			undefinedTemplates,
		}, 400)
		return
	}

	// check if more template values in the template_values map are given then in template specified
	if len(copyTemplateValue) > 0 {
		redundantTemplates := make([]string, 0)
		for key := range copyTemplateValue {
			redundantTemplates = append(redundantTemplates, key)

		}
		respondObject(&w, struct {
			Error              string   `json:"error"`
			RedundantTemplates []string `json:"redundant_template_definitions"`
		}{
			"redundant template definitions found in template_values",
			redundantTemplates,
		}, 400)
		return
	}

	if len(missingFields) > 0 {

		respondObject(&w, struct {
			Error         string              `json:"error"`
			MissingFields map[string][]string `json:"missing_fields"`
		}{
			"fields are missing",
			missingFields,
		}, 400)
		return
	}

	// all checks done, store command in db
	id, err := db.Client.CreateOne("commands", c)
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
		err = db.Client.ReadOne("commands", bson.M{
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

// returns a Command with filled template values
/*func fillCommandHandler(w http.ResponseWriter, r *http.Request) {
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
		err = db.Client.ReadOne("commands", bson.M{
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

}*/
