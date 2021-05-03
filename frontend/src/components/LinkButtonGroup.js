import React from "react"

/**
 * This component is used to group LinkButton components together.
 * The LinkButtons must be supplied as children of LinkButtonGroup
 * but can be left empty.
 * @param props
 * @param props.title Name of the group (displayed visually)
 */
export default function LinkButtonGroup({ title, children }) {
    return (
        <div className="mt-4 font-raleway">
            <h1 className="text-center">{title}</h1>
            {children}
        </div>
    )
}
