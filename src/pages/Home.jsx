import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Flame, Dumbbell, Apple, ChevronRight, Calendar, TrendingUp,
  Sparkles, Bell, Play, Trophy, Zap, Clock, Target
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { workouts, motivationalQuotes } from '../data/workouts'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return '¡Buenos días'
  if (h < 18) return '¡Buenas tardes'
  return '¡Buenas noches'
}

function getGreetingEmoji() {
  const h = new Date().getHours()
  if (h < 12) return '☀️'
  if (h < 18) return '🌤️'
  return '🌙'
}

const todayWorkout = workouts[0]
const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

export default function Home() {
  const navigate = useNavigate()
  const { user, streak, weeklyWorkouts, totalWorkouts, workoutLog, logWorkout, latestProgress } = useApp()
  const [todayDone, setTodayDone] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    setTodayDone(!!workoutLog[today])
  }, [workoutLog, today])

  const handleMarkDone = () => {
    logWorkout(today, { workoutId: todayWorkout.id, title: todayWorkout.title })
    setTodayDone(true)
  }

  const userName = user?.name ? user.name.split(' ')[0] : 'Campeona'
  const goalLabel = {
    perder_grasa: 'Perder grasa', ganar_musculo: 'Ganar músculo',
    tonificar: 'Tonificar', glutos: 'Glúteos', resistencia: 'Resistencia', bienestar: 'Bienestar'
  }[user?.goal] || 'Tu meta'

  return (
    <div className="pb-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#150010] to-transparent">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-pink opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative px-5 pt-14 pb-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-gray-400 text-sm font-medium">{getGreeting()}, {getGreetingEmoji()}</p>
              <h1 className="text-2xl font-black text-white">{userName} 🔥</h1>
            </div>
            <button className="w-10 h-10 glass rounded-xl flex items-center justify-center relative">
              <Bell size={18} className="text-gray-300" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-brand-pink rounded-full" />
            </button>
          </div>

          {/* Streak + weekly stats */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div {...fadeUp(0)} className="card-brand rounded-2xl p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Flame size={16} className="text-orange-400" />
                <span className="text-xl font-black text-white">{streak}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium text-center">Racha días</p>
            </motion.div>
            <motion.div {...fadeUp(0.05)} className="card-brand rounded-2xl p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Dumbbell size={16} className="text-brand-pink" />
                <span className="text-xl font-black text-white">{weeklyWorkouts}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium text-center">Esta semana</p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="card-brand rounded-2xl p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Trophy size={16} className="text-brand-gold" />
                <span className="text-xl font-black text-white">{totalWorkouts}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium text-center">Total entrenos</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* ── Today's Workout ─────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.15)}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white">Rutina de hoy</h2>
            <button onClick={() => navigate('/training')} className="text-brand-pink text-xs font-semibold flex items-center gap-1">
              Ver todas <ChevronRight size={14} />
            </button>
          </div>
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${todayWorkout.gradient} p-5`}
            style={{ boxShadow: '0 12px 40px rgba(255, 20, 147, 0.2)' }}>
            {/* BG pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-4 text-7xl">{todayWorkout.emoji}</div>
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-pink text-[10px]">HOY</span>
                <span className="badge badge-gold text-[10px]">{todayWorkout.difficulty}</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1">{todayWorkout.title}</h3>
              <p className="text-white/70 text-xs mb-4">{todayWorkout.subtitle}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-white/70" />
                  <span className="text-white text-xs font-medium">{todayWorkout.duration} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame size={13} className="text-white/70" />
                  <span className="text-white text-xs font-medium">{todayWorkout.calories} kcal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Dumbbell size={13} className="text-white/70" />
                  <span className="text-white text-xs font-medium">{todayWorkout.exercises.length} ejercicios</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/training/${todayWorkout.id}`)}
                  className="flex-1 bg-white text-gray-900 rounded-2xl py-3 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="currentColor" />
                  Iniciar
                </button>
                {!todayDone ? (
                  <button
                    onClick={handleMarkDone}
                    className="glass border border-white/20 text-white rounded-2xl py-3 px-4 text-sm font-semibold"
                  >
                    Marcar hecho
                  </button>
                ) : (
                  <div className="glass border border-green-500/30 text-green-400 rounded-2xl py-3 px-4 text-sm font-semibold flex items-center gap-1">
                    ✓ Listo
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quick Actions ───────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.2)}>
          <h2 className="text-base font-bold text-white mb-3">Accesos rápidos</h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate('/ai')} className="card-brand rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Brenda IA</p>
                <p className="text-[10px] text-gray-400">Tu coach personal</p>
              </div>
            </button>
            <button onClick={() => navigate('/nutrition')} className="card-brand rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Apple size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Nutrición</p>
                <p className="text-[10px] text-gray-400">Planes de comida</p>
              </div>
            </button>
            <button onClick={() => navigate('/calendar')} className="card-brand rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Calendario</p>
                <p className="text-[10px] text-gray-400">Tu racha</p>
              </div>
            </button>
            <button onClick={() => navigate('/progress')} className="card-brand rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Progreso</p>
                <p className="text-[10px] text-gray-400">Tus estadísticas</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* ── My Goal ────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.25)}>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                <Target size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Mi objetivo</p>
                <p className="text-sm font-bold text-white">{goalLabel}</p>
              </div>
              <button onClick={() => navigate('/profile')} className="ml-auto">
                <ChevronRight size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Entrenamientos esta semana</span>
                <span className="text-white font-semibold">{weeklyWorkouts}/{user?.workoutDays || 3}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min((weeklyWorkouts / (user?.workoutDays || 3)) * 100, 100)}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Brenda's Message ────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.3)}>
          <div className="relative overflow-hidden rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(255,20,147,0.08), rgba(155,39,175,0.08))',
            border: '1px solid rgba(255,20,147,0.2)'
          }}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-pink opacity-5 rounded-full blur-2xl" />
            <div className="p-4 flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center flex-shrink-0 glow-pink">
                <span className="text-lg font-black text-white">B</span>
              </div>
              <div>
                <p className="text-xs text-brand-pink font-semibold mb-1">Brenda dice:</p>
                <p className="text-sm text-gray-200 leading-relaxed italic">"{quote.text}"</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Recommended workouts ────────────────────────────────────── */}
        <motion.div {...fadeUp(0.35)}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white">Recomendados para ti</h2>
            <button onClick={() => navigate('/training')} className="text-brand-pink text-xs font-semibold flex items-center gap-1">
              Todos <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {workouts.slice(1, 4).map((w, i) => (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => navigate(`/training/${w.id}`)}
                className="card w-full flex items-center gap-4 hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${w.gradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{w.emoji}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-white truncate">{w.title}</p>
                  <p className="text-xs text-gray-400">{w.duration} min • {w.calories} kcal • {w.difficulty}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {w.isNew && <span className="badge badge-pink text-[9px]">NUEVO</span>}
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-white text-xs font-semibold">{w.rating}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Weekly Progress Bar ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0.4)}>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-brand-gold" />
              <h3 className="text-sm font-bold text-white">Actividad semanal</h3>
            </div>
            <WeeklyActivityChart workoutLog={workoutLog} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function WeeklyActivityChart({ workoutLog }) {
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek === 0 ? 7 : dayOfWeek) - 1))

  const weekDays = days.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = d.toISOString().split('T')[0]
    const isToday = key === today.toISOString().split('T')[0]
    const done = !!workoutLog[key]
    const isFuture = d > today
    return { label, done, isToday, isFuture }
  })

  return (
    <div className="flex items-end justify-between gap-1">
      {weekDays.map(({ label, done, isToday, isFuture }, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1">
          <div className="w-full relative">
            <div
              className={`w-full rounded-full transition-all duration-500 ${
                done ? 'h-10 bg-gradient-brand' :
                isFuture ? 'h-3 bg-white/5' :
                'h-3 bg-white/10'
              }`}
              style={done ? { boxShadow: '0 4px 15px rgba(255,20,147,0.3)' } : {}}
            />
          </div>
          <span className={`text-[11px] font-semibold ${isToday ? 'text-brand-pink' : 'text-gray-500'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
