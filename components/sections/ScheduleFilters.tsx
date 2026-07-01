'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { ScheduleDayRows } from '@/components/ScheduleDayRows'
import { formLabelClass } from '@/components/forms/form-styles'
import { cn } from '@/lib/utils'
import { filterDayGroupsMonSat, groupByDay, type JackrabbitClass } from '@/lib/jackrabbit'
import { STUDIO_TIMEZONE } from '@/lib/homepageSchedulePreview'
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

const VALID_AGE_VALUES = new Set<AgeFilterValue>(AGE_OPTIONS.map((o) => o.value))

const AGE_BUCKETS: Record<Exclude<AgeFilterValue, 'all'>, { min: number; max: number }> = {
  '18m-3': { min: 1.5, max: 3 },
  '3-5': { min: 3, max: 5 },
  '5-7': { min: 5, max: 7 },
  '7-11': { min: 7, max: 11 },
  '11-14': { min: 11, max: 14 },
  '14+': { min: 14, max: Number.POSITIVE_INFINITY },
}

function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function slugToCategory(slug: string, categories: string[]): string | null {
  return categories.find((c) => categoryToSlug(c) === slug) ?? null
}

function parseAgeParam(value: string | null): AgeFilterValue {
  if (!value || value === 'all') return 'all'
  return VALID_AGE_VALUES.has(value as AgeFilterValue) ? (value as AgeFilterValue) : 'all'
}

function formatWeekDayLabel(dateISO: string): string {
  const [y, m, d] = dateISO.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0))
  return new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TIMEZONE,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState(() => {
    const slug = searchParams.get('program')
    if (!slug) return 'all'
    return slugToCategory(slug, categories) ?? 'all'
  })
  const [age, setAge] = useState<AgeFilterValue>(() => parseAgeParam(searchParams.get('age')))
  const [openOnly, setOpenOnly] = useState(() => searchParams.get('openOnly') === '1')
  const [weekDates, setWeekDates] = useState<Record<string, WeekDayInfo> | null>(null)

  const syncFiltersToUrl = useCallback(
    (next: { category: string; age: AgeFilterValue; openOnly: boolean }) => {
      const params = new URLSearchParams()
      if (next.category !== 'all') {
        params.set('program', categoryToSlug(next.category))
      }
      if (next.age !== 'all') {
        params.set('age', next.age)
      }
      if (next.openOnly) {
        params.set('openOnly', '1')
      }
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname],
  )

  const updateFilters = useCallback(
    (patch: Partial<{ category: string; age: AgeFilterValue; openOnly: boolean }>) => {
      const next = {
        category: patch.category ?? category,
        age: patch.age ?? age,
        openOnly: patch.openOnly ?? openOnly,
      }
      setCategory(next.category)
      setAge(next.age)
      setOpenOnly(next.openOnly)
      syncFiltersToUrl(next)
    },
    [category, age, openOnly, syncFiltersToUrl],
  )

  useEffect(() => {
    const slug = searchParams.get('program')
    const nextCategory = slug ? (slugToCategory(slug, categories) ?? 'all') : 'all'
    setCategory(nextCategory)
    setAge(parseAgeParam(searchParams.get('age')))
    setOpenOnly(searchParams.get('openOnly') === '1')
  }, [searchParams, categories])

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

  const weekRangeLabel = useMemo(() => {
    if (!weekDates) return null
    const monISO = weekDates.Monday?.dateISO
    const satISO = weekDates.Saturday?.dateISO
    if (!monISO || !satISO) return null
    return `Week of ${formatWeekDayLabel(monISO)} – ${formatWeekDayLabel(satISO)}`
  }, [weekDates])

  const filtered = useMemo(() => {
    return classes.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (!overlapsAgeFilter(c, age)) return false
      if (openOnly && c.openings <= 0) return false
      return true
    })
  }, [classes, category, age, openOnly])

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
      <div className="mb-12">
        {weekRangeLabel ? (
          <p className="mb-4 text-xs uppercase tracking-[0.15em] text-foreground-muted">
            {weekRangeLabel}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <div className="relative min-w-[200px] flex-1 md:max-w-xs">
            <label htmlFor="schedule-cat" className={cn('mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] md:text-[12px]', labelMuted)}>
              Program
            </label>
            <div className={selectShell}>
              <select
                id="schedule-cat"
                value={category}
                onChange={(e) => updateFilters({ category: e.target.value })}
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
                onChange={(e) => updateFilters({ age: e.target.value as AgeFilterValue })}
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

          <div className="flex min-w-[200px] flex-1 items-center gap-2.5 md:max-w-xs md:pb-3">
            <input
              type="checkbox"
              id="schedule-open-only"
              checked={openOnly}
              onChange={(e) => updateFilters({ openOnly: e.target.checked })}
              className="h-4 w-4 cursor-pointer accent-teal-hover"
            />
            <label htmlFor="schedule-open-only" className={cn(formLabelClass, 'mb-0 cursor-pointer')}>
              Show open classes only
            </label>
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
