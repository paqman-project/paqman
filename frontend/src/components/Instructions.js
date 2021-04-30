import React from "react"

/**
 * Displays instructions about a command (standalone or in an attack)
 * @param props
 * @param props.text The instruction text
 */
export default function Instructions({ text }) {
    return (
        <div className="text-center border-l-2 border-r-2 rounded-xl px-8 py-4 h-full">
            <p className="font-semibold mb-2">Instructions</p>
            <div className="italic">
                { text }
            </div>
        </div>
    )
}