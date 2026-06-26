interface BetaBadgeProps {
  className?: string
}

/** Subtle lime pill flagging the open-beta status. */
export default function BetaBadge({ className = '' }: BetaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 text-xs font-medium text-lime ${className}`}
    >
      🚧 Beta abierta · Versión oficial pronto en App Store y Google Play
    </span>
  )
}
