import React from "react"

/**
 * This component must be used on views for displaying the views title.
 * @param props
 * @param props.title The views title/heading
 * @param props.subtitle Will be displayed below the titel
 */
export default function ViewHeading({ title, subtitle }) {
    return (
        <div className="text-center m-4">
            <h1 className="font-bold text-xl">{title}</h1>
            <h2 className="font-medium text-lg">{subtitle}</h2>
        </div>
    )
}
