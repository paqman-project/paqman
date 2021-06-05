import React, { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import CommandTemplate from "../utils/CommandTemplate"
import Button from "./Button"
import CodeWrapper from "./CodeWrapper"
import CommandTemplateValueBox from "./CommandTemplateValueBox"
import Loading from "./Loading"

/**
 * Displays the gray box containing the fillable template values of a command
 * @param {Object} props
 * @param {string} props.template The template string
 * @param {Object} props.templateValues The object from the command document containing the template value definitions
 * @param {boolean} props.withPreview Whether the full plaintext command should be displayed
 */
export default function CommandTemplateForm({
    template,
    templateValues,
    withPreview,
}) {
    const [formData, setFormData] = useState() // TODO fill with initial values

    // populate formData with defaults, if any
    useEffect(() => {
        let fd = {}
        Object.entries(templateValues).forEach(([n, v]) => {
            switch (v.type) {
                case "nonvalue-flag":
                    fd[n] = false
                    break
                case "value":
                    fd[n] = v.default || ""
                    break
                case "parameter":
                    // TODO this is temporary until #62 is resolved
                    fd[n] = ""
                    break
                default:
                    console.log(
                        `ERROR: found unsupported type ${v.type} in command template value`
                    )
            }
        })
        setFormData(fd)
    }, [templateValues])

    const t = new CommandTemplate(template)
    const templatePlaintextFound = t.plaintexts
    const templateValuesFound = t.templateValueNames

    const templateArray = () => {
        // reassamble the template to contain both plaintext and template values
        const templateArray = []
        for (let i = 0; i < templateValuesFound.length; i++) {
            // add the plaintext
            templateArray.push(
                <CommandTemplateValueBox
                    key={i}
                    plaintext={templatePlaintextFound[i]}
                    formData={formData}
                    setFormData={setFormData}
                />
            )
            // add the template value
            templateArray.push(
                <CommandTemplateValueBox
                    key={templateValuesFound[i]}
                    templateName={templateValuesFound[i]}
                    templateValue={templateValues[templateValuesFound[i]]}
                    formData={formData}
                    setFormData={setFormData}
                />
            )
        }
        return templateArray
    }

    /**
     * This function computes a full command string to be pasted to the clipboard.
     * @returns {string} Full command ready to be pasted to the command line
     */
    const fullCommandString = () => {
        let fcs = ""
        for (let i = 0; i < templateValuesFound.length; i++) {
            // add the plaintext
            fcs = fcs + templatePlaintextFound[i]
            // add the template value
            switch (templateValues[templateValuesFound[i]].type) {
                case "nonvalue-flag":
                    if (formData[templateValuesFound[i]] === true) {
                        fcs = fcs + templateValues[templateValuesFound[i]].value // TODO, check if existent?
                    }
                    break
                case "value":
                    fcs = fcs + formData[templateValuesFound[i]]
                    break
                case "parameter":
                    // TODO this is temporary until #62 is resolved
                    fcs = fcs + formData[templateValuesFound[i]]
                    break
                default:
                    console.log(
                        `ERROR: found unsupported type ${
                            templateValues[templateValuesFound[i]].type
                        } in command template value`
                    )
            }
        }
        fcs = fcs.replace(/\s+/g, " ") // remove duplicate whitespaces
        return fcs
    }

    const [copied, setCopied] = useState(false)

    // wait for everything to populate before rendering the form
    // (formData is populated via useEffect(..., []). This means
    // that setFormData() will be called asynchronously and this
    // component will render without waiting for the effect to
    // finish.)
    if (!formData) {
        return <Loading />
    }

    return (
        <div>
            {/* render out the reassambled template */}
            <div className="w-max mx-auto">
                <CodeWrapper>
                    <div className="flex items-center justify-center">
                        {templateArray()}
                    </div>
                </CodeWrapper>
            </div>
            {/* things below the template (preview, copy button) */}
            <div className="flex items-center justify-center space-x-10">
                {withPreview && (
                    <>
                        <div className="min-w-max">
                            <CodeWrapper>
                                <p>&gt; {fullCommandString()}</p>
                            </CodeWrapper>
                        </div>
                        <div>
                            <CopyToClipboard
                                text={fullCommandString()}
                                onCopy={() => {
                                    setCopied(true)
                                    setTimeout(() => setCopied(false), 3000)
                                }}
                            >
                                <div>
                                    {/* Don't delete this div! It is required, as CopyToClipboard only accepts one child */}
                                    <Button
                                        title="Copy to clipboard"
                                        important
                                    />
                                    {copied && (
                                        <p className="fixed mt-4 ml-2">
                                            Copied 👍
                                        </p>
                                    )}
                                </div>
                            </CopyToClipboard>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
