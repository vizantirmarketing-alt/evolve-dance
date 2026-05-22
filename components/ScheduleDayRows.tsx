'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { JACKRABBIT_ENROLL_URL, type JackrabbitClass } from '@/lib/jackrabbit'

export function instructorLine(c: JackrabbitClass): string {
  const ins = c.instructors.filter(Boolean)
  if (ins.length >= 2) return ins.join(' · ')
  return ins[0] ?? ''
}

function rowHref(c: JackrabbitClass): string {
  const r = c.registerLink?.trim()
  return r || JACKRABBIT_ENROLL_URL
}

function ClassRowLink({ c, children }: { c: JackrabbitClass; children: ReactNode }) {
  const href = rowHref(c)
  const external = /^https?:\/\//i.test(href)
  const className = cn(
    'group -mx-2 flex items-start justify-between gap-2 rounded-sm px-2 py-3 text-inherit no-underline transition-colors md:gap-3 md:py-4',
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

function statusBadge(isOpen: boolean) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]',
        isOpen
          ? 'border border-[rgba(10,186,181,0.2)] bg-[rgba(10,186,181,0.1)] text-[#0ABAB5]'
          : 'border border-[rgba(237,147,177,0.22)] bg-[rgba(237,147,177,0.08)] text-[#ED93B1]'
      )}
    >
      {isOpen ? 'OPEN' : 'FULL'}
    </span>
  )
}

function statusBadgeMobile(isOpen: boolean) {
  return (
    <span
      className={cn(
        'inline-block whitespace-nowrap px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]',
        isOpen
          ? 'border border-[rgba(10,186,181,0.2)] bg-[rgba(10,186,181,0.1)] text-[#0ABAB5]'
          : 'border border-[rgba(237,147,177,0.22)] bg-[rgba(237,147,177,0.08)] text-[#ED93B1]'
      )}
    >
      {isOpen ? 'OPEN' : 'FULL'}
    </span>
  )
}

export function ScheduleDayRows({
  classes,
  linkRows,
  surface,
  listClassName,
  tableClassName,
}: {
  classes: JackrabbitClass[]
  linkRows: boolean
  /** Reserved for surface-specific row styling; currently identical on both pages. */
  surface?: 'dark' | 'cream'
  /** Merged with default mobile list classes (e.g. `mt-6` on /schedule day sections). */
  listClassName?: string
  /** Merged with default table classes. */
  tableClassName?: string
}) {
  void surface

  return (
    <>
      <div className={cn('divide-y divide-[rgba(10,186,181,0.08)] sm:hidden', listClassName)}>
        {classes.map((c) => {
          const ins = instructorLine(c)
          const sub = [ins, c.ageRangeDisplay].filter(Boolean).join(' · ')
          const isOpen = c.openings > 0
          const key = `${c.id}-${c.day}-${c.startTime}`

          if (linkRows) {
            return (
              <ClassRowLink key={key} c={c}>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-lg leading-tight text-teal">{c.startTimeDisplay}</div>
                  <div className="mt-0 text-[14px] font-medium leading-snug text-[#f1f5f9] md:mt-0.5 md:text-[15px]">{c.name}</div>
                  {sub ? <div className="mt-0 text-[12px] leading-snug text-[#cbd5e1] md:mt-0.5 md:text-[13px]">{sub}</div> : null}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {statusBadgeMobile(isOpen)}
                  <ChevronRight className="h-4 w-4 text-[#0ABAB5] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </div>
              </ClassRowLink>
            )
          }

          return (
            <div key={key} className="flex items-start justify-between gap-2 py-3 md:py-4">
              <div>
                <div className="font-serif text-lg leading-tight text-teal">{c.startTimeDisplay}</div>
                <div className="mt-0 text-[14px] font-medium leading-snug text-[#f1f5f9] md:mt-0.5 md:text-[15px]">{c.name}</div>
                {sub ? <div className="mt-0 text-[12px] leading-snug text-[#cbd5e1] md:mt-0.5 md:text-[13px]">{sub}</div> : null}
              </div>
              <div>{statusBadgeMobile(isOpen)}</div>
            </div>
          )
        })}
      </div>

      <table className={cn('schedule-table hidden w-full border-collapse sm:table', tableClassName)}>
        <thead>
          <tr>
            {['Time', 'Class', 'Instructor', 'Ages', 'Status'].map((h) => (
              <th
                key={h}
                className="border-b border-[rgba(10,186,181,0.12)] pb-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classes.map((row) => {
            const isOpen = row.openings > 0
            const key = `${row.id}-${row.day}-${row.startTime}`

            if (linkRows) {
              const href = rowHref(row)
              const external = /^https?:\/\//i.test(href)
              const rowClass = cn(
                'schedule-row group grid w-full grid-cols-[minmax(0,7rem)_1fr_1fr_minmax(0,7rem)_auto] items-center gap-x-4 border-b border-[rgba(10,186,181,0.06)] py-[18px] pr-2 text-left no-underline transition-colors duration-150 last:border-0',
                'hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ABAB5]'
              )
              const cells = (
                <>
                  <span className="font-display text-[18px] text-teal">{row.startTimeDisplay}</span>
                  <span className="text-[14px] font-medium text-[#f1f5f9] md:text-[15px]">{row.name}</span>
                  <span className="text-[13px] text-[#cbd5e1] md:text-[14px]">{instructorLine(row)}</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#cbd5e1]">{row.ageRangeDisplay}</span>
                  <span className="flex items-center justify-end gap-2">
                    {statusBadge(isOpen)}
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-[#0ABAB5] opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                </>
              )

              return (
                <tr key={key}>
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
            }

            return (
              <tr key={key} className="schedule-row border-b border-[rgba(10,186,181,0.06)] transition-colors duration-150 last:border-0">
                <td className="w-32 py-[18px] font-display text-[18px] text-teal">{row.startTimeDisplay}</td>
                <td className="py-[18px] text-[14px] font-medium text-[#f1f5f9] md:text-[15px]">{row.name}</td>
                <td className="py-[18px] text-[13px] text-[#cbd5e1] md:text-[14px]">{instructorLine(row)}</td>
                <td className="py-[18px] text-[11px] uppercase tracking-[0.12em] text-[#cbd5e1]">{row.ageRangeDisplay}</td>
                <td className="py-[18px]">{statusBadge(isOpen)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
