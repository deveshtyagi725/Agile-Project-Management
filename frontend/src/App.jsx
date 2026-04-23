import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { useAuth } from './hooks/useAuth'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Notification } from './components/Notification'
import { Dashboard } from './pages/Dashboard'
import { ProjectDetails } from './pages/ProjectDetails'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import './index.css'

// Layout for authenticated pages
function AppContent() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header />
        <main className="flex-1 mt-20 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <Notification />
    </div>
  )
}

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Auth routes - always accessible */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route
        path="/*"
        element={isAuthenticated ? <AppContent /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  )
}

export default App
