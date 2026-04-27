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

  const { goal, calories, restrictions, weight, weightUnit } = req.body

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `Genera un plan de alimentación para un día completo:
- Objetivo: ${goal}
- Calorías objetivo: ${calories || 'calculadas según peso'}
- Peso: ${weight} ${weightUnit}
- Restricciones: ${restrictions || 'ninguna'}

Responde SOLO con JSON válido (sin markdown):
{"dailyCalories":1800,"macros":{"protein":"130g","carbs":"180g","fats":"60g"},"meals":[{"time":"7:00 AM","name":"Desayuno","foods":[{"item":"...","quantity":"...","calories":200,"protein":"10g"}],"totalCalories":450,"protein":"35g"}],"hydration":"2.5 litros","supplements":["..."],"tips":["..."]}`

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
