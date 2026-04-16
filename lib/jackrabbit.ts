/**
 * Jackrabbit Class Openings (jr3.0) — fetch + normalize for Evolve Dance Center.
 */

const OPENINGS_URL = 'https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsJson'

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
type DayKey = (typeof DAY_KEYS)[number]

const DAY_LABEL: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

const DAY_SORT_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

export interface JackrabbitMeetingDays {
  mon: boolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
  sun: boolean
}

/** Raw row from OpeningsJson `rows` array (subset we read). */
export interface JackrabbitOpeningsRow {
  id: number
  name: string
  category2: string
  description?: string
  start_time: string
  end_time: string
  instructors: string[]
  meeting_days: JackrabbitMeetingDays
  min_age: string
  max_age: string
  room: string
  session: string
  openings: { calculated_openings?: number }
  tuition: { fee?: number }
  online_reg_link: string
  waitlist?: boolean
}

export interface JackrabbitOpeningsResponse {
  rows: JackrabbitOpeningsRow[]
}

export interface JackrabbitClass {
  id: number
  name: string
  category: string
  day: string
  startTime: string
  startTimeDisplay: string
  endTimeDisplay: string
  instructors: string[]
  ageRangeDisplay: string
  /** Fractional years from ISO duration, or null when API omits that bound. */
  minAgeYears: number | null
  /** Fractional years from ISO duration, or null when API omits that bound. */
  maxAgeYears: number | null
  room: string
  openings: number
  isFull: boolean
  registerLink: string
  isCompetitive: boolean
}

export interface DayGroup {
  day: string
  classes: JackrabbitClass[]
}

/** Parse ISO-8601 duration (e.g. `P05Y00M`) to fractional years, or null if empty / invalid. */
export function parseIso8601DurationToYears(iso: string): number | null {
  const parts = parseIso8601DurationParts(iso)
  if (!parts) return null
  return parts.years + parts.months / 12
}

function parseIso8601DurationParts(iso: string): { years: number; months: number } | null {
  if (iso == null || typeof iso !== 'string') return null
  const s = iso.trim()
  if (!s) return null
  const m = s.match(/^P(?:(\d+)Y)?(?:(\d+)M)?/i)
  if (!m) return null
  const years = parseInt(m[1] ?? '0', 10) || 0
  const months = parseInt(m[2] ?? '0', 10) || 0
  return { years, months }
}

/** Convert `HH:mm` (24h) to `h:mm AM/PM`. */
export function formatTime24hrTo12h(time24: string): string {
  if (!time24 || typeof time24 !== 'string') return ''
  const [hStr, mStr = '00'] = time24.split(':')
  let h = parseInt(hStr, 10)
  const minutes = parseInt(mStr, 10) || 0
  if (Number.isNaN(h)) return time24
  const period = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  const mm = minutes.toString().padStart(2, '0')
  return `${h}:${mm} ${period}`
}

function buildAgeRangeDisplay(minAge: string, maxAge: string): string {
  const minP = parseIso8601DurationParts(minAge)
  const maxP = parseIso8601DurationParts(maxAge)
  if (!minP && !maxP) return 'All ages'
  if (minP && !maxP) return `Ages ${minP.years}+`
  if (!minP && maxP) return `Through age ${maxP.years}`
  if (minP && maxP) return `Ages ${minP.years}–${maxP.years}`
  return 'All ages'
}

function inferIsCompetitive(name: string, category: string): boolean {
  const blob = `${name} ${category}`.toLowerCase()
  return /\b(competitive|elite|invite)\b/i.test(blob)
}

function activeMeetingDayKeys(days: JackrabbitMeetingDays | undefined): DayKey[] {
  if (!days) return []
  return DAY_KEYS.filter((k) => days[k] === true)
}

export function getPublicClasses(classes: JackrabbitClass[]): JackrabbitClass[] {
  return classes.filter((c) => c.category !== 'Project Choreography')
}

export function groupByDay(classes: JackrabbitClass[]): DayGroup[] {
  const map = new Map<string, JackrabbitClass[]>()
  for (const c of classes) {
    const list = map.get(c.day)
    if (list) list.push(c)
    else map.set(c.day, [c])
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.startTime.localeCompare(b.startTime))
  }
  return DAY_SORT_ORDER.filter((d) => map.has(d)).map((day) => ({
    day,
    classes: map.get(day)!,
  }))
}

function mapRowToClass(raw: JackrabbitOpeningsRow, dayLabel: string): JackrabbitClass {
  const instructors = Array.isArray(raw.instructors) ? raw.instructors : []
  const openings = Math.max(0, Number(raw.openings?.calculated_openings) || 0)
  const category = raw.category2?.trim() || 'Classes'
  const minAgeYears = parseIso8601DurationToYears(raw.min_age ?? '')
  const maxAgeYears = parseIso8601DurationToYears(raw.max_age ?? '')

  return {
    id: raw.id,
    name: raw.name,
    category,
    day: dayLabel,
    startTime: raw.start_time,
    startTimeDisplay: formatTime24hrTo12h(raw.start_time),
    endTimeDisplay: formatTime24hrTo12h(raw.end_time),
    instructors,
    ageRangeDisplay: buildAgeRangeDisplay(raw.min_age ?? '', raw.max_age ?? ''),
    minAgeYears,
    maxAgeYears,
    room: raw.room ?? '',
    openings,
    isFull: openings <= 0,
    registerLink: raw.online_reg_link ?? '',
    isCompetitive: inferIsCompetitive(raw.name, category),
  }
}

function expandRowsToClasses(rows: JackrabbitOpeningsRow[]): JackrabbitClass[] {
  const out: JackrabbitClass[] = []
  for (const raw of rows) {
    const keys = activeMeetingDayKeys(raw.meeting_days)
    if (keys.length === 0) continue
    for (const key of keys) {
      out.push(mapRowToClass(raw, DAY_LABEL[key]))
    }
  }
  return out
}

export async function getJackrabbitClasses(): Promise<JackrabbitClass[]> {
  const orgId = process.env.JACKRABBIT_ORG_ID
  if (!orgId) {
    console.warn('[jackrabbit] JACKRABBIT_ORG_ID is not set; returning no classes.')
    return []
  }

  const url = `${OPENINGS_URL}?orgid=${encodeURIComponent(orgId)}`
  const res = await fetch(url, { next: { revalidate: 300 } })

  if (!res.ok) {
    throw new Error(`Jackrabbit OpeningsJson failed: ${res.status} ${res.statusText}`)
  }

  const body = (await res.json()) as JackrabbitOpeningsResponse
  const rows = Array.isArray(body.rows) ? body.rows : []
  return expandRowsToClasses(rows)
}
