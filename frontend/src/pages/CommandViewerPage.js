import React, { useEffect, useState } from "react"
import TemplateForm from "../components/TemplateForm"
import ViewHeading from "../components/ViewHeading"
import Loading from "../components/Loading"

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
                <TemplateForm
                    commandID={commandID}
                    template={data.template}
                    templateValues={data.template_values}
                />
            </div>
        )
    }

    return (
        <div className="h-full w-full flex justify-center p-4">
            { inner() }
        </div>
    )
}
