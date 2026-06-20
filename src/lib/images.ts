/**
 * Centralized image URLs.
 *
 * Every value is empty for now. Replace each one with its Cloudinary URL
 * once the assets are uploaded — the components fall back to a styled
 * placeholder whenever a value is an empty string, so the layout already
 * looks right before the real images exist.
 *
 * See CLOUDINARY.md for the exact list of assets and recommended sizes.
 */
export const IMAGES = {
  // SCREENSHOTS DE LA APP (ratio 9:19.5)
  screenshot_alarm_hero:
    'https://res.cloudinary.com/dsprn0ew4/image/upload/v1781972400/WhatsApp_Image_2026-06-03_at_2.44.57_PM_3_nsrohy.jpg',
  screenshot_camara_squats:
    'https://res.cloudinary.com/dsprn0ew4/image/upload/v1781972400/WhatsApp_Image_2026-06-03_at_2.44.57_PM_6_ubdf7r.jpg',
  screenshot_entrena:
    'https://res.cloudinary.com/dsprn0ew4/image/upload/v1781972400/WhatsApp_Image_2026-06-03_at_2.44.57_PM_1_tm2xnj.jpg',
  screenshot_nutricion_planes:
    'https://res.cloudinary.com/dsprn0ew4/image/upload/v1781972400/WhatsApp_Image_2026-06-03_at_2.44.57_PM_2_x5l7lt.jpg',
  screenshot_nutricion_recetas:
    'https://res.cloudinary.com/dsprn0ew4/image/upload/v1781972400/IMG_2198_nbda3j.png',
  screenshot_nutricion_suplementos:
    'https://res.cloudinary.com/dsprn0ew4/image/upload/v1781972400/WhatsApp_Image_2026-06-03_at_2.44.57_PM_5_lsmkwc.jpg',

  // FOTOS DE BRENDA (ratio 1:1 o 4:5)
  brenda_hero: '', // TODO: Cloudinary URL
  brenda_about: '', // TODO: Cloudinary URL

  // ICONO APP
  app_icon: '', // TODO: Cloudinary URL

  // OG IMAGE (1200x630)
  og_image: '', // TODO: Cloudinary URL
} as const

export type ImageKey = keyof typeof IMAGES

/**
 * Video assets (Cloudinary). The base/original URL is stored here; on-the-fly
 * web optimization (format, codec, quality, crop, width) is applied at render
 * time in the player component, so this stays a plain source URL.
 */
export const VIDEOS = {
  // Brenda Jazmín — Premium section (delivered cropped to 4:5)
  brenda_about:
    'https://res.cloudinary.com/dsprn0ew4/video/upload/v1777921046/BRENDA_JAZMIN_-_SESSION_1_-_Trim_hiegjf.mp4',
} as const

export type VideoKey = keyof typeof VIDEOS
