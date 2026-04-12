import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files in production
app.use(express.static(join(__dirname, 'dist')));

// ─── Anthropic Client ─────────────────────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// ─── Brenda AI System Prompt ──────────────────────────────────────────────────
const BRENDA_SYSTEM_PROMPT = `Eres Brenda Jazmin, una reconocida influencer de fitness, entrenadora personal certificada y experta en nutrición. Tienes una comunidad apasionada de seguidores a quienes motivas diariamente a través de tu app Brenda Fit.

🌟 PERSONALIDAD:
- Eres cálida, directa, auténtica y MUY motivadora
- Hablas en español de manera informal y cercana (tuteo)
- Usas frases como "¡Vamos!", "¡Tú puedes!", "¡Eso es!", "¡Dale con todo!", "¡Estoy orgullosa de ti!"
- Eres como la mejor amiga fitness de cada persona
- Celebras cada logro, por pequeño que sea
- Cuando alguien falla, lo animas sin juzgarlo ni criticarlo
- Usas emojis con moderación pero de manera expresiva 💪🔥✨🍑

💪 TU EXPERTISE INCLUYE:
- Rutinas de ejercicio personalizadas: glúteos, piernas, abdomen, cuerpo completo, cardio, HIIT, pilates
- Planes de alimentación saludables, equilibrados y realistas (no dietas extremas)
- Suplementación deportiva (proteína, creatina, colágeno, etc.)
- Motivación, mentalidad fitness y hábitos saludables
- Técnica correcta de ejercicios para evitar lesiones
- Cómo mantener la racha y la consistencia
- Manejo de mesetas y cómo romperlas
- Fitness para diferentes objetivos: perder grasa, ganar músculo, tonificar, mejorar resistencia

📋 REGLAS IMPORTANTES:
1. SOLO hablas de fitness, nutrición, bienestar mental/físico y motivación
2. Para condiciones médicas serias o dolor, SIEMPRE recomienda consultar a un médico
3. Das consejos específicos, accionables y personalizados
4. Adaptas los planes al nivel (principiante, intermedio, avanzado) y objetivo del usuario
5. Eres honesta: nunca prometes resultados mágicos o instantáneos
6. Promotes hábitos sostenibles, no soluciones rápidas peligrosas
7. Si no sabes algo específico, lo admites con humildad

✍️ FORMATO DE RESPUESTA:
- Respuestas concisas pero completas (máximo 300 palabras salvo que pidan más)
- Usa listas con emojis cuando presentes rutinas o planes
- Resalta puntos clave con **negrita**
- Siempre termina con una frase motivadora corta
- Si el usuario comparte su progreso, celébralo con entusiasmo genuino

Recuerda: eres la guía fitness digital de cada usuario. Tu misión es ayudarlos a alcanzar su mejor versión con disciplina, amor propio y constancia. 🔥`;

// ─── Chat Endpoint ─────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(400).json({
        error: 'API key no configurada. Agrega ANTHROPIC_API_KEY en tu archivo .env'
      });
    }

    // Build context from user profile if provided
    let systemPrompt = BRENDA_SYSTEM_PROMPT;
    if (userProfile) {
      systemPrompt += `\n\nINFORMACIÓN DEL USUARIO ACTUAL:
- Nombre: ${userProfile.name || 'Usuario'}
- Edad: ${userProfile.age || 'No especificada'}
- Objetivo principal: ${userProfile.goal || 'No especificado'}
- Nivel de fitness: ${userProfile.level || 'No especificado'}
- Peso actual: ${userProfile.weight ? `${userProfile.weight} ${userProfile.weightUnit || 'kg'}` : 'No especificado'}
- Altura: ${userProfile.height ? `${userProfile.height} ${userProfile.heightUnit || 'cm'}` : 'No especificada'}
- Días de entrenamiento por semana: ${userProfile.workoutDays || 'No especificado'}

Usa esta información para personalizar COMPLETAMENTE tus respuestas y llamar al usuario por su nombre cuando sea apropiado.`;
    }

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    });

    res.json({
      content: response.content[0].text,
      usage: response.usage
    });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    res.status(500).json({
      error: error.message || 'Error al conectar con la IA. Intenta nuevamente.'
    });
  }
});

// ─── Workout Plan Generator ────────────────────────────────────────────────────
app.post('/api/generate-workout', async (req, res) => {
  try {
    const { goal, level, duration, equipment, focusArea } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(400).json({ error: 'API key no configurada' });
    }

    const prompt = `Genera una rutina de entrenamiento completa con estas especificaciones:
- Objetivo: ${goal}
- Nivel: ${level}
- Duración: ${duration} minutos
- Equipamiento disponible: ${equipment}
- Área de enfoque: ${focusArea}

Formato de respuesta en JSON:
{
  "title": "nombre de la rutina",
  "description": "descripción breve motivadora",
  "warmup": [{"name": "ejercicio", "duration": "tiempo", "reps": null}],
  "exercises": [{"name": "ejercicio", "sets": 3, "reps": "12-15", "rest": "60s", "tips": "consejo técnico"}],
  "cooldown": [{"name": "ejercicio", "duration": "tiempo"}],
  "totalCalories": número_estimado,
  "motivation": "frase motivadora de Brenda"
}`;

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      system: BRENDA_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      res.json(JSON.parse(jsonMatch[0]));
    } else {
      res.json({ raw: text });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Meal Plan Generator ───────────────────────────────────────────────────────
app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    const { goal, calories, restrictions, weight, weightUnit } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(400).json({ error: 'API key no configurada' });
    }

    const prompt = `Genera un plan de alimentación para un día completo:
- Objetivo: ${goal}
- Calorías objetivo: ${calories || 'calculadas según peso'}
- Peso: ${weight} ${weightUnit}
- Restricciones alimentarias: ${restrictions || 'ninguna'}

Responde en JSON:
{
  "dailyCalories": número,
  "macros": {"protein": "Xg", "carbs": "Xg", "fats": "Xg"},
  "meals": [
    {
      "time": "7:00 AM",
      "name": "Desayuno",
      "foods": [{"item": "alimento", "quantity": "cantidad", "calories": número}],
      "totalCalories": número,
      "protein": "Xg"
    }
  ],
  "hydration": "X litros de agua",
  "supplements": ["suplemento recomendado"],
  "tips": ["consejo nutricional de Brenda"]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      system: BRENDA_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      res.json(JSON.parse(jsonMatch[0]));
    } else {
      res.json({ raw: text });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Serve React app for all other routes (production) ────────────────────────
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🔥 Brenda Fit Server running on port ${PORT}`);
  console.log(`🤖 Claude AI: ${process.env.ANTHROPIC_API_KEY ? '✅ Configured' : '❌ Missing API key'}`);
});
