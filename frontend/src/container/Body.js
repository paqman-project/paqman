import React, { useState } from "react"
import Sidebar from "./Sidebar"
import AttackView from "./AttackView"
import CommandView from "./CommandView"

export default function Body(){
    const [ view, setView ] = useState("Attacks")

    function selectView(){
        switch (view) {
            case "Attacks":
                return <AttackView />
            case "Commands":
                return <CommandView />
            default:
                break;
        }
    }

    return(
        <>
            <div className="h-full flex">
                <Sidebar setView={setView} />
                {selectView()}
            </div>
        </>
    )
}