package command

type Parameter struct {
	Name           string                            `json:"name" bson:"name"`
	Description    string                            `json:"description" bson:"description"`
	Template       string                            `json:"template" bson:"template"`
	TemplateValues map[string]ParameterTemplateValue `json:"template_values" bson:"template_values"`
	Primitive      bool                              `json:"primitive" bson:"primitive"`
}

type ParameterTemplateValue struct {
	Type         string         `json:"type" bson:"type"`
	ReturnedFrom []ReturnedFrom `json:"returned_from,omitempty" bson:"returned_from,omitempty"`
}

type ReturnedFrom struct {
	Plain     string `json:"plain,omitempty" bson:"plain,omitempty"`
	CommandID int    `json:"command_id,omitempty" bson:"command_id,omitempty"`
}
