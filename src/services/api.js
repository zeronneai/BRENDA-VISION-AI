import { Capacitor } from '@capacitor/core'

// In native (iOS/Android): use the full Vercel URL set at build time.
// In browser (dev or web): use relative URLs (Vite proxy handles dev, Vercel handles prod).
const BASE = Capacitor.isNativePlatform()
  ? (import.meta.env.VITE_API_URL || '')
  : ''

if (Capacitor.isNativePlatform() && !import.meta.env.VITE_API_URL) {
  console.warn('[BrendaFit] VITE_API_URL is not set. API calls will fail on device. Set it in .env.production.')
}

export const ENDPOINTS = {
  chat: `${BASE}/api/chat`,
  generateWorkout: `${BASE}/api/generate-workout`,
  generateMealPlan: `${BASE}/api/generate-meal-plan`,
}

export const isNative = Capacitor.isNativePlatform()
export const platform = Capacitor.getPlatform() // 'ios' | 'android' | 'web'
