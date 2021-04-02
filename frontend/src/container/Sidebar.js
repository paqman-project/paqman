import React from "react"
import SectionButton from "../components/SectionButton"
import SectionButtonGroup from "../components/SectionButtonGroup"

export default function Sidebar() {
    return (
        <div className="h-full w-60 shadow-2xl flex flex-col justify-between">
            {/* upper buttons */}
            <div>
                <SectionButtonGroup title="Attacks">
                    <SectionButton 
                        title="List" 
                        to="/prepare/attack/list"
                    />
                    <SectionButton 
                        title="By Parameter" 
                        to="/prepare/attack/by-parameter"
                    />
                    <SectionButton 
                        title="Add" 
                        to="/editor/attack/new"
                    />
                </SectionButtonGroup>
                <hr className="mt-6 border-0 bg-gray-200 h-px w-5/6 m-auto" />
                <SectionButtonGroup title="Commands">
                    <SectionButton 
                        title="List" 
                        to="/prepare/command/list"
                    />
                    <SectionButton 
                        title="By Parameter" 
                        to="/prepare/command/by-parameter"
                    />
                    <SectionButton 
                        title="Add" 
                        to="/editor/command/new"
                    />
                </SectionButtonGroup>
            </div>
            {/* lower buttons */}
            <div>
                <SectionButton
                    title="About"
                    to="/prepare/about"
                />
            </div>
        </div>
    )
}
