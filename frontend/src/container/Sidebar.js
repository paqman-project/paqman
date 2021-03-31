import React from "react"
import SectionButton from "../components/SectionButton"

export default function Sidebar({ currentView, setView }){
    return(
        <>
            <div className="w-48 shadow-2xl h-full pt-2">
                <SectionButton 
                    setView={setView} 
                    title="Attacks" 
                    active={currentView === "Attacks"}
                />
                <SectionButton 
                    setView={setView} 
                    title="Commands" 
                    active={currentView === "Commands"}
                />
                <SectionButton 
                    setView={setView} 
                    title="About" 
                    active={currentView === "About"}
                />
            </div>
        </>
    )
}