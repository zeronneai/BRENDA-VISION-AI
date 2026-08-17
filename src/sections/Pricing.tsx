import { Sparkles } from 'lucide-react'
import BetaBadge from '../components/BetaBadge'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { useInstall } from '../components/install/InstallModalProvider'
import { getPlans } from '../lib/content'
import { useLang, useT } from '../lib/i18n'

export default function Pricing() {
  const { lang } = useLang()
  const t = useT()
  const { openSelector } = useInstall()
  const plans = getPlans(lang)

  return (
    <section id="precios" className="section">
      <SectionHeading title={t('pricing_title')} subtitle={t('pricing_sub')} />

      <SectionReveal className="mt-6 flex justify-center">
        <BetaBadge />
      </SectionReveal>

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <SectionReveal key={plan.name} delay={i * 0.1} className="flex">
            <div
              className={`glass flex w-full flex-col p-7 transition-all duration-300 ${
                plan.featured
                  ? 'border-lime/50 shadow-glow-lg md:scale-[1.04]'
                  : 'hover:border-white/20'
              }`}
            >
              {/* Free-trial badge — the main hook (animated) */}
              {plan.trialBadge && (
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-ink animate-trial-glow motion-reduce:animate-none motion-reduce:shadow-glow">
                  🎁 {plan.trialBadge}
                </span>
              )}

              {/* Badge */}
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  plan.badgeAccent ? 'bg-magenta text-white' : 'bg-white/10 text-muted'
                }`}
              >
                {plan.badge}
              </span>

              {/* Name */}
              <h3 className="mt-4 text-2xl text-white">{plan.name}</h3>

              {/* Price */}
              <div className="mt-3 flex items-end gap-2">
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
              {plan.subprice && <div className="mt-2 text-sm text-muted">{plan.subprice}</div>}

              {/* Description */}
              <p className="mt-5 text-sm leading-relaxed text-white/85">{plan.description}</p>

              {/* Delivery note (personalized, ~48h) */}
              {plan.delivery && (
                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-lime/25 bg-lime/[0.06] p-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                  <p className="text-xs leading-relaxed text-white/80">{plan.delivery}</p>
                </div>
              )}

              {/* Spacer so buttons align at the bottom */}
              <div className="flex-1" />

              {/* CTA — opens the install steps (create account -> install) */}
              <div className="mt-7">
                <Button
                  variant={plan.featured ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                  onClick={openSelector}
                >
                  {t('premium_card_btn')}
                </Button>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted">{t('pricing_note')}</p>
    </section>
  )
}
