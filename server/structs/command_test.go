package structs

import (
	"reflect"
	"testing"
)

func TestCheckTypeCompleteness(t *testing.T) {

	type G struct {
		TestValue   CommandTemplateValue
		Expected    []string
		ExpectError bool
	}

	testCases := []G{
		// nonvalue-flag
		{
			TestValue: CommandTemplateValue{
				Type:  "nonvalue-flag",
				Hint:  "example description for nonvalue-flag",
				Value: "-xyz",
			},
			Expected: []string{},
		},
		{
			TestValue: CommandTemplateValue{
				Type: "nonvalue-flag",
			},
			Expected: []string{"value"},
		},
		// value-flag
		{
			TestValue: CommandTemplateValue{
				Type:  "value-flag",
				Usage: "-o %", // TODO check if it contains %
			},
			Expected: []string{},
		},
		{
			TestValue: CommandTemplateValue{
				Type: "value-flag",
			},
			Expected: []string{"usage"},
		},
		// value
		{
			TestValue: CommandTemplateValue{
				Type: "value",
			},
			Expected: []string{},
		},
		{
			TestValue: CommandTemplateValue{
				Type: "value",
				Hint: "example description for value",
			},
			Expected: []string{},
		},
		// nonexisting type
		{
			TestValue: CommandTemplateValue{
				Type:  "nonvalue",
				Hint:  "example description for nonvalue-flag",
				Value: "-xyz",
			},
			ExpectError: true, // type "nonvalue" not existent
		},
	}

	for _, g := range testCases {
		r, err := g.TestValue.CheckTypeCompleteness()
		if err != nil {
			if !g.ExpectError {
				t.Errorf("Got error: %s", err.Error())
			}
			continue
		} else if g.ExpectError {
			t.Error("Expected error, but got none")
		}

		if !reflect.DeepEqual(r, g.Expected) {
			t.Errorf("Expected %s, got %s", g.Expected, r)
		}
	}
}
