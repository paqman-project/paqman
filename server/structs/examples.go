package structs

var (
	ExampleCommandDislocker = Command{
		Name:        "dislocker",
		Description: "Decrypts Bitlocker partitions",
		Template:    "dislocker %{verbosity} %{bitlocker-partition} %{fvek} %{vmk} -- %{mount-path}",
		TemplateValues: map[string]CommandTemplateValue{
			"verbosity": {
				Type:  "nonvalue-flag",
				Hint:  "If the command should print verbose logs to stdout",
				Value: "-v",
			},
			"bitlocker-partition": {
				Type:    "value",
				Hint:    "Bitlocker partition device",
				Default: "$(dislocker-find)",
			},
			"fvek": {
				Type:     "parameter",
				ParamId:  "1234",
				Optional: true,
			},
			"vmk": {
				Type:     "parameter",
				ParamId:  "1235",
				Optional: true,
			},
			"mount-path": {
				Type:    "value",
				Hint:    "Where to mount the fuse volume to",
				Default: "/mnt/fuse",
			},
		},
		RequiresRoot: true,
	}
)
