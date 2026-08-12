import { motion, useReducedMotion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { LinkButton } from '../Button'
import ModalShell from './ModalShell'
import { PREMIUM_CHECKOUT_URL } from '../../lib/links'
import { useT } from '../../lib/i18n'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  /** Opens the device selector so users can grab the free app. */
  onDownloadApp: () => void
}

const TITLE_ID = 'premium-modal-title'

/**
 * Opened when a user picks a price. Explains that Premium (nutrition + training)
 * is purchased on the web (Stripe) and then unlocked by signing in on any
 * platform. This message lives ONLY here — never in the free-app download flows.
 */
export default function PremiumModal({ isOpen, onClose, onDownloadApp }: PremiumModalProps) {
  const t = useT()
  const reduce = useReducedMotion()

  const pulse = reduce
    ? {}
    : { animate: { scale: [1, 1.02, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const } }

  const footer = (
    <div className="flex flex-col items-center gap-3">
      <motion.div {...pulse} style={{ willChange: 'transform' }} className="w-full">
        <LinkButton href={PREMIUM_CHECKOUT_URL} external variant="primary" size="lg" className="w-full" onClick={onClose}>
          {t('premium_subscribe_btn')}
        </LinkButton>
      </motion.div>
      <button
        type="button"
        onClick={onDownloadApp}
        className="text-sm font-medium text-muted transition-colors hover:text-magenta-bright"
      >
        {t('premium_free_app')}
      </button>
    </div>
  )

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} titleId={TITLE_ID} maxWidth="max-w-md" footer={footer}>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-magenta/15 text-magenta-bright">
        <Crown className="h-7 w-7" aria-hidden />
      </div>

      <h3 id={TITLE_ID} className="mt-4 pr-10 text-3xl leading-none text-white">
        {t('premium_modal_title')}
      </h3>

      <div className="mt-5 rounded-2xl border border-magenta/25 bg-magenta/[0.07] p-4">
        <p className="text-sm leading-relaxed text-white/85">{t('premium_modal_msg')}</p>
      </div>
    </ModalShell>
  )
}
