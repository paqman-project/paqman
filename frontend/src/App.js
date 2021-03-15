import React from "react"
import Header from "./container/Header"
import Body from "./container/Body"

export default function App() {
    return (
        <div className="h-full w-full absolute top-0 bg-red-200">
            <Header/>         
            <Body />
        </div>
    )
}