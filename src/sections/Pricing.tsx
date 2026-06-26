import { Check } from 'lucide-react'
import BetaBadge from '../components/BetaBadge'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import StoreButtons from '../components/StoreButtons'
import { PLANS } from '../lib/content'

export default function Pricing() {
  return (
    <section id="precios" className="section">
      <SectionHeading
        title="ELIGE TU PLAN"
        subtitle="Suscríbete desde la app. Cancela cuando quieras."
      />

      <SectionReveal className="mt-6 flex justify-center">
        <BetaBadge />
      </SectionReveal>

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
        {PLANS.map((plan, i) => (
          <SectionReveal key={plan.name} delay={i * 0.1} className="flex">
            <div
              className={`glass flex w-full flex-col p-7 transition-all duration-300 ${
                plan.featured
                  ? 'border-magenta/60 shadow-glow-lg md:scale-[1.03]'
                  : 'hover:border-white/20'
              }`}
            >
              {/* Badge */}
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  plan.badgeAccent ? 'bg-magenta text-white' : 'bg-white/10 text-muted'
                }`}
              >
                {plan.badge}
              </span>

              {/* Price */}
              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl text-white">{plan.price}</span>
                <span className="mb-1 text-muted">{plan.period}</span>
              </div>
              {plan.strikethrough && (
                <div className="mt-1 text-sm text-muted">
                  <span className="line-through">{plan.strikethrough}</span>
                </div>
              )}
              {plan.savings && (
                <div className="mt-1 text-sm font-semibold text-lime">{plan.savings}</div>
              )}

              {/* Benefits */}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-7">
                <StoreButtons fullWidth hideHelp className="sm:flex-col" />
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted">
        La suscripción se gestiona desde la app y se procesa de forma segura.
      </p>
    </section>
  )
}
