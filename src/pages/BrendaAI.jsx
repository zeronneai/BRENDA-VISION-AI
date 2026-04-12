import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Trash2, ChevronDown, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'

const QUICK_PROMPTS = [
  { label: '💪 Rutina para hoy', text: '¿Qué rutina me recomiendas para hoy?' },
  { label: '🍽️ Plan de comidas', text: 'Dame un plan de comidas para hoy según mi objetivo' },
  { label: '🍑 Ejercicios glúteos', text: '¿Cuáles son los mejores ejercicios para glúteos?' },
  { label: '🔥 Motivación', text: 'Necesito motivación para entrenar hoy' },
  { label: '⚖️ Perder grasa', text: '¿Cómo puedo acelerar la pérdida de grasa?' },
  { label: '💤 Recuperación', text: '¿Cuánto tiempo necesito para recuperarme entre entrenos?' },
  { label: '🧬 Proteína', text: '¿Cuánta proteína necesito consumir al día?' },
  { label: '📉 Meseta', text: 'Estoy en una meseta, ¿qué puedo hacer para romperla?' },
]

export default function BrendaAI() {
  const { user, chatHistory, addChatMessage, clearChatHistory, apiKeySet } = useApp()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickPrompts, setShowQuickPrompts] = useState(chatHistory.length === 0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, isLoading])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || isLoading) return

    setInput('')
    setShowQuickPrompts(false)

    addChatMessage({ role: 'user', content: msg })
    setIsLoading(true)

    try {
      const history = [...chatHistory, { role: 'user', content: msg }]
      const apiMessages = history
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          userProfile: {
            name: user?.name,
            age: user?.age,
            goal: user?.goal,
            level: user?.level,
            weight: user?.weight,
            weightUnit: user?.weightUnit,
            height: user?.height,
            heightUnit: user?.heightUnit,
            workoutDays: user?.workoutDays,
          }
        })
      })

      const data = await res.json()

      if (data.error) {
        addChatMessage({
          role: 'assistant',
          content: `⚠️ ${data.error}\n\nPara activar Brenda IA, configura tu API key de Claude en el archivo \`.env\` del servidor.`
        })
      } else {
        addChatMessage({ role: 'assistant', content: data.content })
      }
    } catch (err) {
      addChatMessage({
        role: 'assistant',
        content: '⚠️ No pude conectarme al servidor. Asegúrate de que el servidor esté corriendo en el puerto 3001.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none px-5 pt-14 pb-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-brand-pink opacity-10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center glow-pink">
                <span className="text-xl font-black text-white">B</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-brand-dark" />
            </div>
            <div>
              <h1 className="text-base font-black text-white">Brenda IA</h1>
              <p className="text-xs text-green-400 font-medium">● En línea</p>
            </div>
          </div>
          <button
            onClick={() => { clearChatHistory(); setShowQuickPrompts(true) }}
            className="w-9 h-9 glass rounded-xl flex items-center justify-center"
          >
            <Trash2 size={15} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* API Key warning */}
      {!apiKeySet && (
        <div className="mx-5 mb-3 rounded-2xl p-3 flex items-start gap-2" style={{
          background: 'rgba(255,184,0,0.08)',
          border: '1px solid rgba(255,184,0,0.2)'
        }}>
          <Zap size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300 leading-relaxed">
            Configura tu <strong>ANTHROPIC_API_KEY</strong> en el archivo <code>.env</code> para activar la IA. El chat funcionará cuando el servidor esté corriendo.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 space-y-4 pb-4">
        {chatHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center pt-4 pb-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-brand flex items-center justify-center mb-4 glow-pink animate-float">
              <span className="text-3xl font-black text-white">B</span>
            </div>
            <h2 className="text-lg font-black text-white mb-2">¡Hola, {user?.name?.split(' ')[0] || 'campeona'}! 🔥</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Soy Brenda, tu coach fitness personal con IA. Pregúntame lo que quieras sobre entrenamiento, nutrición o motivación.
            </p>
          </motion.div>
        )}

        {chatHistory.map((msg, i) => (
          <MessageBubble key={msg.id || i} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <AnimatePresence>
        {showQuickPrompts && chatHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex-none px-5 pb-3"
          >
            <p className="text-xs text-gray-500 mb-2 font-medium">Preguntas frecuentes</p>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.label}
                  onClick={() => sendMessage(qp.text)}
                  className="flex-shrink-0 glass rounded-2xl px-3 py-2 text-xs font-semibold text-gray-300 whitespace-nowrap hover:bg-white/10 transition-colors"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex-none px-5 pb-4">
        <div className="glass rounded-2xl flex items-end gap-2 p-2"
          style={{ border: '1px solid rgba(255,20,147,0.15)' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregúntale a Brenda..."
            rows={1}
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none resize-none py-2 px-2 max-h-28 leading-relaxed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              input.trim() && !isLoading
                ? 'bg-gradient-brand glow-pink'
                : 'bg-white/5 cursor-not-allowed'
            }`}
          >
            <Send size={16} className={input.trim() && !isLoading ? 'text-white' : 'text-gray-600'} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-700 mt-2">
          Brenda IA puede cometer errores. No sustituye asesoría médica profesional.
        </p>
      </div>
    </div>
  )
}

/* ── Message Bubble ─────────────────────────────────────────────────────── */
function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 self-end">
          <span className="text-xs font-black text-white">B</span>
        </div>
      )}
      <div className={`max-w-[80%] px-4 py-3 ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
        <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">
          {formatMessage(message.content)}
        </p>
        <p className={`text-[10px] mt-1 ${isUser ? 'text-white/50' : 'text-gray-600'}`}>
          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) : ''}
        </p>
      </div>
    </motion.div>
  )
}

/* Format **bold** text */
function formatMessage(text) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-brand-pink-light">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

/* ── Typing Indicator ───────────────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 self-end">
        <span className="text-xs font-black text-white">B</span>
      </div>
      <div className="chat-bubble-ai px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  )
}
