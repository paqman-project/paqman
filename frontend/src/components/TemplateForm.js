import React, { useState } from "react"
import Button from "./Button"
import CodeWrapper from "./CodeWrapper"

export default function TemplateForm({ template, templateValues }) {

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

    const [ formData, setFormData ] = useState({}) // TODO

    const handleSubmit = () => {
        alert("Penis")
    }

    const handleChange = (event) => {
        // TODO
    }

    return (
        <div>
            { /* render out the reassambled template */ }
            <CodeWrapper>
                { templateArray }
            </CodeWrapper>
            { /* form to fill the template with actual values */ }
            <div>
                <form onSubmit={handleSubmit}>
                    {
                        (() => {

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

                            return Object.entries(templateValues).map(([ key, value ]) => {
                                return (
                                    <div
                                        key={key}
                                        className="flex justify-between w-2/3 mx-auto my-2"
                                    >
                                        <label>{key}</label>
                                        <input
                                            type={ inputTypeOf(value) }
                                            className="border border-red-500"
                                        />
                                    </div>
                                )
                            })

                        })() // instantly execute the arrow function
                    }
                    <div className="text-center">
                        <Button 
                            title="Fill command" 
                            submit important 
                        />
                    </div>
                </form>
            </div>
        </div>
    )

}