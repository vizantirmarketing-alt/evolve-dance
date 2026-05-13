import { cn } from '@/lib/utils'
import { formatEventDateBlock, formatEventTime } from '@/lib/dates'
import type { EventDoc, PortableTextBlock } from '@/sanity/lib/queries'

export const EVENT_TYPE_LABELS: Record<EventDoc['type'], string> = {
  recital: 'Recital',
  audition: 'Auditions',
  summer: 'Summer Program',
  workshop: 'Workshop',
  photoDay: 'Photo Day',
  closure: 'Studio Closed',
  other: 'Event',
}

function firstBlockPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) return ''
  const block = blocks[0]
  if (!block || block._type !== 'block') return ''
  const children = block.children
  if (!Array.isArray(children)) return ''
  return children
    .map((span: unknown) => {
      if (
        span &&
        typeof span === 'object' &&
        'text' in span &&
        typeof (span as { text: unknown }).text === 'string'
      ) {
        return (span as { text: string }).text
      }
      return ''
    })
    .join('')
}

function truncateDescription(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const slice = t.slice(0, max)
  const lastSpace = slice.lastIndexOf(' ')
  const base = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice
  return `${base}…`
}

function registrationCtaLabel(type: EventDoc['type']): string {
  switch (type) {
    case 'recital':
      return 'Get tickets →'
    case 'audition':
      return 'Sign up →'
    case 'summer':
      return 'Register →'
    case 'workshop':
      return 'Reserve a spot →'
    default:
      return 'Learn more →'
  }
}

type EventCardProps = {
  event: EventDoc
  variant?: 'default' | 'past'
}

export default function EventCard({ event, variant = 'default' }: EventCardProps) {
  const isClosure = event.type === 'closure'
  const dateBlock = formatEventDateBlock(event.startDate, event.endDate)

  const descriptionPlain = firstBlockPlainText(event.description ?? null)
  const descriptionPreview =
    descriptionPlain.length > 0 ? truncateDescription(descriptionPlain, 140) : null

  const showTime = !isClosure && formatEventTime(event.startDate)

  const metaParts: string[] = []
  if (showTime) metaParts.push(showTime)
  if (event.location?.trim()) metaParts.push(event.location.trim())
  if (event.ageRange?.trim()) metaParts.push(event.ageRange.trim())
  if (event.pricing?.trim()) metaParts.push(event.pricing.trim())

  const showRegistration =
    variant !== 'past' && !isClosure && Boolean(event.registrationUrl?.trim())
  const registrationUrl = event.registrationUrl?.trim()

  return (
    <article
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-start md:gap-10',
        variant === 'past' && 'opacity-75',
        isClosure
          ? 'rounded-sm border border-border/55 bg-background/90 p-4 shadow-sm md:p-5'
          : 'rounded-sm border border-border bg-background-warm p-6 shadow-sm md:p-8',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 flex-col',
          isClosure ? 'text-foreground-muted' : 'text-teal',
          'range' in dateBlock ? 'md:w-32' : 'w-full md:w-24',
        )}
      >
        {'range' in dateBlock ? (
          <p
            className={cn(
              'font-display text-[clamp(1.35rem,3.5vw,1.85rem)] font-bold leading-none tracking-tight',
            )}
          >
            {dateBlock.range}
          </p>
        ) : (
          <>
            <span
              className={cn(
                'font-sans text-[10px] font-medium uppercase tracking-[0.22em]',
                isClosure ? 'text-foreground-muted' : 'text-teal',
              )}
            >
              {dateBlock.month}
            </span>
            <span className="font-display text-[clamp(2.25rem,6vw,3rem)] font-bold leading-none">
              {dateBlock.day}
            </span>
          </>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-[10px] font-medium uppercase tracking-[0.22em]',
            isClosure ? 'text-foreground-muted' : 'text-teal',
          )}
        >
          {EVENT_TYPE_LABELS[event.type]}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-foreground md:text-[1.65rem]">
          {event.title}
        </h2>

        {metaParts.length > 0 ? (
          <p className="mt-3 text-[13px] font-light leading-relaxed text-foreground-muted">
            {metaParts.join(' · ')}
          </p>
        ) : null}

        {descriptionPreview ? (
          <p className="mt-4 text-[13px] font-light leading-relaxed text-foreground-muted">
            {descriptionPreview}
          </p>
        ) : null}

        {showRegistration && registrationUrl ? (
          <p className="mt-5">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-[13px] font-medium text-teal underline-offset-4 transition-colors hover:text-teal/90 hover:underline"
            >
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                {registrationCtaLabel(event.type)}
              </span>
            </a>
          </p>
        ) : null}
      </div>
    </article>
  )
}
