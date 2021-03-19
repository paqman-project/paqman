import React, { useState } from "react"
import Sidebar from "./Sidebar"
import AttackView from "./AttackView"
import CommandView from "./CommandView"
import AboutView from "./AboutView"

export default function Body(){
    const [ view, setView ] = useState("Attacks")

    function selectView(){
        switch (view) {
            case "Attacks":
                return <AttackView />
            case "Commands":
                return <CommandView />
            case "About":
                return <AboutView />
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