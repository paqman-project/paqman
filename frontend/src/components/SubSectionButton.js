import React from "react"

export default function SubSectionButton({ setView, title, active }){

    let selectedStyle = " border-gray-500"

    return(
        <div 
            className={
                "bg-white border w-full h-full py-1 m-2 hover:border-gray-300 cursor-pointer rounded-lg" +
                (active ? selectedStyle : "")
            }
            onClick={() => {
                setView(title); 
            }}
        >
            <h1 
                className="text-center"
            >{title}</h1>
        </div>
    )
}