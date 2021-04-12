package command

import (
	"regexp"
	"strings"
)

type Template string

type Command struct {
	Description    string                          `bson:"description" json:"description"`
	Template       Template                        `bson:"template" json:"template"`
	Name           string                          `bson:"name" json:"name"`
	TemplateValues map[string]CommandTemplateValue `bson:"template_values" json:"template_values"`
	RequiresRoot   bool                            `bson:"requires_root" json:"requires_root"`
}

// FillTemplate
//replaces the template values of a command with the specfic user defined values for a complete command
func (c *Command) FillTemplate(values map[string]interface{}) string {
	template := string(c.Template)
	// regex, parses all template values out of a template specified with the syntax %{}
	re := regexp.MustCompile(`\%\{.*?\}`)
	for _, match := range re.FindAllString(template, -1) {
		//removes useless characters before and after a match
		match = strings.Trim(match, "%{")
		match = strings.Trim(match, "}")
		//switch between different TemplateValueTypes
		switch t := c.TemplateValues[match]; t.Type {
		case TemplateValueTypeNonvalueFlag:
			//checks if type assertion was successful
			if v, ok := values[match].(bool); ok {
				if v {
					template = strings.ReplaceAll(template, "%{"+match+"}", t.Value) //if nonvalue-flag is set
				} else {
					template = strings.ReplaceAll(template, "%{"+match+"}", "") // if nonvalue-flag is not set
				}
			} else {
				template = strings.ReplaceAll(template, "%{"+match+"}", "") //default (nonvalue-flag is not set)
			}
		//not implemented yet
		case TemplateValueTypeParameter:
			if v, ok := values[match].(string); ok {
				_ = v
			}

		case TemplateValueTypeValue:
			//checks if type assertion was successful
			if v, ok := values[match].(string); ok {
				template = strings.ReplaceAll(template, "%{"+match+"}", v)
			} else {
				template = strings.ReplaceAll(template, "%{"+match+"}", t.Default) //default
			}
		}
	}
	//regex, removes the wrong whitespacing
	removeSpace := regexp.MustCompile(`\s+`)
	template = removeSpace.ReplaceAllString(template, " ")
	return template
}

type TemplateValueType string

//constant variables
const (
	TemplateValueTypeNonvalueFlag TemplateValueType = "nonvalue-flag"
	TemplateValueTypeParameter    TemplateValueType = "parameter"
	TemplateValueTypeValue        TemplateValueType = "value"
)

type CommandTemplateValue struct {
	Type        TemplateValueType `bson:"type" json:"type"`
	Description string            `bson:"description,omitempty" json:"description,omitempty"`
	Value       string            `bson:"value,omitempty" json:"value,omitempty"`
	Optional    bool              `bson:"optional,omitempty" json:"optional,omitempty"`
	Default     string            `bson:"default,omitempty" json:"default,omitempty"`
	ParamId     int               `bson:"param_id,omitempty" json:"param_id,omitempty"` //foreign key in MongoDB research!
}

func New() *Command {
	return &Command{
		//TemplateValues: make(map[string]CommandTemplateValue),
	}
}
