import Anthropic from '@anthropic-ai/sdk'
import { BRENDA_SYSTEM_PROMPT } from './_brenda.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(400).json({ error: 'API key no configurada' })
  }

  const { goal, level, duration, equipment, focusArea } = req.body

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `Genera una rutina de entrenamiento completa con estas especificaciones:
- Objetivo: ${goal}
- Nivel: ${level}
- Duración: ${duration} minutos
- Equipamiento: ${equipment}
- Área de enfoque: ${focusArea}

Responde SOLO con JSON válido (sin markdown):
{"title":"...","description":"...","warmup":[{"name":"...","duration":"..."}],"exercises":[{"name":"...","sets":3,"reps":"12-15","rest":"60s","tips":"..."}],"cooldown":[{"name":"...","duration":"..."}],"totalCalories":300,"motivation":"..."}`

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      system: BRENDA_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = response.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    res.status(200).json(jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
