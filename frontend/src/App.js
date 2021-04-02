import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./container/Header"
import PreperationPage from "./pages/PreperationPage"
import CommandViewPage from "./pages/CommandViewPage"
import AttackViewPage from "./pages/AttackViewPage"
import PerformAttackPage from "./pages/PerformAttackPage"

export default function App() {
    return (
        <div className="h-full w-full absolute top-0">
            <Header />
            <Router>
                <Switch>
                    <Route path="/prepare" component={PreperationPage} />
                    <Route path="/command/:commandID" component={CommandViewPage} />
                    <Route path="/attack/:attackID" component={AttackViewPage} />
                    <Route path="/perform/:attackID" component={PerformAttackPage} />
                </Switch>
            </Router>
        </div>
    )
}
