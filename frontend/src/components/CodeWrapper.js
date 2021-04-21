import React from "react"

export default function CodeWrapper({ children }) {
    return (
        <div className="my-4 px-16 py-4 mx-auto bg-gray-100 rounded">
            { children }
        </div>
    )
}