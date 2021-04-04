import React, { useState } from "react"
import ViewHeading from "../../components/ViewHeading"

export default function NewCommandView() {

    const [ value, setValue ] = useState("Initial Text")

    const handleSubmit = async (event) => {

        event.preventDefault()

        alert(`Creating command: ${event}`)
        await fetch("/api/command", {
            method: "POST",
            body: JSON.stringify({
                
            })
        }).catch(e => console.log(e))

    }

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <div>
            <ViewHeading title="Add a new command" />
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col w-1/3 m-auto"
            >
                <lable>Textarea</lable>
                <input type="text" name="" value={value} onChange={handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}