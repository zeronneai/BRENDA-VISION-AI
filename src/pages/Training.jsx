import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, Flame, Star, Dumbbell, ChevronRight, Play } from 'lucide-react'
import { workouts, workoutCategories, programs } from '../data/workouts'

export default function Training() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('rutinas')

  const filtered = workouts.filter(w => {
    const matchCat = activeCategory === 'all' || w.category === activeCategory
    const matchSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-black text-white mb-1">Mis Rutinas</h1>
        <p className="text-gray-400 text-sm">Elige tu entrenamiento de hoy 💪</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar rutina..."
            className="input-field pl-9 text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="glass rounded-2xl p-1 flex gap-1">
          {['rutinas', 'programas'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                activeTab === tab ? 'bg-gradient-brand text-white' : 'text-gray-400'
              }`}
            >
              {tab === 'rutinas' ? '🏋️ Rutinas' : '📋 Programas'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'rutinas' ? (
        <>
          {/* Categories */}
          <div className="mb-4">
            <div className="flex gap-3 px-5 overflow-x-auto hide-scrollbar pb-1">
              {workoutCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-brand text-white shadow-brand'
                      : 'glass text-gray-400'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured workout */}
          {activeCategory === 'all' && !searchQuery && (
            <div className="px-5 mb-4">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/training/${workouts[0].id}`)}
                className={`relative overflow-hidden w-full rounded-3xl bg-gradient-to-br ${workouts[0].gradient} p-5`}
                style={{ boxShadow: '0 12px 40px rgba(255,20,147,0.2)' }}
              >
                <div className="absolute top-2 right-3 text-6xl opacity-20">{workouts[0].emoji}</div>
                <div className="relative text-left">
                  <span className="badge badge-gold text-[10px] mb-2">⭐ DESTACADO</span>
                  <h3 className="text-xl font-black text-white mb-1">{workouts[0].title}</h3>
                  <p className="text-white/70 text-xs mb-3">{workouts[0].description.slice(0, 80)}...</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-white/80 text-xs"><Clock size={12} />{workouts[0].duration} min</span>
                    <span className="flex items-center gap-1 text-white/80 text-xs"><Flame size={12} />{workouts[0].calories} kcal</span>
                    <span className="flex items-center gap-1 text-white/80 text-xs"><Star size={12} fill="white" />{workouts[0].rating}</span>
                  </div>
                </div>
              </motion.button>
            </div>
          )}

          {/* Workout list */}
          <div className="px-5 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <Dumbbell size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">No se encontraron rutinas</p>
              </div>
            ) : filtered.map((w, i) => (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/training/${w.id}`)}
                className="card w-full flex items-center gap-4 hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${w.gradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-3xl">{w.emoji}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white truncate">{w.title}</span>
                    {w.isNew && <span className="badge badge-pink text-[9px] flex-shrink-0">NUEVO</span>}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{w.subtitle}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-gray-400 text-[11px]"><Clock size={11} />{w.duration}m</span>
                    <span className="flex items-center gap-1 text-gray-400 text-[11px]"><Flame size={11} />{w.calories}</span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      w.difficulty === 'principiante' ? 'bg-green-500/10 text-green-400' :
                      w.difficulty === 'intermedio' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>{w.difficulty}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400" fill="#FBBF24" />
                    <span className="text-xs font-semibold text-white">{w.rating}</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <Play size={14} className="text-white" fill="white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <ProgramsTab navigate={navigate} />
      )}
    </div>
  )
}

function ProgramsTab({ navigate }) {
  return (
    <div className="px-5 space-y-4">
      <p className="text-xs text-gray-400">Programas de entrenamiento diseñados por Brenda para objetivos específicos.</p>
      {programs.map((prog, i) => (
        <motion.div
          key={prog.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${prog.gradient} p-5`}
          style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
        >
          <div className="absolute top-2 right-3 text-5xl opacity-20">{prog.emoji}</div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{prog.emoji}</span>
              <div>
                <h3 className="text-lg font-black text-white">{prog.title}</h3>
                <p className="text-white/70 text-xs">{prog.goal}</p>
              </div>
            </div>
            <p className="text-white/70 text-xs mb-4">{prog.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/80 text-xs">{prog.weeks} semanas</span>
              <span className="text-white/80 text-xs">{prog.workoutsPerWeek}x/semana</span>
              <span className="text-white/80 text-xs capitalize">{prog.level}</span>
            </div>
            <button
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl px-6 py-2.5 text-sm flex items-center gap-2"
            >
              <span>Empezar programa</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
