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

func (c *Command) FillTemplate(values map[string]interface{}) string {
	template := string(c.Template)
	re := regexp.MustCompile(`\%\{.*?\}`)
	for _, match := range re.FindAllString(template, -1) {
		match = strings.Trim(match, "%{")
		match = strings.Trim(match, "}")
		switch t := c.TemplateValues[match]; t.Type {
		case TemplateValueTypeNonvalueFlag:
			if v, ok := values[match].(bool); ok {
				if v {
					template = strings.ReplaceAll(template, "%{"+match+"}", t.Value)
				} else {
					template = strings.ReplaceAll(template, "%{"+match+"}", "")
				}
			} else {
				template = strings.ReplaceAll(template, "%{"+match+"}", "")
			}

		case TemplateValueTypeParameter:
			if v, ok := values[match].(string); ok {
				_ = v
			}

		case TemplateValueTypeValue:
			if v, ok := values[match].(string); ok {
				template = strings.ReplaceAll(template, "%{"+match+"}", v)
			} else {
				template = strings.ReplaceAll(template, "%{"+match+"}", t.Default)
			}
		}
	}

	removeSpace := regexp.MustCompile(`\s+`)
	template = removeSpace.ReplaceAllString(template, " ")
	return template
}

type TemplateValueType string

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
