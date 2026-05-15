'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { DayGroup, JackrabbitClass } from '@/lib/jackrabbit'

function instructorLine(c: JackrabbitClass): string {
  const ins = c.instructors.filter(Boolean)
  if (ins.length >= 2) return ins.join(' · ')
  return ins[0] ?? ''
}

export function ScheduleTabs({ groups }: { groups: DayGroup[] }) {
  const firstDay = groups[0]?.day ?? ''
  const [activeDay, setActiveDay] = useState(firstDay)

  const activeClasses = useMemo(() => {
    const g = groups.find((d) => d.day === activeDay)
    return g?.classes ?? []
  }, [groups, activeDay])

  if (groups.length === 0) return null

  return (
    <>
      <div className="mb-12 flex gap-0 overflow-x-auto border-b border-[rgba(10,186,181,0.12)]">
        {groups.map((g) => (
          <button
            key={g.day}
            type="button"
            onClick={() => setActiveDay(g.day)}
            className={cn(
              'whitespace-nowrap px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] md:text-[13px]',
              '-mb-px border-b-2 transition-colors duration-200',
              activeDay === g.day
                ? 'border-teal text-white'
                : 'border-transparent text-[#94a3b8] hover:text-white'
            )}
          >
            {g.day}
          </button>
        ))}
      </div>

      <div className="divide-y divide-[rgba(10,186,181,0.08)] sm:hidden">
        {activeClasses.map((c) => {
          const ins = instructorLine(c)
          const sub = [ins, c.ageRangeDisplay].filter(Boolean).join(' · ')
          const isOpen = c.openings > 0
          return (
            <div key={`${c.id}-${c.day}-${c.startTime}`} className="flex items-start justify-between gap-2 py-4">
              <div>
                <div className="font-serif text-lg text-teal">{c.startTimeDisplay}</div>
                <div className="mt-0.5 text-[14px] font-medium text-[#f1f5f9] md:text-[15px]">{c.name}</div>
                {sub ? <div className="mt-0.5 text-[12px] text-[#cbd5e1] md:text-[13px]">{sub}</div> : null}
              </div>
              <div>
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
              </div>
            </div>
          )
        })}
      </div>

      <table className="schedule-table hidden w-full border-collapse sm:table">
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
          {activeClasses.map((row) => {
            const isOpen = row.openings > 0
            return (
              <tr
                key={`${row.id}-${row.day}-${row.startTime}`}
                className="schedule-row border-b border-[rgba(10,186,181,0.06)] transition-colors duration-150 last:border-0"
              >
                <td className="w-32 py-[18px] font-display text-[18px] text-teal">{row.startTimeDisplay}</td>
                <td className="py-[18px] text-[14px] font-medium text-[#f1f5f9] md:text-[15px]">{row.name}</td>
                <td className="py-[18px] text-[13px] text-[#cbd5e1] md:text-[14px]">{instructorLine(row)}</td>
                <td className="py-[18px] text-[11px] uppercase tracking-[0.12em] text-[#cbd5e1]">
                  {row.ageRangeDisplay}
                </td>
                <td className="py-[18px]">
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
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
