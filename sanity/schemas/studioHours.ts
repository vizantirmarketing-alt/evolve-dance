import { Clock } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

const DAY_OPTIONS = [
  { title: 'Monday', value: 'Monday' },
  { title: 'Tuesday', value: 'Tuesday' },
  { title: 'Wednesday', value: 'Wednesday' },
  { title: 'Thursday', value: 'Thursday' },
  { title: 'Friday', value: 'Friday' },
  { title: 'Saturday', value: 'Saturday' },
  { title: 'Sunday', value: 'Sunday' },
] as const

export const studioHours = defineType({
  name: 'studioHours',
  title: 'Studio Hours',
  type: 'document',
  icon: Clock,
  fields: [
    defineField({
      name: 'regularHours',
      title: 'Regular hours',
      type: 'array',
      description:
        'Weekly schedule. Add one entry per day the studio is open or explicitly closed.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'regularDay',
          title: 'Day',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [...DAY_OPTIONS],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isOpen',
              title: 'Open',
              type: 'boolean',
              description: 'When unchecked, the studio is closed this day.',
              initialValue: false,
            }),
            defineField({
              name: 'openTime',
              title: 'Open time',
              type: 'string',
              description: 'Example: 3:30 PM',
              hidden: ({ parent }) => !parent?.isOpen,
            }),
            defineField({
              name: 'closeTime',
              title: 'Close time',
              type: 'string',
              description: 'Example: 9:00 PM',
              hidden: ({ parent }) => !parent?.isOpen,
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
              description:
                'Optional note for this day. Example: "Morning classes only".',
            }),
          ],
          preview: {
            select: {
              day: 'day',
              isOpen: 'isOpen',
              openTime: 'openTime',
              closeTime: 'closeTime',
            },
            prepare({ day, isOpen, openTime, closeTime }) {
              let subtitle = 'Closed'
              if (isOpen) {
                if (openTime && closeTime) {
                  subtitle = `${openTime} – ${closeTime}`
                } else if (openTime || closeTime) {
                  subtitle = [openTime, closeTime].filter(Boolean).join(' – ')
                } else {
                  subtitle = 'Open (times not set)'
                }
              }

              return {
                title: day,
                subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'specialHours',
      title: 'Special hours',
      type: 'array',
      description:
        'Holiday closures or alternate hours. Past entries are hidden on the site after one day.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'specialDay',
          title: 'Special schedule',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Example: Thanksgiving Closure',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isClosed',
              title: 'Closed',
              type: 'boolean',
              description: 'When checked, the studio is closed all day.',
              initialValue: false,
            }),
            defineField({
              name: 'openTime',
              title: 'Open time',
              type: 'string',
              description: 'Example: 10:00 AM',
              hidden: ({ parent }) => parent?.isClosed === true,
            }),
            defineField({
              name: 'closeTime',
              title: 'Close time',
              type: 'string',
              description: 'Example: 2:00 PM',
              hidden: ({ parent }) => parent?.isClosed === true,
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
              description: 'Optional details shown with this date.',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              date: 'date',
            },
            prepare({ label, date }) {
              return {
                title: label,
                subtitle: date,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'holidayMessage',
      title: 'Holiday message',
      type: 'string',
      description:
        'Optional site-wide banner message for holidays or schedule changes.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Studio Hours',
        subtitle: 'Singleton page content',
      }
    },
  },
})
