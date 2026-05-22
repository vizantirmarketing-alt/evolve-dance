import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-styles'
import { siteConfig } from '@/data/site'
import { JACKRABBIT_ENROLL_URL } from '@/lib/jackrabbit'

export interface ComboClass {
  title: string
  ages: string
}

export default function ComboCallout({
  combos,
  surface = 'dark',
}: {
  combos: ComboClass[]
  surface?: 'dark' | 'cream'
}) {
  const { eyebrow, heading, body, ctaLabel } = siteConfig.comboSection
  const isCream = surface === 'cream'

  return (
    <section
      className={cn(
        'w-full px-6 py-20 md:px-12 md:py-28',
        isCream ? 'border-t border-[#D6DFDA] bg-[#FCFBF8]' : 'bg-[#0d1210]'
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-7 bg-[#0ABAB5]" />
          <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5]">{eyebrow}</span>
        </div>

        <h2
          className={cn(
            'font-display mb-6 text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.08]',
            isCream ? 'text-[#1F1F1C]' : 'text-[#f0faf8]'
          )}
        >
          {heading}
        </h2>

        <p
          className={cn(
            'mb-12 max-w-2xl text-[15px] font-light leading-[1.75] md:text-[16px]',
            isCream ? 'text-[#6D6C67]' : 'text-[#e2e8f0]'
          )}
        >
          {body}
        </p>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {combos.map((combo) => (
            <div
              key={combo.title}
              className={cn(
                'flex flex-col gap-3 border px-6 py-8',
                isCream
                  ? 'border-[#D6DFDA] bg-white shadow-sm'
                  : 'border-[rgba(10,186,181,0.12)] bg-[#111916]'
              )}
            >
              <p className="text-[14px] font-semibold leading-snug text-[#0ABAB5] md:text-[15px]">{combo.title}</p>
              <p className={cn('text-[11px] uppercase tracking-[0.12em] md:text-[12px]', isCream ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>
                {combo.ages}
              </p>
            </div>
          ))}
        </div>

        <a
          href={JACKRABBIT_ENROLL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'primary', size: 'wide' })}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
