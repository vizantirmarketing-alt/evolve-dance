import Link from 'next/link'
import type { DanceStyle } from '@/data/styles'
import { siteConfig } from '@/data/site'

function IconUsers({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconShoe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 16v-2a2 2 0 0 1 2-2h2l3-6 3 6h2a2 2 0 0 1 2 2v2" />
      <path d="M6 16h12" />
    </svg>
  )
}

export default function StyleCard({
  id,
  name,
  description,
  ageRange,
  shoes,
  highlight,
}: DanceStyle) {
  const href = `${siteConfig.classesPath}?style=${encodeURIComponent(id)}#${siteConfig.classFinderSectionId}`

  return (
    <article className="bg-[#111916] border border-[rgba(45,212,191,0.12)] hover:border-[#2DD4BF]/20 transition-colors duration-200 p-6 flex flex-col gap-5 h-full">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2DD4BF] mb-3">
          {highlight}
        </p>
        <h3 className="font-display text-[clamp(22px,2.5vw,28px)] font-bold text-[#f0faf8] leading-tight">
          {name}
        </h3>
      </div>

      <p className="text-[13px] text-[#5C7A74] leading-relaxed flex-grow">
        {description}
      </p>

      <div className="flex flex-col gap-3 text-[12px] text-[#f0faf8]">
        <div className="flex items-start gap-2.5">
          <IconUsers className="shrink-0 mt-0.5 text-[#2DD4BF]/80" />
          <div>
            <span className="text-[#5C7A74] text-[10px] uppercase tracking-wider block mb-0.5">
              Ages
            </span>
            {ageRange}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <IconShoe className="shrink-0 mt-0.5 text-[#2DD4BF]/80" />
          <div>
            <span className="text-[#5C7A74] text-[10px] uppercase tracking-wider block mb-0.5">
              Shoes
            </span>
            {shoes}
          </div>
        </div>
      </div>

      <Link
        href={href}
        className="mt-auto inline-flex items-center justify-center w-full py-3 px-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-[#2DD4BF] no-underline transition-colors hover:bg-[#3ef0d8]"
      >
        {siteConfig.viewClassesCtaLabel}
      </Link>
    </article>
  )
}
