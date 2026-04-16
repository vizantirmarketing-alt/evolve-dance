import Link from 'next/link'
import { siteConfig } from '@/data/site'
import { getJackrabbitClasses, getPublicClasses, groupByDay } from '@/lib/jackrabbit'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { ScheduleTabs } from '@/components/sections/ScheduleTabs'

export default async function ScheduleSection() {
  let preview: Awaited<ReturnType<typeof groupByDay>> = []
  try {
    const all = await getJackrabbitClasses()
    const publicClasses = getPublicClasses(all)
    const grouped = groupByDay(publicClasses)
    preview = grouped.slice(0, 3)
  } catch {
    preview = []
  }

  const hasClasses = preview.length > 0

  return (
    <section className="bg-[#0f2318] px-4 py-28 md:px-12">
      <RevealOnScroll>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-7 bg-teal opacity-100" />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">This Week</span>
        </div>
      </RevealOnScroll>
      <div className="mt-4 mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealOnScroll delay={100}>
          <>
            <h2 className="font-display font-bold leading-none text-[#f0faf8]" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
              Class <em className="italic text-teal">schedule</em>
            </h2>
            <p className="text-[15px] font-light leading-[1.8] text-[#e2e8f0]">{siteConfig.scheduleIntro}</p>
          </>
        </RevealOnScroll>
        <Link
          href="/schedule"
          className="mb-1.5 border-b border-[rgba(10,186,181,0.3)] pb-0.5 text-[10px] uppercase tracking-[0.18em] text-teal no-underline transition-colors hover:border-teal"
        >
          Full Schedule →
        </Link>
      </div>

      {!hasClasses ? (
        <div className="mx-auto max-w-lg text-center">
          <p className="text-[15px] font-light leading-[1.8] text-[#e2e8f0]">
            Live schedule temporarily unavailable. Call{' '}
            <a href={`tel:${siteConfig.phoneTel}`} className="text-teal underline-offset-2 hover:underline">
              {siteConfig.phone}
            </a>{' '}
            or book a free trial.
          </p>
          <Link
            href="/enroll#free-trial"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#0ABAB5] px-8 py-3.5 text-xs font-medium uppercase tracking-wider text-white no-underline transition-colors hover:bg-[#087876]"
          >
            BOOK A FREE TRIAL
          </Link>
        </div>
      ) : (
        <ScheduleTabs groups={preview} />
      )}
    </section>
  )
}
