# Brenda Fitness — Business Logic Reference
> Migration package. Exact formulas and algorithms to replicate in the new project.

---

## 1. Persistent State Shape

Everything lives in localStorage (or equivalent). Keys and default values:

```js
// Key: 'bf_user'
const DEFAULT_USER = {
  onboarded: false,
  name: '',
  age: '',
  gender: 'female',   // 'female' | 'male' | 'other'
  height: '',
  weight: '',
  weightUnit: 'kg',   // 'kg' | 'lb'
  heightUnit: 'cm',   // 'cm' | 'ft'
  goal: '',           // see onboardingGoals IDs
  level: 'principiante',
  workoutDays: 3,
  avatar: null,
  createdAt: null,    // ISO string, set when onboarding completes
}

// Key: 'bf_workout_log'  — object keyed by ISO date string (YYYY-MM-DD)
const workoutLog = {
  '2026-05-01': { workoutId: 1, title: 'Glúteos en Fuego', calories: 320, completedAt: '2026-05-01T14:00:00.000Z' },
  '2026-05-03': { workoutId: 2, title: 'HIIT Quema Calorías', calories: 450, completedAt: '...' },
  // ...
}

// Key: 'bf_progress_log'  — array of entries, newest first
const progressLog = [
  { id: 1234567890, date: '2026-05-01T09:00:00.000Z', weight: 63.5, notes: 'Me siento bien' },
  // ...
]

// Key: 'bf_settings'
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
  },
}
```

### Storage helpers (copy as-is)
```js
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
```

**Performance note:** if saving chat or other high-frequency data, debounce
the save with a 600ms timer (using useRef) to avoid excessive writes on every
keystroke or streaming chunk.

---

## 2. Workout Logging

```js
// Log a completed workout for a given date
function logWorkout(date, workoutData) {
  const dateKey = date || new Date().toISOString().split('T')[0]
  setWorkoutLog(prev => ({
    ...prev,
    [dateKey]: {
      ...(prev[dateKey] || {}),
      ...workoutData,
      completedAt: new Date().toISOString(),
    },
  }))
}

// Remove a log entry (used in calendar for un-marking a day)
function removeWorkoutLog(date) {
  setWorkoutLog(prev => {
    const updated = { ...prev }
    delete updated[date]
    return updated
  })
}
```

Date key format: `new Date().toISOString().split('T')[0]` → `"YYYY-MM-DD"`.

---

## 3. Streak Calculation

The streak counts consecutive days worked out, walking backwards from today.
**One rest-day gap is tolerated** (i.e., if you worked out Mon + Wed but not
Tue, that still counts as a 3-day streak if Tue is the only missing day and
you have entries on both sides).

```js
function getStreak(workoutLog) {
  const today = new Date()
  let streak = 0
  let checkDate = new Date(today)

  while (true) {
    const key = checkDate.toISOString().split('T')[0]
    if (workoutLog[key]) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      // Allow 1 rest-day gap
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
}
```

---

## 4. Weekly Workouts Count

Count how many unique days in the last 7 days (including today) have a log entry.

```js
function getWeeklyWorkouts(workoutLog) {
  const today = new Date()
  let count = 0
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().split('T')[0]
    if (workoutLog[key]) count++
  }
  return count
}
```

---

## 5. Macro Calculator

Used in the Nutrition screen's "Tus macros estimados" widget. Inputs come
from the user profile stored in context/state.

```js
function calculateMacros(user) {
  // Normalize weight to kg
  const weight = parseFloat(user?.weight) || 65
  const unit = user?.weightUnit || 'kg'
  const weightKg = unit === 'lb' ? weight * 0.453592 : weight

  const goal = user?.goal || 'tonificar'

  // Protein: 1.8g per kg of body weight (flat rate for all goals)
  const protein = Math.round(weightKg * 1.8)

  // Calorie multiplier by goal
  const multiplierByGoal = {
    perder_grasa:  26,   // deficit
    ganar_musculo: 35,   // surplus
    tonificar:     30,   // maintenance
    glutos:        32,   // slight surplus for muscle growth
    resistencia:   30,
    bienestar:     28,
  }
  const multiplier = multiplierByGoal[goal] ?? 30
  const calories = Math.round(weightKg * multiplier)

  // Carbs: 40% of calories, 4 kcal per gram
  const carbs = Math.round((calories * 0.40) / 4)

  // Fats: 30% of calories, 9 kcal per gram
  const fats = Math.round((calories * 0.30) / 9)

  return { calories, protein, carbs, fats }
}
```

Display format:
- Calorías: `${calories} kcal`
- Proteína: `${protein}g`
- Carbs: `${carbs}g`
- Grasas: `${fats}g`

---

## 6. Progress Log Operations

```js
// Add a new measurement entry (newest first)
function addProgressEntry(entry) {
  const newEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...entry,   // { weight, notes? }
  }
  setProgressLog(prev => [newEntry, ...prev])
}

// Delete an entry by id
function deleteProgressEntry(id) {
  setProgressLog(prev => prev.filter(e => e.id !== id))
}
```

---

## 7. Onboarding Completion

```js
function completeOnboarding(userData) {
  const newUser = {
    ...DEFAULT_USER,
    ...userData,
    onboarded: true,
    createdAt: new Date().toISOString(),
  }
  setUser(newUser)
  // setUser triggers the persistence effect → saves to localStorage
}
```

---

## 8. Weekly Activity Chart Data

Used on the Home screen chart. Maps Mon–Sun of the current week to log states.

```js
function getWeekChartData(workoutLog) {
  const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
  const today = new Date()
  const dayOfWeek = today.getDay() // 0=Sun…6=Sat
  // Find Monday of current week
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek === 0 ? 7 : dayOfWeek) - 1))

  return labels.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = d.toISOString().split('T')[0]
    const isToday = key === today.toISOString().split('T')[0]
    const done = !!workoutLog[key]
    const isFuture = d > today
    return { label, done, isToday, isFuture, dateKey: key }
  })
}
// Render: done → tall filled bar; isFuture → short muted bar; else → short dim bar
// isToday → highlight the day label
```

---

## 9. Achievement Badge Unlock Conditions

```js
const achievements = [
  { id: 'first_week',  emoji: '🔥', name: 'Primera semana',    desc: '3 entrenamientos completados',   condition: (streak, total) => total >= 3 },
  { id: 'month',       emoji: '💪', name: 'Mes completo',       desc: '12 entrenamientos completados',  condition: (streak, total) => total >= 12 },
  { id: 'streak_7',    emoji: '⭐', name: 'Racha de 7 días',    desc: '7 días seguidos entrenando',     condition: (streak, total) => streak >= 7 },
  { id: 'total_50',    emoji: '🏆', name: '50 entrenamientos',  desc: '50 sesiones completadas',        condition: (streak, total) => total >= 50 },
  { id: 'streak_30',   emoji: '💎', name: 'Racha de 30 días',   desc: '30 días seguidos entrenando',    condition: (streak, total) => streak >= 30 },
  { id: 'total_100',   emoji: '🌟', name: '100 entrenamientos', desc: '100 sesiones completadas',       condition: (streak, total) => total >= 100 },
]
// Usage: achievements.map(a => ({ ...a, unlocked: a.condition(streak, totalWorkouts) }))
```

---

## ❌ What NOT to bring

The following features existed in the old project and must be **excluded** from
the new project entirely:

| Feature | Files/location in old project | Why excluded |
|---|---|---|
| AI chat page | `src/pages/BrendaAI.jsx` | No chat feature in new project |
| SSE streaming endpoint | `api/chat.js`, `server.js /api/chat` | No AI backend |
| Chat history state | `chatHistory`, `addChatMessage`, `updateChatMessage`, `clearChatHistory` in AppContext | No chat |
| `ENDPOINTS.chat` call in AppContext | `useEffect` that pings `/api/chat` to check for API key | No AI |
| "Brenda IA" tab in bottom nav | `BottomNav.jsx` (old tab at index 4) | No AI tab |
| "IA Coach" feature pill in Onboarding welcome | Step 0 of Onboarding | No AI branding |
| API key configuration in Profile | Profile settings group "Configuración API" | No AI |
| `apiKeySet` state | AppContext | No AI |
| Privacy policy AI/Anthropic section | `src/pages/Privacy.jsx` section 4 | Update for new context |
| Any use of word "IA" or "AI" in user-facing copy | Throughout all pages | Brand decision |
| `@anthropic-ai/sdk` dependency | `package.json` | No AI |
| Anthropic/Claude mentions | Any file | No AI |
