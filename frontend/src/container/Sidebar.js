import React from "react"
import SectionButton from "../components/SectionButton"

export default function Sidebar() {
    return (
        <div className="h-full w-48 shadow-2xl flex flex-col justify-between">
            {/* upper buttons */}
            <div>
                <h1>Attacks</h1>
                <SectionButton 
                    title="List" 
                    to="/prepare/attack/list" 
                    selected={true}
                />
                <SectionButton 
                    title="By Parameter" 
                    to="/prepare/attack/by-parameter" 
                    selected={false}
                />
                <h1>Commands</h1>
                <SectionButton 
                    title="List" 
                    to="/prepare/command/list" 
                    selected={false}
                />
                <SectionButton 
                    title="By Parameter" 
                    to="/prepare/command/by-parameter" 
                    selected={false}
                />
            </div>
            {/* lower buttons */}
            <div>
                <SectionButton
                    title="About"
                    to="/prepare/about"
                    selected={false}
                />
            </div>
        </div>
    )
}
