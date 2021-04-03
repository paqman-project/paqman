import React from "react"

export default function LinkButtonGroup({ title, children }) {
    return (
        <div className="mt-4">
            <h1 className="text-center">{title}</h1>
            {children}
        </div>
    )
}
