#!/usr/bin/env node
/**
 * One-off cleanup: remove auto-generated hotspot from all faculty photos.
 *
 * The seed script uploaded images via the API which set a default
 * hotspot of {x: 0.5, y: 0.5} on every document. That defeats the
 * component's 50%/25% fallback positioning. This script unsets the
 * hotspot field on every faculty document so the fallback applies.
 *
 * After running, any editor can still set a per-person hotspot from
 * Sanity Studio — it will override the component fallback as intended.
 *
 * Usage: node scripts/clear-faculty-hotspots.mjs
 */

import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

async function main() {
  const docs = await client.fetch(
    `*[_type == "faculty" && defined(photo.hotspot)]{_id, name, "hotspot": photo.hotspot}`
  )

  if (docs.length === 0) {
    console.log('No faculty documents have hotspots to clear. Nothing to do.')
    return
  }

  console.log(`Clearing hotspots from ${docs.length} faculty documents…\n`)

  for (const doc of docs) {
    try {
      await client
        .patch(doc._id)
        .unset(['photo.hotspot', 'photo.crop'])
        .commit({ autoGenerateArrayKeys: true })
      console.log(`  ✓ ${doc.name} — hotspot cleared`)
    } catch (err) {
      console.error(`  ✗ ${doc.name}: ${err.message}`)
    }
  }

  console.log('\nDone. Refresh /faculty — fallback positioning (50%/25%) now applies.')
}

main()
