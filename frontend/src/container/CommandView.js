import React from "react"
import Panel from "./Panel"

export default function CommandView(){
    return(
        <>
            <div className="h-full w-full flex justify-items">
                <Panel />
                <Panel />
                <Panel />
            </div>
        </>
    )
}