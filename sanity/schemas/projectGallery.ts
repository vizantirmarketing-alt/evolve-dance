import { defineType, defineField, defineArrayMember } from 'sanity'

export const projectGallery = defineType({
  name: 'projectGallery',
  title: 'Project Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For Studio reference only. Not shown on the site.',
      initialValue: 'Project Gallery',
      readOnly: true,
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryPhoto',
          title: 'Photo',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO.',
              validation: (Rule) => Rule.required().min(4).max(180),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional. Shown below the image.',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Audition', value: 'audition' },
                  { title: 'Class', value: 'class' },
                  { title: 'Studio', value: 'studio' },
                  { title: 'Masterclass', value: 'masterclass' },
                  { title: 'Team', value: 'team' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'season',
              title: 'Season',
              type: 'string',
              description: 'Optional. e.g. "2026". Reserved for future filtering.',
            }),
            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              description: 'Optional. Reserved for highlight treatment in a later version.',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'alt',
              subtitle: 'category',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Project Gallery' }),
  },
})
