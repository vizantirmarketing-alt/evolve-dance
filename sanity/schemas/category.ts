import { FolderOpen } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: FolderOpen,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in URLs and filters. Generated from the title; you can edit it if needed.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional short summary shown in category listings.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || undefined,
      }
    },
  },
})
