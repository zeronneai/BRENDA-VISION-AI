import { optimizedVideo } from '../lib/cloudinary'
import { VIDEOS } from '../lib/images'

const { src, poster } = optimizedVideo(VIDEOS.brenda_about, { ratio: '4:5', width: 720 })

interface BrendaVideoProps {
  className?: string
}

/**
 * Autoplaying, muted, looping clip of Brenda for the Premium section.
 * Delivered via Cloudinary with web optimization (f_auto/vc_auto/q_auto),
 * cropped to 4:5, width-capped, with a poster frame for instant first paint.
 */
export default function BrendaVideo({ className = '' }: BrendaVideoProps) {
  return (
    <video
      className={`rounded-2xl object-cover ${className}`}
      style={{ aspectRatio: '4 / 5' }}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
      aria-label="Brenda Jazmín entrenando"
    />
  )
}
