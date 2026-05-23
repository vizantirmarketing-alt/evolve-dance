import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { writeFileSync, mkdirSync } from 'fs'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
  perspective: 'published',
})

const SLUGS = [
  'how-to-choose-a-dance-studio-las-vegas',
  'what-age-should-child-start-dance-classes',
  'dance-classes-southwest-las-vegas',
  'best-dance-classes-toddlers-las-vegas',
  'how-to-pick-dance-style-for-child',
  'dance-class-cost-las-vegas',
  'recreational-vs-competition-team-dance',
  'dance-studio-flooring-sprung-marley',
]

interface Block {
  _type: string
  _key: string
  style?: string
  children?: Array<{ text?: string }>
}

function blockToText(b: Block): string {
  if (b._type !== 'block' || !b.children) return ''
  return b.children.map((c) => c.text || '').join('')
}

async function main() {
  mkdirSync('scripts/blog-current-state', { recursive: true })

  for (const slug of SLUGS) {
    const post = await client.fetch<{ _id: string; title: string; body: Block[] } | null>(
      `*[_type == "blogPost" && slug.current == $slug && published == true][0]{ _id, title, body }`,
      { slug }
    )

    if (!post) {
      console.error(`✗ ${slug}: not found`)
      continue
    }

    const lines: string[] = []
    lines.push(`# ${post.title}`)
    lines.push(`Slug: ${slug}`)
    lines.push(`ID: ${post._id}`)
    lines.push('')

    post.body.forEach((block, i) => {
      const text = blockToText(block)
      if (!text) return
      const style = block.style || 'normal'
      lines.push(`---`)
      lines.push(`[block ${i}] style=${style}`)
      lines.push(text)
      lines.push('')
    })

    writeFileSync(`scripts/blog-current-state/${slug}.md`, lines.join('\n'), 'utf-8')
    console.log(`✓ Dumped ${slug} (${post.body.length} blocks)`)
  }

  console.log('\nDone. Files written to scripts/blog-current-state/')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
