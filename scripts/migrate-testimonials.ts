import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type TestimonialSeed = {
  _id: string
  reviewerName: string
  rating: number
  reviewDate: string
  reviewText: string
  source: 'Google' | 'Facebook' | 'Yelp' | 'Direct'
  featured: boolean
  order: number
  published: boolean
}

const TESTIMONIALS: TestimonialSeed[] = [
  {
    _id: 'testimonial-donisha',
    reviewerName: 'Donisha K.',
    rating: 5,
    reviewDate: '2025-05-10',
    source: 'Google',
    featured: true,
    order: 1,
    published: true,
    reviewText:
      "Evolve Dance Center has changed my daughter's life in the best way. We first walked into Evolve January of 2023, it has just been about a year and a half since my daughter started dancing at this studio. Daisy has always danced but her progress since joining the studio has been amazing to witness. The dance teachers, owners, and staff really do care about the dancers and are very skilled in what they do! This will be my daughter's second year on the Competition Team and she has become more confident, brave, strong, and skilled in her movement!",
  },
  {
    _id: 'testimonial-linda',
    reviewerName: 'Linda L.',
    rating: 5,
    reviewDate: '2025-10-15',
    source: 'Google',
    featured: true,
    order: 2,
    published: true,
    reviewText:
      'My 5yo loves dance. A friend who used to teach here recommended Evolve and I gave them a try. My daughter was small, new, and shy. But one thing I really commend Evolve for is the girls here. Without any prompting, a few little girls decided to help my daughter. They hugged her, encouraged her, and immediately let her feel included. Throughout the last few weeks, my daughter has grown in confidence and she is loving it. The instructors are all amazing and the recital they put on at the end of the year is so fun too!',
  },
  {
    _id: 'testimonial-monica',
    reviewerName: 'Monica P.',
    rating: 5,
    reviewDate: '2025-06-20',
    source: 'Google',
    featured: true,
    order: 3,
    published: true,
    reviewText:
      'We love Evolve Dance Center! My daughter started taking classes here when she was 2, she just turned 9 and still absolutely loves it! The teachers are amazing and the front desk is always so helpful. The owners Meghan and Cheryl have always been so supportive! This will be her 5th year competing and we feel so fortunate to be with a studio that treats us like family!',
  },
  {
    _id: 'testimonial-brandi',
    reviewerName: 'Brandi S.',
    rating: 5,
    reviewDate: '2025-07-08',
    source: 'Google',
    featured: false,
    order: 4,
    published: true,
    reviewText:
      "We've been with Evolve Dance Center for two years now, and I can confidently say we love it! My 5-year-old daughter has thrived here, both in her skills and in her love for dance. The variety of classes keeps her excited and engaged, and she truly enjoys each of her teachers. The studio is well-organized and runs smoothly. We always know our schedule ahead of time, and the expectations and costs are clearly communicated from the start of the season.",
  },
  {
    _id: 'testimonial-altrease',
    reviewerName: 'Altrease T.',
    rating: 5,
    reviewDate: '2025-04-12',
    source: 'Google',
    featured: false,
    order: 5,
    published: true,
    reviewText:
      "My daughter Mackenzie loves this dance family. She danced for Evolve since the age of 4. The support she receives from her teachers is unmatched. Her confidence in dance has grown so much! Can't wait for the new dance season.",
  },
]

function loadEnvLocal(): void {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

async function main(): Promise<void> {
  loadEnvLocal()

  const token = process.env.SANITY_API_WRITE_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

  if (!token) {
    console.error('Missing SANITY_API_WRITE_TOKEN in .env.local')
    process.exit(1)
  }
  if (!projectId || !dataset) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })

  const transaction = client.transaction()

  for (const testimonial of TESTIMONIALS) {
    transaction.createOrReplace({
      _id: testimonial._id,
      _type: 'testimonial',
      reviewerName: testimonial.reviewerName,
      rating: testimonial.rating,
      reviewDate: testimonial.reviewDate,
      reviewText: testimonial.reviewText,
      source: testimonial.source,
      featured: testimonial.featured,
      order: testimonial.order,
      published: testimonial.published,
    })
  }

  await transaction.commit()

  const featuredCount = TESTIMONIALS.filter((t) => t.featured).length

  console.log(`Created ${TESTIMONIALS.length} testimonial documents in Sanity.`)
  console.log(`  - featured on homepage: ${featuredCount}`)
  for (const testimonial of TESTIMONIALS) {
    const flags = [
      testimonial.featured ? 'featured' : null,
      testimonial.published ? 'published' : 'draft',
    ]
      .filter(Boolean)
      .join(', ')
    console.log(
      `  - ${testimonial._id}: ${testimonial.reviewerName} (order ${testimonial.order}, ${flags})`,
    )
  }
}

main().catch((error: unknown) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
