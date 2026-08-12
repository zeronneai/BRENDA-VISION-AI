import ModalShell from './ModalShell'
import { cld } from '../../lib/cloudinary'
import { ANDROID_TUTORIAL_VIDEO, IOS_TUTORIAL_VIDEO } from '../../lib/links'
import { useT } from '../../lib/i18n'
import type { Platform } from '../../lib/install'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  platform: Platform
}

const TITLE_ID = 'video-modal-title'
// Quality-optimized delivery; keeps the mp4 container so <video controls> works.
const SRC: Record<Platform, string> = {
  android: cld(ANDROID_TUTORIAL_VIDEO, 'q_auto'),
  ios: cld(IOS_TUTORIAL_VIDEO, 'q_auto'),
}

/**
 * Popup video player for the install tutorial (per platform). The <video>
 * element is only mounted while the modal is open, so nothing loads or plays on
 * page load. Full native controls, closeable, responsive.
 */
export default function VideoModal({ isOpen, onClose, platform }: VideoModalProps) {
  const t = useT()
  const title = platform === 'ios' ? t('video_title_ios') : t('video_title')

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} titleId={TITLE_ID} maxWidth="max-w-sm">
      <h3 id={TITLE_ID} className="pr-10 text-2xl leading-none text-white">
        {title}
      </h3>

      {isOpen && (
        <video
          controls
          preload="metadata"
          playsInline
          controlsList="nodownload"
          className="mx-auto mt-5 max-h-[70vh] w-full rounded-2xl bg-black"
          aria-label={title}
        >
          <source src={SRC[platform]} type="video/mp4" />
        </video>
      )}
    </ModalShell>
  )
}
