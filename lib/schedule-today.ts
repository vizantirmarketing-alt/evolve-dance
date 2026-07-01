import { STUDIO_TIMEZONE } from './homepageSchedulePreview'

const MONTH_SHORT_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

export interface WeekDayInfo {
  /** ISO date string, e.g. "2026-11-22" */
  dateISO: string
  /** Short display label, e.g. "Nov 22" */
  displayDate: string
  /** True if this day is today (in PT) */
  isToday: boolean
}

/**
 * Returns a map of weekday name → date info for the current week (Mon–Sat) in PT.
 *
 * Week boundary rule: if today is Sunday, "current week" rolls forward to the
 * upcoming Monday–Saturday. This matches the homepage rolling-preview behavior:
 * a parent visiting Sunday night should see the week that's about to start,
 * not the week that just ended.
 *
 * Returns null on the server (SSR) — caller should treat null as "not yet known"
 * to avoid hydration mismatches.
 */
export function getCurrentWeekDates(now: Date = new Date()): Record<string, WeekDayInfo> {
  // Parse current instant into LA calendar parts
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
  }).formatToParts(now)

  const num = (t: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === t)?.value ?? NaN)
  const todayWeekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const todayY = num('year')
  const todayM = num('month')
  const todayD = num('day')

  // Find the Monday of the current week.
  // JS Date.getUTCDay(): 0=Sun, 1=Mon, ..., 6=Sat
  // We need to figure out how many days to subtract from today to land on Monday.
  // Special case: if today is Sunday, roll forward to TOMORROW's Monday (not yesterday's).
  const weekdayToOffset: Record<string, number> = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: -1, // roll forward: Monday is 1 day after Sunday
  }
  const offsetFromMonday = weekdayToOffset[todayWeekday] ?? 0

  // Compute Monday's calendar date by subtracting offsetFromMonday days from today.
  // Use UTC date arithmetic to avoid local-tz drift.
  const todayUTC = new Date(Date.UTC(todayY, todayM - 1, todayD))
  const mondayUTC = new Date(todayUTC)
  mondayUTC.setUTCDate(mondayUTC.getUTCDate() - offsetFromMonday)

  // Build Mon–Sat (6 days)
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
  const result: Record<string, WeekDayInfo> = {}

  const monthShort = (m: number) => MONTH_SHORT_NAMES[m - 1] ?? ''

  for (let i = 0; i < days.length; i++) {
    const d = new Date(mondayUTC)
    d.setUTCDate(d.getUTCDate() + i)
    const y = d.getUTCFullYear()
    const m = d.getUTCMonth() + 1
    const day = d.getUTCDate()

    const dateISO = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const displayDate = `${monthShort(m)} ${day}`
    const isToday = y === todayY && m === todayM && day === todayD

    result[days[i]] = { dateISO, displayDate, isToday }
  }

  return result
}
