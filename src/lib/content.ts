/**
 * Bilingual static content for the landing page. Data is stored as {es,en}
 * pairs and resolved to plain strings via getter functions that take the
 * current language, so components stay simple: `getStats(lang).map(...)`.
 */
import type { ImageKey } from './images'
import type { L, Lang } from './i18n'

// ─── Stats ───────────────────────────────────────────────────────────────
export interface Stat {
  number: string
  head: string
  sub: string
}

const STATS_DATA: { number: string; head: L; sub: L }[] = [
  { number: '10', head: { es: 'SQUATS', en: 'SQUATS' }, sub: { es: 'para apagar la alarma', en: 'to turn off the alarm' } },
  { number: '0', head: { es: 'EXCUSAS', en: 'EXCUSES' }, sub: { es: 'la cámara no miente', en: 'the camera never lies' } },
  { number: '100%', head: { es: 'PRIVADO', en: 'PRIVATE' }, sub: { es: 'todo en tu dispositivo', en: 'all on your device' } },
  { number: '1', head: { es: 'BRENDA', en: 'BRENDA' }, sub: { es: 'tu coach personal', en: 'your personal coach' } },
]

export const getStats = (lang: Lang): Stat[] =>
  STATS_DATA.map((s) => ({ number: s.number, head: s.head[lang], sub: s.sub[lang] }))

// ─── Steps ───────────────────────────────────────────────────────────────
export interface Step {
  icon: 'Clock' | 'Bell' | 'Camera'
  index: string
  title: string
  description: string
}

const STEPS_DATA: { icon: Step['icon']; index: string; title: L; description: L }[] = [
  {
    icon: 'Clock',
    index: '01',
    title: { es: 'PROGRAMA TU ALARMA', en: 'SET YOUR ALARM' },
    description: { es: 'Elige hora, días y número de squats.', en: 'Choose the time, days and number of squats.' },
  },
  {
    icon: 'Bell',
    index: '02',
    title: { es: 'SUENA Y NO PARA', en: "IT RINGS AND WON'T STOP" },
    description: {
      es: 'La alarma no se apaga sola. No hay snooze. No hay escape.',
      en: "The alarm won't turn off by itself. No snooze. No escape.",
    },
  },
  {
    icon: 'Camera',
    index: '03',
    title: { es: 'LA CÁMARA CUENTA', en: 'THE CAMERA COUNTS' },
    description: {
      es: 'Haz tus squats reales. La IA los detecta y los cuenta.',
      en: 'Do your real squats. The AI detects and counts them.',
    },
  },
]

export const getSteps = (lang: Lang): Step[] =>
  STEPS_DATA.map((s) => ({ icon: s.icon, index: s.index, title: s.title[lang], description: s.description[lang] }))

// ─── Screenshots ─────────────────────────────────────────────────────────
export interface Screenshot {
  image: ImageKey
  label: string
  placeholder: string
}

const SCREENSHOTS_DATA: { image: ImageKey; label: L; placeholder: string }[] = [
  { image: 'screenshot_alarm_hero', label: { es: 'Alarma activa', en: 'Active alarm' }, placeholder: '📱 SCREENSHOT 1' },
  { image: 'screenshot_camara_squats', label: { es: 'Cámara contando squats', en: 'Camera counting squats' }, placeholder: '📱 SCREENSHOT 2' },
  { image: 'screenshot_entrena', label: { es: 'Brenda Fitness — Entrena', en: 'Brenda Fitness — Train' }, placeholder: '📱 SCREENSHOT 3' },
  { image: 'screenshot_nutricion_planes', label: { es: 'Brenda Fitness — Nutrición', en: 'Brenda Fitness — Nutrition' }, placeholder: '📱 SCREENSHOT 4' },
  { image: 'screenshot_nutricion_recetas', label: { es: 'Brenda Fitness — Recetas', en: 'Brenda Fitness — Recipes' }, placeholder: '📱 SCREENSHOT 5' },
  { image: 'screenshot_nutricion_suplementos', label: { es: 'Brenda Fitness — Suplementos', en: 'Brenda Fitness — Supplements' }, placeholder: '📱 SCREENSHOT 6' },
]

export const getScreenshots = (lang: Lang): Screenshot[] =>
  SCREENSHOTS_DATA.map((s) => ({ image: s.image, label: s.label[lang], placeholder: s.placeholder }))

// ─── Premium features ────────────────────────────────────────────────────
export interface Feature {
  emoji: string
  title: string
  description: string
}

const PREMIUM_FEATURES_DATA: { emoji: string; title: L; description: L }[] = [
  { emoji: '🏋️', title: { es: 'RUTINAS', en: 'WORKOUTS' }, description: { es: 'Programas progresivos para glúteo, pierna, full body y core.', en: 'Progressive programs for glutes, legs, full body and core.' } },
  { emoji: '🥗', title: { es: 'NUTRICIÓN', en: 'NUTRITION' }, description: { es: 'Planes personalizados: definición, volumen, balance.', en: 'Personalized plans: cutting, bulking, balance.' } },
  { emoji: '👨‍🍳', title: { es: 'RECETAS', en: 'RECIPES' }, description: { es: 'Comidas reales, fáciles, ricas. Sin tortura.', en: 'Real, easy, tasty meals. No torture.' } },
  { emoji: '💊', title: { es: 'SUPLEMENTOS', en: 'SUPPLEMENTS' }, description: { es: 'Qué tomar, cuánto, cuándo. Sin perderte.', en: 'What to take, how much, when. No guesswork.' } },
  { emoji: '📊', title: { es: 'PROGRESO', en: 'PROGRESS' }, description: { es: 'Tu evolución semana a semana con gráficas.', en: 'Your week-by-week evolution with charts.' } },
  { emoji: '🏆', title: { es: 'LOGROS', en: 'ACHIEVEMENTS' }, description: { es: 'Desbloquea metas. Mantén tu racha.', en: 'Unlock goals. Keep your streak.' } },
]

export const getPremiumFeatures = (lang: Lang): Feature[] =>
  PREMIUM_FEATURES_DATA.map((f) => ({ emoji: f.emoji, title: f.title[lang], description: f.description[lang] }))

// ─── Pricing plans ───────────────────────────────────────────────────────
export interface Plan {
  badge: string
  badgeAccent: boolean
  name: string
  price: string
  period: string
  strikethrough?: string
  savings?: string
  description: string
  featured: boolean
}

const PLANS_DATA: {
  badge: L
  badgeAccent: boolean
  name: L
  price: string
  period: L
  strikethrough?: string
  savings?: L
  description: L
  featured: boolean
}[] = [
  {
    badge: { es: 'BÁSICO', en: 'BASIC' },
    badgeAccent: false,
    name: { es: 'ALARMA', en: 'ALARM' },
    price: '$9 USD',
    period: { es: '/mes', en: '/mo' },
    description: {
      es: 'Solo la alarma. Despierta haciendo squats, suena aunque tu teléfono esté en silencio.',
      en: 'Alarm only. Wake up doing squats, rings even when your phone is on silent.',
    },
    featured: false,
  },
  {
    badge: { es: '⭐ RECOMENDADO', en: '⭐ RECOMMENDED' },
    badgeAccent: true,
    name: { es: 'TODO INCLUIDO', en: 'ALL INCLUDED' },
    price: '$59 USD',
    period: { es: '/mes', en: '/mo' },
    description: {
      es: 'Alarma + planes de nutrición y entrenamiento con IA.',
      en: 'Alarm + AI nutrition and workout plans.',
    },
    featured: true,
  },
  {
    badge: { es: 'MEJOR PRECIO', en: 'BEST VALUE' },
    badgeAccent: false,
    name: { es: 'TODO INCLUIDO ANUAL', en: 'ALL INCLUDED — ANNUAL' },
    price: '$590 USD',
    period: { es: '/año', en: '/yr' },
    strikethrough: '$708 USD',
    savings: { es: 'Ahorra $118 USD (2 meses gratis)', en: 'Save $118 USD (2 months free)' },
    description: {
      es: 'Todo incluido, ahorra 2 meses.',
      en: 'Everything included, save 2 months.',
    },
    featured: false,
  },
]

export const getPlans = (lang: Lang): Plan[] =>
  PLANS_DATA.map((p) => ({
    badge: p.badge[lang],
    badgeAccent: p.badgeAccent,
    name: p.name[lang],
    price: p.price,
    period: p.period[lang],
    strikethrough: p.strikethrough,
    savings: p.savings?.[lang],
    description: p.description[lang],
    featured: p.featured,
  }))

// ─── Testimonials ────────────────────────────────────────────────────────
export interface Testimonial {
  quote: string
  name: string
  age: number
}

const TESTIMONIALS_DATA: { quote: L; name: string; age: number }[] = [
  {
    quote: {
      es: 'Llevaba años sin poder despertarme temprano. En 2 semanas con Booty Alarm cambió mi rutina.',
      en: "For years I couldn't wake up early. In 2 weeks with Booty Alarm my routine changed.",
    },
    name: 'MARÍA',
    age: 28,
  },
  {
    quote: {
      es: 'Las rutinas de Brenda son MAGIA. Mi glúteo cambió en un mes y nunca había sido tan consistente.',
      en: "Brenda's workouts are MAGIC. My glutes changed in a month and I've never been so consistent.",
    },
    name: 'LAURA',
    age: 24,
  },
  {
    quote: {
      es: 'Por fin una app que NO me deja hacer trampa con el snooze.',
      en: "Finally an app that WON'T let me cheat with snooze.",
    },
    name: 'ANDREA',
    age: 31,
  },
]

export const getTestimonials = (lang: Lang): Testimonial[] =>
  TESTIMONIALS_DATA.map((t) => ({ quote: t.quote[lang], name: t.name, age: t.age }))

// ─── FAQ ─────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string
  answer: string
}

const FAQ_DATA: { question: L; answer: L }[] = [
  {
    question: { es: '¿La app realmente detecta los squats?', en: 'Does the app really detect the squats?' },
    answer: {
      es: 'Sí. Usamos detección de poses con la cámara en tiempo real (MediaPipe). Cuenta cada repetición sin que puedas hacer trampa.',
      en: 'Yes. We use real-time pose detection with the camera (MediaPipe). It counts every rep with no way to cheat.',
    },
  },
  {
    question: { es: '¿Mi video se graba o se sube a internet?', en: 'Is my video recorded or uploaded to the internet?' },
    answer: {
      es: 'NO. Todo el procesamiento es en tu dispositivo. No grabamos, no guardamos, no subimos absolutamente nada. Tu privacidad es total.',
      en: 'NO. All processing happens on your device. We do not record, store or upload anything at all. Your privacy is total.',
    },
  },
  {
    question: { es: '¿Puedo cancelar la suscripción cuando quiera?', en: 'Can I cancel the subscription anytime?' },
    answer: {
      es: 'Sí. Gestionas tu suscripción desde tu cuenta en ecobrenda.vercel.app. Cancelas cuando quieras.',
      en: 'Yes. You manage your subscription from your account at ecobrenda.vercel.app. Cancel anytime.',
    },
  },
  {
    question: { es: '¿Funciona en Android?', en: 'Does it work on Android?' },
    answer: {
      es: 'Sí. Puedes descargar el APK de Android directamente desde esta página. La versión de iPhone llega muy pronto al App Store.',
      en: 'Yes. You can download the Android APK directly from this page. The iPhone version is coming very soon to the App Store.',
    },
  },
  {
    question: { es: '¿La alarma despierta si la app está cerrada?', en: 'Does the alarm wake you if the app is closed?' },
    answer: {
      es: 'En Android la alarma es nativa e imparable. En iPhone se programa como notificación y la app debe abrirse al sonar (limitación de iOS).',
      en: 'On Android the alarm is native and unstoppable. On iPhone it is scheduled as a notification and the app must open when it rings (an iOS limitation).',
    },
  },
  {
    question: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
    answer: {
      es: 'El plan Alarma cuesta $9 USD/mes (solo la alarma). El plan Todo Incluido suma nutrición y entrenamiento con IA por $59 USD/mes o $590 USD/año. Se gestiona desde ecobrenda.vercel.app.',
      en: 'The Alarm plan is $9 USD/mo (alarm only). The All Included plan adds AI nutrition and training for $59 USD/mo or $590 USD/yr. Managed from ecobrenda.vercel.app.',
    },
  },
]

export const getFaq = (lang: Lang): FaqItem[] =>
  FAQ_DATA.map((f) => ({ question: f.question[lang], answer: f.answer[lang] }))

// ─── Nav links ───────────────────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
}

const NAV_LINKS_DATA: { label: L; href: string }[] = [
  { label: { es: 'Cómo funciona', en: 'How it works' }, href: '#como-funciona' },
  { label: { es: 'Premium', en: 'Premium' }, href: '#premium' },
  { label: { es: 'Precios', en: 'Pricing' }, href: '#precios' },
  { label: { es: 'FAQ', en: 'FAQ' }, href: '#faq' },
]

export const getNavLinks = (lang: Lang): NavLink[] =>
  NAV_LINKS_DATA.map((n) => ({ label: n.label[lang], href: n.href }))
