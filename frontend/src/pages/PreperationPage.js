import React from "react"
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"
import Sidebar from "../container/Sidebar"
import AttackListView from "../views/preparation/AttackListView"
import AttackByParameterView from "../views/preparation/AttackByParameterView"
import AttackNewView from "../views/preparation/AttackNewView"
import CommandListView from "../views/preparation/CommandListView"
import CommandByParameterView from "../views/preparation/CommandByParameterView"
import AboutView from "../views/preparation/AboutView"
import CommandNewView from "../views/preparation/CommandNewView"

export default function PreperationPage() {
    const { path } = useRouteMatch()

    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="w-full h-full p-4">
                <Switch>
                    <Route path={path} exact>
                        <Redirect to={`${path}/attack/list/`} />
                    </Route>
                    <Route path={`${path}/attack/list`}>
                        <AttackListView />
                    </Route>
                    <Route path={`${path}/attack/by-parameter`}>
                        <AttackByParameterView />
                    </Route>
                    <Route path={`${path}/attack/new`}>
                        <AttackNewView />
                    </Route>
                    <Route path={`${path}/command/list`}>
                        <CommandListView />
                    </Route>
                    <Route path={`${path}/command/by-parameter`}>
                        <CommandByParameterView />
                    </Route>
                    <Route path={`${path}/command/new`}>
                        <CommandNewView />
                    </Route>
                    <Route path={`${path}/about`}>
                        <AboutView />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
