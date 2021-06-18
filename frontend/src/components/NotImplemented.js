import React from "react"

/**
 * This component can be used to signal, that a feature
 * has not been implemented yet.
 * @param props
 * @param props.plannedFor For which version the feature is planned for
 */
export default function NotImplemented({ plannedFor }) {
    return (
        <div className="mt-10 mx-auto text-center animate-bounce">
            <h1>Not implemented yet!</h1>
            { plannedFor && (
                <p className="text-sm">Planned for {plannedFor}</p>
            )}
        </div>
    )
}
