import React from "react";
import "../logo_v2.svg";

/**
 * This is PAQMANs header for all pages
 */
export default function Header() {
    return (
        <div className="h-16 flex justify-between items-center shadow-lg">
            <img src="/logo.svg" width="350px" alt="PAQMAN Logo" className="mx-4"/>
        </div>
    )
}
