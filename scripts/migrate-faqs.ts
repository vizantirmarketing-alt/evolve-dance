import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type FaqSeed = {
  question: string
  answer: string
  category: 'Enrollment' | 'Classes' | 'Competition' | 'Performance' | 'Policies' | 'Studio'
  order: number
  published: boolean
  seoDescription: string
}

const FAQS: FaqSeed[] = [
  {
    question: 'What age can my child start dance classes at Evolve Dance Center?',
    answer: 'Evolve Dance Center welcomes dancers ages 18 months through 18 years at our Las Vegas studio. Our youngest dance classes are designed for toddlers to explore movement with a parent, while independent classes start at age 3. We offer age-appropriate dance classes in ballet, jazz, tap, hip hop, contemporary, and acro for every stage — whether your child is taking their first dance class or already training for competition.',
    category: 'Enrollment',
    order: 1,
    published: false,
    seoDescription: 'At what age can kids start dance classes in Las Vegas? Evolve Dance Center accepts dancers ages 18 months to 18 years. Trial class available.',
  },
  {
    question: 'What do dancers wear to class at Evolve?',
    answer: 'Evolve Dance Center follows a dress code that varies by class style. Ballet classes require a leotard, tights, and ballet shoes. Jazz and contemporary classes need form-fitting dancewear and proper jazz shoes. Tap classes require tap shoes. Hip hop is more relaxed but still requires athletic clothing and clean indoor shoes. Hair must be pulled back and out of the face for every class. We send the full dress code by class style at enrollment, and dancewear can be purchased from any major Las Vegas dance retailer.',
    category: 'Classes',
    order: 2,
    published: false,
    seoDescription: 'Dance class dress code at Evolve Dance Center in Las Vegas. Ballet, jazz, tap, hip hop attire and shoe requirements.',
  },
  {
    question: 'Can parents watch dance classes at Evolve?',
    answer: 'Yes — Evolve Dance Center has viewing monitors in our Las Vegas studio lobby where parents can watch dance classes in real time. Parents aren\'t permitted inside the studio rooms during class to keep dancers focused, but the monitor system lets families see what their child is learning each week. Parents, siblings, and family members are always welcome in our lobby during all class times.',
    category: 'Studio',
    order: 3,
    published: false,
    seoDescription: 'Can parents watch dance classes at Evolve Dance Center? Yes — viewing monitors in our Las Vegas studio lobby show classes live.',
  },
  {
    question: 'How many dance classes per week should my child take?',
    answer: 'For most beginner dancers, one class per week is the right starting point at Evolve Dance Center. As young dancers in Las Vegas develop interest and confidence, many add a second class — ballet pairs especially well with jazz, contemporary, or hip hop. Dancers serious about competition or performance typically train across three to five classes per week. Our instructors are happy to recommend the right class load based on your child\'s age, goals, and schedule.',
    category: 'Classes',
    order: 4,
    published: false,
    seoDescription: 'How many dance classes per week should my child take? Evolve Dance Center recommends one class for beginners, more for competitive dancers.',
  },
  {
    question: 'How much do dance classes cost at Evolve Dance Center?',
    answer: 'Tuition at Evolve Dance Center is billed monthly and depends on how many dance classes per week your child takes. In addition to tuition, families should plan for a one-time registration fee at enrollment, costume fees for the year-end concert, a concert production fee, and required dance shoes and basic dancewear. We provide a full cost breakdown at registration so there are no surprises. Evolve offers competitive pricing for Las Vegas dance studios while maintaining premium instruction quality.',
    category: 'Enrollment',
    order: 5,
    published: false,
    seoDescription: 'How much do dance classes cost at Evolve Dance Center in Las Vegas? Monthly tuition plus registration, costume, and concert fees.',
  },
  {
    question: 'Does my child have to perform in the year-end dance concert?',
    answer: 'The year-end concert is one of the highlights of training at Evolve Dance Center — most Las Vegas dance families look forward to seeing their dancers perform on stage. Concert participation is optional but strongly encouraged. If your family decides to skip the concert, let us know early so we can adjust choreography and costume orders. Costume and concert fees apply only to participating dancers.',
    category: 'Performance',
    order: 6,
    published: false,
    seoDescription: 'Is the year-end dance concert required at Evolve Dance Center? Performing is optional but strongly encouraged for Las Vegas dancers.',
  },
  {
    question: 'Do you offer free trial dance classes for new students?',
    answer: 'Yes — Evolve Dance Center offers a free trial class for new dance students in Las Vegas. The free trial lets your child experience our studio, meet a teacher, and confirm the class style is the right fit before committing to enrollment. Trial classes are scheduled by appointment so we can place your dancer in the correct age and level. Contact us through our website or call to book a free trial class at our southwest Las Vegas studio.',
    category: 'Enrollment',
    order: 7,
    published: false,
    seoDescription: 'Free trial dance class at Evolve Dance Center in southwest Las Vegas. Try a class before enrolling — book online or by phone.',
  },
  {
    question: 'What\'s your make-up policy if my child misses dance class?',
    answer: 'If your dancer misses a class at Evolve Dance Center, you have one month to attend a make-up class at the same or lower level. We don\'t issue refunds for missed classes, but make-ups help keep your dancer\'s training consistent. If your dancer can\'t attend for two or more weeks without communicating with us, the spot may be released to the next family on the waitlist. Please reach out if a schedule change comes up — we\'d much rather hold your dancer\'s spot than lose track.',
    category: 'Policies',
    order: 8,
    published: false,
    seoDescription: 'Dance class make-up policy at Evolve Dance Center. One month to attend a make-up class at the same or lower level. No refunds for missed classes.',
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

  for (const faq of FAQS) {
    transaction.createOrReplace({
      _id: `faq-q${faq.order}`,
      _type: 'faq',
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      seoDescription: faq.seoDescription,
      published: faq.published,
    })
  }

  await transaction.commit()

  console.log(`Created ${FAQS.length} FAQ documents in Sanity (published=false).`)
  for (const faq of FAQS) {
    console.log(`  - faq-q${faq.order}: ${faq.question}`)
  }
}

main().catch((error: unknown) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
