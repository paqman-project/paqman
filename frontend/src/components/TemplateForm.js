import React, { useState } from "react"
import Button from "./Button"
import CodeWrapper from "./CodeWrapper"

export default function TemplateForm({ commandID, template, templateValues }) {

    /**
     * This function creates a ready-to-render array from a template and it's values.
     * @returns {Array} Array containing CDATA strings and JSX-Components
     */
    const templateArray = () => {
        const regex = /\%\{.*?\}/g // pattern to find template values ( %{ } )
        const templateCopy = template

        // search for all templates with regex pattern and replace brackets
        const templateValuesFound = [...templateCopy.matchAll(regex)].map(e => 
            e[0].replace("%{", "").replace("}", "")
        )

        // split the template copy at the patters
        const templateSplit = templateCopy.split(regex)
        
        // reassamble the template to contain both strings and
        // react compoents
        const templateArray = []
        for (let i = 0; i < templateValuesFound.length; i++) {
            // add the plaintext
            templateArray.push(templateSplit[i])
            // add the template values wrapped in <span>
            templateArray.push(
                <span
                    key={templateValuesFound[i]}
                    className="bg-red-500 p-1 m-1 rounded-lg"
                >
                    { templateValuesFound[i] }
                </span>
            )
        }
        return templateArray
    }

    /**
     * Used to compute the HTML input type by template value
     * @param v Object containing the template value definition
     * @returns {string} Type to be used in input elements
     */
    const inputTypeOf = v => {
        switch (v.type) {
            case "nonvalue-flag":
                return "checkbox"
            case "parameter":
            case "value":
                return "text"
            default:
                console.error("ERROR: found unsupported type in command template value")
        }
    }

    const [ formData, setFormData ] = useState({}) // TODO fill with initial values

    const handleSubmit = event => {
        event.preventDefault()
        alert("Filling with: \n" + JSON.stringify(formData, null, 2)) // TEMP
        fetch(`/api/command/${commandID}/fill`, {
            method: "POST",
            body: JSON.stringify(formData)
        })
    }

    const handleChange = event => {
        const { name, type, checked, value } = event.target
        const combValue = type === "checkbox" ? checked : value
        const d = {...formData} // shallow copy formData
        d[name] = combValue
        setFormData(d)
    }

    return (
        <div>
            { /* render out the reassambled template */ }
            <CodeWrapper>
                { templateArray() }
            </CodeWrapper>
            { /* form to fill the template with actual values */ }
            <div>
                <form onSubmit={handleSubmit}>
                    {
                        Object.entries(templateValues).map(([ tvName, tvDef ]) => 
                            <div
                                key={tvName}
                                className="flex justify-between w-2/3 mx-auto my-2"
                            >
                                <label>{tvName}</label>
                                <input
                                    type={ inputTypeOf(tvDef) }
                                    className="border border-red-500"
                                    name={tvName}
                                    onChange={handleChange}
                                />
                            </div>
                        )
                    }
                    <div className="text-center">
                        <Button 
                            title="Fill command" 
                            submit
                            important 
                        />
                    </div>
                </form>
            </div>
        </div>
    )

}