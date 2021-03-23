package command

type Parameter struct {
	Template
	Primitive bool   `json:"primitive"`
	Value     string `json:"value"`
}
