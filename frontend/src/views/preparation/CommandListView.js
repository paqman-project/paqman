import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ViewHeading from "../../components/ViewHeading"
import Card from "../../components/Card"
import Loading from "../../components/Loading"

/**
 * This view provides a list of all commands for the preparation page
 */
export default function CommandListView() {
    const [data, setData] = useState(null)
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

    const handleChange = (event) => {
        setFiltered(
            data.filter(command => 
                command.name.includes(event.target.value.toLowerCase())
            )
        )
    }

    return (
        <div className="flex-row">
            <ViewHeading title="Command list" />
            <div className="w-2/3 max-w-5xl mx-4 mb-10 mx-auto">
                <input 
                    type="text"
                    onChange={handleChange}
                    placeholder="Search for commands"
                    className="px-4 py-2 w-full border rounded-lg shadow-lg"
                />
            </div>
            <div className="w-5/6 mx-auto flex justify-center items-center flex-wrap">
                {filtered ? (
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
