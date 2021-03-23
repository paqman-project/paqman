package command

type Parameter struct {
	Name           string                            `bson:"name"`
	Description    string                            `bson:"description"`
	Template       string                            `bson:"template"`
	TemplateValues map[string]ParameterTemplateValue `bson:"template_values"`
	Primitive      bool                              `bson:"primitive"`
	Value          string                            `bson:"value"`
}

type ParameterTemplateValue struct {
	Format       string         `bson:"format,omitempty"`
	ReturnedFrom []ReturnedFrom `bson:"returned_from,omitempty"`
}

type ReturnedFrom struct {
	Plain     string `bson:"plain,omitempty"`
	CommandID int    `bson:"command_id,omitempty"`
}
