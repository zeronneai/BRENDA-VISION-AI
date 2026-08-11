import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import InstallInstructionsModal from './InstallInstructionsModal'
import PlatformSelector from './PlatformSelector'
import { useToast } from '../Toast'
import type { Platform } from '../../lib/install'

interface InstallContextValue {
  /** iOS → "coming soon" toast; Android → APK install modal. */
  openInstall: (platform: Platform) => void
  /** Open the "which device?" selector. */
  openSelector: () => void
}

const InstallContext = createContext<InstallContextValue | null>(null)

type View = 'closed' | 'selector' | 'android'

const IOS_COMING_SOON = '🍎 Muy pronto en el App Store. Booty Alarm está en revisión final de Apple.'

/**
 * Holds the install-modal state and renders the modals once at the app root, so
 * any button (Hero, Pricing, CTA, Navbar) can open them via useInstall().
 * iOS has no install flow yet (App Store pending) — it shows a toast.
 */
export function InstallModalProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast()
  const [view, setView] = useState<View>('closed')

  const close = useCallback(() => setView('closed'), [])
  const openSelector = useCallback(() => setView('selector'), [])
  const openInstall = useCallback(
    (platform: Platform) => {
      if (platform === 'android') {
        setView('android')
      } else {
        setView('closed')
        showToast(IOS_COMING_SOON)
      }
    },
    [showToast],
  )

  const value = useMemo(() => ({ openInstall, openSelector }), [openInstall, openSelector])

  return (
    <InstallContext.Provider value={value}>
      {children}

      <PlatformSelector isOpen={view === 'selector'} onClose={close} onSelect={openInstall} />

      <InstallInstructionsModal isOpen={view === 'android'} onClose={close} />
    </InstallContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInstall() {
  const ctx = useContext(InstallContext)
  if (!ctx) throw new Error('useInstall must be used within an InstallModalProvider')
  return ctx
}
