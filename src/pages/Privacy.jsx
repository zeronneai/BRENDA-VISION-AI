import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, Brain, Mail, Trash2, Globe } from 'lucide-react'

const LAST_UPDATED = '27 de abril de 2026'
const COMPANY = 'ZERONNE'
const APP_NAME = 'Brenda Fitness'
const CONTACT_EMAIL = 'privacy@zeronne.com'

const sections = [
  {
    id: 'info-recopilada',
    icon: Database,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    title: '1. Información que recopilamos',
    content: [
      {
        subtitle: 'Información que tú nos proporcionas',
        items: [
          'Nombre o apodo que eliges al configurar tu perfil.',
          'Datos corporales opcionales: peso, altura, edad y género, para personalizar tus rutinas y planes.',
          'Objetivos de fitness y nivel de experiencia seleccionados durante el onboarding.',
          'Días de entrenamiento por semana y preferencia de unidades (kg/lb, cm/ft).',
          'Mediciones de progreso que tú mismo registras (peso, cintura, cadera, etc.).',
        ],
      },
      {
        subtitle: 'Información generada por el uso de la app',
        items: [
          'Historial de entrenamientos completados y racha de días activos.',
          'Mensajes enviados al chat de Brenda IA para generar respuestas personalizadas.',
          'Preferencias de configuración y notificaciones.',
        ],
      },
      {
        subtitle: 'Información que NO recopilamos',
        items: [
          'No recopilamos datos de pago ni información financiera.',
          'No accedemos a tu cámara, micrófono ni ubicación sin tu consentimiento explícito.',
          'No recopilamos datos de otras apps instaladas en tu dispositivo.',
          'No usamos cookies de rastreo de terceros para publicidad.',
        ],
      },
    ],
  },
  {
    id: 'uso-informacion',
    icon: Eye,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    title: '2. Cómo usamos tu información',
    content: [
      {
        subtitle: 'Finalidades del tratamiento',
        items: [
          'Personalizar rutinas de ejercicio, planes de alimentación y recomendaciones según tu perfil y objetivo.',
          'Calcular tu racha de entrenamientos y estadísticas de progreso.',
          'Enviar tus mensajes al modelo de inteligencia artificial Claude (Anthropic) para generar respuestas como "Brenda IA".',
          'Recordarte entrenamientos pendientes y celebrar tus logros mediante notificaciones.',
          'Mejorar la experiencia general de la app con base en patrones de uso agregados y anónimos.',
        ],
      },
    ],
  },
  {
    id: 'almacenamiento',
    icon: Lock,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    title: '3. Almacenamiento y seguridad de datos',
    content: [
      {
        subtitle: 'Almacenamiento local',
        items: [
          'La mayoría de tus datos (perfil, historial de entrenamientos, progreso, configuración) se almacenan exclusivamente en el almacenamiento local de tu dispositivo (localStorage).',
          'Estos datos NO se transmiten a nuestros servidores y permanecen bajo tu control total.',
          'Si desinstala la app o borras los datos del navegador, esta información se elimina permanentemente.',
        ],
      },
      {
        subtitle: 'Transmisión de datos',
        items: [
          'Los mensajes del chat de Brenda IA se transmiten de forma segura (HTTPS/TLS) a nuestra API, que los reenvía a Anthropic para generar respuestas.',
          'No almacenamos el historial de conversaciones en nuestros servidores; únicamente se guarda en tu dispositivo.',
          'Aplicamos cifrado en tránsito (TLS 1.2 o superior) para todas las comunicaciones entre la app y nuestros servidores.',
        ],
      },
      {
        subtitle: 'Seguridad',
        items: [
          'Implementamos medidas técnicas y organizativas razonables para proteger tu información.',
          'Ningún sistema de seguridad es infalible. Te recomendamos no compartir información médica sensible en el chat de IA.',
        ],
      },
    ],
  },
  {
    id: 'ia-anthropic',
    icon: Brain,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    title: '4. Inteligencia Artificial — Anthropic (Claude)',
    content: [
      {
        subtitle: 'Cómo funciona Brenda IA',
        items: [
          'El asistente "Brenda IA" está impulsado por Claude, un modelo de lenguaje desarrollado por Anthropic, PBC.',
          'Al enviar un mensaje, tu texto y un extracto de tu perfil (nombre, objetivo, nivel, peso) se transmiten a los servidores de Anthropic para generar una respuesta.',
          'Anthropic puede utilizar estas interacciones para mejorar la seguridad y el rendimiento de sus modelos, conforme a su propia política de privacidad.',
        ],
      },
      {
        subtitle: 'Limitaciones importantes',
        items: [
          'Brenda IA es un asistente de fitness general y NO sustituye la asesoría de un médico, nutricionista o profesional de salud certificado.',
          'No envíes información médica confidencial, datos de terceros ni información personal sensible al chat de IA.',
          'Las respuestas generadas por IA pueden contener errores. Verifica siempre con un profesional.',
        ],
      },
      {
        subtitle: 'Política de Anthropic',
        items: [
          'Para conocer cómo Anthropic trata los datos que recibe, consulta su política de privacidad en anthropic.com/privacy.',
        ],
      },
    ],
  },
  {
    id: 'terceros',
    icon: Globe,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    title: '5. Servicios de terceros',
    content: [
      {
        subtitle: 'Proveedores utilizados',
        items: [
          'Anthropic, PBC — Modelo de IA Claude para el asistente Brenda IA (anthropic.com).',
          'Vercel Inc. — Infraestructura de hosting y despliegue de la aplicación (vercel.com).',
          'Google Fonts — Fuente tipográfica Poppins cargada desde los servidores de Google (policies.google.com/privacy).',
        ],
      },
      {
        subtitle: 'No compartimos tus datos con',
        items: [
          'Redes publicitarias ni plataformas de marketing.',
          'Brokers de datos o agregadores de información personal.',
          'Otras aplicaciones o servicios sin tu consentimiento explícito.',
        ],
      },
    ],
  },
  {
    id: 'derechos',
    icon: Shield,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    title: '6. Tus derechos',
    content: [
      {
        subtitle: 'Derechos sobre tus datos',
        items: [
          'Acceso: puedes ver toda tu información directamente en la sección "Perfil" de la app.',
          'Rectificación: puedes editar o actualizar tus datos en cualquier momento desde "Perfil → Editar datos".',
          'Eliminación: puedes borrar todos tus datos locales desde "Perfil → Reiniciar app". Esta acción es irreversible.',
          'Portabilidad: dado que tus datos se almacenan localmente, tienes control total sobre ellos en tu dispositivo.',
          'Oposición: puedes dejar de usar la app y eliminar sus datos en cualquier momento sin penalización.',
        ],
      },
      {
        subtitle: 'Usuarios en la Unión Europea (RGPD)',
        items: [
          'Si resides en la UE, tienes derechos adicionales bajo el Reglamento General de Protección de Datos.',
          'La base legal para el tratamiento de tus datos es tu consentimiento explícito, otorgado al crear tu perfil.',
          'Para ejercer tus derechos RGPD, contáctanos en ' + CONTACT_EMAIL + '.',
        ],
      },
    ],
  },
  {
    id: 'menores',
    icon: Shield,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    title: '7. Menores de edad',
    content: [
      {
        subtitle: null,
        items: [
          `${APP_NAME} está destinada a usuarios mayores de 16 años.`,
          'No recopilamos intencionalmente información de menores de 16 años.',
          'Si eres padre o tutor y crees que un menor ha proporcionado datos personales, contáctanos para eliminarlos.',
          'En jurisdicciones donde la mayoría de edad digital sea superior a 16 años, aplica la edad local correspondiente.',
        ],
      },
    ],
  },
  {
    id: 'cambios',
    icon: Eye,
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    title: '8. Cambios a esta política',
    content: [
      {
        subtitle: null,
        items: [
          'Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en la app, en la legislación aplicable o en nuestras prácticas.',
          'Notificaremos cambios materiales a través de un aviso destacado en la app o por correo electrónico si disponemos de tu dirección.',
          'La fecha de "última actualización" al inicio del documento indica cuándo se realizó la revisión más reciente.',
          'El uso continuado de la app tras la publicación de cambios implica tu aceptación de la política actualizada.',
        ],
      },
    ],
  },
]

export default function Privacy() {
  const navigate = useNavigate()

  return (
    <div className="app-container bg-brand-dark overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-dark border-b border-white/5 px-5 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-brand-pink" />
          <h1 className="text-base font-bold text-white">Política de Privacidad</h1>
        </div>
      </div>

      <div className="px-5 pb-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-4 glow-pink">
            <Shield size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{APP_NAME}</h2>
          <p className="text-gray-400 text-sm mb-1">Desarrollada por <span className="text-white font-semibold">{COMPANY}</span></p>
          <p className="text-gray-500 text-xs">Última actualización: {LAST_UPDATED}</p>
        </motion.div>

        {/* Intro card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-brand rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-gray-200 leading-relaxed">
            En <strong className="text-white">{COMPANY}</strong> nos tomamos tu privacidad en serio. Esta política explica qué datos recopila {APP_NAME}, cómo los usamos y qué derechos tienes sobre ellos. Te recomendamos leerla completa antes de usar la app.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Al crear tu perfil y usar la app, aceptas las prácticas descritas en este documento.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.04 }}
                className={`rounded-2xl p-4 border ${section.bg} ${section.border}`}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl ${section.bg} border ${section.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={17} className={section.color} />
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight">{section.title}</h3>
                </div>

                {/* Subsections */}
                <div className="space-y-4">
                  {section.content.map((sub, j) => (
                    <div key={j}>
                      {sub.subtitle && (
                        <p className={`text-xs font-semibold mb-2 ${section.color}`}>{sub.subtitle}</p>
                      )}
                      <ul className="space-y-2">
                        {sub.items.map((item, k) => (
                          <li key={k} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${section.color.replace('text-', 'bg-')}`} />
                            <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 card rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center">
              <Mail size={17} className="text-brand-pink" />
            </div>
            <h3 className="text-sm font-bold text-white">9. Contacto</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Para cualquier pregunta, solicitud de derechos o reporte relacionado con privacidad, contáctanos:
          </p>
          <div className="glass rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16 flex-shrink-0">Empresa</span>
              <span className="text-sm text-white font-semibold">{COMPANY}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16 flex-shrink-0">Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-brand-pink font-semibold">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16 flex-shrink-0">App</span>
              <span className="text-sm text-white">{APP_NAME}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3 text-center">
            Responderemos a tu solicitud en un plazo máximo de 30 días hábiles.
          </p>
        </motion.div>

        {/* Delete data reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-4 rounded-2xl p-4 flex items-start gap-3"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
        >
          <Trash2 size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-400 mb-1">¿Quieres eliminar tus datos?</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ve a <strong className="text-white">Perfil → Reiniciar app</strong> para borrar toda tu información local de forma inmediata e irreversible. No necesitas contactarnos para esta acción.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} {COMPANY}. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-700 mt-1">{APP_NAME} — Versión 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
