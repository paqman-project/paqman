import React, { useState } from "react"

/**
 * This provides an area to display a div on hover. The content text of this div is
 * specified by the "tip" prop
 * @param props
 * @param props.tip The hint message to show in the div on hover (it null or undefined, the tooltip will be disabled)
 * @param props.children DO NOT SPECIFY EXPLICITLY! The nested children elements inside the component tags
 */
export default function Tooltip({ tip, children }) {

    const [hovering, setHovering] = useState(false)

    return (
        <div>
            <div
                onMouseOver={() => setHovering(true)}
                onMouseOut={() => setHovering(false)}
                className="relative"
            >
                {children}
                <div
                    className={
                        "z-50 bottom-8 left-10 bg-white px-4 py-2 border rounded-xl opacity-95" +
                        " " +
                        ((tip && hovering) ? "absolute w-60" : "hidden")
                    }
                >
                    <p className="font-sans text-sm text-center">{tip}</p>
                </div>
            </div>
        </div>
    )
}
