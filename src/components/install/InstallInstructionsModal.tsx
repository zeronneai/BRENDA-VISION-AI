import { motion, useReducedMotion } from 'framer-motion'
import { User } from 'lucide-react'
import Button, { LinkButton } from '../Button'
import ModalShell from './ModalShell'
import InstallFlowView from './InstallFlowView'
import { getFlow, getPlatformContent } from '../../lib/install'
import type { Platform } from '../../lib/install'
import { useLang, useT } from '../../lib/i18n'

interface InstallInstructionsModalProps {
  isOpen: boolean
  onClose: () => void
  platform: Platform
  /** Opens the Android tutorial video (only used for the Android flow). */
  onWatchVideo?: () => void
}

const TITLE_ID = 'install-modal-title'

/**
 * Pulsing CTA.
 * - Android: downloads the .apk in place (GitHub serves it as an attachment),
 *   so no empty new tab; `download` hints the filename.
 * - iOS: opens the TestFlight invitation in a new tab.
 */
function Cta({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  const reduce = useReducedMotion()
  const { lang } = useLang()
  const flow = getFlow(platform, lang)

  const pulse = reduce
    ? {}
    : { animate: { scale: [1, 1.02, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const } }

  const isAndroid = platform === 'android'

  return (
    <motion.div {...pulse} style={{ willChange: 'transform' }}>
      <LinkButton
        href={flow.cta.href}
        variant={flow.cta.variant}
        size="lg"
        className="w-full"
        onClick={onClose}
        {...(isAndroid
          ? { download: 'booty-alarm.apk', rel: 'noopener' }
          : { external: true })}
      >
        {flow.cta.label}
      </LinkButton>
    </motion.div>
  )
}

/** Install instructions per platform: iOS = TestFlight, Android = APK. */
export default function InstallInstructionsModal({
  isOpen,
  onClose,
  platform,
  onWatchVideo,
}: InstallInstructionsModalProps) {
  const { lang } = useLang()
  const t = useT()
  const isIos = platform === 'ios'
  const isAndroid = platform === 'android'
  const content = getPlatformContent(platform, lang)
  const flow = getFlow(platform, lang)

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      titleId={TITLE_ID}
      footer={<Cta platform={platform} onClose={onClose} />}
    >
      <h3 id={TITLE_ID} className="pr-10 text-3xl leading-none text-white sm:text-4xl">
        {content.headline}
      </h3>
      <p className="mt-3 text-sm text-muted sm:text-base">{content.subtitle}</p>

      {/* iOS 26+ informational note (positive tone) */}
      {isIos && (
        <div className="mt-5 rounded-2xl border border-lime/25 bg-lime/[0.07] p-4 text-sm leading-relaxed text-white/85">
          {t('ios26_note')}
        </div>
      )}

      {/* Android: watch the tutorial video */}
      {isAndroid && onWatchVideo && (
        <Button variant="outline" size="md" className="mt-5 w-full" onClick={onWatchVideo}>
          {t('video_btn')}
        </Button>
      )}

      <div className="mt-6">
        <InstallFlowView flow={flow} />
      </div>

      {/* "Already have an account?" note — shown for both platforms */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-magenta/25 bg-magenta/[0.07] p-4">
        <User className="mt-0.5 h-5 w-5 shrink-0 text-magenta-bright" aria-hidden />
        <p className="text-sm leading-relaxed text-white/85">{t('account_note')}</p>
      </div>
    </ModalShell>
  )
}
