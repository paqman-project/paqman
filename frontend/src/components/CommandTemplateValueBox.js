import React from "react"
import Tooltip from "./Tooltip"

export default function CommandTemplateValueBox({ plaintext, templateName, templateValue, formData, setFormData }) {

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
    
    const handleChange = event => {
        const { name, type, checked, value } = event.target
        const combValue = type === "checkbox" ? checked : value
        const d = {...formData} // shallow copy formData
        d[name] = combValue
        setFormData(d)
    }

    if (plaintext) {
        return (
            <div className="whitespace-nowrap text-center">
                <div className="p-2">
                    &nbsp;
                </div>
                <div className="p-2">
                    { plaintext }
                </div>
            </div>
        )
    }

    if (templateName && templateValue) {
        return (
            <div>
                <Tooltip tip={templateValue.description}>
                    <div className="p-2 border font-sans text-center">
                        <label>{ templateName }</label>
                    </div>
                </Tooltip>
                <div className="p-2 border text-center">
                    <input
                        className="text-center"
                        type={ inputTypeOf(templateValue) }
                        onChange={ handleChange }
                        name={ templateName }
                        value={ formData[templateName] }
                        checked={ formData[templateName] }
                        // Resize the input tag dynamically (minimum size of 15 chars)
                        size={ formData[templateName].length > 15 ? formData[templateName].length : 15 }
                    />
                </div>
            </div>
        )
    }

    // occurs, when there is no plaintext between two template values
    return <p className="w-4" />

}