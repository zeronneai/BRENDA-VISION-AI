import IPhoneFrame from '../components/IPhoneFrame'
import ImagePlaceholder from '../components/ImagePlaceholder'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { SCREENSHOTS } from '../lib/content'

export default function Screenshots() {
  return (
    <section className="section">
      <SectionHeading
        title="ASÍ SE VE BOOTY ALARM"
        subtitle="Diseñada para que la abras todos los días."
      />

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
        {SCREENSHOTS.map((shot, i) => (
          <SectionReveal
            key={shot.image}
            delay={(i % 6) * 0.06}
            className="w-[68vw] shrink-0 snap-center sm:w-[40vw] md:w-auto"
          >
            <div className="flex flex-col items-center">
              <IPhoneFrame className="max-w-[200px]">
                {/* TODO: Replace src with Cloudinary URL */}
                <ImagePlaceholder
                  imageKey={shot.image}
                  label={shot.placeholder}
                  rounded={false}
                  className="h-full w-full"
                />
              </IPhoneFrame>
              <p className="mt-4 text-center text-sm font-medium text-muted">{shot.label}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
