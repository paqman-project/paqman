import React from "react"
import { Link } from "react-router-dom"

export default function SectionButton({ title, to, selected }) {
    let selectedStyle = " border-yellow-400"

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
