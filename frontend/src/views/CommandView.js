import React, { useState } from "react"
import SubSectionButtons from "../container/SubSectionButtons"
import CommandListView from "./CommandListView"
import CommandByParameterView from "./CommandByParameterView"

export default function CommandView(){

    const [ view, setView ] = useState("List")

    function selectView(){
        switch (view) {
            case "List":
                return <CommandListView />
            case "By Parameter":
                return <CommandByParameterView />
            default:
                break;
        }
    }

    return (
        <>
            <div className="w-full">
                <SubSectionButtons 
                    titles={["List", "By Parameter"]} 
                    currentView={view} 
                    setView={setView}
                />
                {selectView()}
            </div>

        </>
    )
}