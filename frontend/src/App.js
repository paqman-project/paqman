import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"
import Header from "./container/Header"
import PreperationPage from "./pages/PreperationPage"
import CommandViewPage from "./pages/CommandViewPage"
import AttackViewPage from "./pages/AttackViewPage"
import PerformAttackPage from "./pages/PerformAttackPage"
import NotImplemented from "./components/NotImplemented"
import NotFound from "./components/NotFound"

export default function App() {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header />
            <div className="flex-1 h-full">
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/prepare/" />
                        </Route>
                        <Route path="/prepare">
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
                        <Route path="/editor">
                            <NotImplemented />
                        </Route>
                        {/* Fallback (404 page) */}
                        <Route path="/">
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}
