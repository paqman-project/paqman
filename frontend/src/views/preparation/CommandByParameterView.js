import React, { useState } from "react"
import APISearchbar from "../../components/APISearchbar"
import ViewHeading from "../../components/ViewHeading"
import Button from "../../components/Button"
import Card from "../../components/Card"

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
            body: JSON.stringify(body),
        })
            .then(r => r.json())
            .then(r => setResults(r))
            .catch(e => console.error(e))
    }

    /**
     * Creates a block styled name, description pair (may be a command, parameter or attack)
     * @param {Object} namedObj The object that has name and description field
     * @param {bool} withButtons If the buttons to add as entrypoint/target should be displayed
     * @returns
     */
    const blockStyle = (namedObj, withButtons = false) => {
        return (
            <Card title={namedObj.name} className="m-4">
                <div className="flex justify-between items-center px-2">
                    <div>{namedObj.description}</div>
                    {withButtons && (
                        <div className="flex flex-row space-x-5 my-1">
                            <div>
                                <Button
                                    title="Add to entrypoints"
                                    onClick={() => {
                                        setHave(old => {
                                            let temp = [...old]
                                            if (!temp.includes(namedObj)) {
                                                temp.push(namedObj)
                                            }
                                            return temp
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    title="Set target"
                                    onClick={() => {
                                        setWant(namedObj)
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Card>
            /*<div className="m-2 p-2 border rounded-md">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg bg-gray-100 rounded px-2 py-1">
                            {namedObj.name}
                        </p>
                        <p className="p-2">
                            {namedObj.description}
                        </p>
                    </div>
                    {withButtons && (
                        <div className="flex flex-row">
                            <div className="m-2">
                                <Button 
                                    title="Add to entrypoints" 
                                    onClick={() => {
                                        setHave(old => {
                                            let temp = [...old]
                                            if (!temp.includes(namedObj)) {
                                                temp.push(namedObj)
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
                                        setWant(namedObj)
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>*/
        )
    }

    return (
        <div className="h-full">
            <ViewHeading title="Search commands by parameter" />
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-2 w-full">
                    <div className="w-5/6 mx-auto max-w-5xl">
                        <APISearchbar
                            searchFor="parameters"
                            overlay={results => (
                                <>
                                    {results.map(c => (
                                        <div key={c._id}>
                                            {blockStyle(c, true)}
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
                            <h1 className="text-center text-md font-bold mb-4">
                                Entrypoints
                            </h1>
                            <div>
                                {have && have.length > 0 ? (
                                    have.map(h => (
                                        <div key={h._id}>{blockStyle(h)}</div>
                                    ))
                                ) : (
                                    <div className="border m-2 p-2 rounded-md">
                                        <p className="p-2">
                                            No entrypoints added yet!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Dump for want parameter */}
                        <div className="flex-1 p-4">
                            <h1 className="text-center text-md font-bold mb-4">
                                Target
                            </h1>
                            <div>
                                {want ? (
                                    blockStyle(want)
                                ) : (
                                    <div className="border m-2 p-2 rounded-md">
                                        <p className="p-2">
                                            No taget parameter defined yet!
                                        </p>
                                    </div>
                                )}
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
                    {results && <p>{JSON.stringify(results)}</p>}
                </div>
            </div>
        </div>
    )
}
