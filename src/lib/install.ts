/**
 * Bilingual content for the install-instructions modals, resolved by language.
 * - Android → APK download flow.
 * - iOS → "coming soon to the App Store" + install-as-PWA-from-Safari steps.
 */
import { STORE_LINKS } from './links'
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
}
interface FlowData {
  steps: StepData[]
  cta: { label: L; href: string; variant: 'primary' | 'outline' }
  perks?: L[]
  footnotes?: L[]
}

const IOS_CONTENT_DATA: { headline: L; subtitle: L } = {
  headline: { es: '📱 PRÓXIMAMENTE EN EL APP STORE', en: '📱 COMING SOON TO THE APP STORE' },
  subtitle: {
    es: 'Estamos trabajando para traerte Booty Alarm al App Store muy pronto. Mientras tanto, ya puedes empezar a usarla: instálala en tu iPhone desde Safari en menos de 1 minuto 👇',
    en: "We're working to bring Booty Alarm to the App Store very soon. In the meantime, you can already start using it: install it on your iPhone from Safari in under 1 minute 👇",
  },
}

const IOS_FLOW_DATA: FlowData = {
  steps: [
    {
      icon: 'Compass',
      title: { es: '1. ABRE LA APP EN SAFARI', en: '1. OPEN THE APP IN SAFARI' },
      description: {
        es: 'Toca el botón de abajo para abrir ecobrenda.vercel.app en Safari.',
        en: 'Tap the button below to open ecobrenda.vercel.app in Safari.',
      },
      note: {
        es: 'Debe ser Safari (en iPhone, Chrome no permite instalar apps al inicio).',
        en: 'It must be Safari (on iPhone, Chrome cannot install apps to the home screen).',
      },
    },
    {
      icon: 'Share',
      title: { es: '2. TOCA "COMPARTIR" (SHARE)', en: '2. TAP "SHARE"' },
      description: {
        es: 'Es el cuadrito con una flecha hacia arriba, en la barra de abajo de Safari.',
        en: "It's the little square with an up arrow, in Safari's bottom bar.",
      },
    },
    {
      icon: 'Plus',
      title: { es: '3. "AGREGAR A INICIO" (ADD TO HOME SCREEN)', en: '3. "ADD TO HOME SCREEN"' },
      description: {
        es: 'Baja en el menú y toca la opción "Agregar a inicio".',
        en: 'Scroll down the menu and tap "Add to Home Screen".',
      },
    },
    {
      icon: 'CheckCircle2',
      title: { es: '4. TOCA "AGREGAR" (ADD)', en: '4. TAP "ADD"' },
      description: {
        es: 'Confirma con el botón "Agregar", arriba a la derecha.',
        en: 'Confirm with the "Add" button, top right.',
      },
    },
    {
      icon: 'Rocket',
      title: { es: '5. ¡LISTO! ÁBRELA DESDE TU INICIO', en: '5. DONE! OPEN IT FROM YOUR HOME SCREEN' },
      description: {
        es: 'Booty Alarm aparece en tu pantalla de inicio como una app normal. Ábrela desde ahí y empieza.',
        en: 'Booty Alarm appears on your home screen like a normal app. Open it from there and get started.',
      },
    },
  ],
  cta: { label: { es: '🌐 ABRIR EN SAFARI', en: '🌐 OPEN IN SAFARI' }, href: STORE_LINKS.ios_pwa, variant: 'primary' },
  perks: [
    { es: 'Empieza a usarla ya, sin esperar al App Store', en: 'Start using it now, without waiting for the App Store' },
    { es: 'Se ve y funciona como una app nativa', en: 'Looks and works like a native app' },
    { es: 'La versión del App Store llega muy pronto', en: 'The App Store version is coming very soon' },
  ],
}

const ANDROID_CONTENT_DATA: { headline: L; subtitle: L } = {
  headline: { es: '🤖 INSTALAR EN ANDROID', en: '🤖 INSTALL ON ANDROID' },
  subtitle: {
    es: 'Descarga el archivo directamente. Pronto estaremos en Google Play.',
    en: 'Download the file directly. Coming soon to Google Play.',
  },
}

const ANDROID_FLOW_DATA: FlowData = {
  steps: [
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
        es: 'Crea tu cuenta o inicia sesión. La alarma con squats está lista para configurarse.',
        en: 'Create your account or sign in. The squat alarm is ready to set up.',
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
