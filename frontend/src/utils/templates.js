/**
 * Parses a template string. Returns an array containing all found
 * plaintext and an array containing all template value names.
 *
 * The return is meant to be destructured like this:
 * `const [ plaintexts, templateValueNames ] = parseTemplate(t)`
 *
 * @param {string} template The template string to parse
 * @returns {Array} Two arrays (found plaintexts, found template value names) in one array
 */
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

    return [templatePlaintextFound, templateValuesFound]
}
