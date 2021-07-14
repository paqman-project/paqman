import React, { useEffect, useRef, useState } from "react"

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
    const [showingResults, setShowingResults] = useState(false)
    // search results from API
    const [results, setResults] = useState()
    // used to check for clicks outside the div
    const ref = useRef()

    // create the onclick listener on mount to the whole document
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
    }, [])

    const handleOutsideClick = event => {
        // this callback for the global click listener checks if
        // the click target was outside the div referenced by `ref`
        event.preventDefault()
        if (ref.current && !ref.current.contains(event.target)) {
            setShowingResults(false)
        }
    }

    const handleChange = event => {
        let value = event.target.value

        clearTimeout(searchTimer) // stops the previous fetch search timeout if there is one
        setSearchTimer(null) // deletes the fetch search timeout

        setTerm(value)

        // reset reults, if search term is empty
        if (value === "") {
            setShowingResults(false)
            setResults()
            return
        }

        // create a new fetch search timeout with callback
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
                .then(() => setShowingResults(true))
                .catch(e => console.log(e))
        }, 500)
        setSearchTimer(timeout)
    }

    const handleDeleteTerm = event => {
        event.preventDefault()
        // delete the search term and results
        setTerm("")
        setShowingResults(false)
        setResults()
        // reset fetch search timeout
        clearTimeout(searchTimer)
        setSearchTimer(null)
    }

    const doOverlay = () => {
        // tries to execute the overlay function
        try {
            return overlay(results)
        } catch (e) {
            console.error('Error while executing the "overlay" function: ', e)
            return <p className="text-red-500 text-center">ERROR</p>
        }
    }

    return (
        <div className="relative w-full" ref={ref}>
            <div>
                <input
                    type="text"
                    value={term}
                    onChange={handleChange}
                    onClick={() => {
                        // show the results panel after it has been hidden
                        if (results && !showingResults) {
                            setShowingResults(true)
                        }
                    }}
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
            {/* Results panel */}
            {showingResults && overlay && (
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
