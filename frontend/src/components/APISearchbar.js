import React, { useEffect, useState } from "react"
import NotImplemented from "./NotImplemented"

/**
 * Uses the /search enpoint to search for commands, parameters or attacks.
 * THIS IS CURRENTLY UNUSED AND DOES NOT WORK
 * @param props
 * @param props.searchFor Can be one of ("command", "parameter", "attack"). If not set, a global search is performed
 * @param props.overlay A function with signature `function (results): React.Component`. It receives the results function
 * from the backend
 */
export default function APISearchbar({ searchFor, overlay }) {
    // search term that the user searches for
    const [term, setTerm] = useState("")
    // timeout that triggers the fetch /api/search call, when the user stops typing 
    const [searchTimer, setSearchTimer] = useState(null)
    // seach results
    const [results, setResults] = useState()

    // TODO check searchFor?

    const handleChange = event => {

        clearTimeout(searchTimer)
        setSearchTimer(null) // this may cause errors!
        
        setTerm(event.target.value)
        
        let t = setTimeout(() => {
            if (term === "") return
            // compose query string
            let p = new URLSearchParams()
            p.set("term", term)
            if (searchFor) {
                p.set("searchFor", searchFor)
            }
            // request and set results
            ////// TEMP START //////
            console.log(`Fetching /api/search?${p.toString()}`)
            setResults(JSON.stringify({
                "commands": [
                    {
                        "_id": "1337",
                        "name": "dislocker",
                        "description": "does cool dislocker stuff"
                    },
                    {
                        "_id": "1338",
                        "name": "ls",
                        "description": "Lists files in a directory"
                    }
                ],
                "parameters": [
                    {
                        "_id": "looool",
                        "name": "geiler shit",
                        "description": "nicht so geiler shit"
                    }
                ],
                "attacks": null
            }))
            ////// TEMP END //////
            /*fetch(`/api/search?${p.toString()}`)
                .then((r) => r.json())
                .then((r) => setResults(r))
                .catch((e) => console.log(e))*/
        }, 1000)
        setSearchTimer(t)

    }

    return (
        <div>
            <input
                type="text"
                value={term}
                onChange={handleChange}
                placeholder={`Search for ${searchFor}`}
                className="px-4 py-2 border rounded-lg shadow-lg"
            />
            {results && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 rounded">
                    {
                        overlay
                            ? overlay(results)
                            : <p>No overlay function</p>
                    }
                </div>
            )}
        </div>
    )
}
