package structs

type Parameter struct {
	Name         string                      `json:"name" bson:"name"`
	Description  string                      `json:"description" bson:"description"`
	Type         string                      `json:"type" bson:"type"`
	ReturnedFrom map[string]ReturnedFromData `json:"returned_from" bson:"returned_from"`
	UsedIn       map[string]UsedInData       `json:"used_in" bson:"used_in"`
}

type ReturnedFromData struct {
	At string `json:"at"`
}

type UsedInData struct {
	At         string                 `json:"at"`
	WithValues map[string]interface{} `json:"with_values" bson:"with_values"` // interface{} can be string or bool
	ToCreate   string                 `json:"to_create" bson:"to_create"`
}
