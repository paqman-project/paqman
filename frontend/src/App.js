import React from "react"
import Header from "./container/Header"
import Body from "./container/Body"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AboutView from "./views/AboutView"

export default function App() {
    return (
        <div className="h-full w-full absolute top-0">
            <Header />
            <Router>
                <Switch>
                    <Route path="/" exact component={Body} />
                    <Route path="/test" component={AboutView} />
                </Switch>
            </Router>
        </div>
    )
}
