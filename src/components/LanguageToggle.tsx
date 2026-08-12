import { Languages } from 'lucide-react'
import { useLang, useT } from '../lib/i18n'

/**
 * One-click language toggle. Shows the language it will switch TO, so a single
 * tap flips ES ⇄ EN immediately — no need to aim at a specific letter.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang()
  const t = useT()
  const target = lang === 'es' ? 'EN' : 'ES'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('lang_toggle_aria')}
      title={t('lang_toggle_aria')}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-magenta/50 hover:bg-white/10 ${className}`}
    >
      <Languages className="h-4 w-4 text-magenta-bright" aria-hidden />
      {target}
    </button>
  )
}
