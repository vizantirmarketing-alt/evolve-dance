import type { Metadata } from 'next'
import Link from 'next/link'
import ClassFinder from '@/components/ClassFinder'
import StyleCard from '@/components/StyleCard'
import ComboCallout from '@/components/ComboCallout'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
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
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F7F5F1]">
        {/* 1. Hero */}
        <section className="w-full border-b border-[#D6DFDA] bg-[#F7F5F1] px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-7 bg-[#0ABAB5]" />
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5]">
                Season 9 — Now Enrolling
              </span>
            </div>
            <h1 className="font-display mb-6 text-[clamp(40px,5vw,64px)] font-bold leading-[1.05] text-[#1F1F1C]">
              Find the right class for your dancer
            </h1>
            <p className="mb-10 max-w-xl text-[15px] font-light leading-[1.75] text-[#6D6C67] md:text-[16px]">
              Ages 18 months to 18 years. All levels. First class is on us.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0ABAB5] px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-black no-underline transition-colors [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] hover:bg-[#81D8D0] md:py-4 md:text-[13px]"
              >
                Book a Free Trial
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center border border-[rgba(10,186,181,0.45)] bg-white px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1F1F1C] no-underline transition-colors hover:border-[#0ABAB5] hover:text-[#0ABAB5] md:py-4 md:text-[13px]"
              >
                View Schedule
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Class finder */}
        <section
          id="class-finder"
          className="w-full scroll-mt-[100px] border-t border-[#D6DFDA] bg-[#FCFBF8]"
        >
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-16 md:px-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-7 bg-[#0ABAB5]" />
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5]">Class finder</span>
            </div>
            <h2 className="font-display mb-2 text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-[#1F1F1C]">
              Search Classes
            </h2>
          </div>
          <ClassFinder surface="light" />
        </section>

        {/* 3. All styles grid */}
        <section className="w-full border-t border-[#D6DFDA] bg-[#F7F5F1] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-7 bg-[#0ABAB5]" />
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5]">What We Teach</span>
            </div>
            <h2 className="font-display mb-12 text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-[#1F1F1C] md:mb-16">
              Every style we offer
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stylesForGrid.map((style) => (
                <StyleCard key={style.id} {...style} />
              ))}
            </div>
          </div>
        </section>

        <ComboCallout combos={comboClasses} surface="cream" />

        {/* Bottom CTA */}
        <section className="w-full border-t border-[#D6DFDA] bg-[#0ABAB5] px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display mb-6 text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-[#070a09]">
              Still not sure where to start?
            </h2>
            <p className="mb-10 text-[15px] leading-[1.75] text-[#070a09]/85">
              Come in for a free trial class. No commitment. Our instructors will help place your dancer in the right
              level.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#070a09] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0ABAB5] no-underline transition-opacity [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] hover:opacity-90 md:py-4 md:text-[13px]"
            >
              Book a Free Trial
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
