import React, { useState } from "react"
import ViewHeading from "../../components/ViewHeading"

/**
 * This view is used to create new commands by template.
 * WORK IN PROGRESS!
 */
export default function CommandNewView() {

    const [ formValues, setFormValues ] = useState({
        name: "",
        description: "",
        template: "",
        template_values: "{}"
    })

    const [ response, setResponse ] = useState(null)

    const handleSubmit = async (event) => {

        event.preventDefault()

        let v = {...formValues}
        v["template_values"] = JSON.parse(v.template_values) // transform json string to JS object

        alert(`Commiting command:\n${JSON.stringify(v, null, 4)}`)
        let r = await fetch("/api/command", {
            method: "POST",
            body: JSON.stringify(v)
        }).catch(e => console.log(e))

        setResponse(await r.text())

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
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formValues.name} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <label>Description</label>
                <input 
                    type="text" 
                    name="description" 
                    value={formValues.description} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <label>Template</label>
                <input 
                    type="text" 
                    name="template" 
                    value={formValues.template} 
                    onChange={handleChange}
                    className="border mb-4"
                />

                <label>Template Values</label>
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

                { response && 
                    <div className="my-8 text-center text-green-700">
                        <p>{response}</p>
                    </div>
                }

            </form>
        </div>
    )
}