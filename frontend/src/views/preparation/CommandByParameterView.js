import React, { useState } from "react"
import APISearchbar from "../../components/APISearchbar"
import ViewHeading from "../../components/ViewHeading"
import Button from "../../components/Button"

/**
 * This view is used to search commands by parameters
 */
export default function CommandByParameterView() {

    const [have, setHave] = useState([])
    const [want, setWant] = useState()
    const [results, setResults] = useState()

    const submit = () => {

        let body = {}
        if (have && have.length > 0) {
            body.have = have.map(h => h._id)
        }
        if (want) {
            body.want = want._id
        }

        fetch(`/api/commands/by-parameter`, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then((r) => r.json())
            .then((r) => setResults(r))
            .catch((e) => console.error(e))

    }

    return (
        <div className="h-full">
            <ViewHeading title="Search commands by parameter" />
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-2 w-full">
                    <div className="w-5/6 mx-auto max-w-5xl">
                        <APISearchbar 
                            searchFor="parameters" 
                            overlay={(results) => (
                                <>
                                    {results.map(c => (
                                        <div className="border m-2 p-2 rounded-md" key={c._id}>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-lg bg-gray-100 rounded px-2 py-1">
                                                        {c.name}
                                                    </p>
                                                    <p className="p-2">
                                                        {c.description}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row">
                                                    <div className="m-2">
                                                        <Button 
                                                            title="Add to entrypoints" 
                                                            onClick={() => {
                                                                setHave(old => {
                                                                    let temp = [...old]
                                                                    if (!temp.includes(c)) {
                                                                        temp.push(c)
                                                                    }
                                                                    return temp
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="m-2 mr-4">
                                                        <Button 
                                                            title="Set target" 
                                                            onClick={() => {
                                                                setWant(c)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        />
                    </div>
                </div>
                {/* Dumps for have and want parameters */}
                <div className="col-span-1 w-full border-l">
                    <div className="flex justify-evenly">
                        {/* Dump for have parameters */}
                        <div className="flex-1 p-4">
                            <h1 className="text-center text-md font-bold mb-4">Entrypoints</h1>
                            <div>
                                {(have && have.length > 0)
                                    ? (
                                        have.map(h => (
                                            <div className="border m-2 p-2 rounded-md">
                                                <div>
                                                    <p className="text-lg bg-gray-100 rounded px-2 py-1">
                                                        {h.name}
                                                    </p>
                                                    <p className="p-2">
                                                        {h.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="border m-2 p-2 rounded-md">
                                            <p className="p-2">
                                                No entrypoints added yet!
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {/* Dump for want parameter */}
                        <div className="flex-1 p-4">
                            <h1 className="text-center text-md font-bold mb-4">Target</h1>
                            <div>
                                {want
                                    ? (
                                        <div className="border m-2 p-2 rounded-md">
                                            <div>
                                                <p className="text-lg bg-gray-100 rounded px-2 py-1">
                                                    {want.name}
                                                </p>
                                                <p className="p-2">
                                                    {want.description}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border m-2 p-2 rounded-md">
                                            <p className="p-2">
                                                No taget parameter defined yet!
                                            </p>
                                        </div>
                                    )

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Submit button */}
            <div className="w-full border-t pt-10 text-center">
                <div>
                    <Button 
                        title="Start searching" 
                        important
                        onClick={() => submit()}
                    />
                </div>
                {/* Results */}
                <div className="mx-auto text-center mt-6">
                    {results && (
                        <p>{JSON.stringify(results)}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
