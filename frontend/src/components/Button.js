import React from "react"

export default function Button({ onClick, title, important, submit }) {
    return (
        <div>
            <button
                onClick={onClick}
                className={`px-4 py-2 m-4 border-2 rounded ${
                    important ? "border-transparent bg-blue-500 text-white" : "border-blue-500"
                }`}
                type={ submit && "submit" }
            >
                { title }
            </button>
        </div>
    )
}