'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
// ─────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 md:mb-3">
      <div className="w-7 h-px bg-teal opacity-100" />
      <span className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-teal font-medium opacity-100">{label}</span>
    </div>
  )
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────

const tickerItems = [
  'Ballet', 'Jazz', 'Hip Hop', 'Contemporary', 'Lyrical',
  'Acrobatics', 'Tap', 'Tumbling', 'Ballroom', 'Stretch & Pilates', 'Pom', 'Combo Classes',
]

export function TickerSection() {
  const items = [...tickerItems, ...tickerItems, ...tickerItems]
  const track = items.map((item, i) => (
    <span key={i} className="px-10 text-[12px] font-semibold tracking-[0.2em] uppercase text-white flex-shrink-0 md:text-[13px]">
      {item}
      {i < items.length - 1 && <span className="text-white ml-4">·</span>}
    </span>
  ))

  return (
    <div className="bg-[#0ABAB5] py-[13px] overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        {track}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────

export function AboutSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      {/* Left */}
      <div className="col-span-full md:col-span-1 bg-[#FCFBF8] px-4 py-16 md:px-16 md:py-24 flex flex-col justify-center relative overflow-hidden">
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-px h-[120px] bg-gradient-to-b from-teal to-transparent" />
        <div className="absolute top-0 left-0 h-px w-[120px] bg-gradient-to-r from-teal to-transparent" />
        {/* Watermark */}
        <div
          className="absolute -bottom-10 -right-5 font-display font-black text-[#0ABAB5] pointer-events-none select-none leading-none tracking-tight"
          style={{ fontSize: 280, color: 'rgba(10,186,181,0.025)' }}
        >
          E
        </div>

        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-[#0ABAB5] opacity-100" />
            <span className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#0ABAB5] font-medium opacity-100">Our Studio</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-display font-bold leading-[1.08] mb-6 text-[#1F1F1C]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
          >
            A higher standard studio experience
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mb-3 max-w-[420px] text-[15px] font-light leading-[1.8] text-[#6D6C67] md:mb-4 md:text-[16px]">
            At Evolve Dance Center, training goes beyond technique. We create an environment where dancers build
            confidence, discipline, artistry, and a strong foundation for long-term growth.
          </p>
          <p className="mb-3 max-w-[420px] text-[15px] font-light leading-[1.8] text-[#6D6C67] md:mb-4 md:text-[16px]">
            Whether a student is stepping into their first class or pursuing a more advanced path, our studio is
            built to support every stage with care, structure, and expert instruction.
          </p>
          <p className="mb-11 max-w-[420px] text-[15px] font-light leading-[1.8] text-[#6D6C67] md:text-[16px]">
            Supportive culture, experienced faculty, and training designed to help dancers grow with purpose.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-4 text-center md:mx-0 md:flex md:max-w-none md:gap-10 md:text-left">
            {[
              { num: '6',    lbl: 'Dance Rooms' },
              { num: '18mo', lbl: 'Youngest Dancer' },
              { num: '2016', lbl: 'Est. Las Vegas' },
            ].map(s => (
              <div key={s.lbl} className="text-center md:text-left">
                <div className="font-display text-[40px] font-bold leading-none text-[#0ABAB5]" style={{ textShadow: '0 0 30px rgba(10,186,181,0.2)' }}>
                  {s.num}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#6D6C67] md:text-[12px]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Right — studio image */}
      <div className="relative overflow-hidden h-[280px] md:h-auto bg-[#D4F1EF]">
        <img
          src="/images/about-studio.jpg"
          alt="Young dancers in ballet class at Evolve Dance Center"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1F1F1C]/5" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// WHY FAMILIES CHOOSE
// ─────────────────────────────────────────

const whyFamiliesCards = [
  {
    num: '01',
    title: 'Expert Faculty',
    body:
      'Our instructors bring experience, professionalism, and a commitment to helping every dancer build strong technique and confidence.',
  },
  {
    num: '02',
    title: 'Training with Purpose',
    body:
      'Each class is designed to develop more than movement — shaping discipline, artistry, performance quality, and long-term progression.',
  },
  {
    num: '03',
    title: 'A Path for Every Dancer',
    body:
      'From recreational programs to more advanced opportunities, dancers can grow at their own pace in a studio that supports both joy and excellence.',
  },
  {
    num: '04',
    title: 'A Studio Culture That Matters',
    body:
      'We believe high standards and a positive environment should go hand in hand — creating a space where dancers feel encouraged, challenged, and proud.',
  },
] as const

export function WhyFamiliesChooseSection() {
  return (
    <section
      id="why-families-choose"
      className="bg-[#0f2318] px-4 py-16 md:px-12 md:py-16"
    >
      <Reveal>
        <SectionEyebrow label="Why Families Choose Evolve" />
      </Reveal>
      <Reveal delay={100}>
        <h2 className="font-display mb-10 max-w-3xl text-[clamp(28px,3.5vw,42px)] font-bold leading-none text-[#f0faf8] md:mb-8">
          What makes Evolve different
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-px bg-[rgba(10,186,181,0.06)] sm:grid-cols-2 md:gap-4">
        {whyFamiliesCards.map((card, i) => (
          <Reveal key={card.title} delay={120 + i * 80}>
            <WhyFamilyCard {...card} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WhyFamilyCard({ num, title, body }: (typeof whyFamiliesCards)[number]) {
  return (
    <div className="group relative flex flex-col overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0f2318] px-6 py-6 transition-colors duration-300 hover:bg-[#132a1f] md:min-h-[160px] md:p-6">
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

      <div className="relative z-[1]">
        <div className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-[#94a3b8] transition-colors duration-300 group-hover:text-teal md:mb-4 md:text-[12px]">
          {num} — {title}
        </div>
        <div className="font-display mb-2 text-[clamp(17px,2.2vw,22px)] font-bold leading-[1.1] text-[#f0faf8] md:mb-2">{title}</div>
        <div className="max-w-[92%] text-[13px] leading-[1.6] text-[#e2e8f0] md:max-w-none md:text-[14px]">{body}</div>
      </div>

    </div>
  )
}

// ─────────────────────────────────────────
// CLASSES
// ─────────────────────────────────────────

const classes = [
  {
    id: 'ballet',
    num: '01',
    name: 'Ballet',
    letter: 'B',
    ages: 'Ages 3–18',
    desc: 'Precision, grace, and classical technique. Barre, center, across the floor, and pointe progressions for all levels.',
    href: '/classes',
    /** Add `/public/programs/*.jpg` when photography is ready — mobile gallery uses placeholder until set */
    image: undefined as string | undefined,
  },
  {
    id: 'jazz',
    num: '02',
    name: 'Jazz',
    letter: 'J',
    ages: 'Ages 4–18',
    desc: 'High energy performance flair. Parallel movement, technique, and combinations taught from the ground up.',
    href: '/classes',
    image: undefined as string | undefined,
  },
  {
    id: 'hip-hop',
    num: '03',
    name: 'Hip Hop',
    letter: 'H',
    ages: 'Ages 5–18',
    desc: 'Street styles, groove-based movement, and freestyle expression — rooted in culture and rhythm.',
    href: '/classes',
    image: undefined as string | undefined,
  },
  {
    id: 'contemporary',
    num: '04',
    name: 'Contemporary',
    letter: 'C',
    ages: 'Ages 6–18',
    desc: 'A free, expressive style blending classical modern, jazz, and fluid improvisation. Requires ballet enrollment.',
    href: '/classes',
    image: undefined as string | undefined,
  },
]

export function ClassesSection() {
  return (
    <section className="bg-[#F7F5F1] px-4 py-10 md:px-12 md:py-28">
      <Reveal>
        <div className="flex items-center gap-3 mb-1 md:mb-6">
          <div className="w-7 h-px bg-[#0ABAB5] opacity-100" />
          <span className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#0ABAB5] font-medium opacity-100">What We Teach</span>
        </div>
      </Reveal>
      <div className="mb-3 flex flex-col gap-0 md:mb-14 md:gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal delay={100}>
          <>
            <h2 className="font-display font-bold max-w-3xl text-[#1F1F1C] text-[26px] leading-[1.05] mb-1 md:mb-0 md:leading-none md:text-[clamp(28px,3.5vw,42px)]">
              Programs designed for every stage of growth
            </h2>
            <p className="mb-2 max-w-2xl text-[15px] font-light text-[#6D6C67] leading-snug md:mb-0 md:mt-4 md:text-[16px] md:leading-relaxed">
              From early movement classes to advanced training, our programs are built to meet dancers where they are and help them progress with confidence.
            </p>
          </>
        </Reveal>
        <Reveal>
          <Link href="/classes" className="mt-1 self-start text-[11px] tracking-[0.18em] uppercase text-[#0ABAB5] no-underline border-b border-[#0ABAB5] pb-0.5 md:mt-0 md:text-[12px] md:mb-1.5 hover:border-[#0ABAB5] transition-colors">
            View All Classes →
          </Link>
        </Reveal>
      </div>

      {/* Mobile: horizontal scroll-snap gallery */}
      <div className="md:hidden -mx-4">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-0">
          {classes.map(program => (
            <article
              key={program.id}
              className="w-[85vw] shrink-0 snap-start overflow-hidden rounded-sm bg-[#F5F2EC]"
            >
              <div className="relative h-[100px] bg-[var(--teal-light)] md:aspect-[3/2] md:h-auto">
                {program.image ? (
                  <Image src={program.image} alt={program.name} fill className="object-cover" sizes="85vw" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-lg text-[#0ABAB5]/40 md:text-2xl">{program.name}</span>
                  </div>
                )}
              </div>
              <div className="px-4 py-4">
                <p className="mb-1 text-[12px] font-medium tracking-wider text-[#1F1F1C]/60 md:text-[13px]">
                  {program.num} — {program.name}
                </p>
                <h3 className="font-display mb-2 text-[clamp(17px,2.2vw,22px)] font-bold text-[#1F1F1C]">{program.name}</h3>
                <p className="mb-3 text-[13px] leading-snug text-[#1F1F1C]/70 md:text-[14px] md:leading-[1.6]">
                  {program.desc}
                </p>
                <div className="flex items-center justify-between border-t border-[#1F1F1C]/10 pt-3">
                  <span className="text-[12px] tracking-wider text-[#0ABAB5] md:text-[13px]">{program.ages}</span>
                  <Link
                    href={program.href}
                    className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#0ABAB5] text-[#0ABAB5] transition-colors hover:bg-[#0ABAB5] hover:text-white"
                    aria-label={`View ${program.name} classes`}
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-1.5 pb-0 md:hidden">
        {classes.map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#1F1F1C]/20" aria-hidden />
        ))}
      </div>

      {/* Desktop: existing grid (unchanged) */}
      <div className="hidden gap-px bg-[#D6DFDA] md:grid md:grid-cols-2 lg:grid-cols-4">
        {classes.map((cls, i) => (
          <Reveal key={cls.name} delay={i * 80}>
            <ClassCard {...cls} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ClassCard({ num, name, letter, ages, desc }: typeof classes[0]) {
  return (
    <div className="group bg-[#FCFBF8] border border-[#D6DFDA] p-6 md:p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between transition-colors duration-300 hover:border-[#0ABAB5]">
      {/* Bottom teal bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
      {/* Bg letter */}
      <div
        className="absolute -bottom-4 -right-2 font-display font-black leading-none pointer-events-none transition-colors duration-300 group-hover:opacity-[0.055]"
        style={{ fontSize: 130, color: 'rgba(10,186,181,0.03)' }}
      >
        {letter}
      </div>

      <div>
        <div className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] text-[#6D6C67] mb-5 transition-colors duration-300 group-hover:text-[#0ABAB5]">
          {num} — {name}
        </div>
        <div className="font-display text-[clamp(17px,2.2vw,22px)] font-bold leading-[1.1] mb-3 text-[#1F1F1C]">{name}</div>
        <div className="text-[13px] text-[#6D6C67] leading-[1.6] flex-grow md:text-[14px]">{desc}</div>
      </div>

      <div className="flex items-center justify-between mt-7 pt-5 border-t border-[#D6DFDA]">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#0ABAB5] md:text-[12px]">{ages}</span>
        <div className="w-[30px] h-[30px] border border-[#0ABAB5] flex items-center justify-center text-[#0ABAB5] text-sm transition-all duration-200 group-hover:bg-[#0ABAB5] group-hover:text-black group-hover:shadow-[0_0_16px_rgba(10,186,181,0.4)] group-hover:border-[#0ABAB5]">
          →
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// INSTRUCTORS PREVIEW
// ─────────────────────────────────────────

const instructors = [
  { name: 'Cheryl Snow',      role: 'Director · Ballet · Contemporary' },
  { name: 'Meghan Hoover',    role: 'Jazz · Hip Hop' },
  { name: 'Alannah Newcomer', role: 'Lyrical · Contemporary' },
  { name: 'Brooke DeSoto',    role: 'Acro · Tumbling' },
  { name: 'Eric Lehn',        role: 'Hip Hop · Jazz' },
  { name: '+ 17 More',        role: 'View All Faculty →' },
]

export function InstructorsSection() {
  return (
    <section className="bg-[#F7F5F1] px-4 py-10 md:px-12 md:py-24 overflow-hidden">
      <Reveal>
        <div className="flex items-center gap-3 mb-3 md:mb-6">
          <div className="w-7 h-px bg-[#0ABAB5] opacity-100" />
          <span className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#0ABAB5] font-medium opacity-100">The Faculty</span>
        </div>
      </Reveal>
      <div className="mb-4 flex flex-col gap-3 md:mb-12 md:gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal delay={100}>
          <>
            <h2 className="font-display font-bold max-w-3xl text-[#1F1F1C] leading-none mb-3 text-[26px] md:mb-0 md:text-[clamp(28px,3.5vw,42px)]">
              Meet the faculty behind the training
            </h2>
            <p className="mt-0 mb-4 max-w-2xl text-[15px] font-light text-[#6D6C67] leading-snug md:mt-4 md:mb-0 md:text-[16px] md:leading-[1.75]">
              Our team brings the experience, care, and high standards that shape confident dancers and meaningful progress in every class.
            </p>
          </>
        </Reveal>
        <Link href="/faculty" className="self-start text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-[#0ABAB5] no-underline border-b border-[#0ABAB5] pb-0.5 md:mb-1.5 hover:border-[#0ABAB5] transition-colors">
          Full Faculty →
        </Link>
      </div>

      <Reveal>
        <>
          <div className="hidden md:flex gap-0.5 bg-[#D6DFDA]">
            {instructors.map(inst => (
              <div
                key={inst.name}
                className="group relative flex min-h-[190px] min-w-0 flex-1 cursor-pointer overflow-hidden bg-[#FCFBF8] transition-colors duration-300 hover:bg-[#D4F1EF]"
              >
                {/* Top teal bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

                <div className="absolute bottom-0 left-0 right-0 z-[1] px-4 py-5">
                  <div className="font-display text-[15px] font-bold leading-[1.1] mb-1.5 text-[#1F1F1C] whitespace-nowrap tracking-tight">
                    {inst.name}
                  </div>
                  <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#0ABAB5] md:text-[12px]">
                    {inst.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden -mx-4">
            <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-0">
              {instructors.map(inst => {
                const body = (
                  <>
                    <div className="mt-auto">
                      <div className="font-display text-[clamp(17px,2.2vw,22px)] font-bold leading-[1.1] text-[#1F1F1C]">{inst.name}</div>
                      <div className="mt-1.5 text-[12px] font-medium text-[#0ABAB5] md:text-[13px]">{inst.role}</div>
                    </div>
                  </>
                )
                return (
                  <article
                    key={inst.name}
                    className="relative flex aspect-[5/4] w-[58vw] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-[#D6DFDA] bg-[#FCFBF8] px-5 py-4"
                  >
                    {inst.name === '+ 17 More' ? (
                      <Link href="/faculty" className="flex h-full flex-col text-left no-underline text-inherit">
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </article>
                )
              })}
            </div>
          </div>
          <div className="mt-1 flex justify-center gap-1.5 md:hidden">
            {instructors.map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#1F1F1C]/20" aria-hidden />
            ))}
          </div>
        </>
      </Reveal>
    </section>
  )
}
// ─────────────────────────────────────────
// ENROLL CTA
// ─────────────────────────────────────────

export function EnrollSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a2e2c] px-4 py-14 md:px-12 md:py-20">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          className="enroll-ribbon--1"
          d="M 0 240 Q 200 100, 400 240 T 800 240 T 1200 240"
          stroke="#3E9F97"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.6}
        />
        <path
          className="enroll-ribbon--2"
          d="M 0 180 Q 250 350, 500 180 T 1000 180 T 1200 180"
          stroke="#3E9F97"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.3}
        />
        <path
          className="enroll-ribbon--3"
          d="M 0 320 Q 300 200, 600 320 T 1200 320"
          stroke="#3E9F97"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.4}
        />
        <path
          className="enroll-ribbon--4"
          d="M 100 400 Q 400 100, 700 400 T 1300 200"
          stroke="#3E9F97"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.5}
        />
      </svg>

      <div className="relative z-[1] mx-auto max-w-[580px] text-center">
        <Reveal>
          <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#3E9F97] md:mb-6 md:text-[12px]">
            Ready to Begin?
          </span>
          <h2 className="font-display font-bold leading-tight text-[32px] text-[#F7F5F1] md:text-[clamp(36px,5vw,56px)] md:leading-[1.08]">
            Where movement{' '}
            <em className="italic text-[#3E9F97]">becomes art</em>.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-[#F7F5F1]/75 md:mt-5 md:text-[16px] md:leading-[1.75]">
            Whether your dancer is just beginning or ready for more advanced training, we&apos;re here to help them grow.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 md:mt-8 md:flex-row md:gap-[14px]">
            <Link
              href="/enroll"
              className="inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap no-underline text-[12px] font-semibold uppercase tracking-wide text-[#F7F5F1] bg-[#3E9F97] px-8 py-3.5 transition-colors duration-200 hover:bg-[#358f88] md:w-auto md:py-4 md:text-[13px]"
            >
              Enroll Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/schedule"
              className="inline-flex w-full items-center justify-center whitespace-nowrap no-underline text-[12px] font-medium uppercase tracking-wide text-[#F7F5F1] bg-transparent border border-[rgba(247,245,241,0.4)] px-8 py-3.5 transition-colors duration-200 hover:border-[rgba(247,245,241,0.7)] md:w-auto md:py-4 md:text-[13px]"
            >
              View Class Schedule
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
