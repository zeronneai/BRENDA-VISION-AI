# Brenda Fitness — Screen Structure Reference
> Migration package. This document describes WHAT each screen shows and HOW it
> behaves — without any CSS class names from the old project. Use this to
> rebuild each screen in the new project with its own design system.

---

## 1. Onboarding (5 steps, full-screen, no bottom nav)

Gates the app: if `user.onboarded === false`, redirect to onboarding before
anything else. On completion, call `completeOnboarding(formData)` which sets
`user.onboarded = true` and saves to persistent storage.

A progress bar at the top shows `(currentStep + 1) / totalSteps` as a
percentage fill. A back chevron appears from step 2 onward. A "Continuar"
button at the bottom advances to the next step; it's disabled when the current
step's required fields are empty. Steps slide in from the right when going
forward, from the left when going back.

### Step 0 — Welcome
- App logo / brand mark
- App name and tagline
- 3 feature pills: "Rutinas Pro", "Nutrición", "Bienestar" (❌ do NOT say "IA Coach")
- No required input — "Continuar" always enabled

### Step 1 — Profile
Required: name (free text). Optional but recommended: age, gender, weight +
unit toggle (kg/lb), height + unit toggle (cm/ft). The unit toggles are inline
buttons next to their respective number inputs.

### Step 2 — Goal
Single-select grid. Each option: emoji + label + short description.
Options live in `onboardingGoals` from `data/onboarding.js`.
Selected item shows a checkmark. Required to proceed.

### Step 3 — Level
Same single-select pattern. Options in `onboardingLevels`.
Tagline under heading: "Seré honesta: sin juzgarte 💕". Required to proceed.

### Step 4 — Schedule (final step)
Grid of day-count options (2–6 days/week), from `onboardingDaysOptions`.
Below the grid: a tip card from Brenda (static text, see below).
**No "Continuar" button** — instead a large primary "¡Comenzar mi
transformación!" CTA that calls `completeOnboarding()`.

> Tip text: "Recuerda: 3 días consistentes valen más que 6 días caóticos.
> Lo importante es que lo hagas de verdad."

---

## 2. Home (dashboard, default tab)

### Header section
- Dynamic greeting based on time of day:
  - Before 12:00 → "¡Buenos días ☀️"
  - 12:00–17:59 → "¡Buenas tardes 🌤️"
  - 18:00+ → "¡Buenas noches 🌙"
- User's first name pulled from `user.name`
- Notification bell icon (badge dot — for future use, no action yet)

### Stats row (3 cards)
| Card | Value | How it's calculated |
|---|---|---|
| Racha 🔥 | `streak` | See LOGIC.md |
| Esta semana 💪 | `weeklyWorkouts` | See LOGIC.md |
| Total 🏆 | `totalWorkouts` | `Object.keys(workoutLog).length` |

### Today's workout card
Shows `workouts[0]` (first workout in array) as the daily suggestion.
Displays: title, subtitle, duration (min), calories (kcal), exercise count,
difficulty badge.
Two buttons: "Iniciar" (navigates to WorkoutDetail) and "Marcar hecho"
(calls `logWorkout` for today). Once marked, "Marcar hecho" becomes a
green "✓ Listo" indicator. Check `workoutLog[today]` to determine initial state.

### Quick actions (2×2 grid)
Navigate to: Nutrición, Calendario, Progreso, and one more section of your
choosing (the old app had an AI chat — **replace with something else**, e.g.
"Mis Programas", "Tips del día", or "Retos").

### My Goal card
Shows a label derived from `user.goal` (map goal IDs to human labels),
a progress bar: `weeklyWorkouts / user.workoutDays` capped at 100%,
and a link to Profile/Settings.

Goal ID → label mapping:
```
perder_grasa  → 'Perder grasa'
ganar_musculo → 'Ganar músculo'
tonificar     → 'Tonificar'
glutos        → 'Glúteos'
resistencia   → 'Resistencia'
bienestar     → 'Bienestar'
```

### Brenda's quote card
A random quote from `motivationalQuotes` (picked once on component mount).
Format: brand icon + "Brenda dice:" label + quote text in italics.

### Recommended workouts list
`workouts.slice(1, 4)` — shows 3 workouts below the featured one.
Each row: gradient thumbnail with emoji, title, duration + calories + difficulty,
rating. Tapping navigates to WorkoutDetail.

### Weekly activity chart
7 columns for Mon–Sun of the current week. Each column: a bar that is
"filled" (tall, brand color) if `workoutLog[dateKey]` exists for that day,
or "empty" (short, muted) if not. Today's day label is highlighted.

---

## 3. Training

### Sub-tabs
Two tabs at the top: **Rutinas** and **Programas**.

### Rutinas tab

**Search bar** — filters workouts by title or category (case-insensitive).

**Category pills** (horizontal scroll) — one per `workoutCategories` entry plus
an "all" pill. Active pill is highlighted. Filters the list below.

**Featured workout** — shown only when category = "all" AND search is empty.
Displays the first workout (`workouts[0]`) as a large hero card with gradient,
emoji, badges (DESTACADO ⭐), title, description excerpt, duration/calories/rating.
Tapping navigates to WorkoutDetail.

**Workout list** — cards for each filtered workout. Each card shows:
gradient thumbnail, title, "NUEVO" badge if `isNew`, subtitle, duration,
calories, difficulty badge (color-coded: green=principiante, yellow=intermedio,
red=avanzado), star rating. Tapping navigates to WorkoutDetail.

Empty state: icon + "No se encontraron rutinas" message.

### Programas tab

A descriptive subtitle: "Programas de entrenamiento diseñados por Brenda para
objetivos específicos."

One card per entry in `programs`. Each card: gradient background, emoji,
title, goal subtitle, description, metadata row (N semanas, Nx/semana, level),
"Empezar programa" button (navigation/linking to be implemented by new project).

---

## 4. WorkoutDetail (navigated to from Training or Home)

Route parameter: workout `id` (integer). Look up in `workouts` array.
If not found, show a "not found" state with a back button.

### Hero section (full-width, gradient from workout.gradient)
- Back button (top-left) → `navigate(-1)`
- Difficulty badge + category badge
- Title (large), subtitle
- Stats row: duration, calories, rating + review count
- Large emoji watermark in background (decorative)

### Completion button
Check `workoutLog[today]`:
- If NOT done: show "Marcar como completado" primary button.
  On tap: call `logWorkout(today, { workoutId, title, calories })`, update local state.
- If done (either already in log or just completed): show a green success card
  "¡Excelente trabajo! · Entrenamiento completado hoy". No button.

### Content sections (in order)
1. **Descripción** — `workout.description` paragraph
2. **Equipamiento** — `workout.equipment` as tag pills
3. **Calentamiento 🔥** — `workout.warmup` as numbered list
4. **Ejercicios 💪 (N)** — accordion list, each item:
   - Header: number badge, exercise name, "N series × N reps · Descanso: Xs"
   - Expanded panel: sets/reps/rest as tags, "Músculos trabajados" info box,
     "Consejo técnico" info box, video placeholder (static placeholder — video
     feature not yet implemented, just show a play-icon placeholder)
5. **Enfriamiento 🧘** — `workout.cooldown` as numbered list

---

## 5. Nutrition

### Sub-tabs
Three tabs: **Planes**, **Recetas**, **Suplementos**.

### Planes tab (default)

**Macro tip card** — Static Brenda tip:
> "El 80% de tus resultados vienen de la cocina. Elige el plan que mejor se
> adapte a tu objetivo y síguelo con consistencia."

**Macro quick-calc widget** — dynamically computes from user profile.
See LOGIC.md → Macro Calculator for the exact formulas.
Displays 4 values: Calorías, Proteína, Carbs, Grasas.
Subtitle: "Basado en tu peso de X kg/lb y objetivo".

**Plan cards** — one per `mealPlans` entry. Each card: gradient background,
emoji, name, goal subtitle, description, 4 macro badges (Kcal, Prot, Carbs,
Grasas). Tapping opens the Plan Detail inline (no new route — swap the view
within the same tab with a "back" button).

**Plan Detail view** (replaces plan list when a plan is selected):
- Back button "← Volver a planes"
- Plan header card with gradient + macro grid (4 badges)
- Hydration reminder card (2-3 litros/día)
- "Plan del día" section: one accordion card per meal. Header: time + meal name
  + total calories. Expanded: food list with item name, quantity, calories per
  item; total row at bottom.
- "Suplementos recomendados" card: list of `plan.supplements`
- "Tips de Brenda" card: `plan.tips` as checkmark list

### Recetas tab

**Category filter pills** — "Todos | Desayuno | Almuerzo | Cena | Bebidas".
Filters `recipes` by `category`.

**Recipe grid** (2 columns) — each card: large emoji, name, time badge,
difficulty badge, calorie count. Tapping opens Recipe Detail inline.

**Recipe Detail view**:
- Back button
- Header: emoji, name, category/time/difficulty badges, 4 macro badges
- "Ingredientes 🛒" card: bullet list
- "Preparación 👩‍🍳" card: numbered steps with step-number circles

### Suplementos tab

**Disclaimer card** — static warning text:
> "Los suplementos complementan una buena alimentación, no la reemplazan.
> Consulta con un profesional de salud antes de iniciar cualquier suplementación."

**Supplement list** — one card per `supplementGuide` entry. Each card:
colored icon square (use `supp.color` to pick accent), emoji, name, benefit
description, two tags: dose and timing.

---

## 6. Calendar

### Month header
- Current month name + year
- Previous / Next month chevrons
- Today's date highlighted

### Calendar grid (7-column, Mon–Sun)
- Each day cell: day number. If `workoutLog[dateKey]` exists → filled/active
  state. Today → highlighted border/bg. Tap on a past day to toggle log entry
  (or just read-only — implementation choice).

### Streak card
Current streak value (see LOGIC.md) displayed prominently.
Optional: "longest streak" stat from full history.

### Achievement badges
Static set of unlockable badges based on milestones:
| Badge | Condition |
|---|---|
| 🔥 Primera semana | totalWorkouts >= 3 |
| 💪 Mes completo | totalWorkouts >= 12 |
| ⭐ Racha de 7 días | streak >= 7 |
| 🏆 50 entrenamientos | totalWorkouts >= 50 |
| 💎 Racha de 30 días | streak >= 30 |
| 🌟 100 entrenamientos | totalWorkouts >= 100 |

Locked badges appear dimmed. Each badge: emoji, name, description.

### Recent activity list
Last 5 entries from `workoutLog` (sorted descending by date), showing date
and workout title if stored.

---

## 7. Progress

### Log entry form (add measurement)
Fields: weight (number, uses user's preferred unit), optional notes (text).
"Agregar" button calls `addProgressEntry({ weight, notes })`.

### Weight chart
Line chart of `progressLog` entries over time (x = date, y = weight).
Use Recharts `LineChart` or any chart library available in the new project.
Show the last 30 entries at most. Handle empty state with a placeholder.

### Measurement cards (latest values)
If `progressLog.length > 0`, show the most recent entry's weight.
Show delta from previous entry (▲ or ▼ with value and direction).

### History list
All `progressLog` entries in reverse-chronological order. Each row: date,
weight value, notes if present, delete button (calls `deleteProgressEntry(id)`).
Confirm before deleting.

### Photo placeholder section
"Fotos de progreso" section — NOT YET IMPLEMENTED. Show a placeholder card
with text "Próximamente: sube fotos de tu progreso" and a camera icon.

---

## 8. Profile / Settings

### User card (top)
Shows avatar placeholder (or user photo if implemented), user name, goal label,
member-since date (`user.createdAt` formatted as "Miembro desde [Month Year]").

### Settings groups

**Mi cuenta**
- Nombre (editable text field, auto-saves on blur)
- Objetivo (select from onboardingGoals)
- Nivel (select from onboardingLevels)
- Días de entrenamiento (number 2–6)

**Medidas**
- Peso actual (number input) + unit toggle (kg/lb)
- Altura (number input) + unit toggle (cm/ft)

**Notificaciones** (toggles)
- Recordatorio de entrenamiento (bool)
- Hora del recordatorio (time picker, shown when reminder is on)
- Alertas de racha (bool)
- Reporte semanal (bool)

**Acerca de**
- Row: Política de privacidad → link to /privacy or external URL
- Row: Versión de la app (static text, e.g. "1.0.0")

### Reset / Danger zone
- "Reiniciar progreso" → clears workoutLog and progressLog (confirm dialog)
- "Empezar de nuevo" → clears ALL user data, returns to onboarding (confirm dialog)

---

## Navigation (Bottom Tab Bar)

5 tabs (or fewer if AI chat is removed):
| Tab | Route | Icon suggestion |
|---|---|---|
| Inicio | / or /home | Home icon |
| Rutinas | /training | Dumbbell icon |
| Nutrición | /nutrition | Apple / Fork icon |
| Calendario | /calendar | Calendar icon |
| Perfil | /profile | User icon |

❌ **DO NOT add an "IA" or chat tab.** The old project had a 6th tab called
"Brenda IA" — this is intentionally excluded in the new project.
