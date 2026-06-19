#!/usr/bin/env node
/**
 * Update existing faculty docs in Sanity with new headshot images.
 * Iterates JPGs in scripts/data/headshots/, derives slug from filename,
 * finds the doc by slug, uploads the new image, and patches the photo field.
 *
 * Usage: node scripts/update-faculty-photos.mjs
 */

import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

import { createClient } from '@sanity/client'
import fs from 'node:fs'

const HEADSHOTS_DIR = path.join(__dirname, 'data', 'headshots')

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

async function findBySlug(slug) {
  return client.fetch(
    `*[_type == "faculty" && slug.current == $slug][0]{_id, name}`,
    { slug }
  )
}

async function updateOne(filePath, filename) {
  const slug = filename.replace(/\.jpg$/, '')
  const doc = await findBySlug(slug)

  if (!doc) {
    console.log(`  skip ${slug} (no doc in Sanity)`)
    return
  }

  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, { filename })

  await client
    .patch(doc._id)
    .set({
      photo: {
        _type: 'image',
        alt: doc.name,
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .unset(['photo.hotspot', 'photo.crop'])
    .commit()

  console.log(`  ✓ ${slug} → new asset ${asset._id}`)
}

async function main() {
  const files = fs
    .readdirSync(HEADSHOTS_DIR)
    .filter((f) => f.endsWith('.jpg'))
    .sort()

  console.log(`Updating photos for ${files.length} faculty members…\n`)

  for (const filename of files) {
    try {
      await updateOne(path.join(HEADSHOTS_DIR, filename), filename)
    } catch (err) {
      console.error(`  ✗ ${filename}: ${err.message}`)
    }
  }

  console.log('\nDone.')
}

main()
