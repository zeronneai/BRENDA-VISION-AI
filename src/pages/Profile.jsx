import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Settings, Bell, Scale, Ruler, Target, ChevronRight,
  LogOut, Star, Shield, HelpCircle, Instagram, Palette,
  Save, X, Dumbbell, Calendar, TrendingUp, Key, Check
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const GOALS_LABELS = {
  perder_grasa: 'Perder grasa 🔥',
  ganar_musculo: 'Ganar músculo 💪',
  tonificar: 'Tonificar ✨',
  glutos: 'Glúteos 🍑',
  resistencia: 'Resistencia ❤️',
  bienestar: 'Bienestar 🌟',
}

const LEVELS = {
  principiante: 'Principiante ⭐',
  intermedio: 'Intermedio ⭐⭐',
  avanzado: 'Avanzado ⭐⭐⭐',
}

export default function Profile() {
  const { user, updateUser, settings, updateSettings, streak, weeklyWorkouts, totalWorkouts } = useApp()
  const [activeSection, setActiveSection] = useState(null)

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-black text-white mb-1">Mi Perfil</h1>
        <p className="text-gray-400 text-sm">Configura tu experiencia 🛠️</p>
      </div>

      {/* Profile card */}
      <div className="mx-5 mb-5">
        <div className="card-brand rounded-3xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center flex-shrink-0 glow-pink">
              <span className="text-2xl font-black text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-black text-white truncate">{user?.name || 'Mi nombre'}</h2>
              <p className="text-xs text-brand-pink font-semibold">{GOALS_LABELS[user?.goal] || 'Sin objetivo'}</p>
              <p className="text-xs text-gray-400">{LEVELS[user?.level] || 'Sin nivel'}</p>
            </div>
            <button
              onClick={() => setActiveSection('editProfile')}
              className="w-9 h-9 glass rounded-xl flex items-center justify-center"
            >
              <Settings size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🔥', value: streak, label: 'Racha' },
              { icon: '💪', value: weeklyWorkouts, label: 'Esta semana' },
              { icon: '🏆', value: totalWorkouts, label: 'Total' },
            ].map(s => (
              <div key={s.label} className="glass rounded-xl p-2.5 text-center">
                <p className="text-base">{s.icon}</p>
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body stats */}
      <div className="mx-5 mb-5 card">
        <h3 className="text-sm font-bold text-white mb-3">📊 Mis datos corporales</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Peso', value: user?.weight ? `${user.weight} ${user.weightUnit || 'kg'}` : 'No registrado', icon: '⚖️' },
            { label: 'Altura', value: user?.height ? `${user.height} ${user.heightUnit || 'cm'}` : 'No registrada', icon: '📏' },
            { label: 'Edad', value: user?.age ? `${user.age} años` : 'No registrada', icon: '🎂' },
            { label: 'Días/semana', value: `${user?.workoutDays || 3} días`, icon: '📅' },
          ].map(item => (
            <div key={item.label} className="glass rounded-xl p-3 flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400">{item.label}</p>
                <p className="text-sm font-bold text-white truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setActiveSection('editProfile')}
          className="mt-3 w-full glass rounded-xl py-2.5 text-sm text-brand-pink font-semibold"
        >
          Editar datos
        </button>
      </div>

      {/* Settings sections */}
      <div className="mx-5 space-y-3">

        {/* Units */}
        <SettingsGroup title="Unidades y medidas" icon={<Scale size={16} className="text-brand-pink" />}>
          <SettingsRow
            label="Unidad de peso"
            value={settings.weightUnit === 'kg' ? 'Kilogramos (kg)' : 'Libras (lb)'}
            onPress={() => setActiveSection('units')}
          />
          <SettingsRow
            label="Unidad de altura"
            value={settings.heightUnit === 'cm' ? 'Centímetros (cm)' : 'Pies/Pulgadas (ft)'}
            onPress={() => setActiveSection('units')}
            noBorder
          />
        </SettingsGroup>

        {/* Notifications */}
        <SettingsGroup title="Notificaciones" icon={<Bell size={16} className="text-blue-400" />}>
          <SettingsToggle
            label="Recordatorio de entreno"
            value={settings.notifications?.workoutReminder ?? true}
            onChange={v => updateSettings({ notifications: { ...settings.notifications, workoutReminder: v } })}
          />
          <SettingsToggle
            label="Alertas de racha"
            value={settings.notifications?.streakAlerts ?? true}
            onChange={v => updateSettings({ notifications: { ...settings.notifications, streakAlerts: v } })}
          />
          <SettingsToggle
            label="Reporte semanal"
            value={settings.notifications?.weeklyReport ?? true}
            onChange={v => updateSettings({ notifications: { ...settings.notifications, weeklyReport: v } })}
            noBorder
          />
        </SettingsGroup>

        {/* AI Configuration */}
        <SettingsGroup title="Brenda IA" icon={<Key size={16} className="text-yellow-400" />}>
          <SettingsRow
            label="Configurar API Key"
            value="Configura en .env"
            onPress={() => setActiveSection('apiKey')}
            noBorder
          />
        </SettingsGroup>

        {/* About */}
        <SettingsGroup title="Acerca de" icon={<Star size={16} className="text-brand-gold" />}>
          <SettingsRow label="Versión" value="1.0.0" />
          <SettingsRow label="Sígueme en Instagram" value="@brendaa_jazmin" icon={<Instagram size={14} />} />
          <SettingsRow label="Soporte" value="Ayuda y FAQ" onPress={() => {}} noBorder />
        </SettingsGroup>

        {/* Reset */}
        <button
          onClick={() => setActiveSection('reset')}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center">
            <LogOut size={16} className="text-red-400" />
          </div>
          <span className="text-sm font-semibold text-red-400">Reiniciar app / Cerrar sesión</span>
        </button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeSection === 'editProfile' && (
          <EditProfileModal user={user} updateUser={updateUser} onClose={() => setActiveSection(null)} />
        )}
        {activeSection === 'units' && (
          <UnitsModal settings={settings} updateSettings={updateSettings} onClose={() => setActiveSection(null)} />
        )}
        {activeSection === 'apiKey' && (
          <ApiKeyModal onClose={() => setActiveSection(null)} />
        )}
        {activeSection === 'reset' && (
          <ResetModal onClose={() => setActiveSection(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Settings Components ────────────────────────────────────────────────── */
function SettingsGroup({ title, icon, children }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function SettingsRow({ label, value, onPress, icon, noBorder }) {
  return (
    <button
      onClick={onPress}
      className={`w-full flex items-center justify-between py-3 ${!noBorder ? 'border-b border-white/5' : ''}`}
    >
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="text-sm text-white font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{value}</span>
        {onPress && <ChevronRight size={14} className="text-gray-600" />}
      </div>
    </button>
  )
}

function SettingsToggle({ label, value, onChange, noBorder }) {
  return (
    <div className={`flex items-center justify-between py-3 ${!noBorder ? 'border-b border-white/5' : ''}`}>
      <span className="text-sm text-white font-medium">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${value ? 'bg-gradient-brand' : 'bg-white/10'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${value ? 'left-6' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

/* ── Modals ─────────────────────────────────────────────────────────────── */
function ModalWrapper({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end"
      style={{ maxWidth: 430, margin: '0 auto' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full glass-dark rounded-t-3xl p-6 pb-10 max-h-[90vh] overflow-y-auto"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function EditProfileModal({ user, updateUser, onClose }) {
  const [form, setForm] = useState({ ...user })
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = () => { updateUser(form); onClose() }

  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-white">Editar perfil</h3>
        <button onClick={onClose} className="w-8 h-8 glass rounded-xl flex items-center justify-center">
          <X size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Nombre</label>
          <input value={form.name || ''} onChange={e => up('name', e.target.value)} placeholder="Tu nombre" className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Edad</label>
            <input type="number" value={form.age || ''} onChange={e => up('age', e.target.value)} placeholder="Años" className="input-field" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Género</label>
            <select value={form.gender || 'female'} onChange={e => up('gender', e.target.value)} className="input-field bg-transparent">
              <option value="female">Mujer</option>
              <option value="male">Hombre</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Peso ({form.weightUnit || 'kg'})</label>
            <input type="number" value={form.weight || ''} onChange={e => up('weight', e.target.value)} placeholder="Ej: 65" className="input-field" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Altura ({form.heightUnit || 'cm'})</label>
            <input type="number" value={form.height || ''} onChange={e => up('height', e.target.value)} placeholder="Ej: 165" className="input-field" />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Días de entrenamiento por semana</label>
          <div className="flex gap-2">
            {[2,3,4,5,6].map(d => (
              <button
                key={d}
                onClick={() => up('workoutDays', d)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  form.workoutDays === d ? 'bg-gradient-brand text-white' : 'glass text-gray-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-2 block">Objetivo</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(GOALS_LABELS).map(([id, label]) => (
              <button
                key={id}
                onClick={() => up('goal', id)}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  form.goal === id ? 'bg-gradient-brand text-white' : 'glass text-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={save} className="btn-primary w-full mt-5 flex items-center justify-center gap-2">
        <Save size={16} />
        Guardar cambios
      </button>
    </ModalWrapper>
  )
}

function UnitsModal({ settings, updateSettings, onClose }) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-white">Unidades</h3>
        <button onClick={onClose} className="w-8 h-8 glass rounded-xl flex items-center justify-center">
          <X size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-white mb-3">Unidad de peso</p>
          <div className="glass rounded-2xl p-1 flex gap-1">
            {['kg', 'lb'].map(u => (
              <button
                key={u}
                onClick={() => updateSettings({ weightUnit: u })}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  settings.weightUnit === u ? 'bg-gradient-brand text-white' : 'text-gray-400'
                }`}
              >
                {u === 'kg' ? '⚖️ Kilogramos (kg)' : '⚖️ Libras (lb)'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-3">Unidad de altura</p>
          <div className="glass rounded-2xl p-1 flex gap-1">
            {['cm', 'ft'].map(u => (
              <button
                key={u}
                onClick={() => updateSettings({ heightUnit: u })}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  settings.heightUnit === u ? 'bg-gradient-brand text-white' : 'text-gray-400'
                }`}
              >
                {u === 'cm' ? '📏 Centímetros' : '📏 Pies / Pulgadas'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={onClose} className="btn-primary w-full mt-5 flex items-center justify-center gap-2">
        <Check size={16} />
        Listo
      </button>
    </ModalWrapper>
  )
}

function ApiKeyModal({ onClose }) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-white">Configurar Brenda IA</h3>
        <button onClick={onClose} className="w-8 h-8 glass rounded-xl flex items-center justify-center">
          <X size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="card-brand rounded-2xl p-4">
          <p className="text-sm text-gray-200 leading-relaxed">
            Para activar Brenda IA con Claude, necesitas configurar tu API Key en el archivo <code className="text-brand-pink">.env</code> en la raíz del proyecto.
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-400 font-semibold mb-2">Pasos:</p>
          <ol className="space-y-2">
            {[
              'Copia el archivo .env.example como .env',
              'Abre el archivo .env',
              'Reemplaza "your_api_key_here" con tu API Key de Anthropic',
              'Reinicia el servidor con: npm run dev',
            ].map((step, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-brand-pink font-bold">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="glass rounded-2xl p-3 font-mono text-xs text-green-400">
          {'ANTHROPIC_API_KEY=sk-ant-...'}
        </div>
        <p className="text-xs text-gray-500 text-center">
          Obtén tu API Key en console.anthropic.com
        </p>
      </div>
      <button onClick={onClose} className="btn-primary w-full mt-5">Entendido</button>
    </ModalWrapper>
  )
}

function ResetModal({ onClose }) {
  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-white">Reiniciar app</h3>
        <button onClick={onClose} className="w-8 h-8 glass rounded-xl flex items-center justify-center">
          <X size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="card mb-5">
        <p className="text-sm text-gray-300 leading-relaxed">
          ⚠️ Esto eliminará todos tus datos locales: perfil, historial de entrenamientos, progreso y conversaciones con Brenda IA. <strong className="text-white">Esta acción no se puede deshacer.</strong>
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 btn-ghost py-3 text-sm font-semibold">
          Cancelar
        </button>
        <button
          onClick={handleReset}
          className="flex-1 py-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold"
        >
          Sí, reiniciar
        </button>
      </div>
    </ModalWrapper>
  )
}
