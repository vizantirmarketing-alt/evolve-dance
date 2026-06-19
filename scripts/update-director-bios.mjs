#!/usr/bin/env node
/**
 * One-shot: replace Meghan and Cheryl's bios in Sanity with short
 * one-sentence versions for the faculty modal. Full bios live on /about.
 *
 * Usage: node scripts/update-director-bios.mjs
 */

import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

import { createClient } from '@sanity/client'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const BIOS = {
  'meghan-hoover':
    "BFA from the University of South Florida. Sixteen years teaching, six years as artistic director at Studio One's Southwest Dance Academy, five years dancing in Jubilee on the Las Vegas Strip.",
  'cheryl-snow':
    "BFA from UNLV, fifteen years teaching, choreography shown internationally and co-choreographed for Cirque du Soleil's Choreographers Showcase.",
}

function toPortableText(text) {
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).slice(2, 10),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).slice(2, 10),
          text,
          marks: [],
        },
      ],
    },
  ]
}

async function findBySlug(slug) {
  return client.fetch(
    `*[_type == "faculty" && slug.current == $slug][0]{_id, name}`,
    { slug }
  )
}

async function updateOne(slug, bioText) {
  const doc = await findBySlug(slug)
  if (!doc) {
    console.log(`  skip ${slug} (no doc in Sanity)`)
    return
  }
  await client
    .patch(doc._id)
    .set({ bio: toPortableText(bioText) })
    .commit()
  console.log(`  ✓ ${slug} bio updated`)
}

async function main() {
  console.log(`Updating director bios…\n`)
  for (const [slug, bio] of Object.entries(BIOS)) {
    try {
      await updateOne(slug, bio)
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`)
    }
  }
  console.log('\nDone.')
}

main()
