import { IMAGES } from '../lib/images'
import type { ImageKey } from '../lib/images'

interface ImagePlaceholderProps {
  /** Key into the centralized IMAGES map. */
  imageKey: ImageKey
  /** Text shown while there is no real image yet. */
  label: string
  alt?: string
  /** Aspect ratio applied to the frame, e.g. "9 / 19.5", "4 / 5", "1 / 1". */
  ratio?: string
  className?: string
  /** Rounded corners — turned off when wrapped by the iPhone frame. */
  rounded?: boolean
}

/**
 * Renders the real image once its Cloudinary URL is set in src/lib/images.ts.
 * Until then it shows a styled magenta-to-black placeholder card so the
 * layout already looks correct.
 */
export default function ImagePlaceholder({
  imageKey,
  label,
  alt,
  ratio = '9 / 19.5',
  className = '',
  rounded = true,
}: ImagePlaceholderProps) {
  const src = IMAGES[imageKey]
  const radius = rounded ? 'rounded-2xl' : ''

  if (src) {
    return (
      // TODO: Replace src with Cloudinary URL (handled via src/lib/images.ts)
      <img
        src={src}
        alt={alt ?? label}
        loading="lazy"
        decoding="async"
        className={`${radius} h-full w-full object-cover ${className}`}
        style={{ aspectRatio: ratio }}
      />
    )
  }

  return (
    // TODO: Replace src with Cloudinary URL (handled via src/lib/images.ts)
    <div
      className={`${radius} flex items-center justify-center border border-magenta/30 bg-gradient-to-br from-magenta/30 via-ink to-ink p-4 text-center ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={alt ?? label}
    >
      <span className="text-xs font-semibold uppercase leading-relaxed tracking-wider text-white/70 sm:text-sm">
        {label}
      </span>
    </div>
  )
}
