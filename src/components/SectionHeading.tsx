import SectionReveal from './SectionReveal'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'center' | 'left'
}

/** Standard headline + subtitle block used at the top of most sections. */
export default function SectionHeading({
  title,
  subtitle,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <SectionReveal className={`max-w-2xl ${alignment} ${className}`}>
      <h2 className="text-4xl leading-none sm:text-5xl md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
    </SectionReveal>
  )
}
