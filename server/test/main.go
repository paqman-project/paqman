package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	v := "test %{verbose} %{test}"
	re := regexp.MustCompile(`\%\{.*?\}`)
	out := make([]string, 0)
	for _, t := range re.FindAllString(v, -1) {
		t = strings.Trim(t, "%{")
		t = strings.Trim(t, "}")
		out = append(out, t)
	}
	fmt.Println(out)

}
