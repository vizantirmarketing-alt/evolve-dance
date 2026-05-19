import Link from 'next/link'
import { siteConfig } from '@/data/site'
import {
  buildHomepageSchedulePreview,
  type HomepageSchedulePreviewDay,
} from '@/lib/homepageSchedulePreview'
import { filterDayGroupsMonSat, getJackrabbitClasses, getPublicClasses, groupByDay } from '@/lib/jackrabbit'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { ScheduleTabs } from '@/components/sections/ScheduleTabs'

export default async function ScheduleSection() {
  let preview: HomepageSchedulePreviewDay[] = []
  try {
    const all = await getJackrabbitClasses()
    const publicClasses = getPublicClasses(all)
    const grouped = groupByDay(publicClasses)
    const monSat = filterDayGroupsMonSat(grouped)
    preview = buildHomepageSchedulePreview(monSat)
  } catch (error) {
    console.error('[ScheduleTabs] Jackrabbit fetch failed:', error)
    return null
  }

  if (!preview || preview.length === 0) {
    return null
  }

  const defaultTabKey = preview.find((d) => d.isToday)?.dateISO ?? preview[0]?.dateISO ?? ''

  return (
    <section className="bg-[#0f2318] px-4 py-28 md:px-12">
      <RevealOnScroll>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-7 bg-teal opacity-100" />
          <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">Upcoming Classes</span>
        </div>
      </RevealOnScroll>
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealOnScroll delay={100}>
          <>
            <h2 className="font-display max-w-3xl font-bold text-[#f0faf8]">
              <span style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>Class </span>
              <span className="italic text-teal" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>
                schedule
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] font-light leading-[1.8] text-[#e2e8f0] md:text-[16px]">{siteConfig.scheduleIntro}</p>
          </>
        </RevealOnScroll>
        <Link
          href="/schedule"
          className="mb-1.5 border-b border-[rgba(10,186,181,0.3)] pb-0.5 text-[11px] uppercase tracking-[0.18em] text-teal no-underline transition-colors hover:border-teal md:text-[12px]"
        >
          Full Schedule →
        </Link>
      </div>

      <ScheduleTabs days={preview} defaultTabKey={defaultTabKey} />
    </section>
  )
}
