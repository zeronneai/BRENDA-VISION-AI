import ImagePlaceholder from '../components/ImagePlaceholder'
import SectionHeading from '../components/SectionHeading'
import SectionReveal from '../components/SectionReveal'
import { PREMIUM_FEATURES } from '../lib/content'

export default function Premium() {
  return (
    <section id="premium" className="section">
      <SectionHeading
        title="DESBLOQUEA BRENDA FITNESS"
        subtitle="El método completo de Brenda Jazmín para transformar tu cuerpo."
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        {/* Brenda photo (4:5) */}
        <SectionReveal className="mx-auto w-full max-w-md">
          {/* TODO: Replace src with Cloudinary URL */}
          <ImagePlaceholder
            imageKey="brenda_about"
            label="📷 FOTO DE BRENDA (4:5)"
            ratio="4 / 5"
            className="w-full shadow-glow"
          />
        </SectionReveal>

        {/* 2x3 feature grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {PREMIUM_FEATURES.map((feature, i) => (
            <SectionReveal key={feature.title} delay={(i % 2) * 0.08}>
              <div className="glass h-full p-5 transition-all duration-300 hover:scale-[1.02] hover:border-magenta/40 hover:shadow-glow">
                <div className="text-3xl">{feature.emoji}</div>
                <h3 className="mt-3 text-xl text-white">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
