import React, { useState } from "react"
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
import Sidebar from "./container/Sidebar"
import ViewContainer from "./container/ViewContainer"

export default function App() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <Router>
            <Header setSidebarCollapsed={setSidebarCollapsed} />
            <Sidebar collapsed={sidebarCollapsed} />
            <ViewContainer sidebarCollapsed={sidebarCollapsed}>
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
            </ViewContainer>
        </Router>
    )
}
