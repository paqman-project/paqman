import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../img/logo.svg"
import logo2 from "../img/logo_v2.svg"
import ToggleButton from "../components/ToggleButton"

/**
 * This is PAQMANs header for all pages
 */
export default function Header() {
    const [hovering, setHovering] = useState(false)

    return (
        <div className="h-16 flex flex-row shadow-lg items-center left-0">
            <button
                type="button"
                classname="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white 
                hover:bg-gray-700 focus:outline-none  "
                aria-controls="mobile-menu"
                aria-expanded="false"
            >
                <span classname="sr-only">Open main menu</span>

                <svg
                    classname="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

                <svg
                    classname="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <ToggleButton title="Collapse Sidebar" />

            <Link to="/">
                <div
                    onMouseOver={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {hovering ? (
                        <img
                            src={logo2}
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
    )
}
