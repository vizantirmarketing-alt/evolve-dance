import { siteConfig } from '@/data/site'

export interface ComboClass {
  title: string
  ages: string
}

export default function ComboCallout({ combos }: { combos: ComboClass[] }) {
  const { eyebrow, heading, body, ctaLabel } = siteConfig.comboSection

  return (
    <section className="w-full bg-[#0d1210] py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-px bg-[#2DD4BF]" />
          <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#2DD4BF]">
            {eyebrow}
          </span>
        </div>

        <h2 className="font-display text-[clamp(32px,4.5vw,48px)] font-bold text-[#f0faf8] leading-[1.08] mb-6">
          {heading}
        </h2>

        <p className="text-[15px] font-light text-[#5C7A74] leading-[1.75] max-w-2xl mb-12">
          {body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {combos.map((combo) => (
            <div
              key={combo.title}
              className="bg-[#111916] border border-[rgba(45,212,191,0.12)] px-6 py-8 flex flex-col gap-3"
            >
              <p className="text-[14px] font-semibold text-[#2DD4BF] leading-snug">
                {combo.title}
              </p>
              <p className="text-[11px] tracking-[0.12em] uppercase text-[#5C7A74]">
                {combo.ages}
              </p>
            </div>
          ))}
        </div>

        <a
          href={siteConfig.jackrabbitEnroll}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center py-4 px-8 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-[#2DD4BF] no-underline transition-colors hover:bg-[#3ef0d8] [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)]"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
