import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import NewCommandView from "../views/editor/NewCommandView"

export default function EditorPage() {

    const { path } = useRouteMatch()

    return (
        <div className="p-4">
            <Switch>
                <Route path={`${path}/command/new`}>
                    <NewCommandView />
                </Route>
            </Switch>
        </div>
    )
}