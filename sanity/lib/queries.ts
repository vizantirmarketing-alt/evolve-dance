import { client } from './client'

/** Portable Text block shape from Sanity (faculty bios, event descriptions, etc.). */
export type PortableTextBlock = {
  _type: string
  _key?: string
  children?: unknown
  [key: string]: unknown
}

/** Alias for call sites that still import `FacultyBioBlock`. */
export type FacultyBioBlock = PortableTextBlock

export type FacultySlug = {
  _type?: string
  current?: string
}

export type SanityImage = {
  _type?: string
  alt?: string | null
  hotspot?: {
    x?: number
    y?: number
    height?: number
    width?: number
  } | null
  crop?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  } | null
  asset?: {
    _id: string
    _type?: string
    url?: string
  } | null
}

/** Same as `SanityImage`; kept where imports still say FacultyPhoto. */
export type FacultyPhoto = SanityImage

export type FacultySocial = {
  instagram?: string | null
  website?: string | null
} | null

export type Faculty = {
  _id: string
  name: string
  slug: FacultySlug | null
  role: string
  photo: SanityImage | null
  bio?: PortableTextBlock[] | null
  specialties?: string[] | null
  yearsTeaching?: number | null
  social?: FacultySocial
  order?: number | null
}

export type EventRecitalDetails = {
  dressRehearsalDate?: string | null
  photoDayDate?: string | null
  ticketSaleStart?: string | null
  shoesAndTightsUrl?: string | null
  showLineupUrl?: string | null
} | null

export type EventDoc = {
  _id: string
  title: string
  slug: FacultySlug | null
  type: 'recital' | 'audition' | 'summer' | 'workshop' | 'photoDay' | 'closure' | 'other'
  startDate: string
  endDate: string | null
  location: string | null
  description: PortableTextBlock[] | null
  registrationUrl: string | null
  ageRange: string | null
  pricing: string | null
  recitalDetails: EventRecitalDetails
  featuredImage: SanityImage | null
  featured: boolean
}

const eventProjection = `
  _id,
  title,
  slug,
  type,
  startDate,
  endDate,
  location,
  description,
  registrationUrl,
  ageRange,
  pricing,
  recitalDetails {
    dressRehearsalDate,
    photoDayDate,
    ticketSaleStart,
    shoesAndTightsUrl,
    showLineupUrl
  },
  featuredImage {
    _type,
    alt,
    hotspot,
    crop,
    asset->{
      _id,
      _type
    }
  },
  featured
`

export const upcomingEventsQuery = `*[_type == "event" && published == true && (endDate >= now() || (endDate == null && startDate >= now()))] | order(startDate asc) {
  ${eventProjection}
}`

export const pastEventsQuery = `*[_type == "event" && published == true && (endDate < now() || (endDate == null && startDate < now()))] | order(startDate desc) [0...10] {
  ${eventProjection}
}`

export const publishedFacultyQuery = `*[_type == "faculty" && published == true] | order(order asc, name asc) {
  _id,
  name,
  slug,
  role,
  photo {
    _type,
    alt,
    hotspot,
    crop,
    asset->{
      _id,
      _type
    }
  },
  bio,
  specialties,
  yearsTeaching,
  social,
  order
}`

export async function getPublishedFaculty(): Promise<Faculty[]> {
  return client.fetch<Faculty[]>(publishedFacultyQuery)
}

export async function getUpcomingEvents(): Promise<EventDoc[]> {
  return client.fetch<EventDoc[]>(upcomingEventsQuery)
}

export async function getPastEvents(): Promise<EventDoc[]> {
  return client.fetch<EventDoc[]>(pastEventsQuery)
}
