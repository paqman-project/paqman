package structs

import (
	"fmt"
	"regexp"
	"strings"
)

// Template -
type Template string

// A Command defines a template for a CLI Command and specifies
// the format of the TemplateValues used in the Template.
type Command struct {
	Name           string                          `json:"name" bson:"name"`
	Description    string                          `json:"description" bson:"description"`
	Template       Template                        `json:"template" bson:"template"`
	TemplateValues map[string]CommandTemplateValue `json:"template_values" bson:"template_values"`
	RequiresRoot   bool                            `json:"requires_root" bson:"requires_root"`
}

// FillTemplate replaces the template values of a command
// with the specfic user defined values for a complete command
func (c *Command) FillTemplate(values map[string]interface{}) (string, error) {
	template := string(c.Template)
	// regex, parses all template values out of a template specified with the syntax %{}
	re := regexp.MustCompile(`\%\{.*?\}`)

	// checks if any template_values are present
	matches := re.FindAllString(template, -1)
	if matches == nil {
		return string(c.Template), nil
	}

	for _, match := range matches {
		// removes useless characters before and after a match
		match = strings.Trim(match, "%{")
		match = strings.Trim(match, "}")
		// switch between different TemplateValueTypes
		switch t := c.TemplateValues[match]; t.Type {
		case TemplateValueTypeNonvalueFlag:
			if value, ok := values[match]; ok { // check for value existence in POST body
				if bValue, ok := value.(bool); ok { // check if value is bool
					if bValue {
						template = strings.ReplaceAll(template, "%{"+match+"}", t.Value) // if nonvalue-flag is true
					} else {
						template = strings.ReplaceAll(template, "%{"+match+"}", "") // if nonvalue-flag is false
					}
				} else {
					return "", fmt.Errorf("template value %s is not a boolean", match)
				}
			} else {
				template = strings.ReplaceAll(template, "%{"+match+"}", "") // default (nonvalue-flag is not set)
			}
		case TemplateValueTypeParameter:
			// not implemented yet
			if v, ok := values[match].(string); ok {
				_ = v
			}

		case TemplateValueTypeValue:
			if value, ok := values[match]; ok {
				if sValue, ok := value.(string); ok {
					template = strings.ReplaceAll(template, "%{"+match+"}", sValue)
				} else {
					return "", fmt.Errorf("template value %s is not a string", match)
				}
			} else {
				template = strings.ReplaceAll(template, "%{"+match+"}", t.Default)
			}
			// checks if type assertion was successful
		}
	}
	// regex, removes the wrong whitespacing
	removeSpace := regexp.MustCompile(`\s+`)
	template = removeSpace.ReplaceAllString(template, " ")
	return template, nil
}

// TemplateValueType -
type TemplateValueType string

const (
	// https://git.leon.wtf/paqman/paqman/-/wikis/Database/Command-Template-Value-Types/Nonvalue-flag
	TemplateValueTypeNonvalueFlag TemplateValueType = "nonvalue-flag"
	// https://git.leon.wtf/paqman/paqman/-/wikis/Database/Command-Template-Value-Types/Parameter
	TemplateValueTypeParameter TemplateValueType = "parameter"
	// https://git.leon.wtf/paqman/paqman/-/wikis/Database/Command-Template-Value-Types/Value
	TemplateValueTypeValue TemplateValueType = "value"
)

// A CommandTemplateValue defines the format of a TemplateValue in a Command Template
type CommandTemplateValue struct {
	Type        TemplateValueType `json:"type" bson:"type"`
	Description string            `json:"description,omitempty" bson:"description,omitempty"`
	Value       string            `json:"value,omitempty" bson:"value,omitempty"`
	Optional    bool              `json:"optional,omitempty" bson:"optional,omitempty"`
	Default     string            `json:"default,omitempty" bson:"default,omitempty"`
	ParamId     int               `json:"param_id,omitempty" bson:"param_id,omitempty"` // foreign key in MongoDB research!
}

// maybe useful some day
func New() *Command {
	return &Command{
		//TemplateValues: make(map[string]CommandTemplateValue),
	}
}
