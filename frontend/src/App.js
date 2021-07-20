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
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

export default function App() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <Router>
            <Header
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />
            <Sidebar collapsed={sidebarCollapsed} />
            <DndProvider backend={HTML5Backend}>
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
            </DndProvider>
        </Router>
    )
}
