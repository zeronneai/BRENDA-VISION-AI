import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Flame, Star, Dumbbell, ChevronDown, ChevronUp, Check, Play } from 'lucide-react'
import { workouts } from '../data/workouts'
import { useApp } from '../context/AppContext'

export default function WorkoutDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { logWorkout, workoutLog } = useApp()
  const workout = workouts.find(w => w.id === parseInt(id))
  const [expandedExercise, setExpandedExercise] = useState(null)
  const [completed, setCompleted] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const alreadyDone = !!workoutLog[today]

  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
        <Dumbbell size={40} className="opacity-30" />
        <p>Rutina no encontrada</p>
        <button onClick={() => navigate('/training')} className="btn-primary text-sm">Volver</button>
      </div>
    )
  }

  const handleComplete = () => {
    logWorkout(today, { workoutId: workout.id, title: workout.title, calories: workout.calories })
    setCompleted(true)
  }

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${workout.gradient} pt-14 pb-8`}
        style={{ minHeight: 260 }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 text-8xl">{workout.emoji}</div>
        </div>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-14 left-5 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        <div className="relative px-5 pt-12">
          <div className="flex gap-2 mb-2">
            <span className="badge badge-gold text-[10px]">{workout.difficulty.toUpperCase()}</span>
            <span className="badge badge-pink text-[10px]">{workout.category.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-1">{workout.title}</h1>
          <p className="text-white/70 text-sm mb-4">{workout.subtitle}</p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-white/70" />
              <span className="text-white text-sm font-medium">{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame size={14} className="text-white/70" />
              <span className="text-white text-sm font-medium">{workout.calories} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} fill="white" className="text-white" />
              <span className="text-white text-sm font-medium">{workout.rating} ({workout.reviews.toLocaleString()})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        {/* Complete button */}
        {!alreadyDone && !completed ? (
          <button
            onClick={handleComplete}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Marcar como completado
          </button>
        ) : (
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
              <Check size={20} className="text-white" />
            </div>
            <div>
              <p className="text-green-400 font-semibold text-sm">¡Excelente trabajo!</p>
              <p className="text-green-400/70 text-xs">Entrenamiento completado hoy</p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="card">
          <h3 className="text-sm font-bold text-white mb-2">Descripción</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{workout.description}</p>
        </div>

        {/* Equipment */}
        <div className="card">
          <h3 className="text-sm font-bold text-white mb-3">Equipamiento</h3>
          <div className="flex flex-wrap gap-2">
            {workout.equipment.map(eq => (
              <span key={eq} className="badge badge-pink">{eq}</span>
            ))}
          </div>
        </div>

        {/* Warmup */}
        <div className="card">
          <h3 className="text-sm font-bold text-white mb-3">🔥 Calentamiento</h3>
          <ul className="space-y-2">
            {workout.warmup.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-[10px] font-bold">{i + 1}</span>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Exercises */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3">💪 Ejercicios ({workout.exercises.length})</h3>
          <div className="space-y-2">
            {workout.exercises.map((ex, i) => (
              <motion.div key={i} layout className="card">
                <button
                  className="w-full flex items-center gap-4"
                  onClick={() => setExpandedExercise(expandedExercise === i ? null : i)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-black">{i + 1}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-white">{ex.name}</p>
                    <p className="text-xs text-gray-400">
                      {ex.sets} series × {ex.reps} • Descanso: {ex.rest}
                    </p>
                  </div>
                  {expandedExercise === i
                    ? <ChevronUp size={16} className="text-gray-500" />
                    : <ChevronDown size={16} className="text-gray-500" />
                  }
                </button>
                {expandedExercise === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 pt-3 border-t border-white/5 space-y-2"
                  >
                    <div className="flex gap-2 flex-wrap">
                      <span className="badge badge-pink">{ex.sets} series</span>
                      <span className="badge badge-pink">{ex.reps} reps</span>
                      <span className="badge badge-gold">{ex.rest} descanso</span>
                    </div>
                    <div className="bg-brand-pink/5 rounded-xl p-3">
                      <p className="text-xs text-brand-pink font-semibold mb-1">💡 Músculos trabajados</p>
                      <p className="text-xs text-gray-300">{ex.muscles}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-gray-400 font-semibold mb-1">✅ Consejo técnico</p>
                      <p className="text-xs text-gray-300">{ex.tips}</p>
                    </div>

                    {/* Video placeholder */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 h-32 flex items-center justify-center border border-white/5">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <Play size={20} className="text-gray-400" fill="currentColor" />
                        </div>
                        <p className="text-xs">Video tutorial próximamente</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cooldown */}
        <div className="card">
          <h3 className="text-sm font-bold text-white mb-3">🧘 Enfriamiento</h3>
          <ul className="space-y-2">
            {workout.cooldown.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-[10px] font-bold">{i + 1}</span>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
