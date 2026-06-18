import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { FAQ } from '../lib/content'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section">
      <SectionHeading title="PREGUNTAS FRECUENTES" />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ.map((item, i) => {
          const isOpen = open === i
          return (
            <SectionReveal key={item.question} delay={i * 0.04}>
              <div className="glass overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base font-semibold text-white sm:text-lg">
                    {item.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-magenta-bright transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-5 text-muted">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          )
        })}
      </div>
    </section>
  )
}
