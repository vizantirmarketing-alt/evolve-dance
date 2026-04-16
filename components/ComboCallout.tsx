import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'

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
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5]">{eyebrow}</span>
        </div>

        <h2
          className={cn(
            'font-display mb-6 text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.08]',
            isCream ? 'text-[#1F1F1C]' : 'text-[#f0faf8]'
          )}
        >
          {heading}
        </h2>

        <p
          className={cn(
            'mb-12 max-w-2xl text-[15px] font-light leading-[1.75]',
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
              <p className="text-[14px] font-semibold leading-snug text-[#0ABAB5]">{combo.title}</p>
              <p className={cn('text-[11px] uppercase tracking-[0.12em]', isCream ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>
                {combo.ages}
              </p>
            </div>
          ))}
        </div>

        <a
          href={siteConfig.jackrabbitEnroll}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center py-4 px-8 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-[#0ABAB5] no-underline transition-colors hover:bg-[#81D8D0] [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)]"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
