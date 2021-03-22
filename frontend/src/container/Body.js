import React, { useState } from "react"
import Sidebar from "./Sidebar"
import AttackView from "../views/AttackView"
import CommandView from "../views/CommandView"
import AboutView from "../views/AboutView"
import ViewWrapper from "./ViewWrapper"

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
                <ViewWrapper>
                    {selectView()}
                </ViewWrapper>
            </div>
        </>
    )
}