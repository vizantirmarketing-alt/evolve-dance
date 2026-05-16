import type { DayGroup, JackrabbitClass } from '@/lib/jackrabbit'

/** Studio civil dates and “today” use Pacific time (Las Vegas). */
export const STUDIO_TIMEZONE = 'America/Los_Angeles'

export interface HomepageSchedulePreviewDay {
  /** `YYYY-MM-DD` for the studio calendar date (LA). */
  dateISO: string
  /** Long weekday label; matches `JackrabbitClass.day` / `DayGroup.day`. */
  day: string
  /** e.g. `Monday, May 18` */
  displayLabel: string
  isToday: boolean
  classes: JackrabbitClass[]
}

function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

function parseLaCalendarParts(instant: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(instant)
  const num = (t: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === t)?.value ?? NaN)
  return { year: num('year'), month: num('month'), day: num('day') }
}

/** Pure Gregorian advance; matches LA wall-calendar stepping for display. */
function addCalendarDays(
  y: number,
  m: number,
  d: number,
  delta: number
): { y: number; m: number; d: number } {
  const x = new Date(Date.UTC(y, m - 1, d + delta))
  return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate() }
}

/** Anchor instant so `weekday`/`format` in LA correspond to civil `y-m-d`. */
function laCivilDateToInstant(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0))
}

function weekdayLongFromYmd(y: number, m: number, d: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TIMEZONE,
    weekday: 'long',
  }).format(laCivilDateToInstant(y, m, d))
}

function formatPreviewTabLabel(y: number, m: number, d: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TIMEZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(laCivilDateToInstant(y, m, d))
}

/**
 * Next up to three studio calendar days with classes, rolling forward from “today” in LA.
 * Sundays are never shown; cursor skips them. Wraps across weeks as needed.
 */
export function buildHomepageSchedulePreview(
  monSatGroups: DayGroup[],
  now: Date = new Date()
): HomepageSchedulePreviewDay[] {
  const byWeekday = new Map(monSatGroups.map((g) => [g.day, g.classes]))

  const todayLa = parseLaCalendarParts(now)
  let y = todayLa.year
  let m = todayLa.month
  let d = todayLa.day

  if (weekdayLongFromYmd(y, m, d) === 'Sunday') {
    const n = addCalendarDays(y, m, d, 1)
    y = n.y
    m = n.m
    d = n.d
  }

  const out: HomepageSchedulePreviewDay[] = []
  let guard = 0

  while (out.length < 3 && guard < 56) {
    guard += 1
    const weekday = weekdayLongFromYmd(y, m, d)

    if (weekday === 'Sunday') {
      const n = addCalendarDays(y, m, d, 1)
      y = n.y
      m = n.m
      d = n.d
      continue
    }

    const classes = byWeekday.get(weekday)
    if (classes?.length) {
      const dateISO = `${y}-${pad2(m)}-${pad2(d)}`
      const isToday =
        y === todayLa.year && m === todayLa.month && d === todayLa.day
      out.push({
        dateISO,
        day: weekday,
        displayLabel: formatPreviewTabLabel(y, m, d),
        isToday,
        classes,
      })
    }

    const next = addCalendarDays(y, m, d, 1)
    y = next.y
    m = next.m
    d = next.d
  }

  return out
}
