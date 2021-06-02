export function parseTemplate(template) {
    const regex = /%\{.*?\}/g // pattern to find template values ( %{ } )
    const templateCopy = template

    // split the template copy at the patters to retreive everything
    // that is not template value
    const templatePlaintextFound = templateCopy.split(regex)

    // search for all templates with regex pattern and replace brackets
    const templateValuesFound = [...templateCopy.matchAll(regex)].map(e =>
        e[0].replace("%{", "").replace("}", "")
    )

    return [ templatePlaintextFound, templateValuesFound ]
}

export function populateDefaults(templateValues) {
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
    return fd
}