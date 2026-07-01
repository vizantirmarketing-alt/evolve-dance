import { createClient, type SanityClient } from '@sanity/client'
import { config } from 'dotenv'
import { execSync } from 'node:child_process'
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

const VIDEOS_DIR = path.join(os.homedir(), 'Desktop', 'Projects', 'evolve-dance-gallery')
const SINGLETON_ID = 'studioVideos'

const CATEGORIES = ['class', 'rehearsal', 'performance', 'behind-the-scenes'] as const
type VideoCategory = (typeof CATEGORIES)[number]

const videos = [
  {
    filename: 'studio-spring-break-rehearsal.mp4',
    title: 'Spring Break Rehearsals',
    category: 'rehearsal' as const,
    caption: '', // fill in through Studio
  },
  {
    filename: 'studio-season-9-dress-rehearsal.mp4',
    title: 'Season 9 Dress Rehearsal',
    category: 'rehearsal' as const,
    caption: '', // fill in through Studio
  },
  {
    filename: 'studio-ballet-plus-training.mp4',
    title: 'Ballet Plus Training',
    category: 'class' as const,
    caption: '', // fill in through Studio
  },
  {
    filename: 'studio-holiday-open-house.mp4',
    title: 'Holiday Open House',
    category: 'behind-the-scenes' as const,
    caption: '', // fill in through Studio
  },
] satisfies {
  filename: string
  title: string
  category: VideoCategory
  caption: string
}[]

type StudioVideoEntry = {
  _key: string
  _type: 'studioVideo'
  video: {
    _type: 'file'
    asset: {
      _type: 'reference'
      _ref: string
    }
  }
  poster: {
    _type: 'image'
    asset: {
      _type: 'reference'
      _ref: string
    }
  }
  title: string
  caption: string
  category: VideoCategory
}

function checkFfmpeg(): void {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' })
  } catch {
    console.error(
      'ffmpeg not found.\n' +
        'Install ffmpeg and ensure it is on your PATH before running this script.\n' +
        '  macOS: brew install ffmpeg'
    )
    process.exit(1)
  }
}

function posterPathForVideo(videoFilename: string): string {
  const base = videoFilename.replace(/\.mp4$/i, '')
  return path.join(VIDEOS_DIR, `${base}-poster.jpg`)
}

function extractPoster(videoPath: string, posterPath: string): void {
  execSync(`ffmpeg -ss 00:00:02 -i "${videoPath}" -vframes 1 -q:v 2 "${posterPath}"`, {
    stdio: 'inherit',
  })
}

function ensurePoster(videoFilename: string, videoPath: string): string {
  const posterPath = posterPathForVideo(videoFilename)

  if (!fs.existsSync(posterPath)) {
    console.log(`Extracting poster for ${videoFilename}...`)
    extractPoster(videoPath, posterPath)
  }

  return posterPath
}

async function uploadVideo(filePath: string, filename: string): Promise<string> {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('file', buffer, {
    filename,
    contentType: 'video/mp4',
  })
  return asset._id
}

async function uploadPoster(filePath: string, filename: string): Promise<string> {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, { filename })
  return asset._id
}

function videoKey(filename: string): string {
  return filename.replace(/\.mp4$/i, '')
}

async function main() {
  checkFfmpeg()

  if (!fs.existsSync(VIDEOS_DIR)) {
    console.error(`Videos directory not found: ${VIDEOS_DIR}`)
    process.exit(1)
  }

  await client.createIfNotExists({
    _id: SINGLETON_ID,
    _type: 'studioVideos',
    title: 'Studio Videos',
    videos: [],
  })

  const existing = await client.fetch<{ videos?: { title?: string }[] } | null>(
    `*[_id == $id][0]{ videos[]{ title } }`,
    { id: SINGLETON_ID }
  )
  const existingTitles = new Set(
    (existing?.videos ?? []).map((entry) => entry.title).filter(Boolean)
  )

  let uploaded = 0
  let skipped = 0

  for (const video of videos) {
    if (existingTitles.has(video.title)) {
      console.log(`Skipping ${video.filename} — already in Sanity: ${video.title}`)
      skipped++
      continue
    }

    const videoPath = path.join(VIDEOS_DIR, video.filename)
    if (!fs.existsSync(videoPath)) {
      console.error(`Video file not found: ${videoPath}`)
      process.exit(1)
    }

    const posterPath = ensurePoster(video.filename, videoPath)

    console.log(`Uploading ${video.filename}...`)

    const videoAssetId = await uploadVideo(videoPath, video.filename)
    const posterAssetId = await uploadPoster(posterPath, path.basename(posterPath))

    const newEntry: StudioVideoEntry = {
      _key: videoKey(video.filename),
      _type: 'studioVideo',
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAssetId,
        },
      },
      poster: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: posterAssetId,
        },
      },
      title: video.title,
      caption: video.caption,
      category: video.category,
    }

    await client
      .patch(SINGLETON_ID)
      .setIfMissing({ videos: [] })
      .append('videos', [newEntry])
      .commit()

    console.log(`Added to Sanity: ${video.title}`)
    uploaded++
  }

  console.log('')
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped (already present): ${skipped}`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
