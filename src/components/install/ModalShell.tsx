import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface ModalShellProps {
  isOpen: boolean
  onClose: () => void
  /** id of the element labelling the dialog (for aria-labelledby). */
  titleId: string
  children: ReactNode
  /** Sticky footer slot (e.g. the CTA), always visible while the body scrolls. */
  footer?: ReactNode
  maxWidth?: string
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'

/**
 * Accessible modal overlay: backdrop blur, slide-up + fade animation, ESC to
 * close, click-outside to close, focus trap, restores focus on close, and a
 * sticky footer slot. Honors prefers-reduced-motion. Full-screen-ish on mobile.
 */
export default function ModalShell({
  isOpen,
  onClose,
  titleId,
  children,
  footer,
  maxWidth = 'max-w-lg',
}: ModalShellProps) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  // Lock body scroll, manage focus + keyboard while open.
  useEffect(() => {
    if (!isOpen) return

    lastFocused.current = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    // Focus the first focusable element inside the panel.
    const focusFirst = () => {
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      nodes?.[0]?.focus()
    }
    const raf = requestAnimationFrame(focusFirst)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // Focus trap
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      lastFocused.current?.focus?.()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`glass relative flex max-h-[92vh] w-[95%] flex-col overflow-hidden rounded-3xl sm:w-full ${maxWidth}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable body */}
            <div className="no-scrollbar flex-1 overflow-y-auto p-6 sm:p-8">{children}</div>

            {/* Sticky footer (CTA) */}
            {footer && (
              <div className="border-t border-white/[0.08] bg-ink/60 p-4 backdrop-blur-md sm:p-6">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
