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
 * Dual store CTAs.
 * - Android: primary button that opens the APK install modal (download).
 * - iOS: "Próximamente en App Store" — opens a modal with a positive
 *   coming-soon message + steps to install as a PWA from Safari meanwhile.
 * A secondary link opens the device selector.
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
        {/* Android — the actionable download */}
        <Button
          variant="primary"
          size={size}
          className={widthClass}
          onClick={() => openInstall('android')}
        >
          <Play className="h-5 w-5" aria-hidden />
          DESCARGAR EN GOOGLE PLAY
        </Button>

        {/* iOS — App Store in review; tap opens PWA-install instructions */}
        <Button
          variant="outline"
          size={size}
          className={widthClass}
          onClick={() => openInstall('ios')}
          aria-label="Próximamente en App Store — ver cómo instalarla mientras tanto"
        >
          <Apple className="h-5 w-5" aria-hidden />
          PRÓXIMAMENTE EN APP STORE
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
