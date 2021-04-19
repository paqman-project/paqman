import React, { useEffect, useState } from "react"
import Template from "../components/Template"
import ViewHeading from "../components/ViewHeading"

/**
 * This page is used to display more information about a
 * command. It shows it's paramters and how they are retreived.
 */
export default function CommandViewerPage({ match }) {
    
    const temp = match.url.split("/")
    const commandId = temp[temp.length - 1]

    const [ data, setData ] = useState()

    useEffect(() => {
        fetch(`/api/command/${commandId}`)
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="text-center h-full">
            { !data ?
               <p>Loading</p>
               :
               data.error ?
                    <p>{data.error}</p>
                    :
                    <>
                        <ViewHeading title={data.name[0].toUpperCase() + data.name.substring(1)} />
                        <Template
                            template={data.template}
                            templateValues={data.template_values}
                        />
                    </>
            }
        </div>
    )
}
