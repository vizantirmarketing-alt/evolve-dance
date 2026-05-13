import { CalendarDays } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

const EVENT_TYPE_OPTIONS = [
  { title: 'Recital / Concert', value: 'recital' },
  { title: 'Auditions', value: 'audition' },
  { title: 'Summer Program', value: 'summer' },
  { title: 'Workshop / Master Class', value: 'workshop' },
  { title: 'Photo Day', value: 'photoDay' },
  { title: 'Studio Closure', value: 'closure' },
  { title: 'Other', value: 'other' },
] as const

const EVENT_TYPE_LABELS: Record<string, string> = {
  recital: 'Recital / Concert',
  audition: 'Auditions',
  summer: 'Summer Program',
  workshop: 'Workshop / Master Class',
  photoDay: 'Photo Day',
  closure: 'Studio Closure',
  other: 'Other',
}

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

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarDays,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'What this event is called. Examples: Season 9 Concert, Project Auditions, Summer Intensive 2026, Studio Closed for Thanksgiving.',
      validation: (Rule) => [Rule.required(), Rule.max(200)],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in the URL if we add a page for this event later. Generated from the title; you can edit it if needed.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description:
        'What kind of event this is. The fields shown below will adjust based on what you pick.',
      options: {
        layout: 'dropdown',
        list: [...EVENT_TYPE_OPTIONS],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
      description:
        'When the event starts. Includes both date and time.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'datetime',
      description:
        "When the event ends. Leave blank if it's a single-day event with no specific end time. For multi-day programs (like Summer Intensive), set this to the final day.",
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description:
        'Where the event happens. Examples: Studio (6070 S Rainbow Blvd), Smith Center for the Performing Arts, Las Vegas Academy Theater. Leave blank for closures.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description:
        'Details about the event. Keep it short and useful — what families need to know.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description:
        'Link to register or buy tickets. Full URL including https://',
      hidden: ({ parent }) => parent?.type === 'closure',
    }),
    defineField({
      name: 'ageRange',
      title: 'Age range',
      type: 'string',
      description:
        "Who this event is for. Example: 'Ages 5 and up', 'Project team only', 'All current students'.",
      hidden: ({ parent }) =>
        parent?.type === 'closure' || parent?.type === 'photoDay',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      description:
        "Cost or price range. Example: '$25 per ticket', '$350 for the week', 'Free'. Leave blank if not applicable.",
      hidden: ({ parent }) =>
        parent?.type === 'closure' ||
        parent?.type === 'audition' ||
        parent?.type === 'photoDay',
    }),
    defineField({
      name: 'recitalDetails',
      title: 'Recital details',
      type: 'object',
      description: 'Extra details specific to the recital production.',
      options: {
        collapsible: true,
        collapsed: false,
      },
      hidden: ({ parent }) => parent?.type !== 'recital',
      fields: [
        defineField({
          name: 'dressRehearsalDate',
          title: 'Dress rehearsal date',
          type: 'datetime',
          description: 'When dress rehearsal happens.',
        }),
        defineField({
          name: 'photoDayDate',
          title: 'Photo day date',
          type: 'datetime',
          description: 'When official photo day is.',
        }),
        defineField({
          name: 'ticketSaleStart',
          title: 'Ticket sale start',
          type: 'datetime',
          description: 'When tickets go on sale.',
        }),
        defineField({
          name: 'shoesAndTightsUrl',
          title: 'Shoes and tights URL',
          type: 'url',
          description: 'Link to the shoes and tights list, if posted online.',
        }),
        defineField({
          name: 'showLineupUrl',
          title: 'Show lineup URL',
          type: 'url',
          description: 'Link to the show line-up document.',
        }),
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      description:
        'Optional image for this event. Used on the event card and any future detail page.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description:
            'Describe the image for screen readers and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description:
        'Check to highlight this event on the homepage. Usually reserved for the next big thing (recital, auditions, summer registration).',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description:
        'Uncheck to hide this event from the website without deleting it.',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Soonest first',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Most recent',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Title (A–Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startDate',
      type: 'type',
      media: 'featuredImage',
      published: 'published',
      featured: 'featured',
    },
    prepare({ title, subtitle, type, media, published, featured }) {
      const typeLabel =
        (type && EVENT_TYPE_LABELS[type as string]) ||
        (typeof type === 'string'
          ? type.charAt(0).toUpperCase() + type.slice(1)
          : 'Event')
      const dateStr = formatPreviewDate(subtitle as string | undefined)
      const subtitleOut =
        dateStr !== null ? `${typeLabel} · ${dateStr}` : typeLabel

      const hiddenPrefix = published === false ? '[Hidden] ' : ''
      const featuredSuffix = featured === true ? ' ★' : ''

      return {
        title: `${hiddenPrefix}${title ?? ''}${featuredSuffix}`,
        subtitle: subtitleOut,
        media: media || undefined,
      }
    },
  },
})
