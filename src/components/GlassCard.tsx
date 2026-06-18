import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  /** Adds a hover lift + magenta glow. */
  interactive?: boolean
}

/** Glassmorphism card with optional hover scale + glow. */
export default function GlassCard({ children, className = '', interactive = true }: GlassCardProps) {
  return (
    <div
      className={[
        'glass p-6 transition-all duration-300',
        interactive
          ? 'hover:scale-[1.02] hover:border-magenta/40 hover:shadow-glow'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
