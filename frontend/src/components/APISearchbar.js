import React, { useState } from "react"

/**
 * Uses the /search enpoint to search for commands, parameters or attacks.
 * THIS IS CURRENTLY UNUSED AND DOES NOT WORK
 * @param props
 * @param props.searchFor Can be one of ("command", "parameter", "attack"). If not set, a global search is performed
 * @param props.overlay A function with signature `function (results): React.Component`. It receives the results
 * from the database and is used to provide customized layout of the result representation 
 */
export default function APISearchbar({ searchFor, overlay }) {
    // search term that the user searches for
    const [term, setTerm] = useState("")
    // timeout that triggers the fetch /api/search call, when the user stops typing 
    const [searchTimer, setSearchTimer] = useState(null)
    // seach results (default null, because should be nullable)
    const [results, setResults] = useState(null)

    // TODO check searchFor?

    const handleChange = event => {

        let value = event.target.value

        clearTimeout(searchTimer)
        setSearchTimer(null) // this may cause errors!
        
        setTerm(value)
        
        let timeout = setTimeout(() => {
            // hide results panel, if search term is empty
            if (value === "") {
                setResults(null)
                return
            }
            // compose query string
            let p = new URLSearchParams()
            p.set("term", value)
            if (searchFor) {
                p.set("searchFor", searchFor)
            }
            // request and set results
            ////// TEMP START //////
            console.log(`Fetching /api/search?${p.toString()}`)
            setResults({
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
            })
            ////// TEMP END //////
            /*fetch(`/api/search?${p.toString()}`)
                .then((r) => r.json())
                .then((r) => setResults(r))
                .catch((e) => console.log(e))*/
        }, 500)
        setSearchTimer(timeout)

    }

    const doOverlay = () => {
        try {
            return overlay(results)
        } catch (e) {
            console.error("Error while executing the \"overlay\" function: ", e)
            return <p className="text-red-500 text-center">ERROR</p>
        }
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={term}
                onChange={handleChange}
                placeholder={`Search for ${searchFor || "everything"}`}
                className="relative w-full px-4 py-2 border rounded-lg shadow-lg z-20"
            />
            {results && (
                <div className="absolute w-full z-10">
                    <div className="-mt-4 mx-4 bg-white shadow-md border rounded-b-lg">
                        <div className="mt-4 p-4">
                            {
                                overlay
                                    ? doOverlay()
                                    : <p>No overlay function</p>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
