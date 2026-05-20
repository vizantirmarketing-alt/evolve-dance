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
  { num: '2016', lbl: 'Established' },
] as const

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background px-4 pb-14 pt-24 md:px-12 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <RevealOnScroll>
                <SectionEyebrow label="About Evolve" />
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h1 className="font-display font-bold leading-[1.05] text-foreground text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
                  Where every dancer finds their place
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="mt-5 max-w-lg text-[15px] font-light leading-[1.8] text-foreground-muted md:mt-6 md:text-[16px]">
                  Evolve Dance Center strives to provide students with quality training and dance education. Our
                  dedicated staff believes in creating a positive yet disciplined atmosphere that focuses on building a
                  strong technical base while promoting self-confidence and a lasting passion for dance.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={280}>
                <p className="mt-3 text-[13px] font-medium tracking-wide text-foreground-muted md:text-[14px]">
                  Established 2016 · Southwest Las Vegas · 4.6★ on Google
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={150}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#D4F1EF] md:aspect-[5/4]">
                <Image
                  src="/images/about-studio.jpg"
                  alt="Dancers training at Evolve Dance Center in Las Vegas"
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

      {/* Mission */}
      <section className="bg-[#F7F5F1] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <RevealOnScroll>
                <SectionEyebrow label="Our Mission" />
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display font-bold leading-[1.08] text-[#1F1F1C] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
                  Quality training, lasting community
                </h2>
              </RevealOnScroll>
            </div>
            <div>
              <RevealOnScroll delay={150}>
                <p className="mb-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  Evolve Dance Center strives to provide students with quality training and dance education. Our
                  dedicated staff believes in creating a positive yet disciplined atmosphere that focuses on building a
                  strong technical base while promoting self-confidence and a lasting passion for dance.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={220}>
                <p className="text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  We create a friendly, family-oriented atmosphere where dancers receive quality training and form
                  positive, lifelong relationships.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* The Studio */}
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
              {siteConfig.addressLine1}, {siteConfig.addressLine2}. Recreational to pre-professional programs for ages
              18 months to 18 years.
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

      {/* Head team */}
      <section className="bg-[#FCFBF8] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <SectionEyebrow label="Meet Our Head Team" />
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="max-w-3xl font-display font-bold leading-[1.05] text-[#1F1F1C] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
              The leadership behind Evolve
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] font-light leading-[1.8] text-[#6D6C67] md:mt-5 md:text-[16px]">
              Together they shape the studio&apos;s culture, programs, and day-to-day operations.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 md:gap-12">
            <RevealOnScroll delay={180}>
              <article className="relative border border-[#D6DFDA] bg-[#FCFBF8] p-6 md:p-8">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#0ABAB5] via-[#0ABAB5]/40 to-transparent" aria-hidden />
                <h3 className="font-display text-[clamp(22px,2.5vw,28px)] font-bold leading-[1.1] text-[#1F1F1C]">
                  <Link href="/faculty" className="text-inherit no-underline transition-colors hover:text-[#0ABAB5]">
                    Cheryl Snow
                  </Link>
                </h3>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#0ABAB5] md:text-[13px]">
                  Ballet · Contemporary
                </p>
                <p className="mt-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  Cheryl brings classical foundations and contemporary expression to every level at Evolve. She also leads
                  The Project, our pre-professional competition team.
                </p>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={260}>
              <article className="relative border border-[#D6DFDA] bg-[#FCFBF8] p-6 md:p-8">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#0ABAB5] via-[#0ABAB5]/40 to-transparent" aria-hidden />
                <h3 className="font-display text-[clamp(22px,2.5vw,28px)] font-bold leading-[1.1] text-[#1F1F1C]">
                  <Link href="/faculty" className="text-inherit no-underline transition-colors hover:text-[#0ABAB5]">
                    Meghan Hoover
                  </Link>
                </h3>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#0ABAB5] md:text-[13px]">
                  Assistant Director
                </p>
                <p className="mt-4 text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
                  Meghan keeps Evolve running — from scheduling and family communications to studio operations and program
                  coordination.
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#1a2e2c] px-4 py-14 md:px-12 md:py-20">
        <div className="relative z-[1] mx-auto max-w-[580px] text-center">
          <RevealOnScroll>
            <h2 className="font-display font-bold leading-tight text-[#F7F5F1] text-[26px] md:text-[clamp(28px,3.5vw,42px)]">
              Come see the studio
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-[#F7F5F1]/75 md:text-[16px]">
              Visit us at {siteConfig.addressLine1} in southwest Las Vegas, or book a free trial to experience a class
              firsthand.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={220}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-[14px]">
              <Link
                href="/enroll#free-trial"
                className={buttonVariants({
                  variant: 'primary',
                  surface: 'dark',
                  size: 'wide',
                  className: 'w-full whitespace-nowrap md:w-auto',
                })}
              >
                Book a Free Trial
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
