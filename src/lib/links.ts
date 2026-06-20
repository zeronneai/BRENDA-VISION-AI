/** App store links + external/legal URLs used across the landing. */
export const STORE_LINKS = {
  app_store: 'https://apps.apple.com/app/booty-alarm/id6766718608', // se confirma cuando Apple apruebe
  google_play: '#', // próximamente
} as const

/** Whether the Google Play link is live yet. Drives the disabled style + toast. */
export const ANDROID_AVAILABLE = STORE_LINKS.google_play !== '#'

export const EXTERNAL_LINKS = {
  privacy: 'https://ecobrenda.vercel.app/privacy',
  terms: 'https://ecobrenda.vercel.app/terms',
  instagram: 'https://www.instagram.com/brendaa_jazmin/',
  contact_email: 'primostudio.us@gmail.com',
} as const
