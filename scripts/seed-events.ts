import { createClient, type SanityClient } from '@sanity/client'
import { config } from 'dotenv'

config({ path: '.env.local' })

const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN?.trim()
if (!WRITE_TOKEN) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN.\n' +
      'Add a Sanity API token with Editor (write) access to .env.local:\n' +
      '  SANITY_API_WRITE_TOKEN=your_token_here\n' +
      'Create one at https://www.sanity.io/manage → Project → API → Tokens'
  )
  process.exit(1)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  console.error(
    'Missing Sanity env vars. Ensure .env.local defines:\n' +
      '  NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      '  NEXT_PUBLIC_SANITY_DATASET\n' +
      '  NEXT_PUBLIC_SANITY_API_VERSION'
  )
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: WRITE_TOKEN,
  useCdn: false,
})

type PortableTextBlock = {
  _type: 'block'
  _key: string
  style: string
  listItem?: string
  level?: number
  markDefs: unknown[]
  children: {
    _type: 'span'
    _key: string
    text: string
    marks: unknown[]
  }[]
}

type EventSeed = {
  _id: string
  _type: 'event'
  title: string
  slug: { _type: 'slug'; current: string }
  type: 'recital' | 'audition' | 'summer'
  startDate: string
  endDate: string | null
  location: string
  description: PortableTextBlock[]
  ageRange: string
  recitalDetails?: {
    dressRehearsalDate: string
    photoDayDate: string
    ticketSaleStart: string
    shoesAndTightsUrl: string | null
    showLineupUrl: string | null
  }
  featured: boolean
  published: boolean
}

const EVENTS: EventSeed[] = [
  {
    _id: 'event-season-9-concert',
    _type: 'event',
    title: 'Season 9 Concert: A Time to Shine',
    slug: { _type: 'slug', current: 'season-9-concert' },
    type: 'recital',
    startDate: '2026-06-14T18:00:00.000Z',
    endDate: null,
    location: 'Durango High School',
    description: [
      {
        _type: 'block',
        _key: 's9-intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's9-intro-text',
            text: 'Our annual end-of-season showcase featuring every Evolve dancer. Three shows across one full Saturday at Durango High School.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 's9-shows-heading',
        style: 'h3',
        markDefs: [],
        children: [
          { _type: 'span', _key: 's9-shows-heading-text', text: 'Showtimes', marks: [] },
        ],
      },
      {
        _type: 'block',
        _key: 's9-show-1',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's9-show-1-text',
            text: 'Show #1 — Saturday, June 14 at 11:00am',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 's9-show-2',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's9-show-2-text',
            text: 'Show #2 — Saturday, June 14 at 3:30pm',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 's9-show-3',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's9-show-3-text',
            text: 'Show #3 — Saturday, June 14 at 7:00pm',
            marks: [],
          },
        ],
      },
    ],
    ageRange: 'All current Evolve students',
    recitalDetails: {
      dressRehearsalDate: '2026-06-11T00:00:00.000Z',
      photoDayDate: '2026-06-10T00:00:00.000Z',
      ticketSaleStart: '2026-05-01T07:00:00.000Z',
      shoesAndTightsUrl: null,
      showLineupUrl: null,
    },
    featured: true,
    published: true,
  },
  {
    _id: 'event-project-auditions-2026',
    _type: 'event',
    title: 'Project Team Auditions 2026',
    slug: { _type: 'slug', current: 'project-auditions-2026' },
    type: 'audition',
    startDate: '2026-05-16T16:00:00.000Z',
    endDate: null,
    location: 'Evolve Dance Center — 6070 S Rainbow Blvd',
    description: [
      {
        _type: 'block',
        _key: 'aud-intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'aud-intro-text',
            text: 'Annual auditions for the Project competition team. Open to new dancers and returning Evolve students. Placement is based on age, training, and audition performance.',
            marks: [],
          },
        ],
      },
    ],
    ageRange: 'Ages 5–18',
    featured: true,
    published: true,
  },
  {
    _id: 'event-summer-intensive-2026',
    _type: 'event',
    title: 'Summer Intensive 2026',
    slug: { _type: 'slug', current: 'summer-intensive-2026' },
    type: 'summer',
    startDate: '2026-07-06T16:00:00.000Z',
    endDate: '2026-07-10T23:00:00.000Z',
    location: 'Evolve Dance Center — 6070 S Rainbow Blvd',
    description: [
      {
        _type: 'block',
        _key: 'sum-intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'sum-intro-text',
            text: 'A week of intensive training across ballet, jazz, contemporary, and hip hop. Guest choreographers, technique classes, and end-of-week showcase.',
            marks: [],
          },
        ],
      },
    ],
    ageRange: 'Ages 8 and up',
    featured: false,
    published: true,
  },
]

async function seedEvent(doc: EventSeed): Promise<'created' | 'skipped'> {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0]{ _id }`,
    { id: doc._id }
  )

  if (existing) {
    console.log(`↷ skipped (exists): ${doc.title}`)
    return 'skipped'
  }

  await client.create(doc)
  console.log(`✓ created: ${doc.title}`)
  return 'created'
}

async function main() {
  let created = 0
  let skipped = 0

  console.log(`Seeding ${EVENTS.length} events…\n`)

  for (const doc of EVENTS) {
    const result = await seedEvent(doc)
    if (result === 'created') {
      created++
    } else {
      skipped++
    }
  }

  const total = await client.fetch<number>(`count(*[_type == "event"])`)

  console.log('')
  console.log(`Seeded: ${created} created, ${skipped} skipped. Total events in dataset after run: ${total}.`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
