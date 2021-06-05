export default class Template {
    constructor(template) {
        this.raw = template
    }

    get plaintexts() {
        let regex = /%\{.*?\}/g // pattern to find template values ( %{ } )
        let templateCopy = this.raw
        // split the template copy at the patters to retreive everything
        // that is not template value
        return templateCopy.split(regex)
    }

    get templateValueNames() {
        let regex = /%\{.*?\}/g // pattern to find template values ( %{ } )
        let templateCopy = this.raw
        // search for all templates with regex pattern and replace brackets
        return [...templateCopy.matchAll(regex)].map(e =>
            e[0].replace("%{", "").replace("}", "")
        )
    }
}