import React, {useState} from "react"

export default function SubSectionButton({setView, title}){
    const [isActive, setActive] = useState(false)
    
    /*const setActive(){
        return 
    }*/

    return(
        <>
            <div className="bg-white border-2 rounded-lg p-2 mx-2 my-2 
                            shadow-md hover:border-gray-500 cursor-pointer content-center"
                onClick={() => {
                    setView(title) 
                    setActive(true)
                }}>
                <h1 className="text-center}">{title}</h1>
            </div>
        </>
    )
}