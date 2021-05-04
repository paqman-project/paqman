import React, { useState } from "react"

export default function Tooltip({ tip, children }) {

    const [ hovering, setHovering ] = useState(false)

    return (
        <div>
            <div 
                onMouseOver={ () => setHovering(true) } 
                onMouseOut={ () => setHovering(false) }
                className="relative"
            >
                { children }
                <div 
                    className={ 
                        "z-50 bottom-8 left-10 bg-white px-4 py-2 border rounded-xl opacity-95" +
                        " " + (hovering ? "absolute w-60" : "hidden")
                    }
                >
                    <p className="font-sans text-sm text-center">{ tip }</p>
                </div>
            </div>
        </div>
    )
}