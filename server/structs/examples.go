package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

var (
	ExampleCommandDislocker Command
	ExampleParameterFVEK    Parameter
)

func init() {
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
				Type:    "value",
				Hint:    "Full volume encryption key (fvek). Must be obtained manually and dumped to a file.",
				Default: "fvek.bin",
			},
			"vmk": {
				Type:    "value",
				Hint:    "Volume master key (vmk). Must be obtained manually and dumped to a file.",
				Default: "vmk.bin",
			},
			"mount-path": {
				Type:    "value",
				Hint:    "Where to mount the fuse volume to",
				Default: "/mnt/fuse",
			},
		},
		RequiresRoot: true,
	}
	ExampleCommandDislocker.ID = primitive.NewObjectID()

	ExampleParameterFVEK = Parameter{

		Name:         "Full volume encryption key (fvek)",
		Description:  "Master key for Bitlocker encrypted drives",
		Type:         "string",
		ReturnedFrom: make([]ReturnedFromData, 0),
		UsedIn: []UsedInData{
			{
				CommandID: ExampleCommandDislocker.ID,
				At:        "fvek",
			},
		},
	}
}
