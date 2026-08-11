/** App store / install links + external/legal URLs used across the landing. */
export const STORE_LINKS = {
  // iOS App Store oficial (en revisión de Apple — aún sin link público)
  ios_app_store: 'https://apps.apple.com/app/booty-alarm/id6766718608',

  // Android APK directo (hasta que esté en Google Play)
  android_apk: 'https://github.com/zeronneai/ECOBRENDA/releases/download/V1.2.0/booty-alarm.apk',

  // Android Google Play oficial (placeholder)
  android_play_store: 'https://play.google.com/store/apps/details?id=com.zeronne.bootyalarm',
} as const

/** Estado actual de cada plataforma. */
export const PLATFORM_STATUS = {
  ios: 'coming_soon', // 'app_store' | 'coming_soon'  (App Store en revisión de Apple)
  android: 'apk', // 'play_store' | 'apk'
} as const

/** Whether the real Android APK URL has been wired in yet. */
export const ANDROID_APK_READY =
  (STORE_LINKS.android_apk as string) !== 'PLACEHOLDER_PENDING_APK_URL'

export const EXTERNAL_LINKS = {
  privacy: 'https://ecobrenda.vercel.app/privacy',
  terms: 'https://ecobrenda.vercel.app/terms',
  instagram: 'https://www.instagram.com/brendaa_jazmin/',
  contact_email: 'primostudio.us@gmail.com',
} as const
