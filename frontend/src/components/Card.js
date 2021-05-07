import React from "react"

/**
 * A styled card with a gray-highlighted title
 * @param props
 * @param props.title The title of the card (optional)
 * @param props.capitalize If the title string should be capitalized
 * @param props.text The instruction text
 */
export default function Card({ title, capitalize, fullHight, children }) {
    return (
        <div className={`text-center border border-gray-100 rounded-xl px-8 py-4 shadow-lg font-raleway ${fullHight && "h-full"}`}>
            {title && (
                <p className={`font-semibold mb-2 bg-gray-100 rounded-lg p-1 ${capitalize && "capitalize"}`}>
                    {title}
                </p>
            )}
            {children}
        </div>
    )
}
