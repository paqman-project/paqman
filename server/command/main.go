package command

type Template string

func (t *Template) fill(templateValue, value string) string {

}

type Command struct {
	Description    string                          `bson:"description" json:"description"`
	Template       Template                        `bson:"template" json:"template"`
	Name           string                          `bson:"name" json:"name"`
	TemplateValues map[string]CommandTemplateValue `bson:"template_values" json:"template_values"`
	RequiresRoot   bool                            `bson:"requires_root" json:"requires_root"`
}

type CommandTemplateValue struct {
	Type        string `bson:"type" json:"type"`
	Description string `bson:"description,omitempty" json:"description,omitempty"`
	Value       string `bson:"value,omitempty" json:"value,omitempty"`
	Optional    bool   `bson:"optional,omitempty" json:"optional,omitempty"`
	Default     string `bson:"default,omitempty" json:"default,omitempty"`
	ParamId     int    `bson:"param_id,omitempty" json:"param_id,omitempty"` //foreign key in MongoDB research!
}

func New() *Command {
	return &Command{
		//TemplateValues: make(map[string]CommandTemplateValue),
	}
}
