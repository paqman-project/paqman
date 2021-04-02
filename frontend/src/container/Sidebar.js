import React from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="w-48 shadow-2xl h-full pt-2">
            <Link to="/prepare/attack/list">
                <p>Attack List</p>
            </Link>
            <Link to="/prepare/attack/by-parameter">
                <p>Attack By Parameter</p>
            </Link>
            <Link to="/prepare/command/list">
                <p>Command List</p>
            </Link>
            <Link to="/prepare/command/by-parameter">
                <p>Command By Parameter</p>
            </Link>
            <Link to="/prepare/about">
                <p>About</p>
            </Link>
        </div>
    )
}
