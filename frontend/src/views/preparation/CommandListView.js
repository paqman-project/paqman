import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ViewHeading from "../../components/ViewHeading"
import Card from "../../components/Card"
import Loading from "../../components/Loading"

/**
 * This view provides a list of all commands for the preparation page
 */
export default function CommandListView() {
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState()
    const [filtered, setFiltered] = useState()

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

    const handleChange = event => {
        let term = event.target.value
        setSearchTerm(term)
        setFiltered(
            data.filter(command => {
                return (
                    command.name.toLowerCase().includes(term.toLowerCase()) ||
                    command.description.toLowerCase().includes(term.toLowerCase())
                )
            })
        )
    }

    return (
        <div className="flex-row">
            <ViewHeading title="Command list" />
            <div className="w-2/3 max-w-5xl mx-4 mb-10 mx-auto">
                {/* Search bar (using client side filtering) */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search for commands"
                        className="px-4 py-2 w-full border rounded-lg shadow-lg"
                    />
                    {/* Delete term button */}
                    {(searchTerm && searchTerm !== "") && (
                        <button 
                            onClick={(event) => {
                                setSearchTerm("")
                                handleChange(event)
                            }}
                            className="absolute top-2 right-4 z-30 text-xl text-gray-400 focus:outline-none"
                        >
                            &#215;
                        </button>
                    )}
                </div>
            </div>
            <div className="w-5/6 mx-auto flex justify-center items-center flex-wrap">
                {filtered ? ( // render out the filtered commands
                    filtered.map(e => (
                        <div key={e._id} className="m-3 max-w-2xl">
                            <Link to={`/command/${e._id}`}>
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
