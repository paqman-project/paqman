package structs

import (
	"reflect"
	"testing"
)

// TODO add paramter tests as well
func TestFillTemplate(t *testing.T) {

	// struct to group test values and expected values
	type G struct {
		TestValue map[string]interface{}
		Expected  string
	}

	testCases := []G{
		// set only nonvalue-flag "verbosity" to true
		{
			TestValue: map[string]interface{}{
				"verbosity": true,
			},
			Expected: "dislocker -v $(dislocker-find) -- /mnt/fuse",
		},
		// leave values empty (use defaults for everything)
		{
			TestValue: map[string]interface{}{},
			Expected:  "dislocker $(dislocker-find) -- /mnt/fuse",
		},
		// overwrite defaults
		{
			TestValue: map[string]interface{}{
				"bitlocker-partition": "/dev/sdb1",
				"mount-path":          "/mnt/decrypted",
			},
			Expected: "dislocker /dev/sdb1 -- /mnt/decrypted",
		},
	}

	// example command
	c := Command{
		Template: "dislocker %{verbosity} %{bitlocker-partition} -- %{mount-path}",
		TemplateValues: map[string]CommandTemplateValue{
			"verbosity": {
				Type:  "nonvalue-flag",
				Value: "-v",
			},
			"bitlocker-partition": {
				Type:    "value",
				Default: "$(dislocker-find)",
			},
			"mount-path": {
				Type:    "value",
				Default: "/mnt/fuse",
			},
		},
	}

	for _, g := range testCases {

		plain, err := c.FillTemplate(g.TestValue)
		if err != nil {
			t.Errorf("Got error: %s", err.Error())
		}
		if plain != g.Expected {
			t.Errorf("Expected %s, got %s", g.Expected, plain)
		}

	}

}

func TestCheckTypeCompleteness(t *testing.T) {

	type G struct {
		TestValue   CommandTemplateValue
		Expected    []string
		ExpectError bool
	}

	testCases := []G{
		{
			TestValue: CommandTemplateValue{
				Type:        "nonvalue-flag",
				Description: "example description for nonvalue-flag",
				Value:       "-xyz",
			},
			Expected: []string{},
		},
		{
			TestValue: CommandTemplateValue{
				Type:     "parameter",
				Optional: false,
				ParamId:  "123ABC",
			},
			Expected: []string{},
		},
		{
			TestValue: CommandTemplateValue{
				Type:        "value",
				Description: "example description for value",
			},
			Expected: []string{},
		},
		{
			TestValue: CommandTemplateValue{
				Type:        "nonvalue",
				Description: "example description for nonvalue-flag",
				Value:       "-xyz",
			},
			ExpectError: true,
		},
		{
			TestValue: CommandTemplateValue{
				Type:     "parameter",
				Optional: false,
			},
			Expected: []string{"parameter_id"},
		},
		{
			TestValue: CommandTemplateValue{
				Type: "value",
			},
			Expected: []string{"description"},
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
