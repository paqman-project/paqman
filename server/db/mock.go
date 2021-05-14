package db

var Mocked bool

func MockConnect() {
	Mocked = true
}
