import React from "react"
import Tooltip from "./Tooltip"

/**
 * This displays a box containing either plaintext (if plaintext prop is provided) or a fillable
 * template value (if templateName and templateValue props are provided) used in the CommandTemplateForm component
 * @param {Object} props
 * @param {string} props.plaintext The hardcoded parts of the commands
 * @param {string} props.templateName The name of the template value
 * @param {Object} props.templateValue The value of the template
 * @param {*} props.formData The state for the form data in CommandTemplateForm
 * @param {Function} props.setFormData The state setter function for the form data in CommandTemplateForm
 */
export default function CommandTemplateValueBox({
    plaintext,
    templateName,
    templateValue,
    formData,
    setFormData,
}) {
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
                console.error(
                    "ERROR: found unsupported type in command template value"
                )
        }
    }

    const handleChange = event => {
        const { name, type, checked, value } = event.target
        const combValue = type === "checkbox" ? checked : value
        const d = { ...formData } // shallow copy formData
        d[name] = combValue
        setFormData(d)
    }

    if (plaintext) {
        return (
            <div className="whitespace-nowrap text-center">
                <div className="p-2">&nbsp;</div>
                <div className="p-2">{plaintext}</div>
            </div>
        )
    }

    if (templateName && templateValue) {
        return (
            <div>
                <Tooltip tip={templateValue.hint}>
                    <div className="p-2 border font-sans text-center">
                        <label>{templateName}</label>
                    </div>
                </Tooltip>
                <div className="p-2 border text-center">
                    <input
                        className="text-center"
                        type={inputTypeOf(templateValue)}
                        onChange={handleChange}
                        name={templateName}
                        value={formData[templateName]}
                        checked={formData[templateName]}
                        // Resize the input tag dynamically (minimum size of 15 chars)
                        size={
                            formData[templateName].length > 15
                                ? formData[templateName].length
                                : 15
                        }
                    />
                </div>
            </div>
        )
    }

    // occurs, when there is no plaintext between two template values
    return <p className="w-4" />
}
