import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useInstall } from '../components/install/InstallModalProvider'
import { NAV_LINKS } from '../lib/content'

export default function Navbar() {
  const { openSelector } = useInstall()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/[0.08] bg-ink/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#top" className="text-2xl tracking-wide text-white" aria-label="Booty Alarm — inicio">
          BOOTY <span className="text-gradient">ALARM</span>
        </a>

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) */}
        <div className="hidden md:block">
          <Button size="md" onClick={openSelector}>
            DESCARGAR
          </Button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/[0.08] bg-ink/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <Button
                size="md"
                className="w-full"
                onClick={() => {
                  setOpen(false)
                  openSelector()
                }}
              >
                DESCARGAR
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
