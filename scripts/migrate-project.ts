import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type CommitmentLevel = 'recreational' | 'pre-competitive' | 'competitive'

type TeamLevelSeed = {
  name: string
  ageRange: string
  description: string
  commitmentLevel: CommitmentLevel
  order: number
}

type AwardSeed = {
  title: string
  year: number
  competition: string
  placement: string
}

const PAGE_INTRO_PARAGRAPHS = [
  "Evolve's invitation-only competition team for dancers ready to take their training to the next level. We compete locally and nationally, and our dancers go on to drill teams, college programs, and professional companies.",
  "The Project is Evolve's competition team — a dedicated group of dancers who train across ballet, jazz, contemporary, lyrical, hip hop, and acro. We don't just chase trophies. We build dancers who carry themselves with discipline, artistry, and confidence on and off the stage.",
  'Project dancers commit to multiple weekly classes, additional rehearsals, and a competition schedule that runs January through April. We attend regional competitions, conventions, and out-of-state Nationals annually.',
  "If you're considering The Project, talk to us before auditioning. We'll be honest about whether your child is ready — and what training will get them there.",
]

const TEAM_LEVELS: TeamLevelSeed[] = [
  {
    name: 'Prep',
    ageRange: 'Ages 5–8',
    description:
      'Introduction to competition for young dancers. One group routine, local competitions, foundation training.',
    commitmentLevel: 'recreational',
    order: 0,
  },
  {
    name: 'Junior',
    ageRange: 'Ages 9–13',
    description:
      'Intermediate competitors building advanced technique across multiple styles. Regional travel begins.',
    commitmentLevel: 'pre-competitive',
    order: 1,
  },
  {
    name: 'Senior',
    ageRange: 'Ages 14–18',
    description:
      'Advanced dancers preparing for collegiate, professional, or industry-level training. Conventions and out-of-state competition.',
    commitmentLevel: 'competitive',
    order: 2,
  },
]

const AWARDS: AwardSeed[] = [
  {
    title: 'Senior Lyrical Group',
    year: 2024,
    competition: 'KAR Nationals',
    placement: 'Platinum Award',
  },
  {
    title: 'Junior Jazz Line',
    year: 2024,
    competition: 'Showbiz Regionals',
    placement: '1st Place Overall',
  },
  {
    title: 'Studio Excellence Award',
    year: 2023,
    competition: 'Hollywood Vibe Las Vegas',
    placement: 'Studio Excellence Award',
  },
]

const SEO_DESCRIPTION =
  "The Project is Evolve Dance Center's competition team — serious training for serious dancers. Auditions held annually in May. Located in southwest Las Vegas."

let keyCounter = 0

function key(): string {
  keyCounter += 1
  return `k${keyCounter}`
}

function portableTextBlock(text: string) {
  return {
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [],
    children: [
      {
        _type: 'span' as const,
        _key: key(),
        text,
        marks: [] as string[],
      },
    ],
  }
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
    _id: 'theProject',
    _type: 'theProject',
    pageIntro: PAGE_INTRO_PARAGRAPHS.map(portableTextBlock),
    auditionInfo: {
      date: '2026-05-15T10:00:00.000Z',
      location: 'Evolve Dance Center (6070 S Rainbow Blvd, Las Vegas, NV)',
      ageRange: 'Ages 5–18',
      ctaText: 'Sign up for auditions',
      ctaLink: 'https://evolvedancecenter.com/contact',
    },
    teamLevels: TEAM_LEVELS.map((level) => ({
      _type: 'teamLevel',
      _key: key(),
      name: level.name,
      ageRange: level.ageRange,
      description: level.description,
      commitmentLevel: level.commitmentLevel,
      order: level.order,
    })),
    awards: AWARDS.map((award) => ({
      _type: 'award',
      _key: key(),
      title: award.title,
      year: award.year,
      competition: award.competition,
      placement: award.placement,
    })),
    seoDescription: SEO_DESCRIPTION,
  })

  console.log('Created theProject singleton in Sanity.')
  console.log(`  - pageIntro: ${PAGE_INTRO_PARAGRAPHS.length} paragraphs`)
  console.log(`  - teamLevels: ${TEAM_LEVELS.map((l) => l.name).join(', ')}`)
  console.log(`  - awards: ${AWARDS.length} entries`)
}

main().catch((error: unknown) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
