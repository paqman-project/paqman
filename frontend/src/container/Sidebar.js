import React from "react"
import LinkButton from "../components/LinkButton"
import LinkButtonGroup from "../components/LinkButtonGroup"

export default function Sidebar() {
    return (
        <div className="h-full w-60 shadow-2xl flex flex-col justify-between">
            {/* upper buttons */}
            <div>
                <LinkButtonGroup title="Attacks">
                    <LinkButton title="List" to="/prepare/attack/list/" />
                    <LinkButton
                        title="By Parameter"
                        to="/prepare/attack/by-parameter/"
                    />
                    <LinkButton title="Add" to="/editor/attack/new/" />
                </LinkButtonGroup>
                <hr className="mt-6 border-0 bg-gray-200 h-px w-5/6 m-auto" />
                <LinkButtonGroup title="Commands">
                    <LinkButton title="List" to="/prepare/command/list/" />
                    <LinkButton
                        title="By Parameter"
                        to="/prepare/command/by-parameter/"
                    />
                    <LinkButton title="Add" to="/editor/command/new/" />
                </LinkButtonGroup>
            </div>
            {/* lower buttons */}
            <div>
                <LinkButton title="About" to="/prepare/about/" />
            </div>
        </div>
    )
}
