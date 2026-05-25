// ============================================================
// BRENDA FITNESS — ONBOARDING OPTIONS DATA
// Migration package · These are the selectable options used
// in the onboarding flow (goals, levels, schedule).
// ============================================================

export const onboardingGoals = [
  { id: 'perder_grasa', label: 'Perder grasa',         emoji: '🔥', desc: 'Quiero reducir mi % graso y definir' },
  { id: 'ganar_musculo', label: 'Ganar músculo',        emoji: '💪', desc: 'Quiero aumentar masa muscular' },
  { id: 'tonificar',     label: 'Tonificar',            emoji: '✨', desc: 'Quiero definir y mejorar mi figura' },
  { id: 'glutos',        label: 'Trabajar glúteos',     emoji: '🍑', desc: 'Mi prioridad son los glúteos' },
  { id: 'resistencia',   label: 'Mejorar resistencia',  emoji: '❤️', desc: 'Quiero más stamina y salud cardio' },
  { id: 'bienestar',     label: 'Bienestar general',    emoji: '🌟', desc: 'Quiero sentirme mejor en general' },
]

export const onboardingLevels = [
  { id: 'principiante', label: 'Principiante', emoji: '⭐',     desc: 'Menos de 6 meses entrenando' },
  { id: 'intermedio',   label: 'Intermedio',   emoji: '⭐⭐',   desc: '6 meses a 2 años de experiencia' },
  { id: 'avanzado',     label: 'Avanzado',     emoji: '⭐⭐⭐', desc: 'Más de 2 años entrenando' },
]

export const onboardingDaysOptions = [
  { value: 2, label: '2 días', desc: 'Mínimo efectivo' },
  { value: 3, label: '3 días', desc: 'Ideal para empezar' },
  { value: 4, label: '4 días', desc: 'Muy bueno' },
  { value: 5, label: '5 días', desc: 'Avanzado' },
  { value: 6, label: '6 días', desc: 'Dedicación total' },
]

// User profile shape — what onboarding collects and stores
export const DEFAULT_USER = {
  onboarded: false,
  name: '',
  age: '',
  gender: 'female',      // 'female' | 'male' | 'other'
  height: '',
  weight: '',
  weightUnit: 'kg',      // 'kg' | 'lb'
  heightUnit: 'cm',      // 'cm' | 'ft'
  goal: '',              // one of onboardingGoals[].id
  level: 'principiante', // one of onboardingLevels[].id
  workoutDays: 3,        // number from onboardingDaysOptions
  avatar: null,
  createdAt: null,
}
