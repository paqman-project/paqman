import React from "react"
import LinkButton from "../components/LinkButton"
import LinkButtonGroup from "../components/LinkButtonGroup"

/**
 * This is the sidebar displayed on the preperation page
 * @param props
 * @param props.collapsed If the sidebar is collapsed (not visible)
 */
export default function Sidebar({ collapsed }) {
    return (
        <div className={`fixed top-0 bottom-0 overflow-y-auto z-10 h-full bg-white shadow-xl ${collapsed ? "w-0": "md:w-56 w-40"}`}>
            <div className="h-full flex flex-col justify-between font-raleway">
                {/* upper buttons */}
                <div>
                    <div className="h-16" />
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
        </div>
    )
}
