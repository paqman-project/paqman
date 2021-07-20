import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../img/logo.svg"
import logoFull from "../img/logo_full.svg"

/**
 * This is PAQMANs header for all pages
 * @param props
 * @param props.sidebarCollapsed State if sidebar is collapsed
 * @param props.setSidebarCollapsed State function to set if the sidebar should be collapsed
 */
export default function Header({ sidebarCollapsed, setSidebarCollapsed }) {
    const [hovering, setHovering] = useState(false)

    return (
        <div className="fixed top-0 z-50 w-full h-16 bg-white shadow-lg">
            <div className="flex flex-row items-center h-full">
                <div className="mx-4 cursor-pointer">
                    {sidebarCollapsed ? (
                        <svg
                            className="block h-8"
                            onClick={() => setSidebarCollapsed(old => !old)}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="grey"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            className="block h-8"
                            onClick={() => setSidebarCollapsed(old => !old)}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="grey"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    )}
                </div>
                <Link to="/">
                    <div
                        className="select-none px-2" // the padding my be unnecessary
                        onMouseOver={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        {hovering ? (
                            <img
                                src={logoFull}
                                width="250px"
                                alt="PAQMAN Logo"
                            />
                        ) : (
                            <img
                                src={logo}
                                width="250px"
                                alt="PAQMAN Logo with Slogan"
                            />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    )
}
