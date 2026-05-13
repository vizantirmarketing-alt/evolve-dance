import { Users } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const faculty = defineType({
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  icon: Users,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => [Rule.required(), Rule.max(100)],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in the URL if we add a page for this teacher later. Generated from the name; you can edit it if needed.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description:
        'Job title shown under the name. Examples: Director, Ballet Faculty, Jazz & Contemporary Faculty, Hip Hop Faculty.',
      validation: (Rule) => [Rule.required(), Rule.max(100)],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description:
        'Upload a clear photo of this teacher. Full body, three-quarter, or close-up all work. After uploading, click the photo to set the focal point so the face stays centered when cropped for different layouts.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description:
            "Describe the photo for screen readers and SEO. Example: 'Cheryl Snow standing in front of a studio mirror, smiling.'",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      description:
        'Short paragraph(s) about this teacher. 2 to 5 sentences usually reads best.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [],
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
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      description:
        'Styles this teacher specializes in. Example: Ballet, Jazz, Contemporary.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'yearsTeaching',
      title: 'Years teaching',
      type: 'number',
      description:
        'Total years of teaching experience. Optional. Leave blank if not relevant.',
      validation: (Rule) => Rule.integer().min(0).max(80),
    }),
    defineField({
      name: 'social',
      title: 'Social and web',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Full URL including https://',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
          description: 'Personal site or portfolio URL',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Display order on the website. Lower numbers appear first. Use multiples of 10 (10, 20, 30) so it is easy to insert someone between two existing entries later.',
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description:
        'Uncheck to hide this teacher from the website without deleting their profile.',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'manualOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name (A–Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: published === false ? `[Hidden] ${title ?? ''}` : title,
        subtitle,
        media,
      }
    },
  },
})
