import { HelpCircle } from 'lucide-react'
import { defineField, defineType } from 'sanity'

const CATEGORY_OPTIONS = [
  { title: 'Enrollment', value: 'Enrollment' },
  { title: 'Classes', value: 'Classes' },
  { title: 'Competition', value: 'Competition' },
  { title: 'Performance', value: 'Performance' },
  { title: 'Policies', value: 'Policies' },
  { title: 'Studio', value: 'Studio' },
] as const

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircle,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => [Rule.required(), Rule.max(200)],
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      validation: (Rule) => [Rule.required(), Rule.max(2000)],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [...CATEGORY_OPTIONS],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description:
        'Uncheck to hide this FAQ from the website without deleting it.',
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
      title: 'Question (A-Z)',
      name: 'questionAsc',
      by: [{ field: 'question', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
      order: 'order',
      published: 'published',
    },
    prepare({ question, category, order, published }) {
      const catLabel = category || 'Uncategorized'
      const hidden = published === false ? '[Hidden] ' : ''
      const orderLabel =
        typeof order === 'number' ? ` · Order ${order}` : ''

      return {
        title: question,
        subtitle: `${hidden}${catLabel}${orderLabel}`,
      }
    },
  },
})
