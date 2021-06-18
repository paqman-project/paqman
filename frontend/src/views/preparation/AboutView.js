import React from "react"
import Card from "../../components/Card"
import logo from "../../img/logo_v2.svg"

export default function AboutView() {
    return (
        <div className="font-raleway">
            {/*
                <ViewHeading title="About PAQMAN" />
            */}

            {/* Logo */}
            <div className="w-2/3 mx-auto max-w-md mt-20">
                <img src={logo} alt="PAQMAN logo full" />
            </div>

            {/* Important infos (subtitle) */}
            <div className="p-2 m-4 text-center text-lg">
                <p>Version v0.1.0</p>
            </div>

            {/* Cards with information */}
            <div className="w-5/6 mx-auto mt-12">
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
                    <Card title="What is PAQMAN?">
                        <div className="text-center">
                            Mehr Senf
                            </div>
                    </Card>
                    <Card title="How do you use it?">
                        <div>
                            <p>Senf</p>
                        </div>
                    </Card>
                    <Card title="Terminology">
                        <table className="text-left">
                            <tr>
                                <td className="font-bold">Command: </td>
                                <td className="p-2 pl-4">
                                    Well, just a command. This can be a binary, shell or any
                                    other executable with flags, values, etc.
                                    </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Attack: </td>
                                <td className="p-2 pl-4">
                                    An Attack bundles Commands statically to form a predefined
                                    sequence of actions. The Commands are preconfigured and
                                    ready to be executed.
                                    </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Parameter: </td>
                                <td className="p-2 pl-4">
                                    This is PAQMANs centerpiece. Parameters define abstract
                                    subgoals while executing a chain of Commands (e.g. an Attack).
                                    They provide context to usually stateless Commands.
                                    </td>
                            </tr>
                        </table>
                    </Card>
                    <Card title="Who made it?" className="place-self-start">
                        <div>
                            <p>
                                PAQMAN was developed as a project work by
                                Nadine Weber, Nicola Jäger and Leon Schmidt
                                as part of a project work at the University
                                of Applied Siences Offenburg.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="h-20"></div>

            </div>

        </div>
    )
}
