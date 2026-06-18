import type { Variants } from 'framer-motion'

/** Fade + rise used by most scroll-reveal sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Container that staggers its direct children. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

/** Shared viewport config: animate once when ~20% enters the screen. */
export const viewportOnce = { once: true, amount: 0.2 } as const
