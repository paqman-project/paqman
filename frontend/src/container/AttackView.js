import React from "react"
import Panel from "./Panel"

export default function AttackView(){
    return(
        <>
            <div className="h-full w-full flex justify-items">
                <h1>AttackView</h1>
                <Panel />
                <Panel />
                <Panel />
            </div>
        </>
    )
}