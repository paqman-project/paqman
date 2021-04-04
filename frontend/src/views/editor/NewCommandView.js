import React, { useState } from "react"
import ViewHeading from "../../components/ViewHeading"

export default function NewCommandView() {

    const [ formValues, setFormValues ] = useState({
        name: "",
        description: "",
        template: "",
        template_values: "{}"
    })

    const handleSubmit = async (event) => {

        event.preventDefault()

        let v = {...formValues}
        v["template_values"] = JSON.parse(v.template_values)

        alert(`Commiting command:\n${JSON.stringify(v, null, 4)}`)
        await fetch("/api/command", {
            method: "POST",
            body: JSON.stringify(v)
        }).catch(e => console.log(e))

    }

    const handleChange = (event) => {
        let v = {...formValues} // shallow copy formValues
        v[event.target.name] = event.target.value // change the field
        setFormValues(v) // set it to state
    }

    return (
        <div>
            <ViewHeading title="Add a new command" />
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col w-1/3 m-auto"
            >
                <lable>Name</lable>
                <input 
                    type="text" 
                    name="name" 
                    value={formValues.name} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <lable>Description</lable>
                <input 
                    type="text" 
                    name="description" 
                    value={formValues.description} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <lable>Template</lable>
                <input 
                    type="text" 
                    name="template" 
                    value={formValues.template} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <lable>Template Values</lable>
                <textarea
                    rows="10"
                    name="template_values" 
                    value={formValues.template_values} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <input 
                    type="submit" 
                    value="Submit"
                    className="mt-4"
                />

            </form>
        </div>
    )
}