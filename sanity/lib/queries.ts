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

export type FaqDoc = {
  _id: string
  question: string
  answer: string
  category?: string | null
  order?: number | null
}

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

export const publishedFaqsQuery = `*[_type == "faq" && published == true] | order(order asc, question asc) {
  _id,
  question,
  answer,
  category,
  order
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

export async function getPublishedFaqs(): Promise<FaqDoc[]> {
  return client.fetch<FaqDoc[]>(publishedFaqsQuery)
}

export async function getUpcomingEvents(): Promise<EventDoc[]> {
  return client.fetch<EventDoc[]>(upcomingEventsQuery)
}

export async function getPastEvents(): Promise<EventDoc[]> {
  return client.fetch<EventDoc[]>(pastEventsQuery)
}

export type ProjectAuditionInfo = {
  date?: string | null
  location?: string | null
  ageRange?: string | null
  ctaText?: string | null
  ctaLink?: string | null
} | null

export type ProjectTeamLevel = {
  name: string
  ageRange?: string | null
  description?: string | null
  commitmentLevel: 'recreational' | 'pre-competitive' | 'competitive'
  photo: SanityImage | null
  order?: number | null
}

export type ProjectAward = {
  title: string
  year: number
  competition: string
  placement: string
}

export type ProjectPage = {
  _id: string
  pageIntro?: PortableTextBlock[] | null
  auditionInfo?: ProjectAuditionInfo
  teamLevels?: ProjectTeamLevel[] | null
  awards?: ProjectAward[] | null
  seoDescription?: string | null
}

export type BlogCategory = {
  _id: string
  title: string
  slug: FacultySlug | null
  description?: string | null
}

export type BlogPost = {
  _id: string
  title: string
  slug: FacultySlug | null
  publishedAt: string
  excerpt?: string | null
  seoDescription?: string | null
  coverImage: SanityImage | null
  body?: PortableTextBlock[] | null
  categories?: BlogCategory[] | null
  tags?: string[] | null
  featured: boolean
}

const sanityImageProjection = `
  _type,
  alt,
  hotspot,
  crop,
  asset->{
    _id,
    _type
  }
`

const blogPostProjection = `
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  seoDescription,
  coverImage {
    ${sanityImageProjection}
  },
  body[]{
    ...,
    _type == "image" => {
      ${sanityImageProjection}
    }
  },
  categories[]->{
    _id,
    title,
    slug,
    description
  },
  tags,
  featured
`

export const projectPageQuery = `*[_type == "theProject"][0] {
  _id,
  pageIntro,
  auditionInfo {
    date,
    location,
    ageRange,
    ctaText,
    ctaLink
  },
  "teamLevels": teamLevels | order(order asc) {
    name,
    ageRange,
    description,
    commitmentLevel,
    order,
    photo {
      ${sanityImageProjection}
    }
  },
  "awards": awards | order(year desc) {
    title,
    year,
    competition,
    placement
  },
  seoDescription
}`

export const publishedPostsQuery = `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
  ${blogPostProjection}
}`

export const postBySlugQuery = `*[_type == "blogPost" && published == true && slug.current == $slug][0] {
  ${blogPostProjection}
}`

export const allPostSlugsQuery = `*[_type == "blogPost" && published == true].slug.current`

export async function getProjectPage(): Promise<ProjectPage | null> {
  return client.fetch<ProjectPage | null>(projectPageQuery)
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(publishedPostsQuery)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(postBySlugQuery, { slug })
}

export async function getAllPostSlugs(): Promise<string[]> {
  return client.fetch<string[]>(allPostSlugsQuery)
}
