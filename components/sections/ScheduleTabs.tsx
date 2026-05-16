'use client'

import { useMemo, useState } from 'react'
import { ScheduleDayRows } from '@/components/ScheduleDayRows'
import { cn } from '@/lib/utils'
import type { DayGroup } from '@/lib/jackrabbit'

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

      <ScheduleDayRows classes={activeClasses} linkRows={false} />
    </>
  )
}
