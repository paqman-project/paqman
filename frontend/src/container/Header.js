import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../img/logo.svg"
import logoFull from "../img/logo_full.svg"

/**
 * This is PAQMANs header for all pages
 * @param props
 * @param props.setSidebarCollapsed State function to set if the sidebar should be collapsed
 */
export default function Header({ setSidebarCollapsed }) {
    const [hovering, setHovering] = useState(false)

    return (
        <div className="fixed top-0 z-50 w-full h-16 bg-white shadow-lg">
            <div className="flex flex-row items-center h-full">
                <button
                    className="text-2xl ml-4 px-4 py-1 border-2 rounded-xl focus:outline-none"
                    onClick={() => setSidebarCollapsed(old => !old)}
                >
                    =
                </button>
                <Link to="/">
                    <div
                        onMouseOver={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        {hovering ? (
                            <img
                                src={logoFull}
                                width="300px"
                                alt="PAQMAN Logo"
                                className="p-6"
                            />
                        ) : (
                            <img
                                src={logo}
                                width="300px"
                                alt="PAQMAN Logo with Slogan"
                                className="p-6"
                            />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    )
}
