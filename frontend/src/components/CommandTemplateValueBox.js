import React from "react"
import { commandTemplateValueTypes as valTypes } from "../utils/enums"
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
     * Used to compute the HTML input types by template value
     * @param v Object containing the template value definition
     * @returns Array that can be mapped to create the input elements
     */
    const inputTypesOf = v => {
        switch (v.type) {
            case valTypes.nonvalueFlag:
                return ["checkbox"]
            case valTypes.valueFlag:
                // "checkbox" for "activating" the flag
                // and "text" to define the content
                return ["checkbox", "text"]
            case valTypes.value:
                return ["text"]
            default:
                console.error(
                    `ERROR: found unsupported type ${v.type} in command template value`
                )
        }
    }

    const handleChange = event => {
        const { name, type, checked, value } = event.target
        const d = { ...formData } // shallow copy formData

        // different command template value types have different
        // formats on how they are stored in formData
        switch (templateValue.type) {
            case valTypes.nonvalueFlag:
                d[name].triggered = checked
                break
            case valTypes.valueFlag:
                type === "checkbox"
                    ? (d[name].triggered = checked)
                    : (d[name].value = value)
                break
            case valTypes.value:
                d[name].value = value
                break
            default:
                console.error(
                    `ERROR: found unsupported type ${templateValue.type} in command template value`
                )
        }

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
                    <div className="p-2 border rounded-t-lg font-sans text-center">
                        <label>{templateName}</label>
                    </div>
                </Tooltip>
                <div className="p-2 border rounded-b-lg text-center">
                    {inputTypesOf(templateValue).map((inputType, index) => (
                        <input
                            key={index}
                            type={inputType}
                            onChange={handleChange}
                            name={templateName}
                            value={
                                inputType === "text" &&
                                formData[templateName].value
                            }
                            checked={
                                inputType === "checkbox" &&
                                formData[templateName].triggered
                            }
                            className="text-center mx-1 p-1 rounded-lg"
                            // Resize the input tag dynamically (minimum size of 15 chars)
                            size={
                                inputType === "text" &&
                                formData[templateName].value.length > 15
                                    ? formData[templateName].value.length
                                    : 15
                            }
                        />
                    ))}
                </div>
            </div>
        )
    }

    // occurs, when there is no plaintext between two template values
    return <p className="w-4" />
}
