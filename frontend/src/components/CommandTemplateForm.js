import React, { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
// utils
import Template from "../utils/Template"
import { commandTemplateValueTypes as valTypes } from "../utils/enums"
// JSX components
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
    const [formData, setFormData] = useState()

    /* 
        populate formData with defaults, if any in this format:
        {
            triggered: "for checkboxes,
            value: "for text inputs"
        }
    */
    useEffect(() => {
        let fd = {}
        Object.entries(templateValues).forEach(([n, v]) => {
            switch (v.type) {
                case valTypes.nonvalueFlag:
                    fd[n] = {
                        triggered: v.default_state || false,
                    }
                    break
                case valTypes.valueFlag:
                    fd[n] = {
                        triggered: v.default_state || false,
                        value: v.default || "",
                    }
                    break
                case valTypes.value:
                    fd[n] = {
                        value: v.default || "",
                    }
                    break
                default:
                    console.log(
                        `ERROR: found unsupported type ${v.type} in command template value`
                    )
            }
        })
        setFormData(fd)
    }, [templateValues])

    const t = new Template(template)
    const marked = t.markedArray() // see javadoc for details on what this does

    const templateArray = () => {
        // reassamble the template to contain both plaintext and template values
        return marked.map(([type, e], index) =>
            type === "template_value" ? (
                <CommandTemplateValueBox
                    key={index}
                    templateName={e}
                    templateValue={templateValues[e]}
                    formData={formData}
                    setFormData={setFormData}
                />
            ) : (
                <CommandTemplateValueBox
                    key={index}
                    plaintext={e}
                    formData={formData}
                    setFormData={setFormData}
                />
            )
        )
    }

    /**
     * This function computes a full command string to be pasted to the clipboard.
     * @returns {string} Full command ready to be pasted to the command line
     */
    const fullCommandString = () => {
        let fcs = ""
        marked.forEach(([type, e]) => {
            if (type === "template_value") {
                switch (templateValues[e].type) {
                    case valTypes.nonvalueFlag:
                        if (formData[e].triggered) {
                            fcs += templateValues[e].value // TODO, check if existent?
                        }
                        break
                    case valTypes.valueFlag:
                        if (formData[e].triggered) {
                            fcs += templateValues[e].usage.replace(
                                "%",
                                formData[e].value
                            )
                        }
                        break
                    case valTypes.value:
                        fcs += formData[e].value
                        break
                    default:
                        console.log(
                            `ERROR: found unsupported type ${templateValues[e].type} in command template value`
                        )
                }
            } else {
                fcs += e
            }
        })
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
