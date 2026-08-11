import { motion, useReducedMotion } from 'framer-motion'
import { LinkButton } from '../Button'
import ModalShell from './ModalShell'
import InstallFlowView from './InstallFlowView'
import {
  ANDROID_CONTENT,
  ANDROID_FLOW,
  IOS_CONTENT,
  IOS_PWA_FLOW,
} from '../../lib/install'
import type { Platform } from '../../lib/install'

interface InstallInstructionsModalProps {
  isOpen: boolean
  onClose: () => void
  platform: Platform
}

const TITLE_ID = 'install-modal-title'

/**
 * Pulsing CTA.
 * - Android: downloads the .apk in place (GitHub serves it as an attachment),
 *   so no empty new tab; `download` hints the filename.
 * - iOS: opens the PWA in Safari in a new tab.
 */
function Cta({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  const reduce = useReducedMotion()
  const flow = platform === 'ios' ? IOS_PWA_FLOW : ANDROID_FLOW

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

/** Install instructions per platform: iOS = PWA-from-Safari, Android = APK. */
export default function InstallInstructionsModal({
  isOpen,
  onClose,
  platform,
}: InstallInstructionsModalProps) {
  const isIos = platform === 'ios'
  const content = isIos ? IOS_CONTENT : ANDROID_CONTENT
  const flow = isIos ? IOS_PWA_FLOW : ANDROID_FLOW

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

      {isIos && (
        <p className="mt-5 text-sm font-bold uppercase tracking-wide text-lime">
          Instálala como app en 5 pasos
        </p>
      )}

      <div className="mt-6">
        <InstallFlowView flow={flow} />
      </div>
    </ModalShell>
  )
}
