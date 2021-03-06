import React from "react"

/**
 * A styled card with a gray-highlighted title
 * @param props
 * @param props.title The title of the card
 * @param props.titleOverwrite Used to provide custom HTML for the title div. If this is set, the title prop is ignored.
 * @param props.smallPadding If the padding should be smaller (useful if used as some kind of entry)
 * @param props.className CSS classes to pass in the component
 */
export default function Card({
    title,
    titleOverwrite,
    smallPadding,
    className,
    children,
}) {
    return (
        <div
            className={`text-center border border-gray-100 rounded-xl shadow-lg font-raleway ${
                smallPadding ? "p-2" : "px-8 py-4"
            } ${className}`}
        >
            {!title && !titleOverwrite ? null : (
                <div className="font-semibold mb-2 bg-gray-100 rounded-lg p-1">
                    {title ? <p>{title}</p> : titleOverwrite}
                </div>
            )}
            {children}
        </div>
    )
}
