import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"
import Header from "./container/Header"
import PreperationPage from "./pages/PreperationPage"
import CommandViewerPage from "./pages/CommandViewerPage"
import AttackViewerPage from "./pages/AttackViewerPage"
import PerformAttackPage from "./pages/PerformAttackPage"
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
                        <Route path="/prepare" component={PreperationPage} />
                        <Route
                            path="/perform/:attackID"
                            component={PerformAttackPage}
                        />
                        <Route
                            path="/attack/:attackID"
                            component={AttackViewerPage}
                        />
                        <Route
                            path="/command/:commandID"
                            component={CommandViewerPage}
                        />
                        {/* Fallback (404 page) */}
                        <Route path="/" component={NotFound} />
                    </Switch>
                </Router>
            </div>
        </div>
    )
}
