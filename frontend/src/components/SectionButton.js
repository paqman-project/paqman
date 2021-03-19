import React from "react"

export default function SectionButton({setView, view}){

    console.log(setView)

    return(
        <>
            <div className="bg-white border-2 rounded-lg p-2 mx-2 my-2 
                            shadow-md hover:border-gray-500 cursor-pointer content-center"
                    onClick={() => setView(view)}>
                <button className="text-center">Click me!</button>
            </div>
        </>
    )
}