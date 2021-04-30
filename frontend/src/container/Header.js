import React from "react";
import { ReactComponent as Logo } from "../logo.svg";

/**
 * This is PAQMANs header for all pages
 */
export default function Header() {
    return (
        <div className="h-16 flex justify-between items-center shadow-lg">
            <Logo />
        </div>
    )
}
