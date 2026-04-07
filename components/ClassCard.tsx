import Link from 'next/link'
import { siteConfig } from '@/data/site'

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
}: ClassCardProps) {
  return (
    <div className="bg-[#111916] border border-[rgba(45,212,191,0.12)] p-6 flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-[rgba(45,212,191,0.12)] text-[#2DD4BF] border border-[rgba(45,212,191,0.2)] rounded-full">
          {LEVEL_LABEL[level]}
        </span>
        {spots > 3 && (
          <span className="inline-flex px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-[rgba(45,212,191,0.1)] text-[#2DD4BF] border border-[rgba(45,212,191,0.2)] rounded-full">
            {spots} spots left
          </span>
        )}
        {spots >= 1 && spots <= 3 && (
          <span className="inline-flex px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-[rgba(251,191,36,0.12)] text-[#fbbf24] border border-[rgba(251,191,36,0.25)] rounded-full">
            Only {spots} left
          </span>
        )}
        {spots === 0 && (
          <span className="inline-flex px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-[rgba(255,107,107,0.1)] text-[#ff6b6b] border border-[rgba(255,107,107,0.2)] rounded-full">
            Full
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-xl font-bold text-[#f0faf8] leading-tight mb-1">
          {style}
        </h3>
        <p className="text-[11px] text-[#94a3b8] tracking-wide">
          Level {level} · {LEVEL_LABEL[level]}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-3 text-[13px]">
        <div className="flex justify-between gap-4 border-b border-[rgba(45,212,191,0.08)] pb-2">
          <dt className="text-[#94a3b8] shrink-0">Ages</dt>
          <dd className="text-[#f0faf8] text-right">
            {ageMin}–{ageMax}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[rgba(45,212,191,0.08)] pb-2">
          <dt className="text-[#94a3b8] shrink-0">Day</dt>
          <dd className="text-[#f0faf8] text-right">{day}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[rgba(45,212,191,0.08)] pb-2">
          <dt className="text-[#94a3b8] shrink-0">Time</dt>
          <dd className="text-[#f0faf8] text-right">{time}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[#94a3b8] shrink-0">Instructor</dt>
          <dd className="text-[#f0faf8] text-right">{instructor}</dd>
        </div>
      </dl>

      {spots > 0 ? (
        <a
          href={siteConfig.jackrabbitEnroll}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center w-full py-3 px-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-[#2DD4BF] no-underline transition-colors hover:bg-[#3ef0d8]"
        >
          {siteConfig.enrollCtaLabel}
        </a>
      ) : (
        <Link
          href={waitlistHref}
          className="mt-auto inline-flex items-center justify-center w-full py-3 px-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#94a3b8] bg-[#0d1210] border border-[rgba(45,212,191,0.12)] no-underline transition-colors hover:text-[#f0faf8] hover:border-[rgba(45,212,191,0.25)]"
        >
          {siteConfig.waitlistCtaLabel}
        </Link>
      )}
    </div>
  )
}
