import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ViewHeading from "../../components/ViewHeading"
import Card from "../../components/Card"
import Loading from "../../components/Loading"

/**
 * This view provides a list of all commands for the preparation page
 */
export default function CommandListView() {
    const [data, setData] = useState()
    const [filtered, setFiltered] = useState()
    // Keep in mind that there is no "search term" state!
    // It is not required as the inputs value is passed
    // directly into handleChange to filter the data state.

    useEffect(() => {
        fetch("/api/commands")
            .then(r => r.json())
            .then(r => {
                setData(r)
                setFiltered(r)
                return r
            })
            .catch(e => console.log(e))
    }, [])

    const handleChange = (event) => {
        // This handler takes the value of the search bar
        // and filters the data state with it. The result 
        // is stored in the filtered state, which is
        // rendered out.
        setFiltered(
            data.filter(command => {
                let term = event.target.value.toLowerCase()
                return command.name.toLowerCase().includes(term) || 
                    command.description.toLowerCase().includes(term)
            })
        )
    }

    return (
        <div className="flex-row">
            <ViewHeading title="Command list" />
            <div className="w-2/3 max-w-5xl mx-4 mb-10 mx-auto">
                {/* Search bar (using client side filtering) */}
                <input 
                    type="text"
                    onChange={handleChange}
                    placeholder="Search for commands"
                    className="px-4 py-2 w-full border rounded-lg shadow-lg"
                />
            </div>
            <div className="w-5/6 mx-auto flex justify-center items-center flex-wrap">
                {filtered ? ( // render out the filtered commands
                    filtered.map(e => (
                        <div className="m-3 max-w-2xl">
                            <Link key={e._id} to={`/command/${e._id}`}>
                                <Card title={e.name}>
                                    <p>{e.description}</p>
                                </Card>
                            </Link>
                        </div>
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    )
}
