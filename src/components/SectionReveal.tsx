import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '../lib/motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  /** Delay (s) before the reveal animation starts. */
  delay?: number
  as?: 'div' | 'section' | 'li'
}

/** Wraps content in a scroll-triggered fade-up reveal (animates once). */
export default function SectionReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: SectionRevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
