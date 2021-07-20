package structs

import (
	"fmt"
)

// Template -
type Template string

// A Command defines a template for a CLI Command and specifies
// the format of the TemplateValues used in the Template.
type Command struct {
	MongoModel       `json:",inline" bson:",inline"`
	Name             string                          `json:"name" bson:"name"`
	Description      string                          `json:"description" bson:"description"`
	Instructions     string                          `json:"instructions" bson:"instructions"`
	Template         Template                        `json:"template" bson:"template"`
	TemplateValues   map[string]CommandTemplateValue `json:"template_values" bson:"template_values"`
	RequiresRoot     bool                            `json:"requires_root" bson:"requires_root"`
	OnlineManpageRef string                          `json:"online_manpage" bson:"online_manpage"`
}

type SmallCommand SmallModel

// TemplateValueType -
type TemplateValueType string

const (
	// https://git.leon.wtf/paqman/paqman/-/wikis/Database/Command-Template-Value-Types/Nonvalue-flag
	TemplateValueTypeNonvalueFlag TemplateValueType = "nonvalue-flag"
	// https://git.leon.wtf/paqman/paqman/-/wikis/Database/Command-Template-Value-Types/Value-flag
	TemplateValueTypeValueFlag TemplateValueType = "value-flag"
	// https://git.leon.wtf/paqman/paqman/-/wikis/Database/Command-Template-Value-Types/Value
	TemplateValueTypeValue TemplateValueType = "value"
	// not specified yet, see #65
	TemplateValueTypeSelection TemplateValueType = "selection"
)

// A CommandTemplateValue defines the format of a TemplateValue in a Command Template
type CommandTemplateValue struct {
	Type         TemplateValueType `json:"type" bson:"type"`
	Hint         string            `json:"hint,omitempty" bson:"hint,omitempty"`
	Value        string            `json:"value,omitempty" bson:"value,omitempty"`
	Default      string            `json:"default,omitempty" bson:"default,omitempty"`
	DefaultState bool              `json:"default_state,omitempty" bson:"default_state,omitempty"`
	Usage        string            `json:"usage,omitempty" bson:"usage,omitempty"`
}

// CheckTypeCompleteness checks for one template value type,
// if all required values for this particularly type are assigned
func (c *CommandTemplateValue) CheckTypeCompleteness() ([]string, error) {
	missingFields := make([]string, 0)
	switch c.Type {
	case TemplateValueTypeNonvalueFlag:
		if c.Value == "" {
			missingFields = append(missingFields, "value")
		}
	case TemplateValueTypeValueFlag:
		if c.Usage == "" {
			missingFields = append(missingFields, "usage")
		}
	case TemplateValueTypeValue:
		// everything is optional
	default:
		return nil, fmt.Errorf("%s not found", string(c.Type))
	}

	return missingFields, nil
}
