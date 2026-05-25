# Brenda Fitness — Migration Package
> Hand this folder to the Claude Code instance working on the new project.

---

## What's in this package

| File | Contents |
|---|---|
| `data/workouts.js` | 8 workouts (all exercises/sets/reps/tips), 3 multi-week programs, 8 motivational quotes |
| `data/nutrition.js` | 3 meal plans (5 meals each, food-by-food breakdown), 6 recipes (ingredients + steps), 6 supplement entries |
| `data/onboarding.js` | Goal options, level options, schedule options, DEFAULT_USER shape |
| `SCREENS.md` | Every screen: what it shows, what sections it has, how it navigates — no old CSS |
| `LOGIC.md` | All business logic: streak algo, macro calculator formula, workout logging, storage shape, weekly chart |

---

## Instructions for the receiving Claude Code instance

### 1. Copy the data files
Place `data/workouts.js`, `data/nutrition.js`, and `data/onboarding.js` into
`src/data/` in the new project. They are self-contained ES module exports —
no dependencies, no styles.

### 2. Read SCREENS.md before building each page
It describes every screen's structure and navigation flow in plain terms.
Apply the new project's design system when implementing — do NOT copy old
CSS class names.

### 3. Read LOGIC.md for all algorithms
Contains copy-pasteable JS functions for: streak calculation, weekly count,
macro calculator, workout logging, progress log operations, weekly chart
data, and achievement badge conditions.

### 4. Screens to build (5 total)
- Home (dashboard)
- Training (workout library + programs)
- WorkoutDetail (routed by workout ID)
- Nutrition (meal plans + recipes + supplements)
- Calendar (monthly log view + streaks + badges)
- Progress (weight chart + history)
- Profile / Settings
- Onboarding (5-step gate, runs before app on first launch)

### 5. Bottom navigation: 5 tabs
Home · Rutinas · Nutrición · Calendario · Perfil
❌ No "IA" or chat tab.

---

## ❌ Do NOT bring from the old project

- **AI chat** — the `BrendaAI` page, SSE streaming, Anthropic SDK, chat history state
- **The word "IA"** anywhere in user-facing text
- **"IA Coach"** pill in onboarding welcome screen → replace with something else
  (e.g. "Seguimiento", "Progreso", "Comunidad")
- **API key configuration** in Profile settings
- **`apiKeySet` state** in AppContext
- **Claude / Anthropic mentions** anywhere
- **Old CSS classes** — use the new project's design system

---

## App state summary

The app uses React Context + localStorage. The minimum state needed:

| State key | Type | Description |
|---|---|---|
| `user` | object | Profile + preferences from onboarding |
| `workoutLog` | object | `{ 'YYYY-MM-DD': { workoutId, title, calories, completedAt } }` |
| `progressLog` | array | `[{ id, date, weight, notes }]` newest first |
| `settings` | object | Units, notifications, theme |

See LOGIC.md §1 for exact default shapes and localStorage key names.

---

## Quick-start checklist for the new project

- [ ] Copy `src/data/workouts.js`, `src/data/nutrition.js`, `src/data/onboarding.js`
- [ ] Set up AppContext with user, workoutLog, progressLog, settings state
- [ ] Implement `logWorkout`, `removeWorkoutLog`, `addProgressEntry`, `deleteProgressEntry`
- [ ] Implement `getStreak`, `getWeeklyWorkouts`, `getTotalWorkouts` (see LOGIC.md)
- [ ] Build Onboarding (5 steps) gated by `user.onboarded`
- [ ] Build Home dashboard
- [ ] Build Training + WorkoutDetail
- [ ] Build Nutrition (Planes + Recetas + Suplementos)
- [ ] Build Calendar
- [ ] Build Progress
- [ ] Build Profile/Settings
- [ ] Wire up bottom nav (5 tabs, no AI tab)
