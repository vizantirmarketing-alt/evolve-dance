import { siteConfig } from '@/data/site'
import { siteUrl } from '@/lib/site-url'
import type { StudioHours, StudioRegularHours } from '@/sanity/lib/queries'

const SCHEMA_DAYS: Record<StudioRegularHours['day'], string> = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
}

/** Convert "3:30 PM" / "9:00 PM" to 24h HH:MM for schema.org. */
function to24Hour(time: string): string | undefined {
  const trimmed = time.trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return undefined

  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const period = match[3].toUpperCase()

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return `${String(hours).padStart(2, '0')}:${minutes}`
}

function buildOpeningHoursSpecification(studioHours: StudioHours | null) {
  const regular = studioHours?.regularHours ?? []
  return regular
    .filter((day) => day.isOpen && day.openTime && day.closeTime)
    .map((day) => {
      const opens = to24Hour(day.openTime!)
      const closes = to24Hour(day.closeTime!)
      if (!opens || !closes) return null

      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SCHEMA_DAYS[day.day],
        opens,
        closes,
      }
    })
    .filter(Boolean)
}

export function buildDanceSchoolJsonLd(studioHours: StudioHours | null) {
  const openingHoursSpecification = buildOpeningHoursSpecification(studioHours)

  return {
    '@context': 'https://schema.org',
    '@type': 'DanceSchool',
    name: siteConfig.name,
    foundingDate: '2017',
    founder: [
      { '@type': 'Person', name: 'Meghan Hoover' },
      { '@type': 'Person', name: 'Cheryl Snow' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6070 S Rainbow Blvd',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89118',
      addressCountry: 'US',
    },
    telephone: siteConfig.phone,
    email: 'evolvedancecenter@yahoo.com',
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Las Vegas',
      containedInPlace: {
        '@type': 'State',
        name: 'Nevada',
      },
    },
    sameAs: siteConfig.socialLinks.map((link) => link.href),
    ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
  }
}
