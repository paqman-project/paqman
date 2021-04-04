import React from "react"

export default function ViewHeading({ title }) {
    return (
        <div className="text-center m-4">
            <h1 className="font-bold text-xl">{title}</h1>
        </div>
    )
}