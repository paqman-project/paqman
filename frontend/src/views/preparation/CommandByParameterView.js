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
                                            <div className="flex flex-row justify-between items-center">
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
                <div className="col-span-1 w-full">
                    <div className="w-5/6 mx-auto max-w-5xl flex flex-col space-y-10">
                        {/* Dump for have parameters */}
                        <div className="mx-auto">
                            <h1 className="text-center text-md mb-4">Entrypoints</h1>
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
                        <div className="mx-auto">
                            <h1 className="text-center text-md mb-4">Target</h1>
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
            <div className="text-center">
                <div>
                    <Button title="Start searching" important />
                </div>
            </div>
        </div>
    )
}
