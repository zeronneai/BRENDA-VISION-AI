import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/Layout'

const Onboarding = lazy(() => import('./pages/Onboarding'))
const Home = lazy(() => import('./pages/Home'))
const Training = lazy(() => import('./pages/Training'))
const Nutrition = lazy(() => import('./pages/Nutrition'))
const BrendaAI = lazy(() => import('./pages/BrendaAI'))
const CalendarPage = lazy(() => import('./pages/CalendarPage'))
const Progress = lazy(() => import('./pages/Progress'))
const Profile = lazy(() => import('./pages/Profile'))
const WorkoutDetail = lazy(() => import('./pages/WorkoutDetail'))

function AppRoutes() {
  const { user } = useApp()
  const isOnboarded = user?.onboarded

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {!isOnboarded ? (
          <>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training/:id" element={<WorkoutDetail />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/ai" element={<BrendaAI />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  )
}

function PageLoader() {
  return (
    <div className="app-container flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center animate-pulse-glow">
          <span className="text-2xl font-black text-white">BF</span>
        </div>
        <p className="text-gray-400 text-sm font-medium">Cargando...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="flex items-center justify-center min-h-screen bg-black">
          <AppRoutes />
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}
