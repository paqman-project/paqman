import React from "react"

/**
 * Wraps the children into a auto-scaling lightgray box with proper code fonts
 * @param props
 * @param props.children The child components inside the Code Wrapper (does not need to be set explicitly) 
 */
export default function CodeWrapper({ children }) {
    return (
        <div className="my-4 px-16 py-4 mx-auto max-w-max bg-gray-100 rounded font-mono">
            { children }
        </div>
    )
}