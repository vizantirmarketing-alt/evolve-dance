import { createClient } from '@sanity/client'
import { config } from 'dotenv'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const DRY_RUN = process.argv.includes('--dry-run')

async function main() {
  const posts = await client.fetch<Array<{ _id: string; title: string; published: boolean }>>(
    '*[_type == "blogPost"]{ _id, title, published }'
  )

  console.log(`Found ${posts.length} blogPost documents`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log('')

  // Safety check
  const published = posts.filter((p) => p.published === true)
  if (published.length > 0) {
    console.error('ABORT: published posts found, will not delete:')
    published.forEach((p) => console.error(`  - ${p._id}: ${p.title}`))
    process.exit(1)
  }

  for (const post of posts) {
    if (DRY_RUN) {
      console.log(`→ would delete ${post._id}: "${post.title}"`)
      continue
    }
    try {
      await client.delete(post._id)
      console.log(`✓ deleted ${post._id}: "${post.title}"`)
    } catch (err) {
      console.error(`✗ failed to delete ${post._id}:`, (err as Error).message)
    }
  }

  console.log('')
  console.log(`Done. ${DRY_RUN ? 'No changes made.' : 'All unpublished posts deleted.'}`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
