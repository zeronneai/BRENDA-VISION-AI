import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AlarmHeroAnimated from '../components/AlarmHeroAnimated'
import StoreButtons from '../components/StoreButtons'
import { fadeUp, stagger } from '../lib/motion'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.h1
            variants={fadeUp}
            className="text-6xl leading-[0.9] sm:text-7xl md:text-8xl"
          >
            DESPIERTA<br />HACIENDO<br />
            <span className="text-gradient">SQUATS.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-lg text-lg text-muted sm:text-xl lg:mx-0">
            La única alarma que NO se apaga hasta que tu cuerpo se mueve.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-2xl font-bold tracking-wide text-magenta-bright sm:text-3xl"
          >
            ¿O NO PUEDES? 🍑
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex justify-center lg:justify-start">
            <StoreButtons size="lg" />
          </motion.div>
        </motion.div>

        {/* Hero screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="order-first lg:order-last"
        >
          <div className="animate-float motion-reduce:animate-none">
            <AlarmHeroAnimated />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#como-funciona"
        aria-label="Bajar"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
      >
        <ChevronDown className="h-7 w-7 animate-scroll-hint" />
      </a>
    </section>
  )
}
