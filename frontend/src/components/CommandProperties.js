import React from "react"

/**
 * Displays the command properties (e.g. "requires_root")
 * @param props
 * @param props.properties The object from where the properties will be extracted from
 */
export default function CommandProperties({ properties }) {
    return (
        <div className="text-center border-l-2 border-r-2 rounded-xl px-8 py-4 h-full">
            <p className="font-semibold mb-2">Command properties</p>
            <p>Requires root?<span> </span>
                { properties.requires_root ? 
                    <span className="text-green-500 text-xl">&#10003;</span> : 
                    <span className="text-red-500 text-xl">&#10005;</span> 
                }
            </p>
        </div>
    )
}