import { Apple, Play, Wrench } from 'lucide-react'
import Button from './Button'
import { useInstall } from './install/InstallModalProvider'

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
 * Dual store CTAs. Instead of linking straight to the stores, each button opens
 * the install-instructions modal for its platform (iOS via TestFlight, Android
 * via APK). A secondary link opens the device selector.
 */
export default function StoreButtons({
  size = 'md',
  className = '',
  fullWidth = false,
  hideHelp = false,
}: StoreButtonsProps) {
  const { openInstall, openSelector } = useInstall()
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex w-full flex-col gap-3 sm:flex-row ${className}`}>
        <Button
          variant="primary"
          size={size}
          className={widthClass}
          onClick={() => openInstall('ios')}
        >
          <Apple className="h-5 w-5" aria-hidden />
          DESCARGAR EN APP STORE
        </Button>

        <Button
          variant="outline"
          size={size}
          className={widthClass}
          onClick={() => openInstall('android')}
        >
          <Play className="h-5 w-5" aria-hidden />
          DESCARGAR EN GOOGLE PLAY
        </Button>
      </div>

      {!hideHelp && (
        <button
          type="button"
          onClick={openSelector}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-magenta-bright"
        >
          <Wrench className="h-4 w-4" aria-hidden />
          ¿Cómo instalar?
        </button>
      )}
    </div>
  )
}
