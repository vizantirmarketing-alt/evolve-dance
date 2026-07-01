'use client'

import { useMemo, useState } from 'react'
import { ScheduleDayRows } from '@/components/ScheduleDayRows'
import { cn } from '@/lib/utils'
import {
  STUDIO_TIMEZONE,
  type HomepageSchedulePreviewDay,
} from '@/lib/homepageSchedulePreview'

function shortTabLabel(dateISO: string): string {
  const [y, m, d] = dateISO.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TIMEZONE,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(Date.UTC(y, m - 1, d, 12, 0, 0)))
}

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
      <div className="mb-12 flex gap-0 border-b border-[rgba(10,186,181,0.12)]">
        {days.map((row) => (
          <button
            key={row.dateISO}
            type="button"
            onClick={() => setActiveKey(row.dateISO)}
            className={cn(
              'min-w-0 flex-1 whitespace-nowrap px-3 py-3.5 text-left text-[12px] font-medium tracking-[0.02em] md:px-6 md:text-[14px]',
              'normal-case',
              '-mb-px border-b-2 transition-colors duration-200',
              activeKey === row.dateISO
                ? 'border-teal text-white'
                : 'border-transparent text-[#94a3b8] hover:text-white'
            )}
          >
            <span className="flex flex-col gap-0.5">
              <span className="leading-snug md:hidden">{shortTabLabel(row.dateISO)}</span>
              <span className="hidden leading-snug md:inline">{row.displayLabel}</span>
              {row.isToday ? (
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-teal/75 md:text-[11px] md:tracking-[0.14em]">
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
