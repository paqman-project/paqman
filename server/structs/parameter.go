package structs

type Parameter struct {
	Name        string `json:"name" bson:"name"`
	Description string `json:"description" bson:"description"`
	Hint        string `json:"hint" bson:"hint"`
	Type        string `json:"type" bson:"type"`
}
