import type { ReactNode } from 'react'

interface IPhoneFrameProps {
  children: ReactNode
  className?: string
}

/**
 * Wraps a screenshot/placeholder in a stylized iPhone frame
 * (rounded body, notch, magenta edge glow). Locks a 9:19.5 screen ratio.
 */
export default function IPhoneFrame({ children, className = '' }: IPhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[260px] rounded-[2.6rem] border border-white/10 bg-black p-2.5 shadow-glow ring-1 ring-white/5 ${className}`}
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-2.5 z-10 h-5 w-1/3 -translate-x-1/2 rounded-b-2xl bg-black" />
      {/* Screen */}
      <div className="overflow-hidden rounded-[2.1rem] bg-ink" style={{ aspectRatio: '9 / 19.5' }}>
        {children}
      </div>
    </div>
  )
}
