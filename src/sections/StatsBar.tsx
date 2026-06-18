import { motion } from 'framer-motion'
import { STATS } from '../lib/content'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

export default function StatsBar() {
  return (
    <section className="border-y border-white/[0.08] bg-white/[0.02]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-4 md:py-16"
      >
        {STATS.map((stat) => {
          const [head, ...rest] = stat.label.split(' — ')
          return (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="text-5xl text-gradient sm:text-6xl">{stat.number}</div>
              <div className="mt-1 text-sm font-bold uppercase tracking-wider text-white">{head}</div>
              {rest.length > 0 && (
                <div className="mt-1 text-xs text-muted sm:text-sm">{rest.join(' — ')}</div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
