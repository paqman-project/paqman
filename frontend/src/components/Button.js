import React from "react"

/**
 * A universal styled button. Can be used as a submit button and has two different
 * kinds of styling.
 * @param props
 * @param {Function} props.onClick An onClick handler to be passed in
 * @param {string} props.title Title of the button (visible)
 * @param {boolean} props.important If the button should be filled (true) or only surrounded (false)
 * @param {boolean} props.submit If this is a submit button (used inside a form)
 */
export default function Button({ onClick, title, important, submit }) {
    return (
        <div>
            <button
                onClick={onClick}
                className={`px-4 py-2 border-2 rounded shadow-lg bg-white focus:outline-none font-raleway ${
                    important
                        ? "border-transparent bg-paqteal-600 text-white"
                        : "border-paqteal-600"
                }`}
                type={submit && "submit"}
            >
                {title}
            </button>
        </div>
    )
}
