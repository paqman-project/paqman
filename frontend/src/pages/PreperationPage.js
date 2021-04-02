import React from "react"
import { useRouteMatch, Switch, Route } from "react-router-dom"
import Sidebar from "../container/Sidebar"
import AttackListView from "../views/preparation/AttackListView"
import AttackByParameterView from "../views/preparation/AttackByParameterView"
import CommandListView from "../views/preparation/CommandListView"
import CommandByParameterView from "../views/preparation/CommandByParameterView"
import AboutView from "../views/preparation/AboutView"

export default function PreperationPage() {
    
    const { path }  = useRouteMatch()

    return (
        <div className="h-full flex">
            <Sidebar />
            <Switch>
                <Route path={`${path}/attack/list`} component={AttackListView}/>
                <Route path={`${path}/attack/by-parameter`} component={AttackByParameterView} />
                <Route path={`${path}/command/list`} component={CommandListView}/>
                <Route path={`${path}/command/by-parameter`} component={CommandByParameterView} />
                <Route path={`${path}/about`} component={AboutView}/>
            </Switch>
        </div>
    )
}
