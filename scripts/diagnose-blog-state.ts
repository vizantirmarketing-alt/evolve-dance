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
  perspective: 'raw',
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

async function main() {
  for (const slug of SLUGS) {
    console.log(`\n=== ${slug} ===`)

    // Find all documents (drafts + published) for this slug
    const docs = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug]{ _id, _rev, _updatedAt, published }`,
      { slug }
    )

    console.log(`  Found ${docs.length} document(s):`)
    docs.forEach((d: any) => {
      const isDraft = d._id.startsWith('drafts.')
      console.log(`    - ${d._id} | ${isDraft ? 'DRAFT' : 'PUBLISHED'} | published field: ${d.published} | updated: ${d._updatedAt}`)
    })

    // For each doc, show first paragraph of body for comparison
    const fullDocs = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug]{ _id, body }`,
      { slug }
    )

    fullDocs.forEach((d: any) => {
      const firstPara = d.body?.find((b: any) => b._type === 'block' && b.style === 'normal')
      if (firstPara) {
        const text = firstPara.children?.map((c: any) => c.text || '').join('') || ''
        console.log(`    ${d._id} first paragraph: "${text.slice(0, 120)}..."`)
      }
    })
  }
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
