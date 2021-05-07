import React from "react"

/**
 * This component MUST be used on views for displaying the views title.
 * @param props
 * @param props.title The views title/heading
 * @param props.subtitle Will be displayed below the titel (optional)
 */
export default function ViewHeading({ title, subtitle }) {
    return (
        <div className="text-center mt-4 mb-12 font-raleway">
            <h1 className="font-bold text-xl">{title}</h1>
            <h2 className=" font-medium text-lg">{subtitle}</h2>
        </div>
    )
}
