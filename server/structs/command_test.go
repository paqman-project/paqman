package structs

import "testing"

func TestFillTemplate(t *testing.T) {

	type G struct {
		TestValue map[string]interface{}
		Expected  string
	}

	testCases := []G{
		{
			TestValue: map[string]interface{}{
				"verbosity": true,
			},
			Expected: "dislocker -v $(dislocker-find) -- /mnt/fuse",
		},
		{
			TestValue: map[string]interface{}{},
			Expected:  "dislocker $(dislocker-find) -- /mnt/fuse",
		},
		{
			TestValue: map[string]interface{}{
				"bitlocker-partition": "/dev/sdb1",
				"mount-path":          "/mnt/decrypted",
			},
			Expected: "dislocker /dev/sdb1 -- /mnt/decrypted",
		},
	}

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
			t.Error(err)
		}
		if plain != g.Expected {
			t.Errorf("Expected %s, got %s", g.Expected, plain)
		}

	}

}
