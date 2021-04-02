import React, { useState } from "react"
import SubSectionButtons from "../container/SubSectionButtons"
import AttackListView from "./AttackListView"
import AttackByParameterView from "./AttackByParameterView"

export default function AttackView() {
    const [view, setView] = useState("List")

    function selectView() {
        switch (view) {
            case "List":
                return <AttackListView />
            case "By Parameter":
                return <AttackByParameterView />
            default:
                break
        }
    }

    return (
        <div className="w-full">
            <SubSectionButtons
                titles={["List", "By Parameter"]}
                currentView={view}
                setView={setView}
            />
            {selectView()}
        </div>
    )
}
