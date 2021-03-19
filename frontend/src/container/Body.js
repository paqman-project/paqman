import React, {useState} from "react"
import Sidebar from "./Sidebar"
import AttackView from "./AttackView"
import CommandView from "./CommandView"

export default function Body(){
    const [view, setView] = useState("attack")

    function selectView(){
        switch (view) {
            case "attack":
                return <AttackView />
            case "command":
                return <CommandView />
            default:
                break;
        }
    }

    return(
        <>
            <div className="h-full flex">
                <Sidebar setView={setView}/>
                {selectView()}
            </div>
        </>
    )
}