import React from "react"
import APISearchbar from "../../components/APISearchbar"
import ViewHeading from "../../components/ViewHeading"
import Button from "../../components/Button"

/**
 * This view is used to search commands by parameters
 */
export default function CommandByParameterView() {
    return (
        <div>
            <ViewHeading title="Search commands by parameter" />
            <div>
                <APISearchbar 
                    searchFor="commands" 
                    overlay={(results) => (
                        <div>
                            {results.commands && (
                                <>
                                    <div>
                                        <h1 className="font-bold">Commands</h1>
                                        {results.commands?.map(c => 
                                            <div className="border m-2 p-2 rounded-md">
                                                <div className="flex flex-row justify-between items-center">
                                                    <div>
                                                        <p>
                                                            <span className="text-lg font-mono bg-gray-100 rounded px-2 py-1">
                                                                {c.name}
                                                            </span> {c.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row space-x-5">
                                                        <div>
                                                            <Button title="Add to entrypoints" />
                                                        </div>
                                                        <div>
                                                            <Button title="Set target" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            {results.attacks && (
                                <>
                                    <hr className="mt-4 mb-2" />
                                    <div>
                                        <h1 className="font-bold">Attacks</h1>
                                        {results.attacks.map(c => (
                                            <div className="border m-2 p-2">
                                                <h2>{c.name}</h2>
                                                <p>{c.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            {results.parameters && (
                                <>
                                    <hr className="mt-4 mb-2" />
                                    <div>
                                        <h1 className="font-bold">Parameters</h1>
                                            {results.parameters?.map(c => (
                                                <div className="border m-2 p-2">
                                                    <h2>{c.name}</h2>
                                                    <p>{c.description}</p>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    )
}
