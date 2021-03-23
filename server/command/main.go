package command

type Command struct {
	Description    string                          `bson:"description"`
	Template       string                          `bson:"template"`
	Name           string                          `bson:"name"`
	TemplateValues map[string]CommandTemplateValue `bson:"template_values"`
	RequiresRoot   bool                            `bson:"requires_root"`
}

type CommandTemplateValue struct {
	Type        string `bson:"type"`
	Description string `bson:"description"`
	Value       string `bson:"value,omitempty"`
	Optional    bool   `bson:"optional"`
	Default     string `bson:"default,omitempty"`
	ParamId     int    `bson:"param_id,omitempty"` //foreign key in MongoDB research!
}

func New() *Command {
	return &Command{
		TemplateValues: make(map[string]CommandTemplateValue),
	}
}
