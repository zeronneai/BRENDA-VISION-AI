import { Star } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { getTestimonials } from '../lib/content'
import { useLang, useT } from '../lib/i18n'

function Stars({ label }: { label: string }) {
  return (
    <div className="flex gap-1" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-lime text-lime" aria-hidden />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { lang } = useLang()
  const t = useT()
  const testimonials = getTestimonials(lang)

  return (
    <section className="section">
      <SectionHeading title={t('testi_title')} subtitle={t('testi_sub')} />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <SectionReveal key={item.name} delay={i * 0.1}>
            <GlassCard className="flex h-full flex-col">
              <Stars label={t('testi_stars_aria')} />
              <p className="mt-4 flex-1 text-white/90">“{item.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-magenta/30 bg-gradient-to-br from-magenta/40 to-ink text-xs font-bold text-white/70"
                  role="img"
                  aria-label={`${t('testi_photo_aria')} ${item.name}`}
                >
                  {item.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {item.name}, {item.age}
                </span>
              </div>
            </GlassCard>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
