import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import InstallInstructionsModal from './InstallInstructionsModal'
import PlatformSelector from './PlatformSelector'
import type { Platform } from '../../lib/install'

interface InstallContextValue {
  /** Open the install instructions for a specific platform. */
  openInstall: (platform: Platform) => void
  /** Open the "which device?" selector (when platform is unknown). */
  openSelector: () => void
}

const InstallContext = createContext<InstallContextValue | null>(null)

type View = { kind: 'closed' } | { kind: 'selector' } | { kind: 'instructions'; platform: Platform }

/**
 * Holds the install-modal state and renders the modals once at the app root, so
 * any button (Hero, Pricing, CTA, Navbar) can open them via useInstall().
 */
export function InstallModalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>({ kind: 'closed' })

  const openInstall = useCallback((platform: Platform) => setView({ kind: 'instructions', platform }), [])
  const openSelector = useCallback(() => setView({ kind: 'selector' }), [])
  const close = useCallback(() => setView({ kind: 'closed' }), [])

  const value = useMemo(() => ({ openInstall, openSelector }), [openInstall, openSelector])

  return (
    <InstallContext.Provider value={value}>
      {children}

      <PlatformSelector
        isOpen={view.kind === 'selector'}
        onClose={close}
        onSelect={openInstall}
      />

      <InstallInstructionsModal
        isOpen={view.kind === 'instructions'}
        onClose={close}
        platform={view.kind === 'instructions' ? view.platform : 'ios'}
      />
    </InstallContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInstall() {
  const ctx = useContext(InstallContext)
  if (!ctx) throw new Error('useInstall must be used within an InstallModalProvider')
  return ctx
}
