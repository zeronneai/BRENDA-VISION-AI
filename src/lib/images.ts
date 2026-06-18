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
  screenshot_alarm_hero: '', // TODO: Cloudinary URL
  screenshot_camara_squats: '', // TODO: Cloudinary URL
  screenshot_entrena: '', // TODO: Cloudinary URL
  screenshot_nutricion_planes: '', // TODO: Cloudinary URL
  screenshot_nutricion_recetas: '', // TODO: Cloudinary URL
  screenshot_nutricion_suplementos: '', // TODO: Cloudinary URL

  // FOTOS DE BRENDA (ratio 1:1 o 4:5)
  brenda_hero: '', // TODO: Cloudinary URL
  brenda_about: '', // TODO: Cloudinary URL

  // ICONO APP
  app_icon: '', // TODO: Cloudinary URL

  // OG IMAGE (1200x630)
  og_image: '', // TODO: Cloudinary URL
} as const

export type ImageKey = keyof typeof IMAGES
