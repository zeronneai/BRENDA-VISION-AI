import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Plus, Scale, Ruler,
  Camera, Dumbbell, ChevronDown, X, Check, BarChart2
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts'
import { useApp } from '../context/AppContext'

const METRICS = [
  { id: 'peso', label: 'Peso', icon: Scale, unit: 'kg', color: '#FF1493' },
  { id: 'cintura', label: 'Cintura', icon: Ruler, unit: 'cm', color: '#9B27AF' },
  { id: 'cadera', label: 'Cadera', icon: Ruler, unit: 'cm', color: '#FF69B4' },
  { id: 'pecho', label: 'Pecho', icon: Ruler, unit: 'cm', color: '#FFB800' },
  { id: 'brazo', label: 'Brazo', icon: Dumbbell, unit: 'cm', color: '#00BCD4' },
  { id: 'muslo', label: 'Muslo', icon: Ruler, unit: 'cm', color: '#4CAF50' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-3 py-2 border border-white/10">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-bold text-white">{payload[0]?.value} {payload[0]?.name}</p>
    </div>
  )
}

export default function Progress() {
  const { progressLog, addProgressEntry, deleteProgressEntry, user } = useApp()
  const [activeMetric, setActiveMetric] = useState('peso')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEntry, setNewEntry] = useState({})

  const metric = METRICS.find(m => m.id === activeMetric)
  const unit = activeMetric === 'peso' ? (user?.weightUnit || 'kg') : 'cm'

  // Filter & sort entries for current metric
  const metricData = progressLog
    .filter(e => e[activeMetric] != null)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(e => ({
      date: new Date(e.date).toLocaleDateString('es', { month: 'short', day: 'numeric' }),
      [unit]: parseFloat(e[activeMetric]),
      id: e.id,
    }))

  const latest = metricData[metricData.length - 1]
  const prev = metricData[metricData.length - 2]
  const change = latest && prev ? (latest[unit] - prev[unit]).toFixed(1) : null

  const handleAdd = () => {
    if (!newEntry[activeMetric]) return
    addProgressEntry({ [activeMetric]: parseFloat(newEntry[activeMetric]) })
    setNewEntry({})
    setShowAddModal(false)
  }

  // Build body measurements from latest entry
  const latestFull = progressLog[0] || {}

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">Mi Progreso</h1>
          <p className="text-gray-400 text-sm">Registra y visualiza tu transformación 📈</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center glow-pink"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>

      {/* Current stats */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="card-brand rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Scale size={16} className="text-brand-pink" />
              <span className="text-xs text-gray-400 font-medium">Peso actual</span>
            </div>
            <p className="text-3xl font-black text-white">
              {latestFull.peso || user?.weight || '–'}
              <span className="text-base text-gray-400 font-normal ml-1">{unit}</span>
            </p>
            {change && (
              <div className={`flex items-center gap-1 mt-1 ${parseFloat(change) < 0 ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(change) < 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                <span className="text-xs font-semibold">{change > 0 ? '+' : ''}{change} {unit}</span>
              </div>
            )}
          </div>
          <div className="card-brand rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 size={16} className="text-brand-purple" />
              <span className="text-xs text-gray-400 font-medium">Registros</span>
            </div>
            <p className="text-3xl font-black text-white">{progressLog.length}</p>
            <p className="text-xs text-gray-500 mt-1">mediciones totales</p>
          </div>
        </div>
      </div>

      {/* Metric selector */}
      <div className="mb-4">
        <div className="flex gap-2 px-5 overflow-x-auto hide-scrollbar pb-1">
          {METRICS.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
                activeMetric === m.id ? 'bg-gradient-brand text-white' : 'glass text-gray-400'
              }`}
            >
              <m.icon size={12} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mx-5 card mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">{metric?.label} ({unit})</h3>
          {latest && (
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">{latest[unit]}</span>
              <span className="text-sm text-gray-400">{unit}</span>
            </div>
          )}
        </div>

        {metricData.length < 2 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-600">
            <BarChart2 size={36} className="mb-3 opacity-30" />
            <p className="text-sm">Agrega al menos 2 mediciones</p>
            <p className="text-xs text-gray-700 mt-1">para ver tu gráfica de progreso</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 btn-primary text-xs py-2 px-4"
            >
              + Agregar medición
            </button>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={metricData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metric?.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={metric?.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={unit}
                stroke={metric?.color}
                strokeWidth={2.5}
                fill="url(#colorMetric)"
                dot={{ fill: metric?.color, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: metric?.color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Body measurements snapshot */}
      <div className="mx-5 card mb-5">
        <h3 className="text-sm font-bold text-white mb-3">📐 Medidas actuales</h3>
        <div className="grid grid-cols-3 gap-2">
          {METRICS.map(m => (
            <div key={m.id} className="glass rounded-xl p-2.5 text-center">
              <m.icon size={14} className="mx-auto mb-1" style={{ color: m.color }} />
              <p className="text-sm font-bold text-white">
                {latestFull[m.id] || '–'}
              </p>
              <p className="text-[10px] text-gray-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo placeholder */}
      <div className="mx-5 card mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">📸 Fotos de progreso</h3>
          <button className="text-brand-pink text-xs font-semibold">+ Agregar</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="aspect-square rounded-xl glass flex flex-col items-center justify-center gap-1 border-dashed border border-white/10"
            >
              <Camera size={18} className="text-gray-600" />
              <span className="text-[10px] text-gray-600">Foto {i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 text-center mt-2">Próximamente: carga de fotos de progreso</p>
      </div>

      {/* History list */}
      {progressLog.length > 0 && (
        <div className="mx-5">
          <h3 className="text-sm font-bold text-white mb-3">📋 Historial de mediciones</h3>
          <div className="space-y-2">
            {progressLog.slice(0, 8).map(entry => (
              <div key={entry.id} className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                  <Scale size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {new Date(entry.date).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {Object.entries(entry)
                      .filter(([k]) => METRICS.some(m => m.id === k))
                      .map(([k, v]) => `${METRICS.find(m => m.id === k)?.label}: ${v}`)
                      .join(' · ')}
                  </p>
                </div>
                <button
                  onClick={() => deleteProgressEntry(entry.id)}
                  className="w-8 h-8 glass rounded-xl flex items-center justify-center"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ maxWidth: 430, margin: '0 auto' }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="relative w-full glass-dark rounded-t-3xl p-6 pb-10"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-black text-white">Nueva medición</h3>
                <button onClick={() => setShowAddModal(false)} className="w-8 h-8 glass rounded-xl flex items-center justify-center">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-4">Fecha: {new Date().toLocaleDateString('es', { day: 'numeric', month: 'long' })}</p>
              <div className="grid grid-cols-2 gap-3">
                {METRICS.map(m => (
                  <div key={m.id}>
                    <label className="text-xs text-gray-400 mb-1 block">{m.label} ({m.id === 'peso' ? unit : 'cm'})</label>
                    <input
                      type="number"
                      value={newEntry[m.id] || ''}
                      onChange={e => setNewEntry(prev => ({ ...prev, [m.id]: e.target.value }))}
                      placeholder={`Ej: ${m.id === 'peso' ? '65' : '80'}`}
                      className="input-field text-sm py-2"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleAdd}
                className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
              >
                <Check size={16} />
                Guardar medición
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
