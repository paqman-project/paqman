import React from "react"
import logo from "../img/logo.svg"

/**
 * This is PAQMANs header for all pages
 */
export default function Header() {

    return (
        <div className="h-16 flex justify-start items-center shadow-lg">
            <img src={logo} width="300px" alt="PAQMAN Logo" className="p-6" />
        </div>
    )
}