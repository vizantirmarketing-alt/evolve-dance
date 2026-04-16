'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { groupByDay, type JackrabbitClass } from '@/lib/jackrabbit'

const DAY_ORDER_MON_SAT = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

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

function instructorLine(c: JackrabbitClass): string {
  const ins = c.instructors.filter(Boolean)
  if (ins.length >= 2) return ins.join(' · ')
  return ins[0] ?? ''
}

function overlapsAgeFilter(c: JackrabbitClass, age: AgeFilterValue): boolean {
  if (age === 'all') return true
  if (c.minAgeYears === null && c.maxAgeYears === null) return true

  const bucket = AGE_BUCKETS[age]
  const cLo = c.minAgeYears ?? 0
  const cHi = c.maxAgeYears ?? Number.POSITIVE_INFINITY
  return cLo <= bucket.max && cHi >= bucket.min
}

function rowHref(c: JackrabbitClass): string {
  const r = c.registerLink?.trim()
  return r || '/enroll#free-trial'
}

function ClassRowLink({ c, children }: { c: JackrabbitClass; children: ReactNode }) {
  const href = rowHref(c)
  const external = /^https?:\/\//i.test(href)
  const className = cn(
    'group -mx-2 flex items-start justify-between gap-3 rounded-sm px-2 py-4 text-inherit no-underline transition-colors',
    'hover:bg-white/[0.04] hover:underline hover:decoration-[#0ABAB5]/70 hover:underline-offset-4',
    'sm:-mx-0 sm:px-0'
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

const selectShell =
  'relative w-full min-w-0 rounded-sm border border-[rgba(10,186,181,0.35)] bg-black/30 text-white shadow-none'

const selectField =
  'w-full cursor-pointer appearance-none rounded-sm border-0 bg-transparent py-3 pl-4 pr-11 text-sm font-medium text-white outline-none ring-0 focus:ring-2 focus:ring-[#0ABAB5]/40'

export function ScheduleFilters({
  classes,
  categories,
}: {
  classes: JackrabbitClass[]
  categories: string[]
}) {
  const [category, setCategory] = useState<string>('all')
  const [age, setAge] = useState<AgeFilterValue>('all')

  const filtered = useMemo(() => {
    return classes.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (!overlapsAgeFilter(c, age)) return false
      return true
    })
  }, [classes, category, age])

  const groupedMonSat = useMemo(() => {
    const grouped = groupByDay(filtered)
    return grouped.filter((g) => DAY_ORDER_MON_SAT.includes(g.day as (typeof DAY_ORDER_MON_SAT)[number]))
  }, [filtered])

  const hasAny = filtered.length > 0

  return (
    <>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
        <div className="relative min-w-[200px] flex-1 md:max-w-xs">
          <label htmlFor="schedule-cat" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
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
          <label htmlFor="schedule-age" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
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
        <p className="max-w-xl text-[15px] font-light leading-[1.8] text-[#e2e8f0]">
          No classes match your filters. Try adjusting the category or age range.
        </p>
      ) : (
        <div className="space-y-0">
          {groupedMonSat.map((g, i) => (
            <section
              key={g.day}
              className={cn(i > 0 && 'mt-12 border-t border-[rgba(10,186,181,0.12)] pt-12')}
            >
              <h2 className="font-display text-[clamp(26px,4vw,36px)] font-bold leading-tight text-teal">{g.day}</h2>

              <div className="mt-6 divide-y divide-[rgba(10,186,181,0.08)] sm:hidden">
                {g.classes.map((c) => {
                  const ins = instructorLine(c)
                  const sub = [ins, c.ageRangeDisplay].filter(Boolean).join(' · ')
                  const isOpen = c.openings > 0
                  return (
                    <ClassRowLink key={`${c.id}-${c.day}-${c.startTime}`} c={c}>
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-lg text-teal">{c.startTimeDisplay}</div>
                        <div className="mt-0.5 text-sm font-medium text-[#f1f5f9]">{c.name}</div>
                        {sub ? <div className="mt-0.5 text-xs text-[#cbd5e1]">{sub}</div> : null}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={cn(
                            'inline-block whitespace-nowrap px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]',
                            isOpen
                              ? 'border border-[rgba(10,186,181,0.2)] bg-[rgba(10,186,181,0.1)] text-[#0ABAB5]'
                              : 'border border-[rgba(237,147,177,0.22)] bg-[rgba(237,147,177,0.08)] text-[#ED93B1]'
                          )}
                        >
                          {isOpen ? 'OPEN' : 'FULL'}
                        </span>
                        <ChevronRight className="h-4 w-4 text-[#0ABAB5] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                      </div>
                    </ClassRowLink>
                  )
                })}
              </div>

              <table className="schedule-table mt-6 hidden w-full border-collapse sm:table">
                <thead>
                  <tr>
                    {['Time', 'Class', 'Instructor', 'Ages', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="border-b border-[rgba(10,186,181,0.12)] pb-3 text-left text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.classes.map((row) => {
                    const isOpen = row.openings > 0
                    const href = rowHref(row)
                    const external = /^https?:\/\//i.test(href)
                    const rowClass = cn(
                      'schedule-row group grid w-full grid-cols-[minmax(0,7rem)_1fr_1fr_minmax(0,7rem)_auto] items-center gap-x-4 border-b border-[rgba(10,186,181,0.06)] py-[18px] pr-2 text-left no-underline transition-colors duration-150 last:border-0',
                      'hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ABAB5]'
                    )
                    const cells = (
                      <>
                        <span className="font-display text-[18px] text-teal">{row.startTimeDisplay}</span>
                        <span className="text-[13.5px] font-medium text-[#f1f5f9]">{row.name}</span>
                        <span className="text-[12px] text-[#cbd5e1]">{instructorLine(row)}</span>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[#cbd5e1]">
                          {row.ageRangeDisplay}
                        </span>
                        <span className="flex items-center justify-end gap-2">
                          <span
                            className={cn(
                              'inline-block px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]',
                              isOpen
                                ? 'border border-[rgba(10,186,181,0.2)] bg-[rgba(10,186,181,0.1)] text-[#0ABAB5]'
                                : 'border border-[rgba(237,147,177,0.22)] bg-[rgba(237,147,177,0.08)] text-[#ED93B1]'
                            )}
                          >
                            {isOpen ? 'OPEN' : 'FULL'}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-[#0ABAB5] opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden
                          />
                        </span>
                      </>
                    )

                    return (
                      <tr key={`${row.id}-${row.day}-${row.startTime}`}>
                        <td colSpan={5} className="p-0">
                          {external ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                              {cells}
                            </a>
                          ) : (
                            <Link href={href} className={rowClass}>
                              {cells}
                            </Link>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
