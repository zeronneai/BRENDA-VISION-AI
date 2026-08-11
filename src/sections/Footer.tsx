import { Instagram, Mail } from 'lucide-react'
import { EXTERNAL_LINKS } from '../lib/links'
import { useT } from '../lib/i18n'

export default function Footer() {
  const t = useT()

  const productLinks = [
    { label: t('nav_how'), href: '#como-funciona' },
    { label: 'Brenda Fitness', href: '#premium' },
    { label: t('nav_pricing'), href: '#precios' },
    { label: t('nav_faq'), href: '#faq' },
  ]

  return (
    <footer className="border-t border-white/[0.08] bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <div className="text-2xl tracking-wide text-white">
              BOOTY <span className="text-gradient">ALARM</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">{t('footer_tagline')}</p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white">
              {t('footer_product')}
            </h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white">
              {t('footer_legal')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={EXTERNAL_LINKS.privacy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {t('footer_privacy')}
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.terms}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {t('footer_terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white">
              {t('footer_contact')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${EXTERNAL_LINKS.contact_email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {EXTERNAL_LINKS.contact_email}
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
                >
                  <Instagram className="h-4 w-4" aria-hidden />
                  {t('footer_instagram')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">{t('footer_rights')}</p>
          <p className="text-xs text-muted">
            {t('footer_credit')} <span className="font-semibold text-white/80">ZERONNE</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
