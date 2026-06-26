import { motion, useReducedMotion } from 'framer-motion'
import {
  CheckCircle2,
  Compass,
  Download,
  ExternalLink,
  PenLine,
  Rocket,
  Send,
  Share,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LinkButton } from '../Button'
import { stagger } from '../../lib/motion'
import type { InstallFlow, StepIcon } from '../../lib/install'

const ICONS: Record<StepIcon, LucideIcon> = {
  Send,
  ExternalLink,
  CheckCircle2,
  Compass,
  Share,
  PenLine,
  Rocket,
  ShieldCheck,
  Download,
}

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

/** Renders a single install flow: optional warning, numbered steps, perks, footnotes. */
export default function InstallFlowView({ flow }: { flow: InstallFlow }) {
  const reduce = useReducedMotion()
  return (
    <div>
      {flow.warning && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-100">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" aria-hidden />
          <span>{flow.warning}</span>
        </div>
      )}

      {/* Numbered steps (stagger in on mount — modal content is always in view) */}
      <motion.ol
        variants={stagger}
        initial={reduce ? false : 'hidden'}
        animate="visible"
        className="space-y-4"
      >
        {flow.steps.map((step, i) => {
          const Icon = ICONS[step.icon]
          return (
            <motion.li
              key={step.title}
              variants={stepVariants}
              className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4"
            >
              {/* Number + placeholder illustration */}
              <div className="flex flex-col items-center gap-2">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-magenta text-sm font-bold text-white">
                  {i + 1}
                </span>
                {/* TODO: Replace with a real screenshot/illustration per step */}
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl border border-magenta/30 bg-gradient-to-br from-magenta/30 to-ink text-magenta-bright"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-sans text-base font-bold text-white">{step.title}</h4>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
                {step.note && <p className="mt-2 text-xs italic text-white/40">{step.note}</p>}
                {step.button && (
                  <LinkButton
                    href={step.button.href}
                    external
                    variant="outline"
                    size="md"
                    className="mt-3 !px-4 !py-2 !text-xs"
                  >
                    {step.button.label}
                  </LinkButton>
                )}
              </div>
            </motion.li>
          )
        })}
      </motion.ol>

      {/* Perks */}
      {flow.perks && (
        <ul className="mt-6 grid gap-2">
          {flow.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-white/90">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-lime" aria-hidden />
              {perk}
            </li>
          ))}
        </ul>
      )}

      {/* Footnotes */}
      {flow.footnotes && (
        <div className="mt-6 space-y-1">
          {flow.footnotes.map((note) => (
            <p key={note} className="text-xs text-muted">
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
