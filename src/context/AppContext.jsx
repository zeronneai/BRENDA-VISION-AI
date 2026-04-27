import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const AppContext = createContext(null)

const DEFAULT_USER = {
  onboarded: false,
  name: '',
  age: '',
  gender: 'female',
  height: '',
  weight: '',
  weightUnit: 'kg',
  heightUnit: 'cm',
  goal: '',
  level: 'principiante',
  workoutDays: 3,
  avatar: null,
  createdAt: null,
}

const DEFAULT_SETTINGS = {
  weightUnit: 'kg',
  heightUnit: 'cm',
  theme: 'dark',
  language: 'es',
  notifications: {
    workoutReminder: true,
    reminderTime: '07:00',
    streakAlerts: true,
    weeklyReport: true,
  }
}

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage('bf_user', DEFAULT_USER))
  const [settings, setSettings] = useState(() => loadFromStorage('bf_settings', DEFAULT_SETTINGS))
  const [workoutLog, setWorkoutLog] = useState(() => loadFromStorage('bf_workout_log', {}))
  const [progressLog, setProgressLog] = useState(() => loadFromStorage('bf_progress_log', []))
  const [chatHistory, setChatHistory] = useState(() => loadFromStorage('bf_chat_history', []))
  const [activeTab, setActiveTab] = useState('home')
  const [apiKeySet, setApiKeySet] = useState(false)

  // Check if server is configured with API key
  useEffect(() => {
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'ping' }] })
    })
      .then(r => r.json())
      .then(data => {
        setApiKeySet(!data.error?.includes('API key'))
      })
      .catch(() => setApiKeySet(false))
  }, [])

  // Persist to localStorage
  useEffect(() => { saveToStorage('bf_user', user) }, [user])
  useEffect(() => { saveToStorage('bf_settings', settings) }, [settings])
  useEffect(() => { saveToStorage('bf_workout_log', workoutLog) }, [workoutLog])
  useEffect(() => { saveToStorage('bf_progress_log', progressLog) }, [progressLog])
  // Debounce chat history saves to avoid hundreds of localStorage writes during streaming
  const chatSaveTimer = useRef(null)
  useEffect(() => {
    clearTimeout(chatSaveTimer.current)
    chatSaveTimer.current = setTimeout(() => saveToStorage('bf_chat_history', chatHistory), 600)
    return () => clearTimeout(chatSaveTimer.current)
  }, [chatHistory])

  // ── User Actions ──────────────────────────────────────────────────────────
  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }, [])

  const completeOnboarding = useCallback((userData) => {
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
      onboarded: true,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
  }, [])

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }, [])

  // ── Workout Log ───────────────────────────────────────────────────────────
  const logWorkout = useCallback((date, workoutData) => {
    const dateKey = date || new Date().toISOString().split('T')[0]
    setWorkoutLog(prev => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        ...workoutData,
        completedAt: new Date().toISOString()
      }
    }))
  }, [])

  const removeWorkoutLog = useCallback((date) => {
    setWorkoutLog(prev => {
      const updated = { ...prev }
      delete updated[date]
      return updated
    })
  }, [])

  // ── Streak Calculation ────────────────────────────────────────────────────
  const getStreak = useCallback(() => {
    const today = new Date()
    let streak = 0
    let checkDate = new Date(today)

    while (true) {
      const key = checkDate.toISOString().split('T')[0]
      if (workoutLog[key]) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        // Allow 1 rest day gap
        checkDate.setDate(checkDate.getDate() - 1)
        const prevKey = checkDate.toISOString().split('T')[0]
        if (workoutLog[prevKey] && streak > 0) {
          checkDate.setDate(checkDate.getDate() - 1)
          continue
        }
        break
      }
    }
    return streak
  }, [workoutLog])

  const getWeeklyWorkouts = useCallback(() => {
    const today = new Date()
    let count = 0
    for (let i = 0; i < 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const key = d.toISOString().split('T')[0]
      if (workoutLog[key]) count++
    }
    return count
  }, [workoutLog])

  const getTotalWorkouts = useCallback(() => {
    return Object.keys(workoutLog).length
  }, [workoutLog])

  // ── Progress Log ──────────────────────────────────────────────────────────
  const addProgressEntry = useCallback((entry) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...entry
    }
    setProgressLog(prev => [newEntry, ...prev])
  }, [])

  const deleteProgressEntry = useCallback((id) => {
    setProgressLog(prev => prev.filter(e => e.id !== id))
  }, [])

  // ── Chat History ──────────────────────────────────────────────────────────
  const addChatMessage = useCallback((message) => {
    setChatHistory(prev => [...prev, { ...message, id: Date.now(), timestamp: new Date().toISOString() }])
  }, [])

  // Update the content of an existing message in-place (used during streaming)
  const updateChatMessage = useCallback((id, content) => {
    setChatHistory(prev => prev.map(m => m.id === id ? { ...m, content } : m))
  }, [])

  const clearChatHistory = useCallback(() => {
    setChatHistory([])
  }, [])

  // ── Derived Data ──────────────────────────────────────────────────────────
  const streak = getStreak()
  const weeklyWorkouts = getWeeklyWorkouts()
  const totalWorkouts = getTotalWorkouts()
  const latestProgress = progressLog[0] || null

  const value = {
    // State
    user,
    settings,
    workoutLog,
    progressLog,
    chatHistory,
    activeTab,
    apiKeySet,
    // Derived
    streak,
    weeklyWorkouts,
    totalWorkouts,
    latestProgress,
    // Actions
    updateUser,
    completeOnboarding,
    updateSettings,
    logWorkout,
    removeWorkoutLog,
    addProgressEntry,
    deleteProgressEntry,
    addChatMessage,
    updateChatMessage,
    clearChatHistory,
    setActiveTab,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
