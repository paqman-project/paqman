import React from "react"

export default function SectionButton({ setView, title, active }) {
    let selectedStyle = " border-gray-500"

    return (
        <div
            className={
                "border-2 rounded-lg p-2 m-2 shadow-md hover:border-gray-500 cursor-pointer " +
                (active ? selectedStyle : "")
            }
            onClick={() => {
                setView(title)
            }}
        >
            <h1 className="text-center">{title}</h1>
        </div>
    )
}
