import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
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
                    <Route path="/" exact >
                        <Redirect to="/prepare" />
                    </Route>
                    <Route path="/prepare" >
                        <PreperationPage />
                    </Route>
                    <Route path="/perform/:attackID">
                        <PerformAttackPage />
                    </Route>
                    <Route path="/attack/:attackID">
                        <AttackViewPage />
                    </Route>
                    <Route path="/command/:commandID">
                        <CommandViewPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
