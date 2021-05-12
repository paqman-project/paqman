import React, { useEffect, useState } from "react"
import CommandTemplateForm from "../components/CommandTemplateForm"
import ViewHeading from "../components/ViewHeading"
import Loading from "../components/Loading"
import Card from "../components/Card"

/**
 * This page is used to display more information about a
 * command. It shows it's paramters and how they are retreived.
 */
export default function CommandViewerPage({ match }) {
    // get the commandID from route URL
    const {
        params: { commandID },
    } = match

    const [data, setData] = useState()

    useEffect(() => {
        fetch(`/api/command/${commandID}`)
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => console.log(e))
    }, [commandID])

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
                    <div className="flex-1">
                        <Card title="Instructions" fullHight>
                            <p>{data.instructions || "No instructions available"}</p>
                        </Card>
                    </div>
                    <div className="flex-1">
                        <Card title="Command properties" fullHight>
                            <p>
                                Requires root?<span> </span>
                                {data.requires_root ? (
                                    <span className="text-green-500 text-xl">
                                        &#10003;
                                    </span>
                                ) : (
                                    <span className="text-red-500 text-xl">
                                        &#10005;
                                    </span>
                                )}
                            </p>
                        </Card>
                    </div>
                </div>
                <CommandTemplateForm
                    template={data.template}
                    templateValues={data.template_values}
                    withCopyButton
                />
            </div>
        </div>
    )
}
