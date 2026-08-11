import { useLang, useT } from '../lib/i18n'
import type { Lang } from '../lib/i18n'

const LANGS: Lang[] = ['es', 'en']

/** Subtle segmented ES/EN language switcher (visible on web and mobile). */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  const t = useT()

  return (
    <div
      role="group"
      aria-label={t('lang_toggle_aria')}
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-semibold ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
            lang === l ? 'bg-magenta text-white' : 'text-muted hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
