import React from "react"

export default function SubSectionButton({ setView, title, active }){

    let selectedStyle = " border-green-500"

    return(
        <div 
            className={
                "bg-white border w-full h-8 mx-2 my-2 hover:border-gray-500 cursor-pointer content-center rounded-lg" +
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