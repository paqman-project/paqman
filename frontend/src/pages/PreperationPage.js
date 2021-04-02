import React from "react"
import { useRouteMatch, Switch, Route } from "react-router-dom"
import Sidebar from "../container/Sidebar"
import AttackListView from "../views/AttackListView"
import AttackByParameterView from "../views/AttackByParameterView"
import CommandListView from "../views/CommandListView"
import CommandByParameterView from "../views/CommandByParameterView"
import AboutView from "../views/AboutView"

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
