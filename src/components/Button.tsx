import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-bright disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-magenta text-white shadow-glow hover:bg-magenta-bright hover:scale-[1.02] hover:shadow-glow-lg',
  outline:
    'border border-white/20 bg-white/[0.03] text-white hover:border-magenta/60 hover:bg-white/[0.06] hover:scale-[1.02]',
  ghost: 'text-muted hover:text-white',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type AnchorProps = CommonProps & {
  href: string
  external?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')
}

/** Anchor-styled button (for links to the stores / external pages). */
export function LinkButton({
  href,
  external,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: AnchorProps) {
  return (
    <a
      href={href}
      className={classes(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Native <button> variant (for actions like the Android toast). */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: NativeButtonProps) {
  return (
    <button type="button" className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
