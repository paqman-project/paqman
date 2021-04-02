import React from "react"
import Header from "./container/Header"
import Body from "./container/Body"

export default function App() {
    return (
        <div className="h-full w-full absolute top-0">
            <Header />
            <Body />
        </div>
    )
}
