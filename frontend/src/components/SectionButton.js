import React from "react"

export default function SubSectionButton({setView, title}){
    return(
        <>
            <div className="bg-white border-2 rounded-lg p-2 mx-2 my-2 
                            shadow-md hover:border-gray-500 cursor-pointer content-center"
                onClick={() => setView(title)}>
                <button className="text-center">{title}</button>
            </div>
        </>
    )
}