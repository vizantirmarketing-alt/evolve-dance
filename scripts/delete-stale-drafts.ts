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
})

const DRAFT_IDS = [
  'drafts.DJ1Y76QLqJX8nukZ8Co7ue',
  'drafts.BOAIKFRWNleR9aRm6Sfjm0',
]

const DRY_RUN = process.argv.includes('--dry-run')

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)

  for (const id of DRAFT_IDS) {
    if (DRY_RUN) {
      console.log(`→ would delete ${id}`)
      continue
    }
    try {
      await client.delete(id)
      console.log(`✓ deleted ${id}`)
    } catch (err) {
      console.error(`✗ ${id}:`, (err as Error).message)
    }
  }
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
