import { Apple, Play } from 'lucide-react'
import { LinkButton } from './Button'
import Button from './Button'
import { useToast } from './Toast'
import { ANDROID_APK_READY, STORE_LINKS } from '../lib/links'

interface StoreButtonsProps {
  size?: 'md' | 'lg'
  /** Stack on small screens, row from sm+. */
  className?: string
  /** Force full-width buttons (used inside pricing cards). */
  fullWidth?: boolean
}

const ANDROID_TOAST = '¡Pronto en Android! Mientras tanto, descárgalo para iPhone.'

/**
 * Dual store CTAs. The App Store button links out; the Google Play button is
 * shown disabled with a "Próximamente" note and fires a toast on click.
 */
export default function StoreButtons({ size = 'md', className = '', fullWidth = false }: StoreButtonsProps) {
  const { showToast } = useToast()
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <LinkButton
        href={STORE_LINKS.ios_app_store}
        external
        variant="primary"
        size={size}
        className={widthClass}
      >
        <Apple className="h-5 w-5" aria-hidden />
        DESCARGAR EN APP STORE
      </LinkButton>

      <div className={`flex flex-col items-center gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {ANDROID_APK_READY ? (
          <LinkButton
            href={STORE_LINKS.android_play_store}
            external
            variant="outline"
            size={size}
            className={widthClass}
          >
            <Play className="h-5 w-5" aria-hidden />
            DESCARGAR EN GOOGLE PLAY
          </LinkButton>
        ) : (
          <Button
            variant="outline"
            size={size}
            onClick={() => showToast(ANDROID_TOAST)}
            className={`${widthClass} opacity-60`}
            aria-label="Descargar en Google Play — próximamente"
          >
            <Play className="h-5 w-5" aria-hidden />
            DESCARGAR EN GOOGLE PLAY
          </Button>
        )}
        {!ANDROID_APK_READY && (
          <span className="text-xs font-medium uppercase tracking-wider text-muted">Próximamente</span>
        )}
      </div>
    </div>
  )
}
