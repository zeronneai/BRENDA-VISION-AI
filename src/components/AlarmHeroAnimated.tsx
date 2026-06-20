import { motion, useReducedMotion } from 'framer-motion'
import type { TargetAndTransition, Transition } from 'framer-motion'
import { BatteryFull, BellOff, Signal, Wifi } from 'lucide-react'

/**
 * Living, animated reproduction of the app's alarm screen — used in the Hero
 * in place of a static screenshot. Pure CSS/Framer Motion, no images.
 *
 * Respects `prefers-reduced-motion`: when the user opts out, every looping
 * animation is disabled and the screen renders as a crisp static frame.
 */
export default function AlarmHeroAnimated() {
  const reduce = useReducedMotion()

  // Helpers: return the animate/transition props only when motion is allowed,
  // so reduced-motion users get a still (but correct-looking) screen.
  const loop = (animate: TargetAndTransition, transition: Transition) =>
    reduce ? {} : { animate, transition }

  const infinite = (extra: Transition = {}): Transition => ({
    repeat: Infinity,
    ease: 'easeInOut',
    ...extra,
  })

  return (
    <div
      className="relative mx-auto w-[80%] max-w-[340px] rounded-[2.8rem] border border-white/10 bg-black p-2.5 shadow-glow ring-1 ring-white/5 sm:w-full sm:max-w-[380px]"
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-2.5 z-20 h-5 w-1/3 -translate-x-1/2 rounded-b-2xl bg-black" />

      {/* Screen */}
      <div
        className="relative flex flex-col overflow-hidden rounded-[2.3rem] px-5 pb-5 pt-3 text-center"
        style={{
          aspectRatio: '9 / 19.5',
          backgroundImage:
            'radial-gradient(120% 90% at 50% 8%, #2D0815 0%, #160512 45%, #0A050A 100%)',
        }}
      >
        {/* ── Status bar (static) ───────────────────────────────── */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-white/90">
          <span className="tabular-nums">14:44</span>
          <div className="flex items-center gap-1.5 text-white/80">
            <BellOff className="h-3 w-3" aria-hidden />
            <Signal className="h-3 w-3" aria-hidden />
            <Wifi className="h-3 w-3" aria-hidden />
            <BatteryFull className="h-3.5 w-3.5" aria-hidden />
          </div>
        </div>

        {/* ── Logo with vibrating bell ──────────────────────────── */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-magenta-bright">
          <motion.span
            className="inline-block"
            style={{ willChange: 'transform' }}
            {...loop({ rotate: [-5, 5, -5] }, infinite({ duration: 0.3 }))}
            aria-hidden
          >
            🔔
          </motion.span>
          <span>BOOTY ALARM</span>
        </div>

        {/* ── Giant time with pulsing glow ──────────────────────── */}
        <motion.div
          className="mt-4 font-display text-7xl leading-none text-white"
          {...loop(
            {
              textShadow: [
                '0 0 20px rgba(233,30,99,0)',
                '0 0 40px rgba(233,30,99,0.45)',
                '0 0 20px rgba(233,30,99,0)',
              ],
            },
            infinite({ duration: 1.2 }),
          )}
        >
          06:30
        </motion.div>

        {/* ── Alarm disc + sonar rings ──────────────────────────── */}
        <div className="relative mx-auto mt-8 flex h-32 w-32 items-center justify-center">
          {/* Expanding rings (sonar) */}
          {!reduce &&
            [0, 0.6, 1.2].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-magenta"
                style={{ willChange: 'transform, opacity' }}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}

          {/* Magenta disc (heartbeat) — emoji inside stays static */}
          <motion.div
            className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-magenta-bright to-magenta"
            style={{ willChange: 'transform' }}
            {...loop(
              {
                scale: [1, 1.05, 1],
                filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'],
                boxShadow: [
                  '0 0 30px rgba(233,30,99,0.5)',
                  '0 0 60px rgba(233,30,99,0.8)',
                  '0 0 30px rgba(233,30,99,0.5)',
                ],
              },
              infinite({ duration: 1.2 }),
            )}
            // Static fallback shadow when reduced motion is on
            initial={reduce ? { boxShadow: '0 0 40px rgba(233,30,99,0.6)' } : undefined}
          >
            <span className="text-5xl" aria-hidden>
              🍑
            </span>
          </motion.div>
        </div>

        {/* ── Description (static) ──────────────────────────────── */}
        <p className="mt-8 px-1 text-[13px] leading-snug text-white/80">
          No se apaga hasta que completes <b className="font-bold text-white">10 squats</b>. La cámara los
          cuenta.
        </p>

        {/* ── Pulsing pill button ───────────────────────────────── */}
        <motion.div
          className="mt-auto mb-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink"
          style={{ willChange: 'transform' }}
          {...loop(
            {
              scale: [1, 1.03, 1],
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.2)',
                '0 0 40px rgba(255,255,255,0.4)',
                '0 0 20px rgba(255,255,255,0.2)',
              ],
            },
            infinite({ duration: 1.5 }),
          )}
        >
          A DARLE 💪
        </motion.div>

        {/* ── Footnote (static) ─────────────────────────────────── */}
        <small className="text-[9px] leading-tight text-white/40">
          En iOS la app debe estar abierta · en Android suena en segundo plano
        </small>
      </div>
    </div>
  )
}
