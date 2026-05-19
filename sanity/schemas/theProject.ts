import { Star } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

const COMMITMENT_LEVEL_OPTIONS = [
  { title: 'Recreational', value: 'recreational' },
  { title: 'Pre-competitive', value: 'pre-competitive' },
  { title: 'Competitive', value: 'competitive' },
] as const

const COMMITMENT_LEVEL_LABELS: Record<string, string> = {
  recreational: 'Recreational',
  'pre-competitive': 'Pre-competitive',
  competitive: 'Competitive',
}

const pageIntroBlock = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 2', value: 'h2' },
    { title: 'Heading 3', value: 'h3' },
    { title: 'Quote', value: 'blockquote' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [],
  },
})

export const theProject = defineType({
  name: 'theProject',
  title: 'The Project',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'pageIntro',
      title: 'Page intro',
      type: 'array',
      description:
        'Opening copy for The Project page. Keep it welcoming and clear about what the program is.',
      of: [pageIntroBlock],
    }),
    defineField({
      name: 'auditionInfo',
      title: 'Audition info',
      type: 'object',
      description: 'Details for the next audition cycle and call-to-action.',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'date',
          title: 'Date',
          type: 'datetime',
          description: 'When auditions take place.',
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description:
            'Where auditions are held. Example: Studio (6070 S Rainbow Blvd).',
        }),
        defineField({
          name: 'ageRange',
          title: 'Age range',
          type: 'string',
          description: "Who can audition. Example: 'Ages 8–18'.",
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA text',
          type: 'string',
          description: 'Button label. Example: Register for auditions.',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA link',
          type: 'url',
          description: 'Full URL for the button, including https://',
        }),
      ],
    }),
    defineField({
      name: 'teamLevels',
      title: 'Team levels',
      type: 'array',
      description:
        'Each level or team tier families can join. Order controls display on the page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamLevel',
          title: 'Team level',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ageRange',
              title: 'Age range',
              type: 'string',
              description: "Example: 'Ages 6–8'.",
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'commitmentLevel',
              title: 'Commitment level',
              type: 'string',
              options: {
                list: [...COMMITMENT_LEVEL_OPTIONS],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              description:
                'Display order on the page. Lower numbers appear first.',
              initialValue: 0,
              validation: (Rule) =>
                Rule.required().integer().min(0),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'commitmentLevel',
              media: 'photo',
              order: 'order',
            },
            prepare({ title, subtitle, media, order }) {
              const levelLabel =
                (subtitle &&
                  COMMITMENT_LEVEL_LABELS[subtitle as string]) ||
                subtitle
              const orderLabel =
                typeof order === 'number' ? ` · Order ${order}` : ''

              return {
                title,
                subtitle: `${levelLabel ?? 'Level'}${orderLabel}`,
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      description: 'Competition results and accolades to highlight.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'award',
          title: 'Award',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description:
                'Routine or group name. Example: Senior contemporary small group.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(2000)
                  .max(2100),
            }),
            defineField({
              name: 'competition',
              title: 'Competition',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'placement',
              title: 'Placement',
              type: 'string',
              description: "Example: '1st Place', 'High Gold', 'Overall Winner'.",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              year: 'year',
              competition: 'competition',
              placement: 'placement',
            },
            prepare({ title, year, competition, placement }) {
              const yearLabel =
                typeof year === 'number' ? String(year) : ''
              const parts = [placement, competition, yearLabel].filter(
                Boolean,
              )

              return {
                title,
                subtitle: parts.join(' · '),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'string',
      description:
        'Used for search engine descriptions and AI Overview metadata. Max 155 characters.',
      validation: (Rule) => Rule.max(155),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'The Project',
        subtitle: 'Singleton page content',
      }
    },
  },
})
