import React, { useState } from "react"
import SubSectionButtons from "./SubSectionButtons"
import AttackListView from "./AttackListView"
import AttackByParameterView from "./AttackByParameterView"

export default function AttackView(){
    const [view, setView] = useState("List")

    function selectView(){
        switch (view) {
            case "List":
                return <AttackListView />
            case "By Parameter":
                return <AttackByParameterView />
            default:
                break;
        }
    }

    return (
        <>
            <div className="w-full">
                <SubSectionButtons titles={["List", "By Parameter"]} setView={setView} />
                {selectView()}
            </div>

        </>
    )
}