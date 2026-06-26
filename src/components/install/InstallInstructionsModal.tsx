import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button, { LinkButton } from '../Button'
import { useToast } from '../Toast'
import ModalShell from './ModalShell'
import InstallFlowView from './InstallFlowView'
import { ANDROID_APK_READY } from '../../lib/links'
import {
  ANDROID_CONTENT,
  ANDROID_FLOW,
  IOS_CONTENT,
  IOS_TESTFLIGHT_FLOW,
  IOS_WEB_FLOW,
} from '../../lib/install'
import type { InstallFlow, Platform } from '../../lib/install'

interface InstallInstructionsModalProps {
  isOpen: boolean
  onClose: () => void
  platform: Platform
}

const TITLE_ID = 'install-modal-title'
const APK_PENDING_TOAST = 'El APK estará disponible muy pronto. Mientras tanto, pruébalo en iPhone vía TestFlight.'

/** Pulsing CTA. Falls back to a toast when the Android APK URL isn't wired yet. */
function Cta({ flow, platform, onClose }: { flow: InstallFlow; platform: Platform; onClose: () => void }) {
  const reduce = useReducedMotion()
  const { showToast } = useToast()
  const apkPending = platform === 'android' && !ANDROID_APK_READY
  const isApkDownload = platform === 'android' && ANDROID_APK_READY

  const pulse = reduce
    ? {}
    : { animate: { scale: [1, 1.02, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const } }

  return (
    <motion.div {...pulse} style={{ willChange: 'transform' }}>
      {apkPending ? (
        <Button
          variant="primary"
          size="lg"
          className="w-full opacity-90"
          onClick={() => showToast(APK_PENDING_TOAST)}
        >
          {flow.cta.label}
        </Button>
      ) : isApkDownload ? (
        // Download the .apk in place (GitHub serves it as an attachment), so we
        // don't open an empty new tab. `download` hints the filename.
        <LinkButton
          href={flow.cta.href}
          variant={flow.cta.variant}
          size="lg"
          className="w-full"
          onClick={onClose}
          download="booty-alarm.apk"
          rel="noopener"
        >
          {flow.cta.label}
        </LinkButton>
      ) : (
        <LinkButton
          href={flow.cta.href}
          external
          variant={flow.cta.variant}
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          {flow.cta.label}
        </LinkButton>
      )}
    </motion.div>
  )
}

export default function InstallInstructionsModal({
  isOpen,
  onClose,
  platform,
}: InstallInstructionsModalProps) {
  const [iosTab, setIosTab] = useState<'testflight' | 'web'>('testflight')

  // Reset to the recommended tab whenever the modal (re)opens.
  useEffect(() => {
    if (isOpen) setIosTab('testflight')
  }, [isOpen])

  const isIos = platform === 'ios'
  const content = isIos ? IOS_CONTENT : ANDROID_CONTENT
  const flow: InstallFlow = isIos
    ? iosTab === 'testflight'
      ? IOS_TESTFLIGHT_FLOW
      : IOS_WEB_FLOW
    : ANDROID_FLOW

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      titleId={TITLE_ID}
      footer={<Cta flow={flow} platform={platform} onClose={onClose} />}
    >
      <h3 id={TITLE_ID} className="pr-10 text-3xl leading-none text-white sm:text-4xl">
        {content.headline}
      </h3>
      <p className="mt-3 text-sm text-muted sm:text-base">{content.subtitle}</p>

      {/* iOS tabs */}
      {isIos && (
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
          <button
            type="button"
            onClick={() => setIosTab('testflight')}
            aria-pressed={iosTab === 'testflight'}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              iosTab === 'testflight' ? 'bg-magenta text-white' : 'text-muted hover:text-white'
            }`}
          >
            TestFlight ⭐
          </button>
          <button
            type="button"
            onClick={() => setIosTab('web')}
            aria-pressed={iosTab === 'web'}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              iosTab === 'web' ? 'bg-magenta text-white' : 'text-muted hover:text-white'
            }`}
          >
            Versión Web
          </button>
        </div>
      )}

      {isIos && iosTab === 'web' && (
        <p className="mt-5 text-sm font-semibold text-white">Opción alternativa: úsala desde Safari</p>
      )}

      <div className="mt-6">
        {/* key forces a clean remount (and animation replay) when the tab changes */}
        <InstallFlowView key={isIos ? iosTab : 'android'} flow={flow} />
      </div>
    </ModalShell>
  )
}
