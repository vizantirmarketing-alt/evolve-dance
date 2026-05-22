'use client'

import Image from 'next/image'
import Link from 'next/link'

import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { buttonVariants } from '@/components/ui/button-styles'
import { siteConfig } from '@/data/site'

function SectionEyebrow({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-3 md:mb-5">
      <div className={`h-px w-7 ${light ? 'bg-white/40' : 'bg-teal'}`} />
      <span
        className={`text-[11px] font-medium uppercase tracking-[0.22em] md:text-[12px] ${
          light ? 'text-white/60' : 'text-teal'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

const studioStats = [
  { num: '6', lbl: 'Dance Rooms' },
  { num: '22', lbl: 'Teachers' },
  { num: '18mo–18', lbl: 'Age Range' },
  { num: '2017', lbl: 'Established' },
] as const

export default function AboutContent() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="bg-background px-4 pb-14 pt-24 md:px-12 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <RevealOnScroll>
                <SectionEyebrow label="Our Story" />
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h1 className="font-display font-bold leading-[1.05] text-foreground text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
                  Built by dancers, for dancers
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="mt-5 max-w-lg text-[15px] font-light leading-[1.8] text-foreground-muted md:mt-6 md:text-[16px]">
                  Evolve Dance Center was founded in 2017 by Meghan Hoover and Cheryl Snow — two BFA-trained dance
                  professionals with a shared vision for what a Las Vegas dance studio could be. Exceptional training
                  across every genre, delivered in a place that actually feels like home.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={280}>
                <p className="mt-3 text-[13px] font-medium tracking-wide text-foreground-muted md:text-[14px]">
                  Established 2017 · Southwest Las Vegas
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={150}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#D4F1EF] md:aspect-[5/4]">
                <Image
                  src="/images/about-studio.jpg"
                  alt="Evolve Dance Center studio in Southwest Las Vegas — ballet class in session"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-[#1F1F1C]/5" aria-hidden />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section 2 — Founding Story */}
      <section className="bg-[#F7F5F1] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <RevealOnScroll>
                <SectionEyebrow label="How Evolve Started" />
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display font-bold leading-[1.08] text-[#1F1F1C] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
                  A dance studio built on real training
                </h2>
              </RevealOnScroll>
            </div>
            <div>
              <RevealOnScroll delay={150}>
                <p className="mb-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  In September 2017, Meghan Hoover and Cheryl Snow opened Evolve Dance Center in Southwest Las Vegas with
                  a clear vision — build the dance studio they wished had existed when they were dancers themselves.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={220}>
                <p className="mb-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  Both earned Bachelor of Fine Arts degrees in Dance and trained under some of the industry&apos;s most
                  respected teachers and choreographers throughout their educational and professional journeys. They have
                  performed professionally around the world, and their choreography has earned prestigious regional and
                  national awards, as well as recognition in collegiate concert dance.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={290}>
                <p className="text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  That experience shapes everything at Evolve Dance Center — from how technique is taught in every{' '}
                  <Link href="/classes" className="text-[#0ABAB5] underline-offset-2 hover:underline">
                    dance class
                  </Link>{' '}
                  to how dancers are encouraged to grow as artists. Every program at the studio reflects the standard
                  the co-founders set for themselves as professionals.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Co-Founders */}
      <section className="bg-[#FCFBF8] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <SectionEyebrow label="Meet Our Co-Founders" />
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="max-w-3xl font-display font-bold leading-[1.05] text-[#1F1F1C] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
              Meghan Hoover &amp; Cheryl Snow
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] font-light leading-[1.8] text-[#6D6C67] md:mt-5 md:text-[16px]">
              BFA-trained dance professionals leading Evolve Dance Center since 2017.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 md:gap-12">
            <RevealOnScroll delay={180}>
              <article className="relative border border-[#D6DFDA] bg-[#FCFBF8] p-6 md:p-8">
                <div
                  className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#0ABAB5] via-[#0ABAB5]/40 to-transparent"
                  aria-hidden
                />
                <h3 className="font-display text-[clamp(22px,2.5vw,28px)] font-bold leading-[1.1] text-[#1F1F1C]">
                  <Link href="/faculty" className="text-inherit no-underline transition-colors hover:text-[#0ABAB5]">
                    Meghan Hoover
                  </Link>
                </h3>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#0ABAB5] md:text-[13px]">
                  BFA in Dance · Co-Founder
                </p>
                <p className="mt-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  Meghan co-founded Evolve Dance Center with a vision for outstanding dance education in a
                  family-friendly environment. With a Bachelor of Fine Arts in Dance and extensive professional
                  performance experience worldwide, she brings deep technical training and award-winning choreography to
                  every program at the studio.
                </p>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={260}>
              <article className="relative border border-[#D6DFDA] bg-[#FCFBF8] p-6 md:p-8">
                <div
                  className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#0ABAB5] via-[#0ABAB5]/40 to-transparent"
                  aria-hidden
                />
                <h3 className="font-display text-[clamp(22px,2.5vw,28px)] font-bold leading-[1.1] text-[#1F1F1C]">
                  <Link href="/faculty" className="text-inherit no-underline transition-colors hover:text-[#0ABAB5]">
                    Cheryl Snow
                  </Link>
                </h3>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#0ABAB5] md:text-[13px]">
                  BFA in Dance · Co-Founder · Ballet, Contemporary
                </p>
                <p className="mt-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  Cheryl co-founded Evolve Dance Center alongside Meghan with the goal of building a studio that delivers
                  exceptional training across every genre. She holds a Bachelor of Fine Arts in Dance, has performed
                  professionally around the world, and leads{' '}
                  <Link href="/the-project" className="text-[#0ABAB5] underline-offset-2 hover:underline">
                    The Project
                  </Link>{' '}
                  — Evolve&apos;s pre-professional competition team.
                </p>
              </article>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={340}>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 md:mt-12">
              <Link
                href="/faculty"
                className="text-[11px] uppercase tracking-[0.18em] text-[#0ABAB5] no-underline border-b border-[#0ABAB5] pb-0.5 transition-colors hover:border-[#0ABAB5] md:text-[12px]"
              >
                Meet the full team →
              </Link>
              <Link
                href="/the-project"
                className="text-[11px] uppercase tracking-[0.18em] text-[#0ABAB5] no-underline border-b border-[#0ABAB5] pb-0.5 transition-colors hover:border-[#0ABAB5] md:text-[12px]"
              >
                The Project competition team →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 4 — Mission */}
      <section className="bg-[#F7F5F1] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <RevealOnScroll>
                <SectionEyebrow label="What We Believe" />
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display font-bold leading-[1.08] text-[#1F1F1C] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
                  Outstanding dance training, family-friendly environment
                </h2>
              </RevealOnScroll>
            </div>
            <div>
              <RevealOnScroll delay={150}>
                <p className="mb-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  At Evolve Dance Center, the mission has always been to provide outstanding dance education in a
                  supportive, family-friendly environment. Our faculty is made up of highly experienced instructors with
                  extensive professional backgrounds, all passionate about helping dancers grow both technically and
                  artistically.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={220}>
                <p className="text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  We emphasize strong foundational training across every style — creating versatile dancers who can
                  excel in any technique. Whether your dancer is exploring{' '}
                  <Link href="/classes" className="text-[#0ABAB5] underline-offset-2 hover:underline">
                    recreational dance classes
                  </Link>{' '}
                  for the first time or pursuing elite competitive training, Evolve Dance Center is a place where
                  dancers are encouraged to thrive, grow, and succeed. View our{' '}
                  <Link href="/schedule" className="text-[#0ABAB5] underline-offset-2 hover:underline">
                    class schedule
                  </Link>{' '}
                  to find the right fit.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — The Studio */}
      <section className="bg-[#0f2318] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <SectionEyebrow label="The Studio" light />
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="mb-5 max-w-3xl font-display font-bold leading-[1.05] text-[#f0faf8] text-[26px] md:mb-6 md:text-[clamp(28px,3.5vw,42px)]">
              Six rooms built for serious training
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={180}>
            <p className="mb-4 max-w-2xl text-[15px] font-light leading-[1.8] text-[#e2e8f0] md:text-[16px]">
              Six professional dance rooms with raised wood and marley flooring. Each room has viewing windows and a TV
              screen that broadcasts live video — so parents can see their dancers&apos; progress from the lobby.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={240}>
            <p className="mb-10 max-w-2xl text-[14px] leading-[1.7] text-[#94a3b8] md:mb-12 md:text-[15px]">
              {siteConfig.addressLine1}, {siteConfig.addressLine2}. Recreational to pre-professional programs for ages 18
              months to 18 years.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="grid grid-cols-2 gap-6 border border-[rgba(10,186,181,0.12)] bg-[#132a1f] p-8 md:grid-cols-4 md:gap-8 md:p-10">
              {studioStats.map((stat) => (
                <div key={stat.lbl} className="text-center md:text-left">
                  <div
                    className="font-display font-bold leading-none text-[#0ABAB5]"
                    style={{ fontSize: 'clamp(36px, 4vw, 48px)', textShadow: '0 0 30px rgba(10,186,181,0.2)' }}
                  >
                    {stat.num}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#94a3b8] md:text-[12px]">
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 6 — CTA */}
      <section className="relative overflow-hidden bg-[#1a2e2c] px-4 py-14 md:px-12 md:py-20">
        <div className="relative z-[1] mx-auto max-w-[580px] text-center">
          <RevealOnScroll>
            <h2 className="font-display font-bold leading-tight text-[#F7F5F1] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
              Come see the studio
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-[#F7F5F1]/75 md:text-[16px]">
              Visit us at {siteConfig.addressLine1} in southwest Las Vegas, or browse our schedule to find the right
              class for your dancer.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={220}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-[14px]">
              <Link
                href="/schedule"
                className={buttonVariants({
                  variant: 'primary',
                  surface: 'dark',
                  size: 'wide',
                  className: 'w-full whitespace-nowrap md:w-auto',
                })}
              >
                View Class Schedule
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({
                  variant: 'secondary',
                  surface: 'dark',
                  size: 'wide',
                  className: 'w-full whitespace-nowrap md:w-auto',
                })}
              >
                Contact Us
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
