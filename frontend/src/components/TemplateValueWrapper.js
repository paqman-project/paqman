import React from "react"

export default function TemplateValueWrapper({ children }) {
    return (
        <div className="whitespace-nowrap text-center">
            { children }
        </div>
    )
}