/**
 * Bilingual content for the install-instructions modals, resolved by language.
 * - Android → APK download flow.
 * - iOS → "coming soon to the App Store" + install-as-PWA-from-Safari steps.
 */
import { PREMIUM_CHECKOUT_URL, STORE_LINKS, TESTFLIGHT_APP_STORE_URL } from './links'
import type { L, Lang } from './i18n'

export type Platform = 'ios' | 'android'

/** Lucide icon names resolved in the modal component. */
export type StepIcon =
  | 'Send'
  | 'ExternalLink'
  | 'CheckCircle2'
  | 'Compass'
  | 'Share'
  | 'Plus'
  | 'PenLine'
  | 'Rocket'
  | 'ShieldCheck'
  | 'Download'
  | 'UserPlus'

export interface InstallStep {
  icon: StepIcon
  title: string
  description: string
  note?: string
  button?: { label: string; href: string }
}

export interface InstallFlow {
  warning?: string
  steps: InstallStep[]
  cta: { label: string; href: string; variant: 'primary' | 'outline' }
  perks?: string[]
  footnotes?: string[]
}

export interface PlatformContent {
  headline: string
  subtitle: string
}

// ─── Internal bilingual data ───────────────────────────────────────────────
interface StepData {
  icon: StepIcon
  title: L
  description: L
  note?: L
  button?: { label: L; href: string }
}
interface FlowData {
  steps: StepData[]
  cta: { label: L; href: string; variant: 'primary' | 'outline' }
  perks?: L[]
  footnotes?: L[]
}

/**
 * Shared first step (both platforms): create your account + choose your plan on
 * the web, so the app isn't locked when opened. Presented as a multiplatform
 * web service, not "pay outside to unlock". The step number comes from the
 * badge in InstallFlowView, so titles carry no hardcoded numbers.
 */
const ACCOUNT_STEP: StepData = {
  icon: 'UserPlus',
  title: { es: 'CREA TU CUENTA Y ELIGE TU PLAN', en: 'CREATE YOUR ACCOUNT AND CHOOSE YOUR PLAN' },
  description: {
    es: 'Entra a ecobrenda.vercel.app, crea tu cuenta y elige tu plan. Tu acceso funciona en todos tus dispositivos: web, Android e iPhone.',
    en: 'Go to ecobrenda.vercel.app, create your account and choose your plan. Your access works on all your devices: web, Android, and iPhone.',
  },
  button: {
    label: { es: 'Ir a crear mi cuenta', en: 'Create my account' },
    href: PREMIUM_CHECKOUT_URL,
  },
}

const IOS_CONTENT_DATA: { headline: L; subtitle: L } = {
  headline: { es: '📱 CÓMO INSTALAR EN IPHONE', en: '📱 HOW TO INSTALL ON IPHONE' },
  subtitle: {
    es: 'Primero crea tu cuenta y plan; luego instala la app en tu iPhone vía TestFlight. Solo toma un minuto.',
    en: 'First create your account and plan; then install the app on your iPhone via TestFlight. It only takes a minute.',
  },
}

const IOS_FLOW_DATA: FlowData = {
  steps: [
    ACCOUNT_STEP,
    {
      icon: 'Send',
      title: { es: 'INSTALA TESTFLIGHT', en: 'INSTALL TESTFLIGHT' },
      description: {
        es: 'Descárgala del App Store: es la app oficial de Apple para probar apps.',
        en: "Download it from the App Store: it's Apple's official app for testing apps.",
      },
      button: { label: { es: 'Abrir App Store', en: 'Open App Store' }, href: TESTFLIGHT_APP_STORE_URL },
    },
    {
      icon: 'ExternalLink',
      title: { es: 'ABRE LA INVITACIÓN', en: 'OPEN THE INVITATION' },
      description: {
        es: 'Toca el botón de abajo para abrir la invitación de Booty Alarm en TestFlight.',
        en: "Tap the button below to open Booty Alarm's invitation in TestFlight.",
      },
    },
    {
      icon: 'CheckCircle2',
      title: { es: 'ACEPTA E INSTALA', en: 'ACCEPT AND INSTALL' },
      description: {
        es: 'En TestFlight, toca "Aceptar" e "Instalar". La app se descarga en segundos.',
        en: 'In TestFlight, tap "Accept" and "Install". The app downloads in seconds.',
      },
    },
    {
      icon: 'Rocket',
      title: { es: '¡LISTO!', en: 'DONE!' },
      description: {
        es: 'Abre Booty Alarm e inicia sesión con la cuenta que creaste. Todo queda listo.',
        en: 'Open Booty Alarm and sign in with the account you created. Everything is ready.',
      },
    },
  ],
  cta: {
    label: { es: '🚀 ABRIR INVITACIÓN DE TESTFLIGHT', en: '🚀 OPEN TESTFLIGHT INVITATION' },
    href: STORE_LINKS.ios_testflight,
    variant: 'primary',
  },
  perks: [
    { es: 'App completa con todas las funciones', en: 'Full app with all features' },
    { es: 'La misma versión que estará en el App Store', en: 'The same version that will be on the App Store' },
    { es: 'TestFlight es la app oficial de Apple para betas', en: "TestFlight is Apple's official app for betas" },
  ],
}

const ANDROID_CONTENT_DATA: { headline: L; subtitle: L } = {
  headline: { es: '🤖 INSTALAR EN ANDROID', en: '🤖 INSTALL ON ANDROID' },
  subtitle: {
    es: 'Primero crea tu cuenta y plan; luego descarga el APK. Pronto estaremos en Google Play.',
    en: 'First create your account and plan; then download the APK. Coming soon to Google Play.',
  },
}

const ANDROID_FLOW_DATA: FlowData = {
  steps: [
    ACCOUNT_STEP,
    {
      icon: 'ShieldCheck',
      title: { es: 'PERMITE INSTALACIÓN DE FUENTES DESCONOCIDAS', en: 'ALLOW INSTALLATION FROM UNKNOWN SOURCES' },
      description: {
        es: 'Ve a Configuración > Seguridad y activa "Fuentes desconocidas", o cuando intentes instalar, Android te pedirá habilitarlo.',
        en: 'Go to Settings > Security and enable "Unknown sources", or when you try to install, Android will prompt you.',
      },
      note: {
        es: 'Esto es normal y seguro. Solo significa que la app no viene de Google Play (todavía).',
        en: "This is normal and safe. It just means the app doesn't come from Google Play (yet).",
      },
    },
    {
      icon: 'Download',
      title: { es: 'DESCARGA EL APK', en: 'DOWNLOAD THE APK' },
      description: {
        es: 'Toca el botón abajo para descargar el archivo. Aproximadamente 30-50 MB.',
        en: 'Tap the button below to download the file. About 30-50 MB.',
      },
    },
    {
      icon: 'CheckCircle2',
      title: { es: 'INSTALA Y ÁBRELA', en: 'INSTALL AND OPEN IT' },
      description: {
        es: 'Abre el archivo descargado desde Notificaciones o desde tu carpeta Descargas. Confirma la instalación.',
        en: 'Open the downloaded file from Notifications or your Downloads folder. Confirm the installation.',
      },
    },
    {
      icon: 'Rocket',
      title: { es: 'INICIA SESIÓN Y EMPIEZA', en: 'SIGN IN AND START' },
      description: {
        es: 'Inicia sesión con la cuenta que creaste. La alarma con squats está lista para configurarse.',
        en: 'Sign in with the account you created. The squat alarm is ready to set up.',
      },
    },
  ],
  cta: {
    label: { es: '⬇️ DESCARGAR APK (30-50 MB)', en: '⬇️ DOWNLOAD APK (30-50 MB)' },
    href: STORE_LINKS.android_apk,
    variant: 'primary',
  },
  perks: [
    { es: 'Versión completa con todas las funciones', en: 'Full version with all features' },
    { es: 'Alarma imparable nativa', en: 'Native unstoppable alarm' },
    { es: 'Detección de squats con cámara', en: 'Squat detection with the camera' },
    { es: 'Acceso a Brenda Fitness Premium', en: 'Access to Brenda Fitness Premium' },
  ],
  footnotes: [
    { es: '🔒 El APK está firmado digitalmente por Purple Roots Agency', en: '🔒 The APK is digitally signed by Purple Roots Agency' },
    { es: '📦 Pronto disponible en Google Play Store (Q3 2026)', en: '📦 Coming soon to the Google Play Store (Q3 2026)' },
  ],
}

// ─── Resolvers ─────────────────────────────────────────────────────────────
function resolveFlow(data: FlowData, lang: Lang): InstallFlow {
  return {
    steps: data.steps.map((s) => ({
      icon: s.icon,
      title: s.title[lang],
      description: s.description[lang],
      note: s.note?.[lang],
      button: s.button ? { label: s.button.label[lang], href: s.button.href } : undefined,
    })),
    cta: { label: data.cta.label[lang], href: data.cta.href, variant: data.cta.variant },
    perks: data.perks?.map((p) => p[lang]),
    footnotes: data.footnotes?.map((f) => f[lang]),
  }
}

export function getPlatformContent(platform: Platform, lang: Lang): PlatformContent {
  const data = platform === 'ios' ? IOS_CONTENT_DATA : ANDROID_CONTENT_DATA
  return { headline: data.headline[lang], subtitle: data.subtitle[lang] }
}

export function getFlow(platform: Platform, lang: Lang): InstallFlow {
  return resolveFlow(platform === 'ios' ? IOS_FLOW_DATA : ANDROID_FLOW_DATA, lang)
}
