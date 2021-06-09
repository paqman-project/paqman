package structs

import (
	"reflect"

	"errors"
)

func GetFieldTag(v interface{}, fieldName string) (reflect.StructTag, error) {
	field, ok := reflect.TypeOf(v).Elem().FieldByName(fieldName)
	if !ok {
		return "", errors.New("Field not found")
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
