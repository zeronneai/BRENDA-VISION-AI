import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Apple, Zap, Droplets, ChevronRight, ChevronDown, ChevronUp,
  Flame, Clock, Star, BookOpen, FlaskConical
} from 'lucide-react'
import { mealPlans, recipes, supplementGuide } from '../data/nutrition'
import { useApp } from '../context/AppContext'

const TABS = [
  { id: 'planes', label: '📋 Planes', },
  { id: 'recetas', label: '🍳 Recetas' },
  { id: 'suplementos', label: '💊 Suplementos' },
]

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState('planes')
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-black text-white mb-1">Nutrición</h1>
        <p className="text-gray-400 text-sm">Come bien, entrena mejor 🥗</p>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-5">
        <div className="glass rounded-2xl p-1 flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id ? 'bg-gradient-brand text-white' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'planes' && (
        <PlansTab selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      )}
      {activeTab === 'recetas' && <RecipesTab />}
      {activeTab === 'suplementos' && <SupplementsTab />}
    </div>
  )
}

/* ── Plans Tab ──────────────────────────────────────────────────────────── */
function PlansTab({ selectedPlan, setSelectedPlan }) {
  const { user } = useApp()

  if (selectedPlan !== null) {
    const plan = mealPlans[selectedPlan]
    return <PlanDetail plan={plan} onBack={() => setSelectedPlan(null)} />
  }

  return (
    <div className="px-5 space-y-4">
      {/* Macro tip */}
      <div className="card-brand rounded-2xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-xs text-brand-pink font-semibold mb-1">Tip de Brenda</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              El 80% de tus resultados vienen de la cocina. Elige el plan que mejor se adapte a tu objetivo y síguelo con consistencia.
            </p>
          </div>
        </div>
      </div>

      {/* Macro calculator quick */}
      <MacroQuickCalc user={user} />

      {/* Plan cards */}
      <h3 className="text-sm font-bold text-white">Planes disponibles</h3>
      {mealPlans.map((plan, i) => (
        <motion.button
          key={plan.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          onClick={() => setSelectedPlan(i)}
          className={`relative overflow-hidden w-full rounded-3xl p-5 text-left bg-gradient-to-br ${plan.gradient}`}
          style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
        >
          <div className="absolute top-2 right-3 text-5xl opacity-20">{plan.emoji}</div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{plan.emoji}</span>
              <div>
                <h3 className="text-base font-black text-white">{plan.name}</h3>
                <p className="text-white/60 text-xs">{plan.goal}</p>
              </div>
            </div>
            <p className="text-white/70 text-xs mb-3">{plan.description}</p>
            <div className="flex gap-3">
              <MacroBadge label="Kcal" value={plan.calories} color="bg-white/20" />
              <MacroBadge label="Prot" value={plan.protein} color="bg-white/20" />
              <MacroBadge label="Carbs" value={plan.carbs} color="bg-white/20" />
              <MacroBadge label="Grasas" value={plan.fats} color="bg-white/20" />
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

function MacroBadge({ label, value, color }) {
  return (
    <div className={`${color} rounded-xl px-2.5 py-1.5 text-center`}>
      <p className="text-white font-bold text-xs">{value}</p>
      <p className="text-white/60 text-[9px]">{label}</p>
    </div>
  )
}

function MacroQuickCalc({ user }) {
  const weight = parseFloat(user?.weight) || 65
  const unit = user?.weightUnit || 'kg'
  const weightKg = unit === 'lb' ? weight * 0.453 : weight
  const goal = user?.goal || 'tonificar'

  const protein = Math.round(weightKg * 1.8)
  const multiplier = goal === 'perder_grasa' ? 26 : goal === 'ganar_musculo' ? 35 : 30
  const calories = Math.round(weightKg * multiplier)

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className="text-brand-gold" />
        <h3 className="text-sm font-bold text-white">Tus macros estimados</h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Calorías', value: `${calories}`, unit: 'kcal', color: 'text-orange-400' },
          { label: 'Proteína', value: `${protein}g`, unit: '/día', color: 'text-blue-400' },
          { label: 'Carbs', value: `${Math.round(calories * 0.4 / 4)}g`, unit: '/día', color: 'text-green-400' },
          { label: 'Grasas', value: `${Math.round(calories * 0.3 / 9)}g`, unit: '/día', color: 'text-yellow-400' },
        ].map(m => (
          <div key={m.label} className="glass rounded-xl p-2 text-center">
            <p className={`text-sm font-black ${m.color}`}>{m.value}</p>
            <p className="text-gray-500 text-[9px]">{m.label}</p>
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-[10px] mt-2 text-center">
        Basado en tu peso de {user?.weight || '65'} {unit} y objetivo
      </p>
    </div>
  )
}

/* ── Plan Detail ────────────────────────────────────────────────────────── */
function PlanDetail({ plan, onBack }) {
  const [expandedMeal, setExpandedMeal] = useState(0)

  return (
    <div className="px-5 space-y-4">
      <button onClick={onBack} className="flex items-center gap-2 text-brand-pink text-sm font-semibold">
        ← Volver a planes
      </button>

      {/* Header */}
      <div className={`rounded-3xl p-5 bg-gradient-to-br ${plan.gradient}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{plan.emoji}</span>
          <div>
            <h2 className="text-lg font-black text-white">{plan.name}</h2>
            <p className="text-white/60 text-xs">{plan.goal}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { l: 'Kcal', v: plan.calories },
            { l: 'Prot', v: plan.protein },
            { l: 'Carbs', v: plan.carbs },
            { l: 'Grasas', v: plan.fats },
          ].map(m => (
            <div key={m.l} className="bg-white/15 rounded-xl p-2 text-center">
              <p className="text-white font-black text-sm">{m.v}</p>
              <p className="text-white/60 text-[9px]">{m.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Water */}
      <div className="card flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Droplets size={18} className="text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Hidratación diaria</p>
          <p className="text-xs text-gray-400">Mínimo 2-3 litros de agua</p>
        </div>
      </div>

      {/* Meals */}
      <h3 className="text-sm font-bold text-white">Plan del día</h3>
      {plan.meals.map((meal, i) => (
        <div key={i} className="card">
          <button
            className="w-full flex items-center gap-3"
            onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
              <Clock size={14} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-white">{meal.name}</p>
              <p className="text-xs text-gray-400">{meal.time} • {meal.totalCalories} kcal</p>
            </div>
            {expandedMeal === i ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
          </button>
          {expandedMeal === i && (
            <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
              {meal.foods.map((food, j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-pink flex-shrink-0" />
                    <span className="text-sm text-gray-300">{food.item}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{food.quantity}</span>
                    <span className="text-xs text-brand-pink font-semibold">{food.calories} kcal</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-white/5 flex justify-between">
                <span className="text-xs font-semibold text-gray-400">Total</span>
                <span className="text-xs font-black text-white">{meal.totalCalories} kcal</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Supplements */}
      <div className="card">
        <h3 className="text-sm font-bold text-white mb-3">💊 Suplementos recomendados</h3>
        <div className="space-y-2">
          {plan.supplements.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0" />
              <span className="text-sm text-gray-300">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card-brand rounded-2xl p-4">
        <h3 className="text-sm font-bold text-brand-pink mb-3">💡 Tips de Brenda</h3>
        <div className="space-y-2">
          {plan.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-brand-pink text-xs mt-0.5">✓</span>
              <span className="text-sm text-gray-300">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Recipes Tab ────────────────────────────────────────────────────────── */
function RecipesTab() {
  const [selected, setSelected] = useState(null)

  if (selected !== null) {
    const recipe = recipes[selected]
    return (
      <div className="px-5 space-y-4">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-brand-pink text-sm font-semibold">
          ← Volver a recetas
        </button>
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{recipe.emoji}</span>
            <div>
              <h2 className="text-lg font-black text-white">{recipe.name}</h2>
              <div className="flex gap-2 mt-1">
                <span className="badge badge-pink">{recipe.category}</span>
                <span className="badge badge-gold">{recipe.time}</span>
                <span className="badge badge-green">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { l: 'Kcal', v: recipe.calories, c: 'text-orange-400' },
              { l: 'Prot', v: recipe.protein, c: 'text-blue-400' },
              { l: 'Carbs', v: recipe.carbs, c: 'text-green-400' },
              { l: 'Grasas', v: recipe.fats, c: 'text-yellow-400' },
            ].map(m => (
              <div key={m.l} className="glass rounded-xl p-2 text-center">
                <p className={`text-sm font-black ${m.c}`}>{m.v}</p>
                <p className="text-gray-500 text-[9px]">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-white mb-3">🛒 Ingredientes</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                {ing}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-white mb-3">👩‍🍳 Preparación</h3>
          <ol className="space-y-3">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-[10px] font-black">{i + 1}</span>
                </div>
                <span className="text-sm text-gray-300 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  const categories = ['Todos', 'Desayuno', 'Almuerzo', 'Cena', 'Bebidas']
  const [activeFilter, setActiveFilter] = useState('Todos')
  const filtered = activeFilter === 'Todos' ? recipes : recipes.filter(r => r.category === activeFilter)

  return (
    <div className="px-5 space-y-4">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === cat ? 'bg-gradient-brand text-white' : 'glass text-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((recipe, i) => (
          <motion.button
            key={recipe.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(recipes.indexOf(recipe))}
            className="card text-left hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="text-4xl mb-3">{recipe.emoji}</div>
            <p className="text-sm font-bold text-white mb-1 leading-tight">{recipe.name}</p>
            <div className="flex gap-1.5 flex-wrap">
              <span className="badge badge-gold text-[9px]">{recipe.time}</span>
              <span className="badge badge-green text-[9px]">{recipe.difficulty}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Flame size={11} className="text-orange-400" />
              <span className="text-xs text-gray-400">{recipe.calories} kcal</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* ── Supplements Tab ────────────────────────────────────────────────────── */
function SupplementsTab() {
  const colorMap = {
    pink: 'from-pink-500 to-rose-500',
    purple: 'from-purple-500 to-violet-500',
    gold: 'from-yellow-500 to-amber-500',
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-400 to-orange-400',
    green: 'from-green-500 to-emerald-500',
  }

  return (
    <div className="px-5 space-y-4">
      <div className="card-brand rounded-2xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-xs text-brand-pink font-semibold mb-1">Importante</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Los suplementos complementan una buena alimentación, no la reemplazan. Consulta con un profesional de salud antes de iniciar cualquier suplementación.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {supplementGuide.map((supp, i) => (
          <motion.div
            key={supp.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card flex gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[supp.color]} flex items-center justify-center flex-shrink-0`}>
              <span className="text-xl">{supp.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">{supp.name}</p>
              <p className="text-xs text-gray-400 mb-2">{supp.benefit}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-pink text-[9px]">{supp.dose}</span>
                <span className="badge badge-gold text-[9px]">{supp.when}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
