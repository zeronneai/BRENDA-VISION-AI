import ModalShell from './ModalShell'
import type { Platform } from '../../lib/install'

interface PlatformSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (platform: Platform) => void
}

const TITLE_ID = 'platform-selector-title'

/** Small sub-modal asking the user which device they have. */
export default function PlatformSelector({ isOpen, onClose, onSelect }: PlatformSelectorProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} titleId={TITLE_ID} maxWidth="max-w-md">
      <h3 id={TITLE_ID} className="pr-10 text-3xl leading-none text-white">
        ¿QUÉ DISPOSITIVO TIENES?
      </h3>
      <p className="mt-3 text-sm text-muted">Elige tu plataforma para ver las instrucciones de instalación.</p>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect('ios')}
          className="glass flex flex-col items-center gap-3 px-4 py-7 transition-all duration-300 hover:scale-[1.03] hover:border-magenta/50 hover:shadow-glow"
        >
          <span className="text-5xl" aria-hidden>
            🍎
          </span>
          <span className="text-lg text-white">iPhone</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect('android')}
          className="glass flex flex-col items-center gap-3 px-4 py-7 transition-all duration-300 hover:scale-[1.03] hover:border-magenta/50 hover:shadow-glow"
        >
          <span className="text-5xl" aria-hidden>
            🤖
          </span>
          <span className="text-lg text-white">Android</span>
        </button>
      </div>
    </ModalShell>
  )
}
