import React, { useState } from "react"
import APISearchbar from "../../components/APISearchbar"
import ViewHeading from "../../components/ViewHeading"
import Button from "../../components/Button"
import Card from "../../components/Card"

/**
 * This view is used to search commands by parameters
 */
export default function CommandByParameterView() {
    const [have, setHave] = useState([]) // entrypoints
    const [want, setWant] = useState() // target
    const [results, setResults] = useState() // API results
    const [viewingResults, setViewingResults] = useState(false)

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
     */
    const blockStyle = (namedObj, withButtons = false) => {
        return (
            <Card title={namedObj.name} className="mb-4" smallPadding>
                <div className="flex justify-between items-center px-2">
                    <div className="w-full">{namedObj.description}</div>
                    {withButtons && (
                        <div className="ml-4 flex flex-row space-x-4">
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
        )
    }

    return (
        <div className="h-full">
            <ViewHeading title="Search commands by parameter" />
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-2 w-full">
                    {viewingResults && results ? (
                        <div className="mx-6 mt-6 border p-4">
                            {results && <pre>{JSON.stringify(results, null, 4)}</pre>}
                        </div>
                    ) : (
                        <div className="w-5/6 mx-auto max-w-5xl">
                            <p className="text-center mb-4">Choose your entrypoint and target parameters</p>
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
                    )}
                </div>
                {/* Dumps for have and want parameters */}
                <div className="col-span-1 w-full">
                    <div className="w-2/3 max-w-max mx-auto mb-4">
                        {viewingResults ? (
                            <Button
                                title="Edit entrypoints or target parameters"
                                //important
                                fullWidth
                                onClick={() => {
                                    setViewingResults(false)
                                }}
                            />
                        ) : (
                            <Button
                                title="Start searching for commands"
                                important
                                fullWidth
                                onClick={() => {
                                    submit()
                                    setViewingResults(true)
                                }}
                            />
                        )}
                    </div>
                    <div className="flex justify-evenly">
                        {/* Dump for have parameters */}
                        <div className="flex-1 p-4">
                            <h1 className="text-center text-md mb-4">
                                Entrypoints
                            </h1>
                            <div>
                                {have && have.length > 0 ? (
                                    have.map(h => (
                                        <div key={h._id}>{blockStyle(h)}</div>
                                    ))
                                ) : (
                                    <Card>
                                        No entrypoints added yet!
                                    </Card>
                                )}
                            </div>
                        </div>
                        {/* Dump for want parameter */}
                        <div className="flex-1 p-4">
                            <h1 className="text-center text-md mb-4">
                                Target
                            </h1>
                            <div>
                                {want ? (
                                    blockStyle(want)
                                ) : (
                                    <Card>
                                        No target parameter defined yet!
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
