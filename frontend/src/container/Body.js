import React from "react"
import Sidebar from "./Sidebar"
import Section from "./Section"

export default function Body(){
    return(
        <>
            <div className="h-full flex">
            <Sidebar />
            <Section /> 
            </div>
        </>
    )
}