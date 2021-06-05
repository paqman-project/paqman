import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../img/logo.svg"
import logo2 from "../img/logo_v2.svg"

/**
 * This is PAQMANs header for all pages
 */
export default function Header() {
    const [hovering, setHovering] = useState(false)

    return (
        <div className="h-16 flex justify-between items-center shadow-lg">
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