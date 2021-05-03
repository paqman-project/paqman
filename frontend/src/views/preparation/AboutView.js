import React from "react"
import NotImplemented from "../../components/NotImplemented"
import ViewHeading from "../../components/ViewHeading"

export default function AboutView() {
    return (
        <div>
            <ViewHeading title="About PAQMAN" />
            <p className="mx-40 p-4 border-paqgreen-200 shadow-lg shadow-gray">
                <p className="">Default: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/></p>
                <p className="p-2"></p>
                <p className="font-sans">Sans: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/></p>
                    <p className="p-2"></p>
                <p className="font-serif">Serif: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/></p>
                    <p className="p-2"></p>
                <p className="font-mono">Mono: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/></p>
            </p>
            
        </div>
    )
}
