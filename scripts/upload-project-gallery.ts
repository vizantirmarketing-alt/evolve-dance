import { createClient, type SanityClient } from '@sanity/client'
import { config } from 'dotenv'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

config({ path: '.env.local' })

const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN?.trim()
if (!WRITE_TOKEN) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN.\n' +
      'Add a Sanity API token with Editor (write) access to .env.local:\n' +
      '  SANITY_API_WRITE_TOKEN=your_token_here\n' +
      'Create one at https://www.sanity.io/manage → Project → API → Tokens'
  )
  process.exit(1)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  console.error(
    'Missing Sanity env vars. Ensure .env.local defines:\n' +
      '  NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      '  NEXT_PUBLIC_SANITY_DATASET\n' +
      '  NEXT_PUBLIC_SANITY_API_VERSION'
  )
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: WRITE_TOKEN,
  useCdn: false,
})

const GALLERY_DIR = path.join(os.homedir(), 'Desktop', 'Projects', 'evolve-dance-gallery')
const SINGLETON_ID = 'projectGallery'

const CATEGORIES = ['audition', 'class', 'studio', 'masterclass', 'team'] as const
type GalleryCategory = (typeof CATEGORIES)[number]

const altMap: Record<string, string> = {
  'audition-leap-red-top': 'Dancer mid-leap in a red top during audition day',
  'audition-passe-pink': 'Dancer holding a passé in pink at audition',
  'audition-leopard-wall': 'Dancer posing against the leopard-print wall at audition',
  'audition-blue-technique': 'Technique work in blue at audition',
  'audition-young-mini': 'Young dancer at mini audition',
  'class-hip-hop-unison': 'Hip-hop class in unison',
  'class-unison-pose': 'Class holding a unison pose',
  'studio-leap-wall-logo': 'Dancer leaping in front of the studio wall logo',
  'masterclass-choreographer-energy': 'Choreographer leading masterclass with full energy',
  'team-group-masterclass-1': 'Team group shot after masterclass',
  'team-group-masterclass-2': 'Team group shot after masterclass',
}

type GalleryPhoto = {
  _key: string
  _type: 'galleryPhoto'
  image: {
    _type: 'image'
    asset: {
      _type: 'reference'
      _ref: string
    }
  }
  alt: string
  category: GalleryCategory
}

function parseCategory(filename: string): { category: GalleryCategory; basename: string } {
  const basename = filename.replace(/\.jpg$/i, '')
  const category = basename.split('-')[0]

  if (!CATEGORIES.includes(category as GalleryCategory)) {
    throw new Error(`Unrecognized category prefix "${category}" in ${filename}`)
  }

  return { category: category as GalleryCategory, basename }
}

function cleanedSlug(basename: string, category: GalleryCategory): string {
  const prefix = `${category}-`
  return basename.startsWith(prefix) ? basename.slice(prefix.length) : basename
}

function sentenceCase(slug: string): string {
  const words = slug.replace(/-/g, ' ').trim()
  if (!words) return ''
  return words.charAt(0).toUpperCase() + words.slice(1)
}

function generateAlt(basename: string, category: GalleryCategory): string {
  if (altMap[basename]) {
    return altMap[basename]
  }

  return sentenceCase(cleanedSlug(basename, category))
}

async function uploadImage(filePath: string, filename: string): Promise<string> {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, { filename })
  return asset._id
}

async function buildGalleryPhoto(filePath: string, filename: string): Promise<GalleryPhoto> {
  const { category, basename } = parseCategory(filename)
  const assetId = await uploadImage(filePath, filename)

  return {
    _key: basename,
    _type: 'galleryPhoto',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId,
      },
    },
    alt: generateAlt(basename, category),
    category,
  }
}

async function patchSingleton(newPhotos: GalleryPhoto[]): Promise<number> {
  const existing = await client.fetch<{ _id?: string; photos?: GalleryPhoto[] } | null>(
    `*[_id == $id][0]{ _id, photos }`,
    { id: SINGLETON_ID }
  )

  if (!existing) {
    await client.create({
      _id: SINGLETON_ID,
      _type: 'projectGallery',
      title: 'Project Gallery',
      photos: newPhotos,
    })
    return newPhotos.length
  }

  const existingPhotos = existing.photos ?? []

  if (existingPhotos.length === 0) {
    await client.patch(SINGLETON_ID).set({ photos: newPhotos }).commit()
    return newPhotos.length
  }

  const mergedPhotos = [...existingPhotos, ...newPhotos]
  await client.patch(SINGLETON_ID).set({ photos: mergedPhotos }).commit()
  return mergedPhotos.length
}

async function main() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(`Gallery directory not found: ${GALLERY_DIR}`)
    process.exit(1)
  }

  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => file.toLowerCase().endsWith('.jpg'))
    .sort()

  if (files.length === 0) {
    console.error(`No .jpg files found in ${GALLERY_DIR}`)
    process.exit(1)
  }

  console.log(`Uploading ${files.length} photos from ${GALLERY_DIR}\n`)

  const newPhotos: GalleryPhoto[] = []

  for (const filename of files) {
    const filePath = path.join(GALLERY_DIR, filename)
    const { category } = parseCategory(filename)
    const photo = await buildGalleryPhoto(filePath, filename)
    newPhotos.push(photo)
    console.log(`✓ uploaded: ${filename} → ${category}`)
  }

  const totalInGallery = await patchSingleton(newPhotos)

  console.log('')
  console.log(`Uploaded: ${newPhotos.length}`)
  console.log(`Total in gallery after patch: ${totalInGallery}`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
