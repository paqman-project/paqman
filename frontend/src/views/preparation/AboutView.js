import React from "react"
import Button from "../../components/Button"
import Card from "../../components/Card"
import logo from "../../img/logo_v2.svg"

export const version = "v0.1.0"

export default function AboutView() {
    return (
        <div className="font-raleway">
            {/*
                <ViewHeading title="About PAQMAN" />
            */}

            {/* Logo */}
            <div className="w-2/3 mx-auto max-w-md mt-12">
                <img src={logo} alt="PAQMAN logo full" />
            </div>

            {/* Cards with information */}
            <div className="w-5/6 mx-auto mt-12">
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 mx-auto max-w-7xl">
                    <Card title="What is it?">
                        <div className="text-center">
                            <p>
                                PAQMAN is a command line companion tool to improve your pentesting 
                                experience. It provides you with copy-pastable commands depending on 
                                the information you collect or already have to transform them into a 
                                successfull attack.
                            </p>
                            <p className="mt-4">
                                PAQMAN is kept as simple as possible to allow you to fully focus on your work.
                            </p>
                        </div>
                    </Card>
                    <Card title="How do you use it?">
                        <div>
                            <p>
                                If you want to search for predefined Attacks, use the <span className="font-bold">Attack List</span>.
                                <p>If you want to search for a single Command, use the <span className="font-bold">Command List</span>.</p>
                                The search engine indexes the kontex of an entry (title and description) so you can search for either of these. 
                                <p>For each of these you can also search by a specific parameter, use for this the 
                                <span className="font-bold"> Attack by Parameter</span> or <span className="font-bold">Command by Parameter</span> search.</p>
                                If you want to add a new Attack or Command, use the respective<span className="font-bold"> Add</span> button.
                            </p>
                        </div>
                    </Card>
                    <Card title="Terminology">
                        <table className="text-left divide-y-8 divide-transparent">
                            <tr>
                                <td className="font-bold align-top">Command </td>
                                <td className="pl-4">
                                    Well, just a command. This can be a binary, shell or any
                                    other executable with flags, values, etc.
                                    </td>
                            </tr>
                            <tr>
                                <td className="font-bold align-top">Attack </td>
                                <td className="pl-4">
                                    An Attack bundles Commands statically to form a predefined
                                    sequence of actions. The Commands are preconfigured and
                                    ready to be executed.
                                    </td>
                            </tr>
                            <tr>
                                <td className="font-bold align-top">Parameter </td>
                                <td className="pl-4">
                                    This is PAQMANs centerpiece. Parameters define abstract
                                    subgoals while executing a chain of Commands (e.g. an Attack).
                                    They provide context to usually stateless Commands.
                                    </td>
                            </tr>
                        </table>
                    </Card>
                    <Card title="Who made it?">
                        <div>
                            <p>
                                PAQMAN was developed as a project work by
                                Nadine Weber, Nicola Jäger and Leon Schmidt
                                as part of a project work at the University
                                of Applied Sciences Offenburg.
                            </p>
                            <p className="mt-10">
                                {"---> Insert GIF here <---"}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>

            <hr className="my-10 w-11/12 mx-auto"/>

            {/* Important infos (subtitle) */}
            <div className="text-center text-lg">
                <p>Version {version}</p>
                <div className="grid grid-cols-2 max-w-max mx-auto mt-4 gap-4">
                    <a 
                        href="https://git.leon.wtf/paqman/paqman" 
                        target="_blank" 
                        rel="noreferrer noopener"
                    >
                        <Button title="Gitlab" fullWidth important />
                    </a>
                    <a 
                        href="https://github.com/paqman-project/paqman" 
                        target="_blank" 
                        rel="noreferrer noopener"
                    >
                        <Button title="Github" fullWidth />
                    </a>
                </div>
            </div>

            <div className="h-12"></div>

        </div>
    )
}
