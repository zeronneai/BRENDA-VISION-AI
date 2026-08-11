import { useT } from '../lib/i18n'

interface BetaBadgeProps {
  className?: string
}

/** Subtle lime pill flagging the open-beta status. */
export default function BetaBadge({ className = '' }: BetaBadgeProps) {
  const t = useT()
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 text-xs font-medium text-lime ${className}`}
    >
      {t('beta_badge')}
    </span>
  )
}
