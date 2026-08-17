import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AlarmHeroAnimated from '../components/AlarmHeroAnimated'
import BetaBadge from '../components/BetaBadge'
import StoreButtons from '../components/StoreButtons'
import { fadeUp, stagger } from '../lib/motion'
import { useLang, useT } from '../lib/i18n'

export default function Hero() {
  const { lang } = useLang()
  const t = useT()

  return (
    <>
      {/* Top: message + download buttons (first thing you see) */}
      <section
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-8"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <BetaBadge />
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl leading-[0.9] sm:text-7xl md:text-8xl">
            {lang === 'es' ? (
              <>
                DESPIERTA<br />HACIENDO<br />
                <span className="text-gradient">SQUATS.</span>
              </>
            ) : (
              <>
                WAKE UP<br />DOING<br />
                <span className="text-gradient">SQUATS.</span>
              </>
            )}
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {t('hero_sub')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-2xl font-bold tracking-wide text-magenta-bright sm:text-3xl"
          >
            {t('hero_tagline')}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex justify-center">
            <StoreButtons size="lg" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-lime/40 bg-lime/10 px-4 py-2 text-sm font-bold text-lime animate-trial-glow motion-reduce:animate-none">
              {t('hero_trial')}
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <a
          href="#app-preview"
          aria-label={t('hero_scroll')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
        >
          <ChevronDown className="h-7 w-7 animate-scroll-hint" />
        </a>
      </section>

      {/* Below: the app animation on a slightly lighter band (visual divider) */}
      <section id="app-preview" className="border-y border-white/[0.06] bg-white/[0.03]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20"
        >
          <div className="animate-float motion-reduce:animate-none">
            <AlarmHeroAnimated />
          </div>
        </motion.div>
      </section>
    </>
  )
}
