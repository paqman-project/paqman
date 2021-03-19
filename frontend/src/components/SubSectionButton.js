import React from "react"

export default function SubSectionButton({setView, title}){
    return(
        <>
            <div className="bg-white border w-full h-8
                            hover:border-gray-500 cursor-pointer content-center"
                onClick={() => setView(title)}>
                <h1 className="text-center">{title}</h1>
            </div>
        </>
    )
}