import React from "react"
import goPAQMAN from "../img/preloader_1.svg"
/**
 * This component can be used to signal, that a feature
 * has not been implemented yet.
 * @param props
 * @param props.plannedFor For which version the feature is planned for
 */
export default function NotImplemented({ plannedFor }) {
    return (
        <div className="mt-10 mx-auto text-center">
            <div className="animate-bounce">
                <h1>Not implemented yet!</h1>
                {plannedFor && (
                    <p className="text-sm">Planned for {plannedFor}</p>
                )}
            </div>
            <object
                className="mx-auto mt-4 mb-4 h-16 object-center align-center"
                type="image/svg+xml"
                data={goPAQMAN}
            >
                svg-animation
            </object>
        </div>
    )
}
