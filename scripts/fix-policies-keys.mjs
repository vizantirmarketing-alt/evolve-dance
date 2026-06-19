#!/usr/bin/env node
/**
 * One-off patch: add missing _key fields on policyPage.sections[] and nested
 * Portable Text (body blocks, spans, markDefs). Idempotent — safe to re-run.
 *
 * Usage: node scripts/fix-policies-keys.mjs
 */

import dotenv from 'dotenv'
import { randomUUID } from 'node:crypto'
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

function ensureKey(item) {
  if (item && typeof item === 'object' && !item._key) {
    item._key = randomUUID()
  }
  return item
}

function fixBlock(block) {
  if (!block || block._type !== 'block') return block

  ensureKey(block)

  if (Array.isArray(block.children)) {
    block.children = block.children.map((child) => ensureKey({ ...child }))
  }

  if (Array.isArray(block.markDefs)) {
    block.markDefs = block.markDefs.map((markDef) => ensureKey({ ...markDef }))
  }

  return block
}

function fixSection(section) {
  if (!section || typeof section !== 'object') return section

  const fixed = { ...section }
  ensureKey(fixed)

  if (Array.isArray(fixed.body)) {
    fixed.body = fixed.body.map((block) => fixBlock({ ...block }))
  }

  return fixed
}

function countMissingKeys(sections) {
  let missing = 0

  for (const section of sections ?? []) {
    if (!section?._key) missing++

    for (const block of section?.body ?? []) {
      if (!block?._key) missing++

      for (const child of block?.children ?? []) {
        if (!child?._key) missing++
      }

      for (const markDef of block?.markDefs ?? []) {
        if (!markDef?._key) missing++
      }
    }
  }

  return missing
}

async function main() {
  const doc = await client.fetch(`*[_type == "policyPage"][0]`)

  if (!doc) {
    console.log('No policyPage document found. Nothing to patch.')
    return
  }

  const sections = doc.sections ?? []
  const missingBefore = countMissingKeys(sections)

  if (missingBefore === 0) {
    console.log(`policyPage (${doc._id}): all keys present — nothing to patch.`)
    return
  }

  const fixedSections = sections.map((section) => fixSection(section))

  await client.patch(doc._id).set({ sections: fixedSections }).commit()

  const missingAfter = countMissingKeys(fixedSections)
  console.log(
    `✓ policyPage (${doc._id}) patched — ${missingBefore} missing _key(s) fixed` +
      (missingAfter === 0 ? '.' : ` (${missingAfter} still missing — inspect manually).`),
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
