'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScheduleDayRows } from '@/components/ScheduleDayRows'
import { cn } from '@/lib/utils'
import { filterDayGroupsMonSat, groupByDay, type JackrabbitClass } from '@/lib/jackrabbit'
import { getCurrentWeekDates, type WeekDayInfo } from '@/lib/schedule-today'

export type AgeFilterValue = 'all' | '18m-3' | '3-5' | '5-7' | '7-11' | '11-14' | '14+'

const AGE_OPTIONS: { value: AgeFilterValue; label: string }[] = [
  { value: 'all', label: 'All ages' },
  { value: '18m-3', label: '18mo–3' },
  { value: '3-5', label: '3–5' },
  { value: '5-7', label: '5–7' },
  { value: '7-11', label: '7–11' },
  { value: '11-14', label: '11–14' },
  { value: '14+', label: '14+' },
]

const AGE_BUCKETS: Record<Exclude<AgeFilterValue, 'all'>, { min: number; max: number }> = {
  '18m-3': { min: 1.5, max: 3 },
  '3-5': { min: 3, max: 5 },
  '5-7': { min: 5, max: 7 },
  '7-11': { min: 7, max: 11 },
  '11-14': { min: 11, max: 14 },
  '14+': { min: 14, max: Number.POSITIVE_INFINITY },
}

function overlapsAgeFilter(c: JackrabbitClass, age: AgeFilterValue): boolean {
  if (age === 'all') return true
  if (c.minAgeYears === null && c.maxAgeYears === null) return true

  const bucket = AGE_BUCKETS[age]
  const cLo = c.minAgeYears ?? 0
  const cHi = c.maxAgeYears ?? Number.POSITIVE_INFINITY
  return cLo <= bucket.max && cHi >= bucket.min
}

const selectShellDark =
  'relative w-full min-w-0 rounded-sm border border-[rgba(10,186,181,0.35)] bg-black/30 text-white shadow-none'
const selectShellCream =
  'relative w-full min-w-0 rounded-sm border border-[rgba(10,186,181,0.45)] bg-white text-[#1F1F1C] shadow-none'

const selectFieldDark =
  'w-full cursor-pointer appearance-none rounded-sm border-0 bg-transparent py-3 pl-4 pr-11 text-[14px] font-medium text-white outline-none ring-0 focus:ring-2 focus:ring-[#0ABAB5]/40 md:text-[15px]'
const selectFieldCream =
  'w-full cursor-pointer appearance-none rounded-sm border-0 bg-transparent py-3 pl-4 pr-11 text-[14px] font-medium text-[#1F1F1C] outline-none ring-0 focus:ring-2 focus:ring-[#0ABAB5]/40 md:text-[15px]'

export type ScheduleFiltersSurface = 'dark' | 'cream'

export function ScheduleFilters({
  classes,
  categories,
  surface = 'dark',
}: {
  classes: JackrabbitClass[]
  categories: string[]
  surface?: ScheduleFiltersSurface
}) {
  const [category, setCategory] = useState<string>('all')
  const [age, setAge] = useState<AgeFilterValue>('all')
  const [weekDates, setWeekDates] = useState<Record<string, WeekDayInfo> | null>(null)

  useEffect(() => {
    setWeekDates(getCurrentWeekDates())
  }, [])

  useEffect(() => {
    if (!weekDates) return
    if (window.scrollY > 100) return

    const todayEntry = Object.entries(weekDates).find(([, info]) => info.isToday)
    if (!todayEntry) return
    const [todayName] = todayEntry

    const el = document.getElementById(`day-${todayName.toLowerCase()}`)
    if (!el) return

    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [weekDates])

  const filtered = useMemo(() => {
    return classes.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (!overlapsAgeFilter(c, age)) return false
      return true
    })
  }, [classes, category, age])

  const groupedMonSat = useMemo(() => {
    const grouped = groupByDay(filtered)
    return filterDayGroupsMonSat(grouped)
  }, [filtered])

  const hasAny = filtered.length > 0
  const isCream = surface === 'cream'
  const selectShell = isCream ? selectShellCream : selectShellDark
  const selectField = isCream ? selectFieldCream : selectFieldDark
  const labelMuted = isCream ? 'text-[#6D6C67]' : 'text-[#94a3b8]'
  const emptyFilterText = isCream ? 'text-[#1F1F1C]' : 'text-[#e2e8f0]'

  const scheduleBody = (
    <div className="space-y-0">
      {groupedMonSat.map((g, i) => {
        const dayInfo = weekDates?.[g.day]
        const isToday = dayInfo?.isToday ?? false
        const displayDate = dayInfo?.displayDate ?? ''

        return (
          <section
            key={g.day}
            id={`day-${g.day.toLowerCase()}`}
            className={cn(
              i > 0 && 'mt-12 border-t border-[rgba(10,186,181,0.12)] pt-12',
            )}
          >
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-[clamp(26px,4vw,36px)] font-bold leading-tight text-white">
                {g.day}{displayDate ? `, ${displayDate}` : ''}
              </h2>
              {isToday ? (
                <>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal md:text-[11px]">
                    Today
                  </span>
                  <div className="mt-1 h-px w-full bg-teal/40" aria-hidden />
                </>
              ) : null}
            </div>

            <ScheduleDayRows
              classes={g.classes}
              linkRows
              surface={surface}
              listClassName="mt-6"
              tableClassName="mt-6"
            />
          </section>
        )
      })}
    </div>
  )

  return (
    <>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
        <div className="relative min-w-[200px] flex-1 md:max-w-xs">
          <label htmlFor="schedule-cat" className={cn('mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] md:text-[12px]', labelMuted)}>
            Program
          </label>
          <div className={selectShell}>
            <select
              id="schedule-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectField}
            >
              <option value="all">All programs</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0ABAB5] opacity-80"
              aria-hidden
            />
          </div>
        </div>

        <div className="relative min-w-[200px] flex-1 md:max-w-xs">
          <label htmlFor="schedule-age" className={cn('mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] md:text-[12px]', labelMuted)}>
            Age
          </label>
          <div className={selectShell}>
            <select
              id="schedule-age"
              value={age}
              onChange={(e) => setAge(e.target.value as AgeFilterValue)}
              className={selectField}
            >
              {AGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0ABAB5] opacity-80"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {!hasAny ? (
        <p className={cn('max-w-xl text-[15px] font-light leading-[1.8] md:text-[16px]', emptyFilterText)}>
          No classes match your filters. Try adjusting the category or age range.
        </p>
      ) : isCream ? (
        <div className="rounded-sm border border-[rgba(10,186,181,0.15)] bg-[#0f2318] px-4 py-10 md:px-10 md:py-12">{scheduleBody}</div>
      ) : (
        scheduleBody
      )}
    </>
  )
}
