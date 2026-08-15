import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Decisions from './pages/Decisions'
import Drift from './pages/Drift'
import Audit from './pages/Audit'
import History from './pages/History'
import NotFound from './pages/NotFound'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="decisions" element={<Decisions />} />
                    <Route path="drift" element={<Drift />} />
                    <Route path="audit" element={<Audit />} />
                    <Route path="history" element={<History />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
