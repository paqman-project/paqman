package server

import (
	"net/http"
	"paqman-backend/db"
	"paqman-backend/structs"

	"go.mongodb.org/mongo-driver/bson"
)

func searchHandler(w http.ResponseWriter, r *http.Request) {
	
	forParam := r.URL.Query().Get("for")
	termParam := r.URL.Query().Get("term")

	query := bson.M{
		"$or": []bson.M{
			{"name": bson.M{"$regex": termParam, "$options": "i"}},
			{"description": bson.M{"$regex": termParam, "$options": "i"}},
		},
	}

	if forParam != "" {

		switch forParam {
		case "attacks", "commands", "parameters":
			break
		default:
			respondObject(&w, errorResponse{"\"for\" parameter is not valid, only attack, command and parameter are allowed"}, 400)
			return
		}

		var results []structs.SmallModel

		err := db.Client.ReadMany(forParam, query, &results)
		if err != nil {
			respondError(&w, err, 404)
			return
		}

		respondObject(&w, results, 200)
		return

	} else {

		results := make(map[string][]structs.SmallModel)

		for _, collection := range []string{"attacks", "commands", "parameters"} {

			var tempResults []structs.SmallModel
			err := db.Client.ReadMany(collection, query, &tempResults)
			if err != nil {
				respondError(&w, err, 404)
				return
			}

			results[collection] = tempResults

		}

		respondObject(&w, results, 200)
		return
	}
}
