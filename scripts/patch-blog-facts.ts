import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
  perspective: 'published',
})

const DRY_RUN = process.argv.includes('--dry-run')

interface ParagraphEdit {
  match: string
  replace: string
  reason: string
}

interface PostPatches {
  slug: string
  patches: ParagraphEdit[]
}

const POST_PATCHES: PostPatches[] = [
  // ====================== POST 1: How to Choose ======================
  {
    slug: 'how-to-choose-a-dance-studio-las-vegas',
    patches: [
      // FACT: Lobby TV broadcasts studios 1-4 only, viewing windows 1-5 (per Wix policies)
      // and parents are NOT allowed to sit in class — must observe via window or monitor
      {
        match: 'Can parents see what is happening in class',
        replace: 'Can parents watch dance class',
        reason: 'AEO question phrasing fix',
      },
    ],
  },

  // ====================== POST 2: What Age ======================
  {
    slug: 'what-age-should-child-start-dance-classes',
    patches: [
      // SEO: Strengthen "what age" mentions
      {
        match: 'The honest answer to "what age should my child start dance classes?" is: it depends on your child',
        replace: 'The honest answer to "what age should my child start dance classes" is: it depends on your child. What age to start dance classes varies kid to kid',
        reason: 'SEO: strengthen "what age" primary keyword',
      },
    ],
  },

  // ====================== POST 3: Southwest Las Vegas ======================
  {
    slug: 'dance-classes-southwest-las-vegas',
    patches: [],
  },

  // ====================== POST 4: Toddler ======================
  {
    slug: 'best-dance-classes-toddlers-las-vegas',
    patches: [
      // SEO: Add explicit "3 year old" phrasing somewhere natural
      {
        match: 'Three- and four-year-olds in dance classes can pay attention for 45 minutes',
        replace: 'Three- and four-year-olds in dance classes can pay attention for 45 minutes. Dance classes for 3 year olds and 4 year olds focus on real movement vocabulary',
        reason: 'SEO: add "3 year old" keyword variant',
      },
    ],
  },

  // ====================== POST 5: Dance Styles ======================
  {
    slug: 'how-to-pick-dance-style-for-child',
    patches: [],
  },

  // ====================== POST 6: Cost ======================
  {
    slug: 'dance-class-cost-las-vegas',
    patches: [],
  },

  // ====================== POST 7: Rec vs Competition ======================
  {
    slug: 'recreational-vs-competition-team-dance',
    patches: [
      // SEO: Las Vegas only appears 1x — add a natural second mention
      {
        match: 'Evolve Dance Center runs full recreational dance programs alongside The Project',
        replace: 'Evolve Dance Center in Las Vegas runs full recreational dance programs alongside The Project',
        reason: 'SEO: add Las Vegas mention (was only 1x)',
      },
    ],
  },

  // ====================== POST 8: Flooring ======================
  {
    slug: 'dance-studio-flooring-sprung-marley',
    patches: [
      {
        match: 'Every room at Evolve Dance Center has raised wood subflooring topped with marley vinyl. Six rooms, no exceptions. Our Las Vegas dance studio invested in proper sprung floors',
        replace: 'Every room at Evolve Dance Center has raised wood subflooring topped with marley vinyl for shock absorption. Six rooms, no exceptions. Our Southwest Las Vegas dance studio invested in proper sprung floors',
        reason: 'SEO: add "shock absorption" (was 0x) and "Southwest Las Vegas" local signal',
      },
    ],
  },
]

interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  children?: PortableTextSpan[]
  markDefs?: unknown[]
  [key: string]: unknown
}

function getBlockPlainText(block: PortableTextBlock): string {
  if (!Array.isArray(block.children)) return ''
  return block.children.map((c) => c.text || '').join('')
}

function replaceBlockText(block: PortableTextBlock, newText: string): PortableTextBlock {
  return {
    ...block,
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).slice(2, 10),
        text: newText,
        marks: [],
      },
    ],
    markDefs: [],
  }
}

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`)

  let totalApplied = 0
  let totalMissed = 0

  for (const postConfig of POST_PATCHES) {
    if (postConfig.patches.length === 0) {
      console.log(`→ ${postConfig.slug}: no patches needed, skipping`)
      continue
    }

    const post = await client.fetch<{ _id: string; body: PortableTextBlock[] } | null>(
      `*[_type == "blogPost" && slug.current == $slug && published == true][0]{ _id, body }`,
      { slug: postConfig.slug }
    )

    if (!post) {
      console.error(`✗ ${postConfig.slug}: not found`)
      continue
    }

    let appliedCount = 0
    const newBody = post.body.map((block) => {
      if (block._type !== 'block' || !block.children) return block
      const text = getBlockPlainText(block)
      const patch = postConfig.patches.find((p) => text.includes(p.match))
      if (!patch) return block
      appliedCount += 1
      const newText = text.replace(patch.match, patch.replace)
      return replaceBlockText(block, newText)
    })

    // Report misses
    let missedCount = 0
    for (const patch of postConfig.patches) {
      const found = post.body.some(
        (b) => b._type === 'block' && getBlockPlainText(b).includes(patch.match)
      )
      if (!found) {
        missedCount += 1
        console.warn(`  ⚠ no match for: "${patch.match.slice(0, 60)}..." — reason: ${patch.reason}`)
      }
    }

    totalApplied += appliedCount
    totalMissed += missedCount

    if (DRY_RUN) {
      console.log(`→ ${postConfig.slug}: would apply ${appliedCount}/${postConfig.patches.length} patches (${missedCount} misses)`)
      continue
    }

    try {
      await client.patch(post._id).set({ body: newBody }).commit()
      console.log(`✓ ${postConfig.slug}: ${appliedCount}/${postConfig.patches.length} patches applied`)
    } catch (err) {
      console.error(`✗ ${postConfig.slug}: ${(err as Error).message}`)
    }
  }

  console.log(`\nTotal: ${totalApplied} applied, ${totalMissed} missed`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
