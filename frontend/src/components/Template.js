import React from "react"

export default function Template({ template, templateValues }) {

    const regex = /\%\{.*?\}/g
    const templateCopy = template

    const templateValuesFound = [...templateCopy.matchAll(regex)].map(e => 
        e[0].replace("%{", "").replace("}", "")
    )

    const templateSplit = templateCopy.split(regex)
    
    const templateArray = []
    for (let i = 0; i < templateValuesFound.length; i++) {
        templateArray.push(templateSplit[i])
        templateArray.push(
            <span 
                className="bg-red-500 p-1 m-1 rounded-lg"
            >
                { templateValuesFound[i] }
            </span>
        )
    }

    return (
        <div>
            <h1>{ templateArray }</h1>
        </div>
    )

}