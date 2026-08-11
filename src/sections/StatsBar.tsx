import { motion } from 'framer-motion'
import { getStats } from '../lib/content'
import { useLang } from '../lib/i18n'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

export default function StatsBar() {
  const { lang } = useLang()
  const stats = getStats(lang)

  return (
    <section className="border-y border-white/[0.08] bg-white/[0.02]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-4 md:py-16"
      >
        {stats.map((stat) => (
          <motion.div key={stat.head} variants={fadeUp} className="text-center">
            <div className="text-5xl text-gradient sm:text-6xl">{stat.number}</div>
            <div className="mt-1 text-sm font-bold uppercase tracking-wider text-white">{stat.head}</div>
            <div className="mt-1 text-xs text-muted sm:text-sm">{stat.sub}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
