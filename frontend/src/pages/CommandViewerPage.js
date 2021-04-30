import React, { useEffect, useState } from "react"
import CommandTemplateForm from "../components/CommandTemplateForm"
import ViewHeading from "../components/ViewHeading"
import Loading from "../components/Loading"
import CommandProperties from "../components/CommandProperties"
import Instructions from "../components/Instructions"

/**
 * This page is used to display more information about a
 * command. It shows it's paramters and how they are retreived.
 */
export default function CommandViewerPage({ match }) {
    
    const { params: { commandID } } = match

    const [ data, setData ] = useState()

    useEffect(() => {
        fetch(`/api/command/${commandID}`)
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => console.log(e))
    }, [ commandID ]) // TODO don't know if this is correct

    const inner = () => {
        if (!data) return <Loading />
        if (data.error) return <p>{data.error}</p>
        return (
            <div>
                <ViewHeading 
                    title={data.name[0].toUpperCase() + data.name.substring(1)}
                    subtitle={data.description}
                />
                <div className="max-w-min"> {/* Do not allow the instruction component to grow endlessly */}
                    <div className="w-5/6 mx-auto flex space-x-20 mb-10">
                        <div className="flex-1"> {/* .flex-1 allows the div to grow and shrink to "just fit". As this is a flexbox, Instructions and CommandProperties will have the same size */}
                            <Instructions
                                text={"Unused, until #71 is resolved"}
                            />
                        </div>
                        <div className="flex-1">
                            <CommandProperties 
                                properties={data}
                            />
                        </div>
                    </div>
                    <CommandTemplateForm
                        template={data.template}
                        templateValues={data.template_values}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full flex justify-center p-4">
            { inner() }
        </div>
    )
}
