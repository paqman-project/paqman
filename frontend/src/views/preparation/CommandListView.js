import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ViewHeading from "../../components/ViewHeading"

/**
 * This view provides a list of all commands for the preparation page
 */
export default function CommandListView() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch("/api/commands")
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="flex-row">
            <ViewHeading title="Command list" />
            {data ? (
                data.map(e => (
                    <Link key={e._id} to={`/command/${e._id}`}>
                        <div className="mb-4 mx-8 p-4 border-l-2">
                            <h1 className="capitalize font-raleway font-bold text-lg">
                                {e.name}
                            </h1>
                            <h2 className="font-raleway">{e.description}</h2>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No data</p>
            )}
        </div>
    )
}
