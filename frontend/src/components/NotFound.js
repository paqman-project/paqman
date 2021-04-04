import React from "react"

/**
 * This component is used mostly on the default paths on
 * the browser routers to signal, that a page or view
 * does not exist.
 */
export default function NotFound() {
    return (
        <div className="mt-10 mx-auto text-center animate-bounce">
            <h1>Page not found</h1>
            <h1 className="font-black">:(</h1>
        </div>
    )
}
