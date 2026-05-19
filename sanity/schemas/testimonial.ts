import { Star } from 'lucide-react'
import { defineField, defineType } from 'sanity'

const SOURCE_OPTIONS = [
  { title: 'Google', value: 'Google' },
  { title: 'Facebook', value: 'Facebook' },
  { title: 'Yelp', value: 'Yelp' },
  { title: 'Direct', value: 'Direct' },
] as const

function formatPreviewDate(iso: string | undefined) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function starsForRating(rating: number | undefined): string {
  const n =
    typeof rating === 'number' && Number.isFinite(rating)
      ? Math.min(5, Math.max(1, Math.round(rating)))
      : 5
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'reviewerName',
      title: 'Reviewer name',
      type: 'string',
      description: "How the reviewer appears on the site. Example: 'Sarah M.'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      validation: (Rule) =>
        Rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [...SOURCE_OPTIONS],
        layout: 'dropdown',
      },
      initialValue: 'Google',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Display order on homepage — lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description:
        'Uncheck to hide this testimonial from the website without deleting it.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Homepage order',
      name: 'homepageOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest review',
      name: 'reviewDateDesc',
      by: [{ field: 'reviewDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      reviewerName: 'reviewerName',
      source: 'source',
      reviewDate: 'reviewDate',
      rating: 'rating',
      featured: 'featured',
      published: 'published',
    },
    prepare({ reviewerName, source, reviewDate, rating, featured, published }) {
      const dateStr = formatPreviewDate(reviewDate as string | undefined)
      const stars = starsForRating(rating as number | undefined)
      const hidden = published === false ? '[Draft] ' : ''
      const featuredLabel = featured === true ? ' · Featured' : ''
      const sourceLabel = source || 'Google'

      return {
        title: `${hidden}${reviewerName ?? 'Testimonial'}`,
        subtitle: `${stars} · ${sourceLabel}${dateStr ? ` · ${dateStr}` : ''}${featuredLabel}`,
      }
    },
  },
})
