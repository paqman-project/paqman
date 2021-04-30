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
    
    // get the commandID from route URL
    const { params: { commandID } } = match

    const [ data, setData ] = useState()

    useEffect(() => {
        fetch(`/api/command/${commandID}`)
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => console.log(e))
    }, [ commandID ])

    if (!data) return <Loading />
    if (data.error) return <p>{data.error}</p>

    return (
        <div className="h-full w-full p-4">
            <ViewHeading 
                title={data.name[0].toUpperCase() + data.name.substring(1)}
                subtitle={data.description}
            />
            <div>
                <div className="w-5/6 max-w-5xl mx-auto flex space-x-20 mb-10">
                    <div className="flex-1"> {/* .flex-1 allows the div to grow and shrink to "just fit". As this is a flexbox, Instructions and CommandProperties will have the same size */}
                        <Instructions
                            text={"Unused, until #71 is resolved. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"} // TODO
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
