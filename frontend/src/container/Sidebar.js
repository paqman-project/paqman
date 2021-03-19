import React from "react"
import SectionButton from "../components/SectionButton"

export default function Sidebar(){
    return(
        <>
            <div className="w-60 shadow-2xl h-full pt-2">
                <SectionButton title="Attacks"/>
                <SectionButton title="Command"/>
                <SectionButton title="About"/>
            </div>
        </>
    )
}