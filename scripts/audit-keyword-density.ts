import { readFileSync } from 'fs'
import { resolve } from 'path'

const DUMP_DIR = 'scripts/blog-current-state'

interface KeywordCheck {
  slug: string
  primary: string[]
  secondary: string[]
}

const KEYWORD_CHECKS: KeywordCheck[] = [
  {
    slug: 'how-to-choose-a-dance-studio-las-vegas',
    primary: ['dance studio', 'Las Vegas', 'choose a dance studio'],
    secondary: ['Southwest Las Vegas', 'BFA', 'sprung', 'marley', 'free trial', 'Evolve'],
  },
  {
    slug: 'what-age-should-child-start-dance-classes',
    primary: ['dance classes', 'Las Vegas', 'what age'],
    secondary: ['toddler dance', '18 month', 'teen dance', 'ballet', 'Evolve'],
  },
  {
    slug: 'dance-classes-southwest-las-vegas',
    primary: ['Southwest Las Vegas', 'dance classes', 'dance studio'],
    secondary: ['Spring Valley', 'Mountain', 'Enterprise', 'Rainbow Boulevard', '215', 'Rhodes Ranch', 'Evolve'],
  },
  {
    slug: 'best-dance-classes-toddlers-las-vegas',
    primary: ['toddler dance', 'Las Vegas', 'dance class'],
    secondary: ['18 month', 'Mommy and Me', '2 year', '3 year', 'parent', 'Evolve'],
  },
  {
    slug: 'how-to-pick-dance-style-for-child',
    primary: ['dance style', 'ballet', 'jazz', 'hip hop', 'contemporary'],
    secondary: ['Las Vegas', 'turnout', 'port de bras', 'acro', 'tap', 'Evolve'],
  },
  {
    slug: 'dance-class-cost-las-vegas',
    primary: ['dance class', 'Las Vegas', 'cost', 'tuition'],
    secondary: ['monthly', 'costume', 'recital', 'competition', 'Evolve'],
  },
  {
    slug: 'recreational-vs-competition-team-dance',
    primary: ['recreational dance', 'competition', 'competition team'],
    secondary: ['Las Vegas', 'audition', 'rehearsal', 'The Project', 'Evolve'],
  },
  {
    slug: 'dance-studio-flooring-sprung-marley',
    primary: ['sprung', 'marley', 'dance floor'],
    secondary: ['Las Vegas', 'shock absorption', 'injury', 'concrete', 'subfloor', 'Evolve'],
  },
]

function countMatches(text: string, keyword: string): number {
  // Case-insensitive whole-word-ish match
  const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  const matches = text.match(regex)
  return matches ? matches.length : 0
}

console.log('\n=== KEYWORD DENSITY AUDIT ===\n')

for (const check of KEYWORD_CHECKS) {
  const filepath = resolve(DUMP_DIR, `${check.slug}.md`)
  const content = readFileSync(filepath, 'utf-8')
  const wordCount = content.split(/\s+/).length

  console.log(`\n--- ${check.slug} (${wordCount} words) ---`)
  console.log('  PRIMARY:')
  for (const kw of check.primary) {
    const count = countMatches(content, kw)
    const status = count >= 3 ? '✓' : count >= 1 ? '~' : '✗'
    console.log(`    ${status} "${kw}": ${count}x`)
  }
  console.log('  SECONDARY:')
  for (const kw of check.secondary) {
    const count = countMatches(content, kw)
    const status = count >= 1 ? '✓' : '✗'
    console.log(`    ${status} "${kw}": ${count}x`)
  }
}

console.log('\n=== KEY ===')
console.log('Primary: ✓=3+ mentions (strong), ~=1-2 (weak), ✗=0 (missing)')
console.log('Secondary: ✓=present, ✗=missing')
