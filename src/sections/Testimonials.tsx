import { Star } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { TESTIMONIALS } from '../lib/content'

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-lime text-lime" aria-hidden />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section">
      <SectionHeading title="ELLAS YA SE LEVANTAN" subtitle="Mujeres reales. Resultados reales." />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <SectionReveal key={t.name} delay={i * 0.1}>
            <GlassCard className="flex h-full flex-col">
              <Stars />
              <p className="mt-4 flex-1 text-white/90">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                {/* TODO: Replace with circular Cloudinary photo */}
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-magenta/30 bg-gradient-to-br from-magenta/40 to-ink text-xs font-bold text-white/70"
                  role="img"
                  aria-label={`Foto de ${t.name}`}
                >
                  {t.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {t.name}, {t.age}
                </span>
              </div>
            </GlassCard>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
