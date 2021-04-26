import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "./Button"
import CodeWrapper from "./CodeWrapper"
import TemplateValueWrapper from "./TemplateValueWrapper"

export default function TemplateForm({ template, templateValues }) {

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
            templateArray.push(
                // TODO this is ugly af
                <TemplateValueWrapper key={templateSplit[i]}>
                    <div className="p-2">
                        &nbsp;
                    </div>
                    <div className="p-2">
                        { templateSplit[i] }
                    </div>
                </TemplateValueWrapper>
            )
            // add the template values
            templateArray.push(
                <TemplateValueWrapper key={templateValuesFound[i]} >
                    <div className="p-2 border">
                        { templateValuesFound[i] }
                    </div>
                    <div className="p-2 border">
                        { formData[templateValuesFound[i]] ? formData[templateValuesFound[i]] : <p>&nbsp;</p> }
                    </div>
                </TemplateValueWrapper>
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

    /**
     * This function computes a full command string to be pasted to the clipboard.
     * @returns {string} Full command ready to be pasted to the command line
     */
    const fullCommandString = () => {
        return 1337
    }

    const [ formData, setFormData ] = useState({}) // TODO fill with initial values

    const [ copied, setCopied ] = useState(false)

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
                <div className="flex items-center">
                    { templateArray() }
                </div>
            </CodeWrapper>
            { /* form to fill the template with actual values */ }
            <div>
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
                    <CopyToClipboard
                        text={ fullCommandString() }
                        onCopy={() => {
                            setCopied(true)
                            setTimeout(
                                () => setCopied(false), 
                                1000
                            )
                        }}
                    >
                        <div className={ copied ? "animate-spin" : "animate-none" }>
                            <Button 
                                title="Copy to clipboard" 
                                important 
                            />
                        </div>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    )

}