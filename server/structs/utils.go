package structs

import (
	"reflect"

	"errors"
)

type SmallModel struct {
	MongoModel  `json:",inline" bson:",inline"`
	Name        string `json:"name" bson:"name"`
	Description string `json:"description" bson:"description"`
}

func GetFieldTag(v interface{}, fieldName string) (reflect.StructTag, error) {
	field, ok := reflect.TypeOf(v).Elem().FieldByName(fieldName)
	if !ok {
		return "", errors.New("field not found")
	}
	return field.Tag, nil
}

func GetFieldTagKey(v interface{}, fieldName, key string) string {
	tag, err := GetFieldTag(v, fieldName)
	if err != nil {
		return ""
	}
	return tag.Get(key)
}
