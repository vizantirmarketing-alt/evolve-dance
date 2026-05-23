import type { PortableTextBlock } from '@/sanity/lib/queries'

/**
 * Slugs of blog posts that are structured as Q&A and should get FAQPage schema.
 * Adding a slug here makes that post eligible for Google AI Overviews,
 * People Also Ask, and FAQ rich results in search.
 *
 * Each post in this list MUST have H2 headings that read as questions
 * (or can be reframed as questions). The post body content under each H2
 * becomes the answer text.
 */
const FAQ_ELIGIBLE_SLUGS = new Set([
  'how-to-choose-a-dance-studio-las-vegas',
  'what-age-should-child-start-dance-classes',
  'best-dance-classes-toddlers-las-vegas',
  'dance-class-cost-las-vegas',
  'dance-studio-flooring-sprung-marley',
])

/**
 * Manual question rewrites for H2s that are not phrased as questions.
 * Maps the original H2 text to a question-formatted version.
 * Posts in FAQ_ELIGIBLE_SLUGS but with statement-style H2s use this map.
 *
 * If an H2 is already a question (ends with ?), it is used as-is and does
 * not need to appear here.
 */
const QUESTION_REWRITES: Record<string, string> = {
  // Post 1: How to Choose
  'Where did the instructors train?': 'Where did the dance instructors train?',
  'What is underneath the floor?': 'What kind of flooring should a dance studio have?',
  'How many dancers are in a class?': 'How many dancers should be in a class?',
  'Can parents see what is happening in class?': 'Can parents watch dance class?',
  'How does the studio handle a child who is having a hard day?': 'How does a dance studio handle a child having a hard day?',
  'What styles does the studio teach?': 'What dance styles should a studio offer?',
  'Is there a clear pathway from beginner to advanced?': 'Does the dance studio have a clear curriculum from beginner to advanced?',
  'Does the studio have a competition team, and is it optional?': 'Should a dance studio have a competition team?',
  'How does enrollment work, and how flexible is it?': 'How does dance studio enrollment work?',
  'What is the trial process?': 'Do dance studios offer free trial classes?',
  'How does the studio communicate with families?': 'How should a dance studio communicate with families?',
  'What does the end-of-year performance look like?': 'What is a dance recital or concert?',

  // Post 2: What Age
  '18 months to 2 years: Parent-and-me movement': 'What age can a child start dance classes?',
  '2 to 3 years: Independent creative movement': 'When is a 2 year old ready for dance class?',
  '3 to 4 years: Pre-dance and foundational technique': 'When does real dance training start for kids?',
  '5 to 6 years: Style exploration': 'What dance style should a 5 year old start with?',
  '7 to 9 years: Serious technical training begins': 'What age should kids start serious dance training?',
  '10 to 12 years: Pre-professional pathway opens': 'Is 10 too old to start dance?',
  'Teen beginners: It is not too late': 'Is it too late to start dance as a teenager?',

  // Post 4: Toddler
  'Ages 18 months to 2 years: Parent-and-me': 'Can a 1 year old take dance classes?',
  'Ages 2 to 3: First independent class': 'When can a toddler take dance class without a parent?',
  'Ages 3 to 4: Pre-dance technique': 'What does dance class look like for a 3 year old?',
  'How to know if your toddler is ready': 'How do I know if my toddler is ready for dance class?',
  'What to look for in a toddler dance studio': 'What should I look for in a toddler dance studio?',

  // Post 6: Cost
  'Monthly tuition': 'How much do dance classes cost per month?',
  'Registration fee': 'Do dance studios charge a registration fee?',
  'Costumes': 'How much do dance costumes cost?',
  'Recital or concert fees': 'What are dance recital fees?',
  'Shoes and dancewear': 'How much do dance shoes and dancewear cost?',
  'Competition fees (for competition team dancers)': 'How much does competition dance cost?',
  'What is reasonable to spend annually': 'What is the average annual cost of dance lessons?',
  'How to keep costs down': 'How can I reduce the cost of dance classes?',

  // Post 8: Flooring
  'What "sprung floor" actually means': 'What is a sprung dance floor?',
  'Why this matters more for kids': 'Why is sprung flooring important for kids dance?',
  'Marley: the surface on top': 'What is marley dance flooring?',
  'What to look for and avoid': 'How do I know if a dance studio floor is safe?',
  'Why most studios cut this corner': 'Why do some dance studios use cheap flooring?',
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQPageJsonLd {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

/**
 * Extract plain text from a Portable Text block by concatenating child spans.
 * Strips formatting marks (bold, italic, links) but preserves the text.
 */
function blockToPlainText(block: PortableTextBlock): string {
  if (block._type !== 'block' || !Array.isArray(block.children)) return ''
  return block.children
    .map((child: { _type?: string; text?: string }) =>
      child._type === 'span' && typeof child.text === 'string' ? child.text : ''
    )
    .join('')
    .trim()
}

/**
 * Build FAQ items from a post body by pairing H2 headings with the paragraphs
 * that follow them (until the next H2).
 *
 * Returns null if the post is not FAQ-eligible.
 */
export function buildFaqItemsFromBody(
  slug: string,
  body: PortableTextBlock[]
): FAQItem[] | null {
  if (!FAQ_ELIGIBLE_SLUGS.has(slug)) return null
  if (!Array.isArray(body) || body.length === 0) return null

  const items: FAQItem[] = []
  let i = 0

  while (i < body.length) {
    const block = body[i]

    // Look for h2 blocks
    if (block._type === 'block' && block.style === 'h2') {
      const rawHeading = blockToPlainText(block)
      if (!rawHeading) {
        i += 1
        continue
      }

      // Determine question text: use rewrite map, or use raw heading if it
      // already ends with a question mark
      let question = QUESTION_REWRITES[rawHeading] || rawHeading
      if (!question.endsWith('?') && !QUESTION_REWRITES[rawHeading]) {
        // H2 is a statement and has no rewrite — skip it
        i += 1
        continue
      }

      // Collect answer paragraphs until next h2 (or end of body)
      const answerParagraphs: string[] = []
      let j = i + 1
      while (j < body.length) {
        const next = body[j]
        if (next._type === 'block' && next.style === 'h2') break
        if (next._type === 'block' && next.style === 'normal') {
          const text = blockToPlainText(next)
          if (text) answerParagraphs.push(text)
        }
        j += 1
      }

      const answer = answerParagraphs.join(' ').trim()

      // Only include if answer is substantive (more than 30 chars)
      if (answer.length > 30) {
        items.push({ question, answer })
      }

      i = j
      continue
    }

    i += 1
  }

  return items.length >= 3 ? items : null
}

/**
 * Build a FAQPage JSON-LD object from FAQ items.
 * Returns null if there are no items.
 */
export function buildFaqPageJsonLd(items: FAQItem[] | null): FAQPageJsonLd | null {
  if (!items || items.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
