import React from "react"

/**
 * A toggle button. Can be used in the sidebar or for switching between light and dark mode.
 * @param props

 * @param {string} props.title Title of the button (visible)
 * @param {boolean} props.important If the button should be filled (true) or only surrounded (false)
 * @param {boolean} props.submit If this is a submit button (used inside a form)
 */
export default function Button({ title, selected }) {
    return (
        <div>
            <button
                className={`px-8 py-2 border-2 rounded text-xs items-center
                ${selected ? "bg-paqred text-white" : "bg-paqgreen-200"}`}
            >
                {title}
            </button>
        </div>
    )
}
