import React, { useState } from "react"
import APISearchbar from "../../components/APISearchbar"
import ViewHeading from "../../components/ViewHeading"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Draggable from "../../components/Draggable"
import Droppable from "../../components/Droppable"
import Tree from "react-d3-tree"

/**
 * This view is used to search commands by parameters
 */
export default function CommandByParameterView() {
    const [have, setHave] = useState([]) // entrypoints
    const [want, setWant] = useState() // target
    const [results, setResults] = useState() // API results
    const [viewingResults, setViewingResults] = useState(false)

    const submit = event => {
        event.preventDefault()

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
     * Creates a block styled name, description pair (may be a command, parameter or attack). This is used as a
     * makro to create the Cards holding search results, entrypoint parameters and the target parameter.
     * @param {Object} namedObj The object that has name and description field
     * @param {bool} options.withRemoveButton If the button to remove the parameter should be displayed
     * @param {Function} options.removeButtonOnClickCallback If options.withRemoveButton is true, provide a
     * function to define what happens, if the button is clicked. Signature: `function (idToDelete): void`
     */
    const cardStyle = (
        namedObj,
        { withRemoveButton, removeButtonOnClickCallback } = {}
    ) => {
        return (
            <Card
                // set the normal title only, wenn the cards should not be removed
                // set titleOverwrite to add the grid interface for the remove button
                title={withRemoveButton ? undefined : namedObj.name}
                titleOverwrite={
                    withRemoveButton ? (
                        <div className="grid grid-cols-8">
                            <div className="col-span-1"></div>
                            <div className="col-span-6">
                                {namedObj.name}
                            </div>
                            <button
                                className="col-span-1 text-gray-400 focus:outline-none"
                                onClick={
                                    removeButtonOnClickCallback
                                        ? () => {
                                            removeButtonOnClickCallback(
                                                namedObj._id
                                            )
                                        }
                                        : undefined
                                }
                                // when in d3 viewing mode, hide the remove cross
                                hidden={viewingResults === true}
                            >
                                <p>&#215;</p>
                            </button>
                        </div>
                    ) : undefined
                }
                className="mb-4"
                smallPadding
            >
                <div className="flex justify-between items-center px-2">
                    <div className="w-full">
                        {namedObj.description || "No description provided"}
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div>
            <ViewHeading title="Search commands by parameter" />
            <div className="grid grid-cols-5">
                <div className="col-span-3 w-full">
                    {viewingResults && results ? (
                        <div>
                            {results && results.error ? (
                                <p className="text-center text-red-500 mt-10">
                                    Error: {results.error}
                                </p>
                            ) : (
                                <div>
                                    <p className="text-center mb-4">
                                        Possible command path(s)
                                        {!want || want === ""
                                            ? " for your entrypoints"
                                            : " to reach your target"}
                                    </p>
                                    <div className="mx-4 rounded-xl border border-gray-100 shadow-xl h-96">
                                        <Tree
                                            data={results}
                                            orientation="vertical"
                                            // TODO automatic x-translate for centering
                                            translate={{ x: 300, y: 100 }} 
                                        />
                                    </div>
                                </div>
                            )}
                            {/*
                                <pre className="m-4">{JSON.stringify(results, null, 4)}</pre>
                            */}
                        </div>
                    ) : (
                        <div className="w-5/6 mx-auto max-w-5xl">
                            <p className="text-center mb-4">
                                Choose your entrypoint and target parameters
                            </p>
                            <APISearchbar
                                searchFor="parameters"
                                overlay={results => (
                                    <>
                                        {results.map(c => (
                                            <div key={c._id}>
                                                <Draggable itemType="card" itemObject={c} >
                                                    {cardStyle(c)}
                                                </Draggable>
                                            </div>
                                        ))}
                                    </>
                                )}
                            />
                        </div>
                    )}
                </div>
                {/* Main button and dumps for have and want parameters */}
                <div className="col-span-2 w-full">
                    {/* Main button */}
                    <div className="max-w-max mx-auto mb-4">
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
                                onClick={event => {
                                    submit(event)
                                    setViewingResults(true)
                                }}
                            />
                        )}
                    </div>
                    <div className="flex justify-evenly">
                        {/* Dump for have parameters */}
                        <Droppable 
                            acceptItemTypes="card"
                            dropFunc={item => {
                                setHave(old => {
                                    let temp = [...old]
                                    if (
                                        !temp
                                            .map(e => e._id)
                                            .includes(item._id)
                                    ) {
                                        temp.push(item)
                                    }
                                    return temp
                                })
                            }}
                            className="flex-1 p-4 m-2 border-2 rounded-lg border-transparent"
                            canDropClassName="border-paqteal-500"
                        >
                            <h1 className="text-center text-md mb-4">
                                Entrypoints
                            </h1>
                            <div>
                                {have && have.length > 0 ? (
                                    have.map(h => (
                                        <div key={h._id}>
                                            {cardStyle(h, {
                                                withRemoveButton: true,
                                                removeButtonOnClickCallback:
                                                    idToRemove => {
                                                        setHave(old => {
                                                            let temp = [...old]
                                                            let i =
                                                                temp.findIndex(
                                                                    i =>
                                                                        i._id ===
                                                                        idToRemove
                                                                )
                                                            temp.splice(i, 1)
                                                            return temp
                                                        })
                                                    },
                                            })}
                                        </div>
                                    ))
                                ) : (
                                    <Card>
                                        No entrypoints added yet!
                                        Drag the search results here!
                                    </Card>
                                )}
                            </div>
                        </Droppable>
                        {/* Dump for want parameter */}
                        <Droppable 
                            acceptItemTypes="card"
                            dropFunc={item => {
                                setWant(item)
                            }}
                            className="flex-1 p-4 m-2 border-2 rounded-lg border-transparent"
                            canDropClassName="border-paqteal-500"
                        >
                            <h1 className="text-center text-md mb-4">Target</h1>
                            <div>
                                {want ? (
                                    cardStyle(want, {
                                        withRemoveButton: true,
                                        removeButtonOnClickCallback: () => {
                                            setWant() // sets want to undefined (default state)
                                        },
                                    })
                                ) : (
                                    <Card>
                                        No target parameter defined yet!
                                        Drag a search result here!
                                    </Card>
                                )}
                            </div>
                        </Droppable>
                    </div>
                </div>
            </div>
        </div>
    )
}
