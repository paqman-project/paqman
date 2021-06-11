import React, { useState } from "react"
import LinkButton from "../components/LinkButton"
import LinkButtonGroup from "../components/LinkButtonGroup"

/**
 * This is the sidebar displayed on the preperation page
 */
export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    const collapsedStyle =
        "h-full w-60 shadow-2xl flex flex-col justify-betweeen"

    return (
        <div
            className={
                "h-full w-0 shadow-2xl flex flex-col justify-between font-raleway " +
                (collapsed ? collapsedStyle : "")
            }
        >
            {/* upper buttons */}

            <div>
                <LinkButtonGroup title="Attacks">
                    <LinkButton title="List" to="/prepare/attack/list/" />
                    <LinkButton
                        title="By Parameter"
                        to="/prepare/attack/by-parameter/"
                    />
                    <LinkButton title="Add" to="/prepare/attack/new/" />
                </LinkButtonGroup>
                <hr className="mt-6 border-0 bg-gray-200 h-px w-5/6 m-auto" />
                <LinkButtonGroup title="Commands">
                    <LinkButton title="List" to="/prepare/command/list/" />
                    <LinkButton
                        title="By Parameter"
                        to="/prepare/command/by-parameter/"
                    />
                    <LinkButton title="Add" to="/prepare/command/new/" />
                </LinkButtonGroup>
            </div>
            {/* lower buttons */}
            <div>
                <LinkButton title="About" to="/prepare/about/" />
            </div>
        </div>
    )
}
