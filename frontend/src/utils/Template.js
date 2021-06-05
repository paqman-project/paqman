export default class Template {
    constructor(template) {
        this.raw = template
    }

    /**
     * @returns Plaintext parts of the template as Array
     * @deprecated
     */
    get plaintexts() {
        let regex = /%\{.*?\}/g // pattern to find template values ( %{ } )
        let templateCopy = this.raw
        // split the template copy at the patters to retreive everything
        // that is not template value
        return templateCopy.split(regex)
    }

    /**
     * @returns Template value names found in the template as Array
     * @deprecated
     */
    get templateValueNames() {
        let regex = /%\{.*?\}/g // pattern to find template values ( %{ } )
        let templateCopy = this.raw
        // search for all templates with regex pattern and replace brackets
        return [...templateCopy.matchAll(regex)].map(e =>
            e[0].replace("%{", "").replace("}", "")
        )
    }

    /**
     * This returns an array which contains tupels of this form:
     *
     * `[ ("plain" || "template_value") , content ]`
     *
     * The first value describes, if the element is pure plaintext
     * or if it is a template value. The second element contains the
     * actual string (plaintext or template value name, respectively)
     *
     * This can be used to render out React components to display commands.
     *
     * @returns String
     */
    get markedArray() {
        let regex = /(%\{.*?\})/g // pattern to find template values ( %{ } )
        let templateCopy = this.raw

        // the following regex pattern does not replace the matches
        return templateCopy.split(regex).map(e => {
            // check if e is a template value
            if (regex.test(e)) {
                return ["template_value", e.replace("%{", "").replace("}", "")]
            } else {
                return ["plain", e]
            }
        })
    }
}
