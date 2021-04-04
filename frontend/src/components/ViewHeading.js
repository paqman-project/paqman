import React from "react"

/**
 * This component must be used on views for displaying the views title.
 * @param props
 * @param props.title The views title/heading
 */
export default function ViewHeading({ title }) {
    return (
        <div className="text-center m-4">
            <h1 className="font-bold text-xl">{title}</h1>
        </div>
    )
}