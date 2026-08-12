import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import InstallInstructionsModal from './InstallInstructionsModal'
import PlatformSelector from './PlatformSelector'
import PremiumModal from './PremiumModal'
import VideoModal from './VideoModal'
import type { Platform } from '../../lib/install'

interface InstallContextValue {
  /** Open the install instructions for a platform (iOS = TestFlight, Android = APK). */
  openInstall: (platform: Platform) => void
  /** Open the "which device?" selector. */
  openSelector: () => void
  /** Open the Premium (web/Stripe) modal — used when a price is clicked. */
  openPremium: () => void
}

const InstallContext = createContext<InstallContextValue | null>(null)

type View =
  | 'closed'
  | 'selector'
  | 'ios'
  | 'android'
  | 'android_video'
  | 'ios_video'
  | 'premium'

/**
 * Holds the install-modal state and renders the modals once at the app root, so
 * any button (Hero, Pricing, CTA, Navbar) can open them via useInstall().
 *
 * A tutorial video opens as its own view that replaces the platform's
 * instructions (avoiding stacked modals / double-ESC); closing it returns to
 * the steps.
 */
export function InstallModalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('closed')

  const close = useCallback(() => setView('closed'), [])
  const openSelector = useCallback(() => setView('selector'), [])
  const openInstall = useCallback((platform: Platform) => setView(platform), [])
  const openPremium = useCallback(() => setView('premium'), [])

  const value = useMemo(
    () => ({ openInstall, openSelector, openPremium }),
    [openInstall, openSelector, openPremium],
  )

  const isInstructions = view === 'ios' || view === 'android'

  return (
    <InstallContext.Provider value={value}>
      {children}

      <PlatformSelector isOpen={view === 'selector'} onClose={close} onSelect={openInstall} />

      <InstallInstructionsModal
        isOpen={isInstructions}
        onClose={close}
        platform={view === 'ios' ? 'ios' : 'android'}
        onWatchVideo={() => setView(view === 'ios' ? 'ios_video' : 'android_video')}
      />

      <VideoModal isOpen={view === 'android_video'} onClose={() => setView('android')} platform="android" />
      <VideoModal isOpen={view === 'ios_video'} onClose={() => setView('ios')} platform="ios" />

      <PremiumModal
        isOpen={view === 'premium'}
        onClose={close}
        onDownloadApp={() => setView('selector')}
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
