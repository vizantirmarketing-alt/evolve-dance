'use client'

import { useMemo, useState } from 'react'
import { ScheduleDayRows } from '@/components/ScheduleDayRows'
import { cn } from '@/lib/utils'
import type { HomepageSchedulePreviewDay } from '@/lib/homepageSchedulePreview'

export function ScheduleTabs({
  days,
  defaultTabKey,
}: {
  days: HomepageSchedulePreviewDay[]
  defaultTabKey: string
}) {
  const [activeKey, setActiveKey] = useState(defaultTabKey)

  const activeClasses = useMemo(() => {
    const row = days.find((d) => d.dateISO === activeKey)
    return row?.classes ?? []
  }, [days, activeKey])

  if (days.length === 0) return null

  return (
    <>
      <div className="mb-12 flex gap-0 overflow-x-auto border-b border-[rgba(10,186,181,0.12)]">
        {days.map((row) => (
          <button
            key={row.dateISO}
            type="button"
            onClick={() => setActiveKey(row.dateISO)}
            className={cn(
              'whitespace-nowrap px-6 py-3.5 text-left text-[13px] font-medium tracking-[0.02em] md:text-[14px]',
              'normal-case',
              '-mb-px border-b-2 transition-colors duration-200',
              activeKey === row.dateISO
                ? 'border-teal text-white'
                : 'border-transparent text-[#94a3b8] hover:text-white'
            )}
          >
            <span className="flex flex-col gap-0.5">
              <span className="leading-snug">{row.displayLabel}</span>
              {row.isToday ? (
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal/75 md:text-[11px]">
                  Today
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      <ScheduleDayRows classes={activeClasses} linkRows={false} />
    </>
  )
}
