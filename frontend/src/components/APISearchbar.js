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
    // if there are results available (may be empty)
    const [haveResults, setHaveResults] = useState(false)
    // search results from API
    const [results, setResults] = useState()

    const handleChange = event => {
        let value = event.target.value

        clearTimeout(searchTimer)
        setSearchTimer(null) // this may cause errors!

        setTerm(value)

        // hide results panel, if search term is empty
        if (value === "") {
            setHaveResults(false)
            return
        }

        let timeout = setTimeout(() => {
            // compose query string
            let p = new URLSearchParams()
            if (searchFor) {
                p.set("for", searchFor)
            }
            p.set("term", value)
            // request and set results
            fetch(`/api/search?${p.toString()}`)
                .then(r => r.json())
                .then(r => setResults(r))
                .then(() => setHaveResults(true))
                .catch(e => console.log(e))
        }, 500)
        setSearchTimer(timeout)
    }

    const handleDeleteTerm = () => {
        setTerm("")
        setHaveResults(false)
        clearTimeout(searchTimer)
        setSearchTimer(null)
    }

    const doOverlay = () => {
        try {
            return overlay(results)
        } catch (e) {
            console.error('Error while executing the "overlay" function: ', e)
            return <p className="text-red-500 text-center">ERROR</p>
        }
    }

    return (
        <div className="relative w-full">
            <div>
                <input
                    type="text"
                    value={term}
                    onChange={handleChange}
                    placeholder={`Search for ${searchFor || "everything"}`}
                    className="relative w-full px-4 py-2 border rounded-lg shadow-lg z-20"
                />
                {/* Delete term button */}
                {term && term !== "" && (
                    <button
                        onClick={handleDeleteTerm}
                        className="absolute top-2 right-4 z-30 text-xl text-gray-400 focus:outline-none"
                    >
                        &#215;
                    </button>
                )}
            </div>
            {haveResults && overlay && (
                <div className="absolute w-full z-10">
                    <div className="-mt-4 mx-4 bg-white shadow-md border rounded-b-lg">
                        <div className="mt-4 p-4 max-h-96 overflow-y-auto">
                            {results ? doOverlay() : <p>No results</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
