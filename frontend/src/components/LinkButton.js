import React from "react"
import { Link, useLocation } from "react-router-dom"

/**
 * A LinkButton uses the react-router Link component to redirect a user to a
 * ressource, routed via browser router.
 *
 * IMPORTANT: Always append a trailing slash at the end of the path in the "to"
 * prop, as the backend served the static frontend files in strict slash mode.
 *
 * @param props
 * @param props.title The text displayed in the button
 * @param props.to The internal URL to redirect to, when the button is clicked
 */
export default function LinkButton({ title, to }) {
    const selectedStyle = " border-yellow-400"
    const { pathname } = useLocation() // gets the current path

    let selected
    if (pathname === to) selected = true

    return (
        <Link to={to}>
            <div
                className={
                    "w-5/6 text-center border-2 rounded-lg py-2 mx-auto my-3 shadow-md hover:border-gray-500 cursor-pointer " +
                    (selected ? selectedStyle : "")
                }
            >
                {title}
            </div>
        </Link>
    )
}
