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
                <div className="col-span-2">
                    <div className="w-5/6 max-w-5xl mb-10 mx-auto">
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
                                                                    if (!temp.includes(c.name)) {
                                                                        temp.push(c.name)
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
                                                                console.log("Clicked senf")
                                                                setWant(c.name)
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
                <div className="col-span-1">
                    <div className="w-5/6 flex flex-col space-y-10">
                        <div>
                            <h1 className="text-center text-md mb-4">Entrypoints</h1>
                            <div className="h-80 bg-white border rounded-xl shadow-lg">
                                <p>{JSON.stringify(have)}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-center text-md mb-4">Target</h1>
                            <div className="h-32 w-2/3 mx-auto bg-white border rounded-xl shadow-lg">
                                <p>{JSON.stringify(want)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
