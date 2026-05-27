import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'default' | 'nav' | 'card' | 'wide'
/** light = cream/white pages; dark = video hero, enroll band; inverse = on solid teal panels */
export type ButtonSurface = 'light' | 'dark' | 'inverse'

export interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  surface?: ButtonSurface
  className?: string
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-6 py-3.5 md:py-4',
  nav: 'px-5 py-3 md:px-4 md:py-2.5 md:text-[12px] lg:px-5 lg:py-3 lg:text-[13px]',
  card: 'w-full py-3 px-4',
  wide: 'px-8 py-3.5 md:py-4',
}

const variantClasses: Record<ButtonVariant, Record<ButtonSurface, string>> = {
  primary: {
    light:
      'bg-teal text-white font-semibold hover:bg-teal-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal/25',
    dark:
      'bg-teal text-white font-semibold hover:bg-teal-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal/25',
    inverse:
      'bg-[#070a09] text-teal font-semibold hover:bg-[#070a09]/90',
  },
  secondary: {
    light:
      'bg-transparent border border-teal text-teal font-semibold hover:bg-teal/10',
    dark:
      'bg-transparent border border-teal text-teal font-semibold hover:bg-teal/10',
    inverse:
      'bg-transparent border border-[#070a09] text-[#070a09] font-semibold hover:bg-[#070a09]/10',
  },
  tertiary: {
    light:
      'bg-transparent border-0 text-teal font-medium hover:text-teal-hover',
    dark:
      'bg-transparent border-0 text-white/70 font-medium hover:text-white',
    inverse:
      'bg-transparent border-0 text-[#070a09]/80 font-medium hover:text-[#070a09]',
  },
}

export function buttonVariants({
  variant = 'primary',
  size = 'default',
  surface = 'light',
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2',
    'text-[12px] font-medium uppercase tracking-[0.2em]',
    'no-underline transition-all duration-200 ease-out',
    'md:text-[13px]',
    sizeClasses[size],
    variantClasses[variant][surface],
    className,
  )
}
