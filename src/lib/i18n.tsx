import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'es' | 'en'

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  // Default to Spanish (brand is MX); auto-pick English only for EN browsers.
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'es' ? 'es-MX' : 'en'
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore storage errors */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'es' ? 'en' : 'es')), [])

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}

/** Bilingual string pair. */
export interface L {
  es: string
  en: string
}

/** Resolve a bilingual pair for the given language. */
export function tr(pair: L, lang: Lang): string {
  return pair[lang]
}

/** All static UI strings (non-array copy), keyed for `t()`. */
const UI = {
  // Navbar
  nav_how: { es: 'Cómo funciona', en: 'How it works' },
  nav_premium: { es: 'Premium', en: 'Premium' },
  nav_pricing: { es: 'Precios', en: 'Pricing' },
  nav_faq: { es: 'FAQ', en: 'FAQ' },
  nav_download: { es: 'DESCARGAR', en: 'DOWNLOAD' },
  nav_open_menu: { es: 'Abrir menú', en: 'Open menu' },
  nav_close_menu: { es: 'Cerrar menú', en: 'Close menu' },

  // Hero
  hero_sub: {
    es: 'La única alarma que NO se apaga hasta que tu cuerpo se mueve.',
    en: "The only alarm that WON'T turn off until your body moves.",
  },
  hero_tagline: { es: '¿O NO PUEDES? 🍑', en: "OR CAN'T YOU? 🍑" },
  hero_scroll: { es: 'Bajar', en: 'Scroll down' },

  // Beta badge
  beta_badge: {
    es: '🚧 Beta abierta · Versión oficial pronto en App Store y Google Play',
    en: '🚧 Open beta · Official version coming soon to the App Store and Google Play',
  },

  // Store buttons
  btn_google_play: { es: 'DESCARGAR EN GOOGLE PLAY', en: 'DOWNLOAD ON GOOGLE PLAY' },
  btn_app_store_soon: { es: 'PRÓXIMAMENTE EN APP STORE', en: 'COMING SOON TO APP STORE' },
  btn_how_install: { es: '¿Cómo instalar?', en: 'How to install?' },
  btn_ios_aria: {
    es: 'Próximamente en App Store — ver cómo instalarla mientras tanto',
    en: 'Coming soon to the App Store — see how to install it meanwhile',
  },

  // How it works
  how_title: { es: 'ASÍ FUNCIONA', en: 'HOW IT WORKS' },
  how_sub: {
    es: 'Tres pasos para no volver a quedarte dormida.',
    en: 'Three steps so you never oversleep again.',
  },

  // Screenshots
  shots_title: { es: 'ASÍ SE VE BOOTY ALARM', en: 'THIS IS BOOTY ALARM' },
  shots_sub: {
    es: 'Diseñada para que la abras todos los días.',
    en: 'Designed for you to open it every day.',
  },

  // Premium
  premium_title: { es: 'DESBLOQUEA BRENDA FITNESS', en: 'UNLOCK BRENDA FITNESS' },
  premium_sub: {
    es: 'El método completo de Brenda Jazmín para transformar tu cuerpo.',
    en: "Brenda Jazmín's complete method to transform your body.",
  },

  // Pricing
  pricing_title: { es: 'ELIGE TU PLAN', en: 'CHOOSE YOUR PLAN' },
  pricing_sub: {
    es: 'Suscríbete desde la app. Cancela cuando quieras.',
    en: 'Subscribe from the app. Cancel anytime.',
  },
  pricing_note: {
    es: 'La suscripción se gestiona desde la app y se procesa de forma segura.',
    en: 'The subscription is managed from the app and processed securely.',
  },
  pricing_per_month: { es: '/mes', en: '/mo' },
  pricing_per_year: { es: '/año', en: '/yr' },

  // Testimonials
  testi_title: { es: 'ELLAS YA SE LEVANTAN', en: "THEY'RE ALREADY GETTING UP" },
  testi_sub: { es: 'Mujeres reales. Resultados reales.', en: 'Real women. Real results.' },
  testi_stars_aria: { es: '5 de 5 estrellas', en: '5 out of 5 stars' },
  testi_photo_aria: { es: 'Foto de', en: 'Photo of' },

  // FAQ
  faq_title: { es: 'PREGUNTAS FRECUENTES', en: 'FREQUENTLY ASKED QUESTIONS' },

  // Final CTA
  cta_sub: {
    es: 'Descarga Booty Alarm hoy y empieza tu transformación mañana.',
    en: 'Download Booty Alarm today and start your transformation tomorrow.',
  },
  cta_tagline: { es: '¿O NO PUEDES? 🍑', en: "OR CAN'T YOU? 🍑" },

  // Footer
  footer_tagline: {
    es: 'La única alarma que no se apaga hasta que tu cuerpo se mueve.',
    en: "The only alarm that won't turn off until your body moves.",
  },
  footer_product: { es: 'Producto', en: 'Product' },
  footer_legal: { es: 'Legal', en: 'Legal' },
  footer_contact: { es: 'Contacto', en: 'Contact' },
  footer_privacy: { es: 'Política de Privacidad', en: 'Privacy Policy' },
  footer_terms: { es: 'Términos', en: 'Terms' },
  footer_instagram: { es: 'Instagram de Brenda', en: "Brenda's Instagram" },
  footer_rights: {
    es: '© 2026 Purple Roots Agency. Todos los derechos reservados.',
    en: '© 2026 Purple Roots Agency. All rights reserved.',
  },
  footer_credit: { es: 'Diseñado y desarrollado por', en: 'Designed and developed by' },

  // Platform selector
  sel_title: { es: '¿QUÉ DISPOSITIVO TIENES?', en: 'WHICH DEVICE DO YOU HAVE?' },
  sel_sub: {
    es: 'Elige tu plataforma para ver las instrucciones de instalación.',
    en: 'Choose your platform to see the install instructions.',
  },

  // Modal shell
  modal_close: { es: 'Cerrar', en: 'Close' },

  // iOS install modal helper
  ios_steps_label: { es: 'Instálala como app en 5 pasos', en: 'Install it as an app in 5 steps' },

  // Alarm hero mockup
  alarm_desc_pre: {
    es: 'No se apaga hasta que completes',
    en: "It won't stop until you finish",
  },
  alarm_desc_bold: { es: '10 squats', en: '10 squats' },
  alarm_desc_post: { es: '. La cámara los cuenta.', en: '. The camera counts them.' },
  alarm_btn: { es: 'A DARLE 💪', en: "LET'S GO 💪" },
  alarm_footnote: {
    es: 'En iOS la app debe estar abierta · en Android suena en segundo plano',
    en: 'On iOS the app must be open · on Android it rings in the background',
  },

  // Language toggle
  lang_toggle_aria: { es: 'Cambiar idioma', en: 'Switch language' },
} as const

export type UIKey = keyof typeof UI

/** Hook returning a translator function bound to the current language. */
export function useT() {
  const { lang } = useLang()
  return useCallback((key: UIKey) => UI[key][lang], [lang])
}
