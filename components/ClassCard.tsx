import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-styles'
import { siteConfig } from '@/data/site'
import { JACKRABBIT_ENROLL_URL } from '@/lib/jackrabbit'

const LEVEL_LABEL: Record<'1' | '2' | '3', string> = {
  '1': 'Beginner',
  '2': 'Intermediate',
  '3': 'Advanced',
}

export interface ClassCardProps {
  style: string
  level: '1' | '2' | '3'
  ageMin: number
  ageMax: number
  day: string
  time: string
  instructor: string
  spots: number
  waitlistHref?: string
  /** `light` for cream / classes finder. */
  surface?: 'dark' | 'light'
}

export default function ClassCard({
  style,
  level,
  ageMin,
  ageMax,
  day,
  time,
  instructor,
  spots,
  waitlistHref = '/contact',
  surface = 'dark',
}: ClassCardProps) {
  const isLight = surface === 'light'
  return (
    <div
      className={cn(
        'flex flex-col gap-5 border p-6',
        isLight
          ? 'border-[#D6DFDA] bg-white shadow-sm'
          : 'border-[rgba(10,186,181,0.12)] bg-[#111916]'
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[rgba(10,186,181,0.12)] text-[#0ABAB5] border border-[rgba(10,186,181,0.2)] rounded-full">
          {LEVEL_LABEL[level]}
        </span>
        {spots > 3 && (
          <span className="inline-flex px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[rgba(10,186,181,0.1)] text-[#0ABAB5] border border-[rgba(10,186,181,0.2)] rounded-full">
            {spots} spots left
          </span>
        )}
        {spots >= 1 && spots <= 3 && (
          <span className="inline-flex px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[rgba(251,191,36,0.12)] text-[#fbbf24] border border-[rgba(251,191,36,0.25)] rounded-full">
            Only {spots} left
          </span>
        )}
        {spots === 0 && (
          <span className="inline-flex px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[rgba(255,107,107,0.1)] text-[#ff6b6b] border border-[rgba(255,107,107,0.2)] rounded-full">
            Full
          </span>
        )}
      </div>

      <div>
        <h3 className={cn('font-display text-[clamp(17px,2.2vw,22px)] font-bold leading-tight mb-1', isLight ? 'text-[#1F1F1C]' : 'text-[#f0faf8]')}>
          {style}
        </h3>
        <p className={cn('text-[11px] tracking-wide', isLight ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>
          Level {level} · {LEVEL_LABEL[level]}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-3 text-[14px] md:text-[15px]">
        <div
          className={cn(
            'flex justify-between gap-4 border-b pb-2',
            isLight ? 'border-[#E8E6E1]' : 'border-[rgba(10,186,181,0.08)]'
          )}
        >
          <dt className={cn('shrink-0', isLight ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>Ages</dt>
          <dd className={cn('text-right', isLight ? 'text-[#1F1F1C]' : 'text-[#f0faf8]')}>
            {ageMin}–{ageMax}
          </dd>
        </div>
        <div
          className={cn(
            'flex justify-between gap-4 border-b pb-2',
            isLight ? 'border-[#E8E6E1]' : 'border-[rgba(10,186,181,0.08)]'
          )}
        >
          <dt className={cn('shrink-0', isLight ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>Day</dt>
          <dd className={cn('text-right', isLight ? 'text-[#1F1F1C]' : 'text-[#f0faf8]')}>{day}</dd>
        </div>
        <div
          className={cn(
            'flex justify-between gap-4 border-b pb-2',
            isLight ? 'border-[#E8E6E1]' : 'border-[rgba(10,186,181,0.08)]'
          )}
        >
          <dt className={cn('shrink-0', isLight ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>Time</dt>
          <dd className={cn('text-right', isLight ? 'text-[#1F1F1C]' : 'text-[#f0faf8]')}>{time}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className={cn('shrink-0', isLight ? 'text-[#6D6C67]' : 'text-[#94a3b8]')}>Instructor</dt>
          <dd className={cn('text-right', isLight ? 'text-[#1F1F1C]' : 'text-[#f0faf8]')}>{instructor}</dd>
        </div>
      </dl>

      {spots > 0 ? (
        <a
          href={JACKRABBIT_ENROLL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'primary', size: 'card', className: 'mt-auto' })}
        >
          {siteConfig.enrollCtaLabel}
        </a>
      ) : (
        <Link
          href={waitlistHref}
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'card' }),
            'mt-auto',
            isLight && 'border-border text-foreground-muted hover:border-teal hover:text-foreground',
            !isLight && 'border-[rgba(10,186,181,0.12)] text-[#94a3b8] hover:border-teal hover:text-[#f0faf8]',
          )}
        >
          {siteConfig.waitlistCtaLabel}
        </Link>
      )}
    </div>
  )
}
