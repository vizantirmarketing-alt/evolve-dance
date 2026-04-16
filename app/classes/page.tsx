import type { Metadata } from 'next'
import Link from 'next/link'
import ClassFinder from '@/components/ClassFinder'
import StyleCard from '@/components/StyleCard'
import ComboCallout from '@/components/ComboCallout'
import { danceStyles } from '@/data/styles'

export const metadata: Metadata = {
  title: 'Classes | Evolve Dance Center',
  description:
    'Find the right class for your dancer — ages 18 months to 18 years. Search by style, day, level, and age.',
}

const stylesForGrid = danceStyles.filter((s) => s.id !== 'combo')

const comboClasses = [
  { title: 'Combo — Tap + Ballet', ages: 'Ages 2.5–5' },
  { title: 'Tumble Tots — Jazz + Acro', ages: 'Ages 4–6' },
  { title: 'Jazz N Hop / Tap N Hop', ages: 'Ages 4–6' },
]

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-[#070a09]">
      {/* 1. Hero */}
      <section className="w-full bg-[#070a09] pt-[140px] pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-[#0ABAB5]" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#0ABAB5]">
              Season 9 — Now Enrolling
            </span>
          </div>
          <h1 className="font-display text-[clamp(36px,6vw,64px)] font-bold text-[#f0faf8] leading-[1.05] mb-6">
            Find the right class for your dancer
          </h1>
          <p className="text-[15px] font-light text-[#e2e8f0] leading-[1.75] max-w-xl mb-10">
            Ages 18 months to 18 years. All levels. First class is on us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center py-4 px-8 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-[#0ABAB5] no-underline transition-colors hover:bg-[#81D8D0] text-center [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)]"
            >
              Book a Free Trial
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center py-4 px-8 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#f0faf8] border border-[rgba(10,186,181,0.25)] bg-transparent no-underline transition-colors hover:border-[#0ABAB5] hover:text-[#0ABAB5] text-center"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Class finder */}
      <section
        id="class-finder"
        className="w-full scroll-mt-[140px] border-t border-[rgba(10,186,181,0.08)] bg-[#070a09]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-[#0ABAB5]" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#0ABAB5]">
              Class finder
            </span>
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-[#f0faf8] leading-tight mb-2">
            Search Classes
          </h2>
        </div>
        <ClassFinder />
      </section>

      {/* 3. All styles grid */}
      <section className="w-full bg-[#070a09] px-6 md:px-12 py-20 md:py-28 border-t border-[rgba(10,186,181,0.08)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-[#0ABAB5]" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#0ABAB5]">
              What We Teach
            </span>
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-[#f0faf8] leading-tight mb-12 md:mb-16">
            Every style we offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stylesForGrid.map((style) => (
              <StyleCard key={style.id} {...style} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Combo callout */}
      <ComboCallout combos={comboClasses} />

      {/* 5. Bottom CTA */}
      <section className="w-full bg-[#0ABAB5] px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-bold text-[#070a09] leading-tight mb-6">
            Still not sure where to start?
          </h2>
          <p className="text-[15px] text-[#070a09]/85 leading-[1.75] mb-10">
            Come in for a free trial class. No commitment. Our instructors will
            help place your dancer in the right level.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center py-4 px-8 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#0ABAB5] bg-[#070a09] no-underline transition-opacity hover:opacity-90 [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)]"
          >
            Book a Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
