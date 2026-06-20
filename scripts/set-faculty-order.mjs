#!/usr/bin/env node
/**
 * Set faculty `order` field for one or more members by slug.
 * Patches only `order` — no schema or republish changes.
 *
 * Usage:
 *   node scripts/set-faculty-order.mjs <slug>:<order> [<slug>:<order> ...]
 *
 * Examples:
 *   node scripts/set-faculty-order.mjs eric-lehn:200 ryan-trotman:120
 *   node scripts/set-faculty-order.mjs meghan-hoover:5
 *   node scripts/set-faculty-order.mjs alannah-newcomer:100 alejandro-domingo:110 cheryl-snow:20
 */

import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

import { createClient } from '@sanity/client'

const USAGE = `Usage: node scripts/set-faculty-order.mjs <slug>:<order> [<slug>:<order> ...]

Examples:
  node scripts/set-faculty-order.mjs eric-lehn:200 ryan-trotman:120
  node scripts/set-faculty-order.mjs meghan-hoover:5
  node scripts/set-faculty-order.mjs alannah-newcomer:100 alejandro-domingo:110 cheryl-snow:20`

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

const FACULTY_QUERY = `*[_type == "faculty" && published == true && slug.current in $slugs]{
  _id,
  name,
  "slug": slug.current,
  order
}`

function parseArgs(argv) {
  const args = argv.slice(2)
  if (args.length === 0) {
    console.error(USAGE)
    process.exit(1)
  }

  const pairs = []
  for (const arg of args) {
    const parts = arg.split(':')
    if (parts.length !== 2) {
      console.error(`Invalid argument: ${arg}`)
      console.error(USAGE)
      process.exit(1)
    }
    const [slug, orderStr] = parts
    if (!slug) {
      console.error(`Invalid argument (empty slug): ${arg}`)
      console.error(USAGE)
      process.exit(1)
    }
    const order = Number(orderStr)
    if (!Number.isInteger(order) || order <= 0) {
      console.error(`Invalid order for ${slug}: must be a positive integer`)
      console.error(USAGE)
      process.exit(1)
    }
    pairs.push({ slug, order })
  }
  return pairs
}

function logFaculty(label, members) {
  console.log(`\n${label}:`)
  for (const m of members) {
    console.log(`  ${m.name} (${m.slug})  _id=${m._id}  order=${m.order}`)
  }
}

async function fetchFaculty(slugs) {
  const results = await client.fetch(FACULTY_QUERY, { slugs })
  return Object.fromEntries(results.map((r) => [r.slug, r]))
}

async function main() {
  const targets = parseArgs(process.argv)
  const slugs = targets.map((t) => t.slug)

  const bySlug = await fetchFaculty(slugs)

  for (const { slug } of targets) {
    if (!bySlug[slug]) {
      console.error(`not found: ${slug}`)
      process.exit(1)
    }
  }

  const before = targets.map((t) => bySlug[t.slug])
  logFaculty('Before', before)

  let tx = client.transaction()
  for (const { slug, order } of targets) {
    tx = tx.patch(bySlug[slug]._id, { set: { order } })
  }
  await tx.commit()

  console.log('\nTransaction committed.')

  const afterBySlug = await fetchFaculty(slugs)
  const after = targets.map((t) => afterBySlug[t.slug])
  logFaculty('After', after)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
