import React from "react"

export default function ViewWrapper({ children }) {
    return (
        <div className="h-full w-full">{children}</div>
    )
}