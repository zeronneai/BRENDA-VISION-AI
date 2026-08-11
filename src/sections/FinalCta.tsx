import SectionReveal from '../components/SectionReveal'
import StoreButtons from '../components/StoreButtons'
import { useLang, useT } from '../lib/i18n'

export default function FinalCta() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section className="relative overflow-hidden">
      {/* Intense magenta gradient background, full width */}
      <div className="absolute inset-0 bg-gradient-to-br from-magenta via-magenta-bright/80 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-20%,rgba(255,255,255,0.18),transparent_60%)]" />

      <SectionReveal className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 md:py-32">
        <h2 className="text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl">
          {lang === 'es' ? (
            <>
              ¿LISTA PARA<br />DESPERTAR DIFERENTE?
            </>
          ) : (
            <>
              READY TO<br />WAKE UP DIFFERENTLY?
            </>
          )}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">{t('cta_sub')}</p>

        <div className="mt-9 flex justify-center">
          <StoreButtons size="lg" />
        </div>

        <p className="mt-8 text-2xl font-bold tracking-wide text-white sm:text-3xl">
          {t('cta_tagline')}
        </p>
      </SectionReveal>
    </section>
  )
}
