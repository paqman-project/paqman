import React from "react"

/**
 * A universal styled button. Can be used as a submit button and has two different
 * kinds of styling.
 * @param props
 * @param {Function} props.onClick An onClick handler to be passed in
 * @param {string} props.title Title of the button (visible)
 * @param {boolean} props.important If the button should be filled (true) or only surrounded (false)
 * @param {string} props.fullWidth Whether the button should expand to it's full parent width
 * @param {boolean} props.submit If this is a submit button (used inside a form)
 */
export default function Button({
    onClick,
    title,
    important,
    fullWidth,
    submit,
}) {
    return (
        <div>
            <button
                onClick={onClick}
                className={`px-4 py-2 border-2 rounded bg-white focus:outline-none font-raleway ${
                    important
                        ? "border-transparent bg-paqteal-600 text-white shadow-lg"
                        : "border-paqteal-600 shadow-md"
                } ${fullWidth && "w-full"}`}
                type={submit && "submit"}
            >
                {title}
            </button>
        </div>
    )
}
