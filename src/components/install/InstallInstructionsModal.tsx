import { motion, useReducedMotion } from 'framer-motion'
import { LinkButton } from '../Button'
import ModalShell from './ModalShell'
import InstallFlowView from './InstallFlowView'
import { ANDROID_CONTENT, ANDROID_FLOW } from '../../lib/install'

interface InstallInstructionsModalProps {
  isOpen: boolean
  onClose: () => void
}

const TITLE_ID = 'install-modal-title'

/** Pulsing CTA that downloads the Android APK. */
function Cta({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion()

  const pulse = reduce
    ? {}
    : { animate: { scale: [1, 1.02, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const } }

  return (
    <motion.div {...pulse} style={{ willChange: 'transform' }}>
      {/* Download the .apk in place (GitHub serves it as an attachment), so we
          don't open an empty new tab. `download` hints the filename. */}
      <LinkButton
        href={ANDROID_FLOW.cta.href}
        variant={ANDROID_FLOW.cta.variant}
        size="lg"
        className="w-full"
        onClick={onClose}
        download="booty-alarm.apk"
        rel="noopener"
      >
        {ANDROID_FLOW.cta.label}
      </LinkButton>
    </motion.div>
  )
}

/** Android-only install instructions (APK). iOS is "coming soon" — no modal. */
export default function InstallInstructionsModal({ isOpen, onClose }: InstallInstructionsModalProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} titleId={TITLE_ID} footer={<Cta onClose={onClose} />}>
      <h3 id={TITLE_ID} className="pr-10 text-3xl leading-none text-white sm:text-4xl">
        {ANDROID_CONTENT.headline}
      </h3>
      <p className="mt-3 text-sm text-muted sm:text-base">{ANDROID_CONTENT.subtitle}</p>

      <div className="mt-6">
        <InstallFlowView flow={ANDROID_FLOW} />
      </div>
    </ModalShell>
  )
}
