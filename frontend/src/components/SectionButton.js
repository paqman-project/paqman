import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function SectionButton({ title, to }) {
    const selectedStyle = " border-yellow-400"
    const { pathname } = useLocation(); // gets the current path
    
    let selected
    if (pathname === to) selected = true

    return (
        <Link to={to} >
            <div
                className={
                    "w-5/6 text-center border-2 rounded-lg py-2 mx-auto my-3 shadow-md hover:border-gray-500 cursor-pointer " +
                    (selected ? selectedStyle : "")
                }
            >
                {title}
            </div>
        </Link>
    )
}
