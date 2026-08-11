/**
 * Content for the install-instructions modals. Centralized so copy can change
 * without touching components.
 * - Android → APK download flow.
 * - iOS → "coming soon to the App Store" + install-as-PWA-from-Safari steps.
 */
import { STORE_LINKS } from './links'

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
  headline: '📱 PRÓXIMAMENTE EN EL APP STORE',
  subtitle:
    'Estamos trabajando para traerte Booty Alarm al App Store muy pronto. Mientras tanto, ya puedes empezar a usarla: instálala en tu iPhone desde Safari en menos de 1 minuto 👇',
}

/** Install-as-PWA steps for iPhone (Safari). */
export const IOS_PWA_FLOW: InstallFlow = {
  steps: [
    {
      icon: 'Compass',
      title: '1. ABRE LA APP EN SAFARI',
      description: 'Toca el botón de abajo para abrir ecobrenda.vercel.app en Safari.',
      note: 'Debe ser Safari (en iPhone, Chrome no permite instalar apps al inicio).',
    },
    {
      icon: 'Share',
      title: '2. TOCA "COMPARTIR" (SHARE)',
      description:
        'Es el cuadrito con una flecha hacia arriba, en la barra de abajo de Safari.',
    },
    {
      icon: 'Plus',
      title: '3. "AGREGAR A INICIO" (ADD TO HOME SCREEN)',
      description: 'Baja en el menú y toca la opción "Agregar a inicio".',
    },
    {
      icon: 'CheckCircle2',
      title: '4. TOCA "AGREGAR" (ADD)',
      description: 'Confirma con el botón "Agregar", arriba a la derecha.',
    },
    {
      icon: 'Rocket',
      title: '5. ¡LISTO! ÁBRELA DESDE TU INICIO',
      description:
        'Booty Alarm aparece en tu pantalla de inicio como una app normal. Ábrela desde ahí y empieza.',
    },
  ],
  cta: { label: '🌐 ABRIR EN SAFARI', href: STORE_LINKS.ios_pwa, variant: 'primary' },
  perks: [
    'Empieza a usarla ya, sin esperar al App Store',
    'Se ve y funciona como una app nativa',
    'La versión del App Store llega muy pronto',
  ],
}

export const ANDROID_CONTENT: PlatformContent = {
  headline: '🤖 INSTALAR EN ANDROID',
  subtitle: 'Descarga el archivo directamente. Pronto estaremos en Google Play.',
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
