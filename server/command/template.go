package command

type Template struct {
	Name           string                   `json:"name"`
	Description    string                   `json:"description"`
	Template       string                   `json:"template"`
	TemplateValues map[string]TemplateValue `json:"template_values"`
}

type TemplateValue struct {
	Type         string `json:"type"`
	Description  string `json:"description"`
	Value        string `json:"value"`
	Optional     bool   `json:"optional"`
	Default      string `json:"default"`
	ParamId      int    `json:"param_id"` //foreign key in MongoDB research!
	Format       string `json:"format"`
	ReturnedFrom map[string]struct {
		Plain     string `json:"plain"`
		CommandID int    `json:"command_id"`
	} `json:"returned_from"`
}

func (t *Template) SomeFunc() {

}
