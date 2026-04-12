import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Flame, Dumbbell, Apple, Sparkles, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

const goals = [
  { id: 'perder_grasa', label: 'Perder grasa', emoji: '🔥', desc: 'Quiero reducir mi % graso y definir' },
  { id: 'ganar_musculo', label: 'Ganar músculo', emoji: '💪', desc: 'Quiero aumentar masa muscular' },
  { id: 'tonificar', label: 'Tonificar', emoji: '✨', desc: 'Quiero definir y mejorar mi figura' },
  { id: 'glutos', label: 'Trabajar glúteos', emoji: '🍑', desc: 'Mi prioridad son los glúteos' },
  { id: 'resistencia', label: 'Mejorar resistencia', emoji: '❤️', desc: 'Quiero más stamina y salud cardio' },
  { id: 'bienestar', label: 'Bienestar general', emoji: '🌟', desc: 'Quiero sentirme mejor en general' },
]

const levels = [
  { id: 'principiante', label: 'Principiante', emoji: '⭐', desc: 'Menos de 6 meses entrenando' },
  { id: 'intermedio', label: 'Intermedio', emoji: '⭐⭐', desc: '6 meses a 2 años de experiencia' },
  { id: 'avanzado', label: 'Avanzado', emoji: '⭐⭐⭐', desc: 'Más de 2 años entrenando' },
]

const daysOptions = [
  { value: 2, label: '2 días', desc: 'Mínimo efectivo' },
  { value: 3, label: '3 días', desc: 'Ideal para empezar' },
  { value: 4, label: '4 días', desc: 'Muy bueno' },
  { value: 5, label: '5 días', desc: 'Avanzado' },
  { value: 6, label: '6 días', desc: 'Dedicación total' },
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function Onboarding() {
  const { completeOnboarding } = useApp()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'female',
    height: '',
    weight: '',
    weightUnit: 'kg',
    heightUnit: 'cm',
    goal: '',
    level: '',
    workoutDays: 3,
  })

  const totalSteps = 5
  const progress = ((step + 1) / totalSteps) * 100

  const goNext = () => {
    setDir(1)
    setStep(s => Math.min(s + 1, totalSteps - 1))
  }

  const goPrev = () => {
    setDir(-1)
    setStep(s => Math.max(s - 1, 0))
  }

  const canProceed = () => {
    if (step === 0) return true
    if (step === 1) return form.name.trim().length > 0
    if (step === 2) return form.goal !== ''
    if (step === 3) return form.level !== ''
    if (step === 4) return true
    return true
  }

  const handleFinish = () => {
    completeOnboarding(form)
  }

  const steps = [
    <StepWelcome key="welcome" />,
    <StepProfile key="profile" form={form} setForm={setForm} />,
    <StepGoal key="goal" form={form} setForm={setForm} />,
    <StepLevel key="level" form={form} setForm={setForm} />,
    <StepSchedule key="schedule" form={form} setForm={setForm} onFinish={handleFinish} />,
  ]

  return (
    <div className="app-container onboarding-gradient flex flex-col">
      {/* Header */}
      <div className="flex-none px-6 pt-14 pb-6">
        <div className="flex items-center justify-between mb-4">
          {step > 0 ? (
            <button onClick={goPrev} className="w-10 h-10 glass rounded-xl flex items-center justify-center">
              <ChevronLeft size={20} className="text-white" />
            </button>
          ) : <div className="w-10" />}
          <span className="text-sm text-gray-400 font-medium">{step + 1} / {totalSteps}</span>
          <div className="w-10" />
        </div>
        {/* Progress bar */}
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full px-6 overflow-y-auto"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      {step < totalSteps - 1 && (
        <div className="flex-none px-6 pb-10 pt-4">
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className={`btn-primary w-full flex items-center justify-center gap-2 transition-all duration-200 ${
              !canProceed() ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <span>Continuar</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Step Components ───────────────────────────────────────────────────────────

function StepWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center pb-8">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-28 h-28 rounded-3xl bg-gradient-brand flex items-center justify-center mb-6 glow-pink"
      >
        <span className="text-4xl font-black text-white">BF</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-black mb-2"
      >
        <span className="gradient-text">Brenda Fit</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-base mb-8 leading-relaxed"
      >
        Tu app fitness premium con inteligencia artificial. Entrenamiento, nutrición y una coach personal a tu alcance. 🔥
      </motion.p>

      <div className="grid grid-cols-3 gap-4 w-full">
        {[
          { icon: Dumbbell, label: 'Rutinas Pro', color: 'text-brand-pink' },
          { icon: Apple, label: 'Nutrición', color: 'text-green-400' },
          { icon: Sparkles, label: 'IA Coach', color: 'text-yellow-400' },
        ].map(({ icon: Icon, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="card-brand rounded-2xl p-3 flex flex-col items-center gap-2"
          >
            <Icon size={24} className={color} />
            <span className="text-xs font-semibold text-gray-300">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StepProfile({ form, setForm }) {
  const up = (field, val) => setForm(f => ({ ...f, [field]: val }))

  return (
    <div className="pt-2 pb-8">
      <h2 className="text-2xl font-bold mb-1">Cuéntame sobre ti</h2>
      <p className="text-gray-400 text-sm mb-6">Personalizaré tu experiencia</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-300 mb-2 block">Nombre</label>
          <input
            type="text"
            value={form.name}
            onChange={e => up('name', e.target.value)}
            placeholder="¿Cómo te llamas?"
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-2 block">Edad</label>
            <input
              type="number"
              value={form.age}
              onChange={e => up('age', e.target.value)}
              placeholder="Años"
              className="input-field"
              min="14" max="80"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-2 block">Género</label>
            <select
              value={form.gender}
              onChange={e => up('gender', e.target.value)}
              className="input-field bg-transparent"
            >
              <option value="female">Mujer</option>
              <option value="male">Hombre</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-2 block">Peso</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={form.weight}
                onChange={e => up('weight', e.target.value)}
                placeholder="Ej: 65"
                className="input-field flex-1"
              />
              <button
                onClick={() => up('weightUnit', form.weightUnit === 'kg' ? 'lb' : 'kg')}
                className="glass rounded-xl px-3 text-sm font-bold text-brand-pink"
              >
                {form.weightUnit}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-2 block">Altura</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={form.height}
                onChange={e => up('height', e.target.value)}
                placeholder="Ej: 165"
                className="input-field flex-1"
              />
              <button
                onClick={() => up('heightUnit', form.heightUnit === 'cm' ? 'ft' : 'cm')}
                className="glass rounded-xl px-3 text-sm font-bold text-brand-pink"
              >
                {form.heightUnit}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepGoal({ form, setForm }) {
  return (
    <div className="pt-2 pb-8">
      <h2 className="text-2xl font-bold mb-1">¿Cuál es tu meta?</h2>
      <p className="text-gray-400 text-sm mb-6">Selecciona tu objetivo principal</p>

      <div className="space-y-3">
        {goals.map(goal => (
          <button
            key={goal.id}
            onClick={() => setForm(f => ({ ...f, goal: goal.id }))}
            className={`select-option w-full flex items-center gap-4 ${form.goal === goal.id ? 'selected' : ''}`}
          >
            <span className="text-2xl">{goal.emoji}</span>
            <div className="flex-1 text-left">
              <p className="font-semibold text-white">{goal.label}</p>
              <p className="text-xs text-gray-400">{goal.desc}</p>
            </div>
            {form.goal === goal.id && (
              <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepLevel({ form, setForm }) {
  return (
    <div className="pt-2 pb-8">
      <h2 className="text-2xl font-bold mb-1">Tu nivel de experiencia</h2>
      <p className="text-gray-400 text-sm mb-6">Seré honesta: sin juzgarte 💕</p>

      <div className="space-y-3">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => setForm(f => ({ ...f, level: level.id }))}
            className={`select-option w-full flex items-center gap-4 ${form.level === level.id ? 'selected' : ''}`}
          >
            <span className="text-xl">{level.emoji}</span>
            <div className="flex-1 text-left">
              <p className="font-semibold text-white">{level.label}</p>
              <p className="text-xs text-gray-400">{level.desc}</p>
            </div>
            {form.level === level.id && (
              <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepSchedule({ form, setForm, onFinish }) {
  return (
    <div className="pt-2 pb-8">
      <h2 className="text-2xl font-bold mb-1">¿Cuántos días entrenas?</h2>
      <p className="text-gray-400 text-sm mb-6">Sé realista, la consistencia es la clave</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {daysOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setForm(f => ({ ...f, workoutDays: opt.value }))}
            className={`select-option flex flex-col items-center py-5 gap-1 ${form.workoutDays === opt.value ? 'selected' : ''}`}
          >
            <span className="text-2xl font-black gradient-text">{opt.value}</span>
            <span className="text-sm font-semibold text-white">{opt.label}</span>
            <span className="text-xs text-gray-400">{opt.desc}</span>
          </button>
        ))}
      </div>

      <div className="card-brand rounded-2xl p-4 mb-6">
        <div className="flex gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-semibold text-brand-pink mb-1">Consejo de Brenda</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Recuerda: 3 días consistentes valen más que 6 días caóticos. Lo importante es que lo hagas de verdad.
            </p>
          </div>
        </div>
      </div>

      <button onClick={onFinish} className="btn-primary w-full flex items-center justify-center gap-2">
        <Flame size={18} />
        <span>¡Comenzar mi transformación!</span>
      </button>
    </div>
  )
}
