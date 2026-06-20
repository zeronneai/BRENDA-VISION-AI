/**
 * Helpers to apply Cloudinary on-the-fly transformations to a delivery URL by
 * injecting a transformation segment right after `/upload/`.
 *
 * Docs: https://cloudinary.com/documentation/video_optimization
 */

/** Insert a transformation string after the `/upload/` segment of a Cloudinary URL. */
export function cld(url: string, transforms: string): string {
  return url.replace('/upload/', `/upload/${transforms}/`)
}

/**
 * Build an optimized video URL + a JPG poster frame from a base Cloudinary
 * video URL.
 *
 * - `f_auto`  → best format per browser (e.g. WebM/AV1 where supported)
 * - `vc_auto` → best video codec
 * - `q_auto`  → automatic quality (smaller files, no visible loss)
 * - `c_fill,ar_<ratio>` → crop to the target aspect ratio (center gravity — free,
 *   no AI add-on required, unlike g_auto)
 * - `w_<width>` → cap resolution so we never ship more pixels than needed
 */
export function optimizedVideo(
  baseUrl: string,
  { ratio = '4:5', width = 720 }: { ratio?: string; width?: number } = {},
): { src: string; poster: string } {
  const transforms = `f_auto,vc_auto,q_auto,c_fill,ar_${ratio},w_${width}`
  const src = cld(baseUrl, transforms)
  // Poster: first frame as an optimized JPG (instant first paint while loading)
  const poster = cld(baseUrl, `${transforms},so_0`).replace(/\.[a-z0-9]+$/i, '.jpg')
  return { src, poster }
}
