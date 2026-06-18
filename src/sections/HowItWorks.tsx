import { Bell, Camera, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { STEPS } from '../lib/content'

const ICONS: Record<string, LucideIcon> = { Clock, Bell, Camera }

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <SectionHeading
        title="ASÍ FUNCIONA"
        subtitle="Tres pasos para no volver a quedarte dormida."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = ICONS[step.icon]
          return (
            <SectionReveal key={step.index} delay={i * 0.1}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-magenta/15 text-magenta-bright">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-4xl text-white/20">{step.index}</span>
                </div>
                <h3 className="mt-5 text-2xl text-white">{step.title}</h3>
                <p className="mt-2 text-muted">{step.description}</p>
              </GlassCard>
            </SectionReveal>
          )
        })}
      </div>
    </section>
  )
}
