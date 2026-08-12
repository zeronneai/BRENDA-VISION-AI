import { Apple, Play, Wrench } from 'lucide-react'
import Button from './Button'
import { useInstall } from './install/InstallModalProvider'
import { useT } from '../lib/i18n'

interface StoreButtonsProps {
  size?: 'md' | 'lg'
  /** Stack on small screens, row from sm+. */
  className?: string
  /** Force full-width buttons (used inside pricing cards). */
  fullWidth?: boolean
  /** Hide the "¿Cómo instalar?" secondary link. */
  hideHelp?: boolean
}

/**
 * Dual store CTAs. Each opens the platform's install modal:
 * - Android: APK download flow.
 * - iOS: TestFlight public-beta flow (steps + open-invitation button).
 * A secondary link opens the device selector.
 */
export default function StoreButtons({
  size = 'md',
  className = '',
  fullWidth = false,
  hideHelp = false,
}: StoreButtonsProps) {
  const { openInstall, openSelector } = useInstall()
  const t = useT()
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex w-full flex-col gap-3 sm:flex-row ${className}`}>
        {/* Android — the actionable download */}
        <Button
          variant="primary"
          size={size}
          className={widthClass}
          onClick={() => openInstall('android')}
        >
          <Play className="h-5 w-5" aria-hidden />
          {t('btn_google_play')}
        </Button>

        {/* iOS — TestFlight public beta; tap opens the install instructions */}
        <Button
          variant="outline"
          size={size}
          className={widthClass}
          onClick={() => openInstall('ios')}
          aria-label={t('btn_ios_aria')}
        >
          <Apple className="h-5 w-5" aria-hidden />
          {t('btn_ios_download')}
        </Button>
      </div>

      {!hideHelp && (
        <button
          type="button"
          onClick={openSelector}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-magenta-bright"
        >
          <Wrench className="h-4 w-4" aria-hidden />
          {t('btn_how_install')}
        </button>
      )}
    </div>
  )
}
