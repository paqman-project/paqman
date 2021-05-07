import React from "react"

/**
 * Displays instructions about a command (standalone or in an attack)
 * @param props
 * @param props.text The instruction text
 */
export default function Card({ title, children }) {
    return (
        <div className="text-center border border-gray-100 rounded-xl px-8 py-4 h-full shadow-lg">
            <p className="font-raleway font-semibold mb-2 bg-gray-100 rounded-lg p-1">
                {title || "Title"}
            </p>
            {children}
        </div>
    )
}
