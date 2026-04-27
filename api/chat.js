import Anthropic from '@anthropic-ai/sdk'
import { BRENDA_SYSTEM_PROMPT } from './_brenda.js'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages, userProfile } = req.body

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(400).json({
      error: 'API key no configurada. Agrega ANTHROPIC_API_KEY en Vercel → Settings → Environment Variables'
    })
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    let systemPrompt = BRENDA_SYSTEM_PROMPT
    if (userProfile) {
      systemPrompt += `\n\nINFORMACIÓN DEL USUARIO ACTUAL:
- Nombre: ${userProfile.name || 'Usuario'}
- Edad: ${userProfile.age || 'No especificada'}
- Objetivo principal: ${userProfile.goal || 'No especificado'}
- Nivel de fitness: ${userProfile.level || 'No especificado'}
- Peso actual: ${userProfile.weight ? `${userProfile.weight} ${userProfile.weightUnit || 'kg'}` : 'No especificado'}
- Altura: ${userProfile.height ? `${userProfile.height} ${userProfile.heightUnit || 'cm'}` : 'No especificada'}
- Días de entrenamiento por semana: ${userProfile.workoutDays || 'No especificado'}

Usa esta información para personalizar COMPLETAMENTE tus respuestas y llama al usuario por su nombre cuando sea apropiado.`
    }

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    })

    res.status(200).json({
      content: response.content[0].text,
      usage: response.usage
    })
  } catch (error) {
    console.error('Anthropic API error:', error)
    res.status(500).json({ error: error.message || 'Error al conectar con la IA' })
  }
}
