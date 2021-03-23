package command

type Command struct {
	Template
	RequiresRoot bool `json:"requires_root"`
}

func New() *Command {
	return &Command{
		Template: Template{
			TemplateValues: make(map[string]TemplateValue),
		},
	}
}
