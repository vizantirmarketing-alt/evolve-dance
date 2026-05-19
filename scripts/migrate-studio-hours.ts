import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

type RegularDaySeed = {
  day: Weekday
  isOpen: boolean
  openTime?: string
  closeTime?: string
}

const REGULAR_HOURS: RegularDaySeed[] = [
  { day: 'Monday', isOpen: true, openTime: '3:30 PM', closeTime: '9:00 PM' },
  { day: 'Tuesday', isOpen: true, openTime: '3:30 PM', closeTime: '9:00 PM' },
  { day: 'Wednesday', isOpen: true, openTime: '3:30 PM', closeTime: '9:00 PM' },
  { day: 'Thursday', isOpen: true, openTime: '3:30 PM', closeTime: '9:00 PM' },
  { day: 'Friday', isOpen: true, openTime: '3:30 PM', closeTime: '9:00 PM' },
  { day: 'Saturday', isOpen: true, openTime: '9:00 AM', closeTime: '3:00 PM' },
  { day: 'Sunday', isOpen: false },
]

let keyCounter = 0

function key(): string {
  keyCounter += 1
  return `k${keyCounter}`
}

function loadEnvLocal(): void {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const envKey = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(envKey in process.env)) {
      process.env[envKey] = value
    }
  }
}

async function main(): Promise<void> {
  loadEnvLocal()

  const token = process.env.SANITY_API_WRITE_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

  if (!token) {
    console.error('Missing SANITY_API_WRITE_TOKEN in .env.local')
    process.exit(1)
  }
  if (!projectId || !dataset) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })

  await client.createOrReplace({
    _id: 'studioHours',
    _type: 'studioHours',
    regularHours: REGULAR_HOURS.map((entry) => ({
      _type: 'regularDay',
      _key: key(),
      day: entry.day,
      isOpen: entry.isOpen,
      ...(entry.openTime ? { openTime: entry.openTime } : {}),
      ...(entry.closeTime ? { closeTime: entry.closeTime } : {}),
    })),
    specialHours: [],
    holidayMessage: '',
  })

  const openDays = REGULAR_HOURS.filter((d) => d.isOpen).map((d) => d.day)
  const closedDays = REGULAR_HOURS.filter((d) => !d.isOpen).map((d) => d.day)

  console.log('Created studioHours singleton in Sanity.')
  console.log(`  - regularHours: ${REGULAR_HOURS.length} days (${openDays.join(', ')})`)
  if (closedDays.length > 0) {
    console.log(`  - closed: ${closedDays.join(', ')}`)
  }
  console.log('  - specialHours: (empty — add holidays in Studio)')
  console.log('  - holidayMessage: (empty)')
}

main().catch((error: unknown) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
