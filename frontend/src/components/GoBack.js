import React from "react"

/**
 * This is a button that just executes the browsers "back" function
 */
export default function GoBack() {
    const handleGoBack = event => {
        window.history.back()
    }

    return (
        <button className="h-10 w-10 bg-blue-500" onClick={handleGoBack}>
            Go back
        </button>
    )
}
