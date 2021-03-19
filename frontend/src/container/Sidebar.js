import React from "react"
import SectionButton from "../components/SectionButton"

export default function Sidebar({setView}){
    return(
        <>
            <div className="w-60 shadow-2xl h-full pt-2">
                <SectionButton setView={setView} title="Attacks"/>
                <SectionButton setView={setView} title="Commands"/>
                <SectionButton title="About"/>
            </div>
        </>
    )
}