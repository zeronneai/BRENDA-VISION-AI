/**
 * Static copy/content for the landing page. Centralized so the marketing
 * text can be tweaked without touching component markup.
 */
import type { ImageKey } from './images'

export interface Stat {
  number: string
  label: string
}

export const STATS: Stat[] = [
  { number: '10', label: 'SQUATS — para apagar la alarma' },
  { number: '0', label: 'EXCUSAS — la cámara no miente' },
  { number: '100%', label: 'PRIVADO — todo en tu dispositivo' },
  { number: '1', label: 'BRENDA — tu coach personal' },
]

export interface Step {
  /** lucide-react icon name resolved in the component */
  icon: 'Clock' | 'Bell' | 'Camera'
  index: string
  title: string
  description: string
}

export const STEPS: Step[] = [
  {
    icon: 'Clock',
    index: '01',
    title: 'PROGRAMA TU ALARMA',
    description: 'Elige hora, días y número de squats.',
  },
  {
    icon: 'Bell',
    index: '02',
    title: 'SUENA Y NO PARA',
    description: 'La alarma no se apaga sola. No hay snooze. No hay escape.',
  },
  {
    icon: 'Camera',
    index: '03',
    title: 'LA CÁMARA CUENTA',
    description: 'Haz tus squats reales. La IA los detecta y los cuenta.',
  },
]

export interface Screenshot {
  image: ImageKey
  label: string
  placeholder: string
}

export const SCREENSHOTS: Screenshot[] = [
  { image: 'screenshot_alarm_hero', label: 'Alarma activa', placeholder: '📱 SCREENSHOT 1 — ALARMA HERO' },
  { image: 'screenshot_camara_squats', label: 'Cámara contando squats', placeholder: '📱 SCREENSHOT 2 — CÁMARA SQUATS' },
  { image: 'screenshot_entrena', label: 'Brenda Fitness — Entrena', placeholder: '📱 SCREENSHOT 3 — ENTRENA' },
  { image: 'screenshot_nutricion_planes', label: 'Brenda Fitness — Nutrición', placeholder: '📱 SCREENSHOT 4 — NUTRICIÓN PLANES' },
  { image: 'screenshot_nutricion_recetas', label: 'Brenda Fitness — Recetas', placeholder: '📱 SCREENSHOT 5 — RECETAS' },
  { image: 'screenshot_nutricion_suplementos', label: 'Brenda Fitness — Suplementos', placeholder: '📱 SCREENSHOT 6 — SUPLEMENTOS' },
]

export interface Feature {
  emoji: string
  title: string
  description: string
}

export const PREMIUM_FEATURES: Feature[] = [
  { emoji: '🏋️', title: 'RUTINAS', description: 'Programas progresivos para glúteo, pierna, full body y core.' },
  { emoji: '🥗', title: 'NUTRICIÓN', description: 'Planes personalizados: definición, volumen, balance.' },
  { emoji: '👨‍🍳', title: 'RECETAS', description: 'Comidas reales, fáciles, ricas. Sin tortura.' },
  { emoji: '💊', title: 'SUPLEMENTOS', description: 'Qué tomar, cuánto, cuándo. Sin perderte.' },
  { emoji: '📊', title: 'PROGRESO', description: 'Tu evolución semana a semana con gráficas.' },
  { emoji: '🏆', title: 'LOGROS', description: 'Desbloquea metas. Mantén tu racha.' },
]

export interface Plan {
  badge: string
  badgeAccent: boolean
  name: string
  price: string
  period: string
  strikethrough?: string
  savings?: string
  benefits: string[]
  featured: boolean
}

export const PLANS: Plan[] = [
  {
    badge: 'FLEXIBLE',
    badgeAccent: false,
    name: 'PLAN MENSUAL',
    price: '$99 MXN',
    period: '/mes',
    benefits: [
      'Acceso completo a Brenda Fitness',
      'Rutinas, nutrición, recetas, suplementos',
      'Progreso y logros',
      'Actualizaciones constantes',
      'Cancela cuando quieras',
    ],
    featured: false,
  },
  {
    badge: '⭐ MEJOR PRECIO',
    badgeAccent: true,
    name: 'PLAN ANUAL',
    price: '$999 MXN',
    period: '/año',
    strikethrough: '$1,188 MXN',
    savings: 'Ahorra $189 MXN (2 meses gratis)',
    benefits: [
      'Todo lo del plan mensual',
      '2 meses gratis',
      'Plan favorito de las clientas',
      'Sin renovación obligatoria',
    ],
    featured: true,
  },
]

export interface Testimonial {
  quote: string
  name: string
  age: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Llevaba años sin poder despertarme temprano. En 2 semanas con Booty Alarm cambió mi rutina.',
    name: 'MARÍA',
    age: 28,
  },
  {
    quote: 'Las rutinas de Brenda son MAGIA. Mi glúteo cambió en un mes y nunca había sido tan consistente.',
    name: 'LAURA',
    age: 24,
  },
  {
    quote: 'Por fin una app que NO me deja hacer trampa con el snooze.',
    name: 'ANDREA',
    age: 31,
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: '¿La app realmente detecta los squats?',
    answer:
      'Sí. Usamos detección de poses con la cámara en tiempo real (MediaPipe). Cuenta cada repetición sin que puedas hacer trampa.',
  },
  {
    question: '¿Mi video se graba o se sube a internet?',
    answer:
      'NO. Todo el procesamiento es en tu dispositivo. No grabamos, no guardamos, no subimos absolutamente nada. Tu privacidad es total.',
  },
  {
    question: '¿Puedo cancelar la suscripción cuando quiera?',
    answer:
      'Sí. La suscripción se gestiona desde tu cuenta de Apple (App Store) o Google (Google Play). Cancelas en un tap.',
  },
  {
    question: '¿Funciona en Android?',
    answer:
      'Próximamente. Por ahora estamos lanzando en iPhone. Android viene en las próximas semanas.',
  },
  {
    question: '¿La alarma despierta si la app está cerrada?',
    answer:
      'En Android la alarma es nativa e imparable. En iPhone se programa como notificación y la app debe abrirse al sonar (limitación de iOS).',
  },
  {
    question: '¿Hay versión gratis?',
    answer:
      'Sí. La alarma con squats y los retos rápidos son GRATIS para siempre. El contenido premium de Brenda Fitness (rutinas, nutrición, etc.) requiere suscripción.',
  },
]

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Premium', href: '#premium' },
  { label: 'Precios', href: '#precios' },
  { label: 'FAQ', href: '#faq' },
]
