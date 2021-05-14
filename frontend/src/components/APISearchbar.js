import React, { useEffect, useState } from "react"

/**
 * Uses the /search enpoint to search for commands, parameters or attacks.
 * THIS IS CURRENTLY UNUSED ANY MAY NOT WORK
 * @param props
 * @param props.type Can be one of ("command", "parameter", "attack"). If not set, a global search is performed
 */
export default function APISearchbar({ type }) {
    const [term, setTerm] = useState()

    const handleChange = event => {
        console.log(event.target.value)
    }

    useEffect(() => {
        console.log("used effect")
    }, [term])

    return (
        <div>
            <input
                type="text"
                value={term}
                onChange={handleChange}
                placeholder={`Search for ${type}s`}
            />
        </div>
    )
}
