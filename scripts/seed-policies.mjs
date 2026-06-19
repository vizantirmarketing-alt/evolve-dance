#!/usr/bin/env node
/**
 * One-time seed for /policies.
 * Creates a single policyPage singleton document.
 * Idempotent — skips if policyPage already exists in Sanity.
 *
 * Usage:
 *   node scripts/seed-policies.mjs
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

function key() {
  return randomUUID()
}

/** Build a normal or bullet-list paragraph block from string and inline part objects. */
function block(...parts) {
  const markDefs = []
  const children = []

  for (const part of parts) {
    if (typeof part === 'string') {
      children.push({ _type: 'span', _key: key(), text: part, marks: [] })
      continue
    }

    if (part.strong) {
      children.push({ _type: 'span', _key: key(), text: part.strong, marks: ['strong'] })
      continue
    }

    if (part.link) {
      const markKey = key()
      markDefs.push({
        _key: markKey,
        _type: 'link',
        href: part.link.href,
        blank: part.link.blank ?? false,
      })
      children.push({
        _type: 'span',
        _key: key(),
        text: part.link.text,
        marks: [markKey],
      })
    }
  }

  const blockDoc = {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs,
    children,
  }

  return blockDoc
}

function p(...parts) {
  return block(...parts)
}

function bullet(...parts) {
  const b = block(...parts)
  b.listItem = 'bullet'
  b.level = 1
  return b
}

const SECTIONS = [
  {
    heading: 'Registration',
    body: [
      p(
        'A non-refundable registration fee is due when you sign up. The fee is ',
        { strong: '$40 per dancer' },
        ', or ',
        { strong: '$65 per family' },
        ' per season. The season runs ',
        { strong: 'August 10, 2026 through June 12, 2027' },
        '.',
      ),
    ],
  },
  {
    heading: 'Tuition',
    body: [
      p(
        'Tuition is billed monthly through Jackrabbit Dance. The amount depends on how many classes per week your dancer takes. Payments are due on the ',
        { strong: '25th of the prior month' },
        ' and run on autopay.',
      ),
      p(
        "Tuition isn't prorated for missed classes, holidays, or partial months. The monthly amount is the same regardless of how many class meetings fall in a given month.",
      ),
      p(
        'Late payments are charged a ',
        { strong: '$25 late fee' },
        ' if not received by the ',
        { strong: '1st of the month' },
        '. Returned or declined payments are charged a ',
        { strong: '$35 NSF fee' },
        '.',
      ),
      p(
        'Families with balances over ',
        { strong: '30 days past due' },
        ' may be unenrolled until the balance is cleared.',
      ),
    ],
  },
  {
    heading: 'Withdrawal and refunds',
    body: [
      p(
        'To withdraw a dancer from classes, send us written notice (email is fine) by the ',
        { strong: '15th of the prior month' },
        ". Anything later than that and you're responsible for the next month's tuition.",
      ),
      p(
        "We don't refund tuition for missed classes or for partial months. Costume fees and concert fees are non-refundable once charged.",
      ),
      p(
        "If we cancel a class for any reason on our end, we'll either reschedule it or credit your account.",
      ),
    ],
  },
  {
    heading: 'Attendance',
    body: [
      p(
        'Consistent attendance matters, especially as the Annual Dance Concert approaches. If your dancer needs to miss class, let us know; email or text is fine.',
      ),
      p(
        'Dancers who arrive more than ',
        { strong: '15 minutes late' },
        " may be asked to observe rather than participate, since they've missed the warm-up. This is for safety, not punishment.",
      ),
      p(
        'For the Evolve Dance Project (competition team), attendance expectations are higher and are detailed in the team agreement.',
      ),
    ],
  },
  {
    heading: 'Dress code',
    body: [
      p('Dress code varies by class style. The basics:'),
      bullet(
        { strong: 'Ballet' },
        ' — leotard, tights, ballet shoes, hair pulled back in a bun. No jewelry.',
      ),
      bullet(
        { strong: 'Jazz, Contemporary, Lyrical' },
        ' — fitted dancewear (leotard or fitted top with shorts or leggings), appropriate shoes for the style, hair pulled back.',
      ),
      bullet(
        { strong: 'Hip Hop' },
        ' — comfortable, movement-friendly clothing. Clean indoor sneakers required (separate from outdoor shoes).',
      ),
      bullet({ strong: 'Tap' }, ' — fitted dancewear, tap shoes, hair pulled back.'),
      bullet(
        { strong: 'Acro, Tumbling' },
        ' — fitted leotard or fitted top and shorts, bare feet, hair pulled back.',
      ),
      p('Full details for each class are sent with your enrollment confirmation.'),
    ],
  },
  {
    heading: 'Annual Dance Concert',
    body: [
      p(
        'Our year-end Dance Concert is held ',
        { strong: 'June 12, 2027 at Durango High School' },
        '. Every class that participates performs at least one routine.',
      ),
      p(
        'The concert fee is ',
        { strong: '$60 per dancer' },
        ', or ',
        { strong: '$90 per family' },
        ', and covers production costs. This is separate from class tuition.',
      ),
      p(
        'Costumes are ordered per class. Costume fees range from ',
        { strong: '$75 to $150 per costume' },
        ' and are billed in ',
        { strong: 'December' },
        '.',
      ),
      p(
        'Dress rehearsal and picture day are required. Dates are announced in ',
        { strong: 'April' },
        '.',
      ),
      p('Tickets are sold separately, starting in ', { strong: 'May' }, '.'),
    ],
  },
  {
    heading: 'Evolve Dance Project (competition team)',
    body: [
      p(
        'The Evolve Dance Project is our competition team. Auditions are held annually in ',
        { strong: 'June' },
        '. Private auditions are available; contact the studio to arrange one.',
      ),
      p(
        'Project dancers commit to multiple classes per week, additional rehearsals, and a competition schedule that runs from ',
        { strong: 'late August through the end of June' },
        '. Tuition, costumes, competition fees, and travel are detailed in the separate Project agreement and are higher than recreational classes.',
      ),
      p(
        "If you're considering the Evolve Dance Project, talk to us before auditioning. We'll be honest about whether your dancer is ready.",
      ),
    ],
  },
  {
    heading: 'Studio conduct',
    body: [
      p('A few ground rules to keep classes running well:'),
      bullet('No street shoes on the studio floors. Dance shoes only.'),
      bullet('Water bottles are allowed in studios. Food and other drinks stay in the lobby.'),
      bullet('Phones stay in dancer bags during class.'),
      bullet(
        'Lobby etiquette: siblings and guests should keep voices low; we run multiple classes at once.',
      ),
      bullet(
        "Evolve isn't responsible for personal items left in studios or lobby. Don't leave anything valuable behind.",
      ),
    ],
  },
  {
    heading: 'Safety and injury',
    body: [
      p(
        "Dance involves physical activity, and there's always some risk of injury. By enrolling your dancer at Evolve, you acknowledge that risk and accept that Evolve isn't liable for injuries that happen during normal class participation.",
      ),
      p(
        'If a dancer has a medical condition, allergy, or injury we should know about, tell us at enrollment and keep us updated.',
      ),
    ],
  },
  {
    heading: 'Photos and video',
    body: [
      p(
        "We take photos and video at classes, performances, and events for the studio's marketing: our website, social media, and printed materials. By enrolling, you agree to this unless you tell us otherwise in writing at ",
        {
          link: {
            href: 'mailto:info@evolvedancecenter.com',
            text: 'info@evolvedancecenter.com',
          },
        },
        '.',
      ),
    ],
  },
  {
    heading: 'Communication',
    body: [
      p(
        "We send class updates, schedule changes, concert information, and registration reminders by email and occasionally by text. The Jackrabbit parent portal is where you'll find your dancer's schedule, account balance, and registration history.",
      ),
      p(
        'Please make sure your email is current. Most issues can be solved with one quick email (',
        {
          link: {
            href: 'mailto:info@evolvedancecenter.com',
            text: 'info@evolvedancecenter.com',
          },
        },
        ') or a phone call at ',
        {
          link: {
            href: 'tel:+17028975095',
            text: '(702) 897-5095',
          },
        },
        '.',
      ),
    ],
  },
  {
    heading: 'Changes to these policies',
    body: [
      p(
        "Studio policies are reviewed annually before the start of each season. We'll let you know about meaningful changes.",
      ),
    ],
  },
]

async function main() {
  const existing = await client.fetch(`*[_type == "policyPage"][0]{_id}`)
  if (existing) {
    console.log(`skip policyPage (already exists: ${existing._id})`)
    return
  }

  const doc = {
    _id: 'policyPage',
    _type: 'policyPage',
    title: 'Studio Policies',
    lastUpdated: '2026-06-18',
    intro:
      "The rules below cover tuition, attendance, dress code, the Annual Dance Concert, and what to expect during the season. If anything's unclear, ask us; we'd rather have the conversation than have you assume.",
    sections: SECTIONS.map((section) => ({
      _key: randomUUID(),
      ...section,
    })),
  }

  const created = await client.create(doc)
  console.log(`✓ policyPage created (${created._id})`)
  console.log(`  ${SECTIONS.length} sections seeded`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
