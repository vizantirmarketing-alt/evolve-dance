import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { buttonVariants } from '@/components/ui/button-styles'
import { urlFor } from '@/sanity/lib/image'
import {
  getProjectPage,
  type PortableTextBlock,
  type ProjectPage,
  type ProjectTeamLevel,
} from '@/sanity/lib/queries'
import { getTheProjectImage } from '@/lib/the-project-images'

const DEFAULT_DESCRIPTION =
  "The Project is Evolve Dance Center's competition team — serious training for serious dancers. Auditions held annually in May. Located in southwest Las Vegas."

const heroIntroComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-8 max-w-md text-[15px] font-light leading-[1.75] text-foreground-muted md:text-[16px]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="mb-6 font-display font-bold text-foreground"
        style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-teal pl-4 text-[14px] italic leading-[1.75] text-foreground-muted md:text-[15px]">
        {children}
      </blockquote>
    ),
  },
}

const pageIntroComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        className="mb-6 font-display font-bold text-foreground"
        style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-teal pl-4 text-[14px] italic leading-[1.75] text-foreground-muted md:text-[15px]">
        {children}
      </blockquote>
    ),
  },
}

function formatAuditionDate(date: string | null | undefined): string | null {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(parsed)
}

function splitPageIntro(pageIntro: PortableTextBlock[] | null | undefined) {
  const blocks = pageIntro ?? []
  return {
    hero: blocks.slice(0, 1),
    body: blocks.slice(1),
  }
}

function TeamLevelPhoto({ level }: { level: ProjectTeamLevel }) {
  const hasImage = Boolean(level.photo?.asset?._id)

  if (hasImage && level.photo) {
    const src = urlFor(level.photo).width(640).height(480).fit('crop').quality(85).auto('format').url()
    const alt = level.photo.alt?.trim() || `Photo of ${level.name} team level`

    return (
      <div className="mb-5 aspect-[4/3] w-full overflow-hidden rounded bg-background-warm">
        <Image src={src} alt={alt} width={640} height={480} className="h-full w-full object-cover" />
      </div>
    )
  }

  return <div className="mb-5 aspect-[4/3] w-full rounded bg-background-warm" aria-hidden />
}

function CtaLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  const isInternal = href.startsWith('/')

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectPage()

  return {
    title: 'The Project Competition Team',
    description: page?.seoDescription?.trim() || DEFAULT_DESCRIPTION,
    alternates: { canonical: '/the-project' },
    robots: { index: true, follow: true },
  }
}

export default async function TheProjectPage() {
  const page = await getProjectPage()

  if (!page) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-background pb-24 pt-24 md:pb-28 md:pt-28">
          <section className="px-6 md:px-16 lg:px-20">
            <div className="mx-auto max-w-md rounded-lg border border-border bg-background-warm px-8 py-12 text-center">
              <p className="text-[13px] leading-relaxed text-foreground-muted md:text-[14px]">Content coming soon.</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return <TheProjectPageContent page={page} />
}

function TheProjectPageContent({ page }: { page: ProjectPage }) {
  const { hero: heroIntro, body: bodyIntro } = splitPageIntro(page.pageIntro)
  const teamLevels = page.teamLevels ?? []
  const awards = page.awards ?? []
  const audition = page.auditionInfo
  const auditionDateLabel = formatAuditionDate(audition?.date)
  const teamLevelCount = teamLevels.length > 0 ? teamLevels.length : 3

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="px-6 pb-16 pt-16 md:px-16 md:pb-20 md:pt-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-7 bg-teal" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                    The Competition Team
                  </span>
                </div>
                <h1
                  className="font-display font-bold leading-[0.95] text-foreground"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
                >
                  The Project.
                </h1>
                <h2
                  className="mb-6 font-display font-bold italic leading-[0.95] text-foreground"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
                >
                  Where serious dancers train.
                </h2>
                {heroIntro.length > 0 ? (
                  <PortableText value={heroIntro} components={heroIntroComponents} />
                ) : null}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/the-project#audition"
                    className={buttonVariants({ variant: 'primary', size: 'wide' })}
                  >
                    Audition info →
                  </Link>
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: 'secondary', size: 'wide' })}
                  >
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded border border-border bg-background-warm">
                <Image
                  src={getTheProjectImage('studio-portrait-solo').src}
                  alt="Evolve Dance Project dancer in studio portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL={getTheProjectImage('studio-portrait-solo').placeholder}
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What it is */}
        <section className="bg-background-warm px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
              <div className="pt-2 text-[11px] uppercase tracking-[0.22em] text-foreground-muted md:text-[12px]">
                01 — What it is
              </div>
              <div>
                <h2
                  className="mb-6 font-display font-bold text-foreground"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
                >
                  A serious commitment for serious dancers.
                </h2>
                {bodyIntro.length > 0 ? (
                  <PortableText value={bodyIntro} components={pageIntroComponents} />
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-16 md:px-16 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 rounded-lg border border-border bg-background-warm p-10 md:grid-cols-4 md:gap-10 md:p-12">
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  15+
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                  Years competing
                </div>
              </div>
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  6
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                  Competitions / season
                </div>
              </div>
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  {teamLevelCount}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                  Team levels
                </div>
              </div>
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  100%
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                  Senior placement rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team levels */}
        <section className="bg-foreground px-6 py-20 md:px-16 md:py-28 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-px w-7 bg-white/40" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60 md:text-[12px]">
                  Team Levels
                </span>
                <div className="h-px w-7 bg-white/40" />
              </div>
              <h2
                className="font-display font-bold text-background"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.05' }}
              >
                Three levels. One team.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-white/65 md:text-[15px]">
                Dancers are placed by age, training, and audition performance.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {teamLevels.map((level, index) => (
                <div
                  key={`${level.name}-${level.order ?? index}`}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-8"
                >
                  <TeamLevelPhoto level={level} />
                  {level.ageRange ? (
                    <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-teal md:text-[12px]">
                      {level.ageRange}
                    </div>
                  ) : null}
                  <div className="mb-4 font-display font-bold text-background" style={{ fontSize: '26px', lineHeight: '1.1' }}>
                    {level.name}
                  </div>
                  {level.description ? (
                    <div className="mb-5 text-[14px] leading-[1.6] text-white/65 md:text-[15px]">
                      {level.description}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-7 bg-teal" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                    The Commitment
                  </span>
                </div>
                <h2
                  className="mb-5 font-display font-bold text-foreground"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
                >
                  What it takes.
                </h2>
                <p className="text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">
                  Project is a year-round commitment. Here&apos;s what families should expect.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                      Season
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      August through June, with competitions January through April.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                      Required classes
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      Ballet (weekly), jazz technique, plus level-specific genre classes.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                      Choreography camps
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      Mandatory team rehearsals in late summer to learn group routines.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                      Conventions
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      All Junior and Senior dancers attend at least one convention per season.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-foreground-muted md:text-[12px]">
                      Additional fees
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      Costumes, competition fees, and travel are billed separately from tuition. Detailed in the Project
                      agreement.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="bg-background-warm px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-px w-7 bg-teal" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                  Recent Achievements
                </span>
                <div className="h-px w-7 bg-teal" />
              </div>
              <h2
                className="font-display font-bold text-foreground"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.05' }}
              >
                Hard work, recognized.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {awards.map((award, index) => (
                <div key={`${award.title}-${award.year}-${index}`} className="rounded-lg border border-border bg-background p-7">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal md:text-[12px]">
                    {award.year} Season
                  </div>
                  <div className="mb-2 font-display font-bold text-foreground" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                    {award.placement}
                  </div>
                  <div className="text-[13px] leading-[1.6] text-foreground-muted md:text-[14px]">
                    {award.title} — {award.competition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">Gallery</span>
            </div>
            <h2
              className="mb-10 font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(28px, 3.5vw, 30px)', lineHeight: '1.1' }}
            >
              From the studio to the stage.
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="relative aspect-[16/9] overflow-hidden border border-border bg-background-warm md:col-span-3">
                <Image
                  src={getTheProjectImage('project-rehearsal-action').src}
                  alt="Evolve Dance Project dancers mid-rehearsal at the studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  placeholder="blur"
                  blurDataURL={getTheProjectImage('project-rehearsal-action').placeholder}
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden border border-border bg-background-warm">
                <Image
                  src={getTheProjectImage('studio-portrait-duo').src}
                  alt="Evolve Dance Project dancer in a studio portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={getTheProjectImage('studio-portrait-duo').placeholder}
                  className="object-cover object-center"
                />
              </div>
              <div className="relative aspect-[3/2] overflow-hidden border border-border bg-background-warm md:col-span-2">
                <Image
                  src={getTheProjectImage('award-driven-group').src}
                  alt="Evolve Dance Project team celebrating a first-place win at Driven Talent Competition"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  placeholder="blur"
                  blurDataURL={getTheProjectImage('award-driven-group').placeholder}
                  className="object-cover object-center"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden border border-border bg-background-warm md:col-span-3">
                <Image
                  src={getTheProjectImage('team-hall-of-fame').src}
                  alt="Evolve Dance Project team at the Hall of Fame Dance Challenge with awards"
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  placeholder="blur"
                  blurDataURL={getTheProjectImage('team-hall-of-fame').placeholder}
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Audition CTA */}
        <section id="audition" className="bg-background-warm px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                Auditions
              </span>
              <div className="h-px w-7 bg-teal" />
            </div>
            <h2
              className="mb-5 font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1' }}
            >
              Ready to join The Project?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[15px] leading-[1.7] text-foreground-muted">
              {audition?.ageRange ? (
                <>
                  Open to {audition.ageRange}.{' '}
                </>
              ) : null}
              {audition?.location ? (
                <>
                  Auditions at {audition.location}.{' '}
                </>
              ) : null}
              Auditions are held annually in May for the following season. New dancers and current Evolve students are
              both welcome to audition.
            </p>
            {auditionDateLabel ? (
              <div className="mb-8 inline-block rounded border border-teal/30 bg-teal/[0.12] px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-teal">
                Next Audition: {auditionDateLabel}
              </div>
            ) : null}
            <div className="flex flex-wrap justify-center gap-3">
              <CtaLink
                href={audition?.ctaLink?.trim() || '/contact'}
                className={buttonVariants({ variant: 'primary', surface: 'light', size: 'wide' })}
              >
                {audition?.ctaText?.trim() || 'Sign up for auditions →'}
              </CtaLink>
              <Link
                href="mailto:info@evolvedancecenter.com"
                className={buttonVariants({ variant: 'secondary', surface: 'light', size: 'wide' })}
              >
                Email us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
