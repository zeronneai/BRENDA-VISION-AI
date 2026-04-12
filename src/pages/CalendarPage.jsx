import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Flame, Trophy, Target,
  Calendar, Dumbbell, TrendingUp
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS_SHORT = ['Lu','Ma','Mi','Ju','Vi','Sá','Do']

export default function CalendarPage() {
  const { workoutLog, logWorkout, removeWorkoutLog, streak, weeklyWorkouts, totalWorkouts } = useApp()
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  // First day of month (0=Sun → adjust to Mon-based)
  const firstDayRaw = new Date(year, month, 1).getDay()
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => {
    if (year === today.getFullYear() && month === today.getMonth()) return
    setViewDate(new Date(year, month + 1, 1))
  }

  const getDayKey = (d) => {
    const dd = new Date(year, month, d)
    return dd.toISOString().split('T')[0]
  }

  const isToday = (d) => {
    const dd = new Date(year, month, d)
    return dd.toDateString() === today.toDateString()
  }

  const isFuture = (d) => new Date(year, month, d) > today

  const handleDayPress = (d) => {
    if (isFuture(d)) return
    const key = getDayKey(d)
    setSelectedDay(selectedDay === d ? null : d)
    if (workoutLog[key]) {
      removeWorkoutLog(key)
    } else {
      logWorkout(key, { manual: true, title: 'Entrenamiento registrado' })
    }
  }

  // Build longest streak in current view
  const monthStreak = (() => {
    let max = 0, curr = 0
    for (let d = 1; d <= daysInMonth; d++) {
      if (workoutLog[getDayKey(d)]) { curr++; max = Math.max(max, curr) }
      else curr = 0
    }
    return max
  })()

  const monthWorkouts = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    .filter(d => workoutLog[getDayKey(d)]).length

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-black text-white mb-1">Mi Calendario</h1>
        <p className="text-gray-400 text-sm">Registra y mantén tu racha 🔥</p>
      </div>

      {/* Streak stats */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Flame size={18} className="text-orange-400" />}
            value={streak}
            label="Racha actual"
            gradient="from-orange-500/20 to-red-500/10"
            border="border-orange-500/20"
          />
          <StatCard
            icon={<Trophy size={18} className="text-brand-gold" />}
            value={totalWorkouts}
            label="Total entrenos"
            gradient="from-yellow-500/20 to-amber-500/10"
            border="border-yellow-500/20"
          />
          <StatCard
            icon={<Target size={18} className="text-brand-pink" />}
            value={weeklyWorkouts}
            label="Esta semana"
            gradient="from-pink-500/20 to-purple-500/10"
            border="border-pink-500/20"
          />
        </div>
      </div>

      {/* Streak fire banner */}
      {streak >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mb-5 rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,184,0,0.1))', border: '1px solid rgba(255,184,0,0.25)' }}
        >
          <span className="text-3xl">🔥</span>
          <div>
            <p className="text-sm font-black text-yellow-300">¡Racha de {streak} días!</p>
            <p className="text-xs text-yellow-400/70">
              {streak >= 30 ? '¡Leyenda absoluta! 👑' :
               streak >= 14 ? '¡Imparable! Sigue así 💪' :
               streak >= 7 ? '¡Una semana completa! 🌟' :
               '¡Vas increíble! No pares 🚀'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Calendar */}
      <div className="mx-5 card mb-5">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-9 h-9 glass rounded-xl flex items-center justify-center">
            <ChevronLeft size={18} className="text-gray-400" />
          </button>
          <h2 className="text-base font-bold text-white">
            {MONTHS[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            disabled={year === today.getFullYear() && month === today.getMonth()}
            className={`w-9 h-9 glass rounded-xl flex items-center justify-center ${
              year === today.getFullYear() && month === today.getMonth() ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS_SHORT.map(d => (
            <div key={d} className="text-center text-[11px] text-gray-600 font-semibold py-1">{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* Empty cells */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const d = i + 1
            const key = getDayKey(d)
            const done = !!workoutLog[key]
            const future = isFuture(d)
            const todayDay = isToday(d)

            return (
              <button
                key={d}
                onClick={() => handleDayPress(d)}
                disabled={future}
                className="flex flex-col items-center justify-center gap-0.5 py-1"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  done
                    ? 'bg-gradient-brand shadow-brand'
                    : todayDay
                    ? 'border-2 border-brand-pink'
                    : future
                    ? 'opacity-25'
                    : ''
                }`}>
                  <span className={`text-[13px] font-semibold ${
                    done ? 'text-white' :
                    todayDay ? 'text-brand-pink' :
                    future ? 'text-gray-700' :
                    'text-gray-400'
                  }`}>{d}</span>
                </div>
                {done && <div className="w-1 h-1 rounded-full bg-brand-pink" />}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-brand" />
            <span className="text-xs text-gray-500">Completado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-brand-pink" />
            <span className="text-xs text-gray-500">Hoy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <span className="text-xs text-gray-500">Sin registro</span>
          </div>
        </div>
      </div>

      {/* Month summary */}
      <div className="mx-5 card mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-brand-pink" />
          <h3 className="text-sm font-bold text-white">Resumen de {MONTHS[month]}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-2xl font-black gradient-text">{monthWorkouts}</p>
            <p className="text-xs text-gray-400">Entrenamientos</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-2xl font-black gradient-text">{monthStreak}</p>
            <p className="text-xs text-gray-400">Mejor racha del mes</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Consistencia mensual</span>
            <span className="text-white font-semibold">{Math.round((monthWorkouts / daysInMonth) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(monthWorkouts / daysInMonth) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Achievement badges */}
      <div className="mx-5">
        <h3 className="text-sm font-bold text-white mb-3">🏆 Logros</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: '🌱', label: 'Primer entreno', earned: totalWorkouts >= 1 },
            { emoji: '🔥', label: '3 días seguidos', earned: streak >= 3 },
            { emoji: '⭐', label: '7 días racha', earned: streak >= 7 },
            { emoji: '💪', label: '10 entrenos', earned: totalWorkouts >= 10 },
            { emoji: '👑', label: '30 días racha', earned: streak >= 30 },
            { emoji: '🏆', label: '50 entrenos', earned: totalWorkouts >= 50 },
          ].map((badge) => (
            <div
              key={badge.label}
              className={`rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center transition-all ${
                badge.earned
                  ? 'card-brand'
                  : 'glass opacity-40'
              }`}
            >
              <span className={`text-2xl ${!badge.earned && 'grayscale'}`}>{badge.emoji}</span>
              <p className={`text-[10px] font-semibold leading-tight ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                {badge.label}
              </p>
              {badge.earned && (
                <span className="badge badge-pink text-[8px]">✓ logrado</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, gradient, border }) {
  return (
    <div className={`rounded-2xl p-3 flex flex-col items-center gap-1 bg-gradient-to-br ${gradient} border ${border}`}>
      {icon}
      <span className="text-xl font-black text-white">{value}</span>
      <p className="text-[10px] text-gray-400 font-medium text-center leading-tight">{label}</p>
    </div>
  )
}
