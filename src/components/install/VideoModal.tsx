import ModalShell from './ModalShell'
import { cld } from '../../lib/cloudinary'
import { ANDROID_TUTORIAL_VIDEO } from '../../lib/links'
import { useT } from '../../lib/i18n'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

const TITLE_ID = 'video-modal-title'
// Quality-optimized delivery; keeps the mp4 container so <video controls> works.
const VIDEO_SRC = cld(ANDROID_TUTORIAL_VIDEO, 'q_auto')

/**
 * Popup video player for the Android install tutorial. The <video> element is
 * only mounted while the modal is open, so nothing loads or plays on page load.
 * Full native controls, closeable, responsive.
 */
export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const t = useT()

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} titleId={TITLE_ID} maxWidth="max-w-sm">
      <h3 id={TITLE_ID} className="pr-10 text-2xl leading-none text-white">
        {t('video_title')}
      </h3>

      {isOpen && (
        <video
          controls
          preload="metadata"
          playsInline
          controlsList="nodownload"
          className="mx-auto mt-5 max-h-[70vh] w-full rounded-2xl bg-black"
          aria-label={t('video_title')}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </ModalShell>
  )
}
