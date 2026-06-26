/**
 * Content for the install-instructions modals (iOS TestFlight / iOS Web /
 * Android APK). Centralized so copy can change without touching components.
 */
import { STORE_LINKS, TESTFLIGHT_APP_STORE_URL } from './links'

export type Platform = 'ios' | 'android'
export type IosTab = 'testflight' | 'web'

/** Lucide icon names resolved in the modal component. */
export type StepIcon =
  | 'Send'
  | 'ExternalLink'
  | 'CheckCircle2'
  | 'Compass'
  | 'Share'
  | 'PenLine'
  | 'Rocket'
  | 'ShieldCheck'
  | 'Download'

export interface InstallStep {
  icon: StepIcon
  title: string
  description: string
  /** Optional gray sub-note under the description. */
  note?: string
  /** Optional small inline button (e.g. "Abrir App Store"). */
  button?: { label: string; href: string }
}

export interface InstallFlow {
  /** Optional yellow warning banner at the top of the flow. */
  warning?: string
  steps: InstallStep[]
  cta: { label: string; href: string; variant: 'primary' | 'outline' }
  /** Green checkmark perks under the CTA. */
  perks?: string[]
  /** Gray footnotes at the very bottom. */
  footnotes?: string[]
}

export interface PlatformContent {
  headline: string
  subtitle: string
}

export const IOS_CONTENT: PlatformContent = {
  headline: '📱 INSTALAR EN IPHONE',
  subtitle: 'Mientras Apple aprueba la versión oficial, prueba la app COMPLETA vía TestFlight.',
}

export const ANDROID_CONTENT: PlatformContent = {
  headline: '🤖 INSTALAR EN ANDROID',
  subtitle: 'Descarga el archivo directamente. Pronto estaremos en Google Play.',
}

export const IOS_TESTFLIGHT_FLOW: InstallFlow = {
  steps: [
    {
      icon: 'Send',
      title: 'DESCARGA TESTFLIGHT',
      description: 'Instala la app oficial de Apple para pruebas (gratis y seguro).',
      button: { label: 'Abrir App Store', href: TESTFLIGHT_APP_STORE_URL },
    },
    {
      icon: 'ExternalLink',
      title: 'ABRE EL ENLACE DE BOOTY ALARM',
      description:
        'Al dar click, TestFlight abrirá automáticamente y verás Booty Alarm lista para instalar.',
    },
    {
      icon: 'CheckCircle2',
      title: 'INSTALA Y ABRE',
      description: 'Toca INSTALL en TestFlight. La app se descarga en segundos. ¡Lista para usar!',
    },
  ],
  cta: { label: '🚀 ABRIR EN TESTFLIGHT', href: STORE_LINKS.ios_testflight, variant: 'primary' },
  perks: [
    'Aplicación REAL con todas las funciones',
    'Misma versión que estará en App Store',
    'Apple ya aprobó esta versión beta',
    'Funciona sin internet (excepto suscripción)',
  ],
}

export const IOS_WEB_FLOW: InstallFlow = {
  warning:
    'La versión web NO tiene alarma imparable. Para la experiencia completa, te recomendamos TestFlight.',
  steps: [
    {
      icon: 'Compass',
      title: 'ABRE BOOTY ALARM EN SAFARI',
      description:
        'Toca el botón al final para abrir la app en Safari (Chrome no funciona igual en iPhone).',
    },
    {
      icon: 'Share',
      title: 'AGREGA AL INICIO',
      description:
        'En Safari: toca el botón Compartir (cuadrado con flecha hacia arriba) → "Agregar a Inicio".',
    },
    {
      icon: 'PenLine',
      title: 'PERSONALIZA EL ICONO',
      description:
        'Confirma el nombre y toca "Agregar". Ahora tienes Booty Alarm en tu pantalla principal como una app.',
    },
    {
      icon: 'Rocket',
      title: 'ÁBRELA Y EMPIEZA',
      description:
        'Toca el icono desde tu home. Inicia sesión o regístrate y usa la app desde tu navegador.',
    },
  ],
  cta: { label: '🌐 ABRIR EN SAFARI', href: STORE_LINKS.ios_pwa, variant: 'outline' },
}

export const ANDROID_FLOW: InstallFlow = {
  steps: [
    {
      icon: 'ShieldCheck',
      title: 'PERMITE INSTALACIÓN DE FUENTES DESCONOCIDAS',
      description:
        'Ve a Configuración > Seguridad y activa "Fuentes desconocidas", o cuando intentes instalar, Android te pedirá habilitarlo.',
      note: 'Esto es normal y seguro. Solo significa que la app no viene de Google Play (todavía).',
    },
    {
      icon: 'Download',
      title: 'DESCARGA EL APK',
      description: 'Toca el botón abajo para descargar el archivo. Aproximadamente 30-50 MB.',
    },
    {
      icon: 'CheckCircle2',
      title: 'INSTALA Y ÁBRELA',
      description:
        'Abre el archivo descargado desde Notificaciones o desde tu carpeta Descargas. Confirma la instalación.',
    },
    {
      icon: 'Rocket',
      title: 'INICIA SESIÓN Y EMPIEZA',
      description:
        'Crea tu cuenta o inicia sesión. La alarma con squats está lista para configurarse.',
    },
  ],
  cta: { label: '⬇️ DESCARGAR APK (30-50 MB)', href: STORE_LINKS.android_apk, variant: 'primary' },
  perks: [
    'Versión completa con todas las funciones',
    'Alarma imparable nativa',
    'Detección de squats con cámara',
    'Acceso a Brenda Fitness Premium',
  ],
  footnotes: [
    '🔒 El APK está firmado digitalmente por Purple Roots Agency',
    '📦 Pronto disponible en Google Play Store (Q3 2026)',
  ],
}
