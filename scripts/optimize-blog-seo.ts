/**
 * One-time SEO keyword optimization pass for published blog posts in Sanity.
 *
 * Usage:
 *   npm run optimize:blog:dry   (preview without writing)
 *   npm run optimize:blog       (apply edits)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const DRY_RUN = process.argv.includes('--dry-run')

interface ParagraphEdit {
  // Match: substring that must appear in the existing paragraph (case-sensitive)
  match: string
  // Replace: the new full paragraph text
  replace: string
}

interface PostEdits {
  slug: string
  edits: ParagraphEdit[]
}

const POST_EDITS: PostEdits[] = [
  // ============ POST 1: How to Choose ============
  {
    slug: 'how-to-choose-a-dance-studio-las-vegas',
    edits: [
      {
        match: 'Choosing a dance studio for your child sounds straightforward',
        replace:
          'Choosing a dance studio for your child in Las Vegas sounds straightforward until you start looking. With dozens of dance studios across the Las Vegas area — from Southwest Las Vegas to Summerlin — most have polished websites, smiling staff photos, and five-star reviews. From the outside, they all look about the same.',
      },
      {
        match: 'The things that actually matter',
        replace:
          'The things that actually matter when choosing a dance studio — how teachers were trained, what the floor is made of, whether the curriculum builds technique progressively, how the studio handles a six-year-old having a hard day — those only surface when you ask the right questions.',
      },
      {
        match: 'Dance teaching is unregulated in most states',
        replace:
          'Dance teaching is unregulated in most states, including Nevada. Anyone can call themselves a dance instructor in Las Vegas. That makes instructor credentials the single most important question you can ask any dance studio.',
      },
      {
        match: 'If you are in Southwest Las Vegas',
        replace:
          'If you are in Southwest Las Vegas and want to see what that looks like in person, book a free trial class at Evolve Dance Center or come tour the studio. Our dance studio in Southwest Las Vegas is built around the twelve questions above — that is the whole point.',
      },
    ],
  },

  // ============ POST 2: What Age ============
  {
    slug: 'what-age-should-child-start-dance-classes',
    edits: [
      {
        match: 'The honest answer to "what age should my child start dance?"',
        replace:
          'The honest answer to "what age should my child start dance classes?" is: it depends on your child. Whether you are looking at toddler dance classes in Las Vegas or considering ballet lessons for an older child, the right age varies.',
      },
      {
        match: 'At this age, dance is not really dance yet',
        replace:
          'At this age, dance class is not really dance yet. It is exposure to music, rhythm, and structured movement, usually with a parent in the room. Dance classes for 18 month olds and 2 year olds focus on creative movement, not technique.',
      },
      {
        match: 'Evolve takes dancers starting at 18 months',
        replace:
          'Evolve Dance Center in Las Vegas takes dancers starting at 18 months. Our toddler dance classes are short, parent-supported, and designed around what toddlers actually do: move, explore, and have fun.',
      },
      {
        match: 'This is the age where research shows',
        replace:
          'This is the age where research shows kids develop the cognitive ability to connect what they are learning to how their body moves. Children aged 7 to 9 can hold longer attention spans, take corrections without getting discouraged, and start building real dance technique.',
      },
      {
        match: 'No. It is never too late to start dancing',
        replace:
          'No, it is never too late to start dancing for joy, fitness, and skill. Teen dance classes in Las Vegas exist for exactly this reason. The path to professional ballet typically requires starting around age 8, but professional contemporary, jazz, commercial, and hip hop careers regularly include dancers who started in their teens.',
      },
      {
        match: 'If you are not sure where your child fits',
        replace:
          'If you are not sure where your child fits, book a free trial class at Evolve Dance Center in Las Vegas and we will help you place them. Better to spend a class observing than to enroll into the wrong level.',
      },
    ],
  },

  // ============ POST 3: Southwest Las Vegas ============
  {
    slug: 'dance-classes-southwest-las-vegas',
    edits: [
      {
        match: 'If you live in Southwest Las Vegas, you are not short on options',
        replace:
          "If you live in Southwest Las Vegas, you are not short on options for dance classes. Within a 10-minute drive of Rainbow Boulevard, there are at least half a dozen dance studios serving Southwest Vegas, Spring Valley, Mountain's Edge, and Enterprise. The question is not whether you can find a dance studio near you. It is whether you can find the right one.",
      },
      {
        match: 'Studios in Southwest Las Vegas pull from Spring Valley',
        replace:
          'Dance studios in Southwest Las Vegas pull students from Spring Valley, Mountain\'s Edge, Enterprise, Rhodes Ranch, and Southern Highlands. If you live in one of those neighborhoods, prioritize dance studios within 10 to 15 minutes.',
      },
      {
        match: 'Evolve is at 6070 S. Rainbow Boulevard',
        replace:
          'Evolve Dance Center is at 6070 S. Rainbow Boulevard, Suite 8, in Southwest Las Vegas. Close to the 215 freeway, accessible from Spring Valley, Enterprise, and Rhodes Ranch in under 15 minutes.',
      },
      {
        match: 'Both Evolve co-founders hold BFAs in dance',
        replace:
          'Both Evolve Dance Center co-founders hold BFAs in dance and have spent over 15 years teaching dancers in Las Vegas — from age 18 months through pre-professional teens. Few other Southwest Las Vegas dance studios can match that credential.',
      },
      {
        match: 'If you would like to see Evolve in person',
        replace:
          'If you would like to see Evolve Dance Center in person, book a tour or try a free class. Our Southwest Las Vegas studio is open for trials any time. Either way, ask the questions. The answers tell you what you need to know.',
      },
    ],
  },

  // ============ POST 4: Toddler ============
  {
    slug: 'best-dance-classes-toddlers-las-vegas',
    edits: [
      {
        match: 'If you have ever watched a toddler hear a song',
        replace:
          'If you have ever watched a toddler hear a song and immediately start moving, you already know what dance class is for at this age. Whether you are searching for Mommy and Me dance classes in Las Vegas or independent toddler dance lessons, the principles are the same: meet kids where they already are.',
      },
      {
        match: 'The youngest dancers we work with at Evolve are 18 months old',
        replace:
          'The youngest dancers we work with at Evolve Dance Center in Las Vegas are 18 months old. At this age, a toddler dance class is really a structured 30-minute experience with a parent in the room, focused on music, rhythm, simple movements, and following along.',
      },
      {
        match: 'Somewhere between 2.5 and 3, most kids are ready',
        replace:
          'Somewhere between 2.5 and 3, most kids are ready to try a dance class for 2 year olds without a parent in the room. This is a real milestone. For some kids it is easy. For others it takes weeks. Both are normal.',
      },
      {
        match: 'This is where real dance education starts',
        replace:
          'This is where real dance education starts. Three- and four-year-olds in dance classes can pay attention for 45 minutes, follow multi-step directions, and begin learning movement vocabulary: first position, plié, tendu, simple jumps, basic ballet barre work. Pre-dance classes at this age are the foundation for everything that follows.',
      },
      {
        match: 'Evolve takes dancers starting at 18 months',
        replace:
          'Evolve Dance Center takes dancers starting at 18 months. We run dedicated toddler dance classes in Las Vegas for each age band, with experienced instructors who specialize in this age. Every studio room has sprung wood floors with marley on top, and lobby TVs broadcast live class video so parents can watch from outside.',
      },
    ],
  },

  // ============ POST 5: Dance Styles ============
  {
    slug: 'how-to-pick-dance-style-for-child',
    edits: [
      {
        match: 'When parents ask what style of dance their kid should take',
        replace:
          'When parents ask what style of dance their kid should take, the easy answer is "whatever they want." That is true but not useful. Different dance styles — ballet, jazz, hip hop, contemporary, tap, and acro — build different skills, suit different personalities, and start at different ages. Picking the right one matters more than people realize.',
      },
      {
        match: 'The foundation of every other style',
        replace:
          "Ballet is the foundation of every other dance style. Ballet classes for kids teach turnout, posture, port de bras (arm work), pointed feet, jumping mechanics, and the discipline of repetition. Even dancers who never pursue ballet long-term benefit from a few years of it because every other style assumes ballet's vocabulary.",
      },
      {
        match: 'The Las Vegas style',
        replace:
          'Jazz is the Las Vegas style. Jazz dance classes are performance-forward, personality-heavy, and technically demanding. Jazz combines ballet technique with sharper lines, isolations, and theatrical expression. Most competition-team routines lean jazz or jazz-adjacent.',
      },
      {
        match: 'Freestyle, groove, and rhythm. Hip hop is less about formal technique',
        replace:
          'Hip hop is its own world, and hip hop classes for kids in Las Vegas have grown massively in the last decade. Freestyle, groove, and rhythm matter more than formal technique. Hip hop came from street culture, not studios, and the best hip hop training respects that history. Real hip hop classes teach foundational moves, musicality, and the cultural context that makes the style what it is.',
      },
      {
        match: 'Modern expression through movement. Contemporary blends ballet technique',
        replace:
          'Contemporary is the youngest of the major dance styles and the hardest to define. Modern expression through movement. Contemporary dance blends ballet technique with modern, jazz, and improvisation, focused on weight, breath, floor work, and storytelling. Contemporary dance classes often feel different than ballet classes even though they share vocabulary.',
      },
      {
        match: 'Evolve teaches ballet, jazz, hip hop',
        replace:
          'Evolve Dance Center in Las Vegas teaches ballet, jazz, hip hop, contemporary, lyrical, tap, and acro. Recreational dancers can take any combination. Competition team dancers on The Project train across multiple styles.',
      },
    ],
  },

  // ============ POST 6: Cost ============
  {
    slug: 'dance-class-cost-las-vegas',
    edits: [
      {
        match: 'Most dance studio websites do not publish prices',
        replace:
          'Most dance studio websites in Las Vegas do not publish prices. You have to call, fill out a form, or schedule a tour to find out how much dance classes cost. There are reasons for this, but it is not particularly family-friendly.',
      },
      {
        match: 'Here is an honest look at what dance actually costs',
        replace:
          'Here is an honest look at what dance classes actually cost for a Las Vegas family, what each fee covers, and how to think about budgeting for dance lessons.',
      },
      {
        match: 'This is the biggest cost and varies based',
        replace:
          'Monthly dance tuition is the biggest cost and varies based on how many classes per week your dancer takes. Dance class prices in Las Vegas generally fall within these ranges:',
      },
      {
        match: 'Studios with lower tuition often cut corners',
        replace:
          'Dance studios with lower tuition often cut corners somewhere: older or unsafe flooring, larger class sizes, less-experienced instructors, or no live viewing for parents. Las Vegas dance studios at the higher end usually invest in those things.',
      },
      {
        match: 'We do not publish exact tuition on our website',
        replace:
          'Evolve Dance Center does not publish exact tuition on our website because it depends on how many classes and which programs your dancer takes. But our dance class pricing is in line with the ranges above, and we are transparent about every fee upfront. No surprises at registration.',
      },
    ],
  },

  // ============ POST 7: Rec vs Competition ============
  {
    slug: 'recreational-vs-competition-team-dance',
    edits: [
      {
        match: 'Somewhere around age 8 or 9',
        replace:
          'Somewhere around age 8 or 9, a lot of dance parents face a question: should our kid try out for the competition team? Recreational dance vs competitive dance is one of the biggest decisions a dance family makes.',
      },
      {
        match: 'It is usually framed as if the competition team',
        replace:
          'It is usually framed as if a competition dance team is the natural next step. It is not. Recreational and competitive dance suit different families, and choosing the wrong one creates real problems — burnout, financial strain, and kids who eventually quit a sport they used to love.',
      },
      {
        match: 'Recreational dance is 1 to 3 classes per week',
        replace:
          'Recreational dance classes meet 1 to 3 times per week. Each class is 45 to 60 minutes. Total weekly time at the studio: 1 to 3 hours.',
      },
      {
        match: 'Competition dance is typically 8 to 15+ hours',
        replace:
          'Competition dance training is typically 8 to 15+ hours per week of studio time during the school year. This includes technique classes (ballet, jazz, contemporary), team rehearsals for each routine, choreography sessions, conditioning, and weekend competitions during the spring.',
      },
      {
        match: 'Evolve runs full recreational programs alongside',
        replace:
          'Evolve Dance Center runs full recreational dance programs alongside The Project, our competition team. Recreational dancers in Las Vegas can stay recreational for years and audition for The Project when (or if) they are ready. We do not pressure recreational families to compete.',
      },
    ],
  },

  // ============ POST 8: Flooring ============
  {
    slug: 'dance-studio-flooring-sprung-marley',
    edits: [
      {
        match: 'Most parents touring a dance studio do not look down',
        replace:
          'Most parents touring a dance studio do not look down. They look at the lobby, the bathrooms, the teacher, the price list. But the most important investment a dance studio makes is something you cannot see: what is underneath the floor. Sprung dance floors and marley vinyl are non-negotiable for any serious studio.',
      },
      {
        match: 'A sprung floor is not the floor surface you see',
        replace:
          'A sprung dance floor is not the floor surface you see. It is the construction underneath. Understanding sprung flooring is one of the most important things a dance parent can learn.',
      },
      {
        match: 'Marley is the textured vinyl surface',
        replace:
          'Marley is the textured vinyl surface laid on top of the sprung wood subfloor in professional dance studios. Marley flooring is the surface dancers actually touch.',
      },
      {
        match: 'A proper sprung floor with marley costs',
        replace:
          'A proper sprung dance floor with marley vinyl costs $10,000 to $20,000 per room. For a multi-room dance studio, that is $50,000 to $120,000 in flooring alone — before walls, mirrors, sound systems, or any of the visible parts of the studio.',
      },
      {
        match: 'Every room at Evolve has raised wood subflooring',
        replace:
          'Every room at Evolve Dance Center has raised wood subflooring topped with marley vinyl. Six rooms, no exceptions. Our Las Vegas dance studio invested in proper sprung floors because we run ballet, jazz, hip hop, and acro classes for dancers as young as 18 months. The cumulative joint impact on a non-sprung floor would be unacceptable.',
      },
    ],
  },
]

interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  children?: PortableTextSpan[]
  markDefs?: unknown[]
  [key: string]: unknown
}

function getBlockPlainText(block: PortableTextBlock): string {
  if (!Array.isArray(block.children)) return ''
  return block.children.map((c) => c.text || '').join('')
}

function replaceBlockText(block: PortableTextBlock, newText: string): PortableTextBlock {
  // Replace the entire block content with a single span of new text.
  // This drops any existing inline marks/links in that block — acceptable
  // since we're rewriting whole paragraphs for SEO and original links can
  // be re-added if needed in a follow-up pass.
  return {
    ...block,
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).slice(2, 10),
        text: newText,
        marks: [],
      },
    ],
    markDefs: [],
  }
}

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`)
  console.log(`Posts to update: ${POST_EDITS.length}`)
  console.log('')

  for (const postConfig of POST_EDITS) {
    const post = await client.fetch<{ _id: string; body: PortableTextBlock[] } | null>(
      `*[_type == "blogPost" && slug.current == $slug && published == true][0]{ _id, body }`,
      { slug: postConfig.slug }
    )

    if (!post) {
      console.error(`✗ ${postConfig.slug}: post not found or not published, skipping`)
      continue
    }

    let appliedCount = 0
    let missedCount = 0
    const newBody = post.body.map((block) => {
      if (block._type !== 'block' || !block.children) return block

      const text = getBlockPlainText(block)
      // Find the first matching edit for this block
      const edit = postConfig.edits.find((e) => text.includes(e.match))
      if (!edit) return block

      appliedCount += 1
      return replaceBlockText(block, edit.replace)
    })

    // Track misses (edits whose match string was not found in any block)
    for (const edit of postConfig.edits) {
      const foundInOriginal = post.body.some(
        (b) => b._type === 'block' && getBlockPlainText(b).includes(edit.match)
      )
      if (!foundInOriginal) {
        missedCount += 1
        console.warn(`  ⚠ no match for: "${edit.match.slice(0, 60)}..."`)
      }
    }

    if (DRY_RUN) {
      console.log(
        `→ ${postConfig.slug}: would apply ${appliedCount}/${postConfig.edits.length} edits (${missedCount} misses)`
      )
      continue
    }

    try {
      await client.patch(post._id).set({ body: newBody }).commit()
      console.log(
        `✓ ${postConfig.slug}: ${appliedCount}/${postConfig.edits.length} edits applied (${missedCount} misses)`
      )
    } catch (err) {
      console.error(`✗ ${postConfig.slug}: failed:`, (err as Error).message)
    }
  }

  console.log('')
  console.log('Done.')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
