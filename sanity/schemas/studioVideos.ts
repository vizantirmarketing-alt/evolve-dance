import { defineType, defineField, defineArrayMember } from 'sanity'

export const studioVideos = defineType({
  name: 'studioVideos',
  title: 'Studio Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For Studio reference only. Not shown on the site.',
      initialValue: 'Studio Videos',
      readOnly: true,
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'studioVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: { accept: 'video/mp4' },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'poster',
              title: 'Poster Image',
              type: 'image',
              description: 'Still frame shown before the video plays.',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Short editorial title shown on the tile. e.g. "Spring Break Rehearsals"',
              validation: (Rule) => Rule.required().min(3).max(60),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 3,
              description: 'Longer description or Instagram caption. Shown below the video.',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Class', value: 'class' },
                  { title: 'Rehearsal', value: 'rehearsal' },
                  { title: 'Performance', value: 'performance' },
                  { title: 'Behind the Scenes', value: 'behind-the-scenes' },
                ],
                layout: 'radio',
              },
              description: 'Reserved for future filtering. Not shown on the site yet.',
            }),
            defineField({
              name: 'hasAudioRights',
              title: 'Audio is cleared for web use',
              type: 'boolean',
              description:
                'Only check this if the video has rights-cleared audio (original recording, licensed music, or no music at all). Instagram Reels music is NOT cleared for use on this website. Leave unchecked for social media reposts.',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              media: 'poster',
              title: 'title',
              subtitle: 'category',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Studio Videos' }),
  },
})
