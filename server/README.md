# Testing


## Run tests

`go test -v ./...`


## Mux endpoint testing example

This tests the `GET /api/ping` route. Status code and reponse body is tested.

```go
package server

import (
        "net/http"
        "net/http/httptest"
        "testing"
)

func TestPingHandler(t *testing.T) {

        // request that will be tested
        req, err := http.NewRequest("GET", "/api/ping", nil)
        if err != nil {
                t.Fatal(err)
        }

        // test server that uses the handler that will be tested
        rec := httptest.NewRecorder()
        handler := http.HandlerFunc(pingHandler) // <-- handler
        handler.ServeHTTP(rec, req)

        // check status code
        expectedSC := 200 // <-- expected status code
        if sc := rec.Code; sc != expectedSC {
                t.Errorf("handler returned wrong status code: got %v want %v", sc, expectedSC)
        }

        // check body
        expectedBody := `{"response": "pong"}` // <-- expected body
        if body := rec.Body.String(); body != expectedBody {
                t.Errorf("handler returned unexpected body: got %v want %v", body, expectedBody)
        }

}
```