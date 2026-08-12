import { useInstall } from './install/InstallModalProvider'
import { useT } from '../lib/i18n'

/**
 * Fixed floating CTA, always visible while scrolling. Opens the device selector
 * (iOS / Android) and then the normal install flow. Bottom-right, brand magenta.
 */
export default function FloatingDownload() {
  const { openSelector } = useInstall()
  const t = useT()

  return (
    <button
      type="button"
      onClick={openSelector}
      aria-label={t('floating_aria')}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-magenta px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition-all duration-300 hover:scale-105 hover:bg-magenta-bright hover:shadow-glow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-bright"
    >
      <span className="text-lg leading-none" aria-hidden>
        🍑
      </span>
      <span className="hidden sm:inline">{t('floating_download')}</span>
    </button>
  )
}
