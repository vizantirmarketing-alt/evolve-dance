import { FileText } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

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

const bodyBlock = defineArrayMember({
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
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          defineField({
            name: 'href',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required(),
          }),
        ],
      },
    ],
  },
})

const bodyImage = defineArrayMember({
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog posts',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [Rule.required(), Rule.max(80)],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in the post URL. Generated from the title; you can edit it if needed.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'When the post goes live. Used for sorting and display.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'Short teaser for cards and social sharing. Max 200 characters.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'string',
      description:
        'Used for search engine descriptions and AI Overview metadata. Max 155 characters.',
      validation: (Rule) => Rule.max(155),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Main article content. Text and images only — no embeds.',
      of: [bodyBlock, bodyImage],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description:
        'Highlight this post on the blog homepage or in featured sections.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description:
        'Uncheck to hide this post from the website without deleting it.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest first',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
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
      subtitle: 'publishedAt',
      published: 'published',
      featured: 'featured',
    },
    prepare({ title, subtitle, published, featured }) {
      const dateStr = formatPreviewDate(subtitle as string | undefined)
      const hiddenPrefix = published === false ? '[Draft] ' : ''
      const featuredSuffix = featured === true ? ' ★' : ''

      return {
        title: `${hiddenPrefix}${title ?? ''}${featuredSuffix}`,
        subtitle: dateStr ?? 'No publish date',
      }
    },
  },
})
