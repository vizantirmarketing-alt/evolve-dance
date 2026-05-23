/**
 * Batch-create Evolve Dance Center blog posts as drafts in Sanity.
 *
 * Usage:
 *   npm run migrate:blog          (live)
 *   npm run migrate:blog:dry      (preview without writing)
 *
 * Reads markdown files from scripts/blog-drafts/.
 * Each file has YAML frontmatter (title, slug, excerpt, seoDescription, tags, publishedAt)
 * followed by markdown body content.
 *
 * Creates each post with:
 *   - published: false (draft, hidden from website)
 *   - featured: false
 *   - No coverImage (added manually in Sanity Studio before publishing)
 *   - No categories (added manually in Sanity Studio)
 *   - Body converted from markdown to Portable Text blocks
 *
 * If a post with the same slug already exists, it is skipped (idempotent).
 */

import { createClient } from '@sanity/client'
import { readFileSync, readdirSync } from 'fs'
import { join, resolve } from 'path'
import matter from 'gray-matter'
import * as dotenv from 'dotenv'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_VERSION || !SANITY_WRITE_TOKEN) {
  console.error('Missing required env vars. Need: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
})

interface PostFrontmatter {
  title: string
  slug: string
  excerpt: string
  seoDescription: string
  tags: string[]
  publishedAt: string
}

interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: 'normal' | 'h2' | 'h3' | 'blockquote'
  children: PortableTextSpan[]
  markDefs: Array<{ _key: string; _type: string; href?: string }>
  listItem?: 'bullet' | 'number'
  level?: number
}

let keyCounter = 0
function genKey(): string {
  keyCounter += 1
  return `k${Date.now().toString(36)}${keyCounter}`
}

/**
 * Convert markdown text to Portable Text blocks.
 * Handles: paragraphs, h2, h3, bullet/numbered lists, links, bold, italic.
 */
function markdownToPortableText(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = []
  const lines = markdown.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push(makeTextBlock(line.slice(4).trim(), 'h3'))
      i += 1
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push(makeTextBlock(line.slice(3).trim(), 'h2'))
      i += 1
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push(makeTextBlock(line.slice(2).trim(), 'h2'))
      i += 1
      continue
    }

    if (/^[-*]\s/.test(line)) {
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        const text = lines[i].replace(/^[-*]\s/, '').trim()
        blocks.push({
          ...makeTextBlock(text, 'normal'),
          listItem: 'bullet',
          level: 1,
        })
        i += 1
      }
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s/, '').trim()
        blocks.push({
          ...makeTextBlock(text, 'normal'),
          listItem: 'number',
          level: 1,
        })
        i += 1
      }
      continue
    }

    if (/^---+$/.test(line.trim())) {
      i += 1
      continue
    }

    const paragraphLines: string[] = [line]
    i += 1
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('#') &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i])
      i += 1
    }
    blocks.push(makeTextBlock(paragraphLines.join(' ').trim(), 'normal'))
  }

  return blocks
}

function makeTextBlock(
  text: string,
  style: 'normal' | 'h2' | 'h3' | 'blockquote'
): PortableTextBlock {
  const children: PortableTextSpan[] = []
  const markDefs: Array<{ _key: string; _type: string; href?: string }> = []

  const pattern = /\[([^\]]+)\]\(([^)]+)\)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|([^[*]+)/g
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    const linkText = match[1]
    const linkUrl = match[2]
    const boldText = match[4]
    const italicText = match[6]
    const plainText = match[7]

    if (linkText && linkUrl) {
      const markKey = genKey()
      markDefs.push({ _key: markKey, _type: 'link', href: linkUrl })
      children.push({
        _type: 'span',
        _key: genKey(),
        text: linkText,
        marks: [markKey],
      })
    } else if (boldText) {
      children.push({
        _type: 'span',
        _key: genKey(),
        text: boldText,
        marks: ['strong'],
      })
    } else if (italicText) {
      children.push({
        _type: 'span',
        _key: genKey(),
        text: italicText,
        marks: ['em'],
      })
    } else if (plainText) {
      children.push({
        _type: 'span',
        _key: genKey(),
        text: plainText,
        marks: [],
      })
    }
  }

  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: genKey(),
      text,
      marks: [],
    })
  }

  return {
    _type: 'block',
    _key: genKey(),
    style,
    children,
    markDefs,
  }
}

async function main() {
  const draftsDir = resolve(process.cwd(), 'scripts/blog-drafts')
  const files = readdirSync(draftsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  if (files.length === 0) {
    console.error(`No markdown files found in ${draftsDir}`)
    process.exit(1)
  }

  console.log(`Found ${files.length} markdown files in ${draftsDir}`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`)
  console.log(`Dataset: ${SANITY_DATASET}`)
  console.log('')

  let created = 0
  let skipped = 0
  let failed = 0

  for (const filename of files) {
    const filepath = join(draftsDir, filename)
    const raw = readFileSync(filepath, 'utf-8')
    const { data, content } = matter(raw)
    const fm = data as PostFrontmatter

    if (!fm.title || !fm.slug || !fm.publishedAt) {
      console.error(`✗ ${filename}: missing required frontmatter (title, slug, publishedAt)`)
      failed += 1
      continue
    }

    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug: fm.slug }
    )

    if (existing) {
      console.log(`⊘ ${filename}: post with slug "${fm.slug}" already exists, skipping`)
      skipped += 1
      continue
    }

    const body = markdownToPortableText(content)

    const doc = {
      _type: 'blogPost',
      title: fm.title,
      slug: { _type: 'slug', current: fm.slug },
      publishedAt: fm.publishedAt,
      excerpt: fm.excerpt || undefined,
      seoDescription: fm.seoDescription || undefined,
      tags: fm.tags || [],
      body,
      featured: false,
      published: false,
    }

    if (DRY_RUN) {
      console.log(`→ ${filename}: would create draft "${fm.title}" (${body.length} blocks)`)
      created += 1
      continue
    }

    try {
      const result = await client.create(doc)
      console.log(`✓ ${filename}: created draft ${result._id} ("${fm.title}")`)
      created += 1
    } catch (err) {
      console.error(`✗ ${filename}: failed to create:`, (err as Error).message)
      failed += 1
    }
  }

  console.log('')
  console.log(`Summary: ${created} ${DRY_RUN ? 'would be created' : 'created'}, ${skipped} skipped, ${failed} failed`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
