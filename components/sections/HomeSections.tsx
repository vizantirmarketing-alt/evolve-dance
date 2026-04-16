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
    <div className="flex items-center gap-3 mb-6">
      <div className="w-7 h-px bg-teal opacity-100" />
      <span className="text-[10px] tracking-[0.22em] uppercase text-teal font-medium opacity-100">{label}</span>
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
    <span key={i} className="px-10 text-[11px] font-semibold tracking-[0.2em] uppercase text-white flex-shrink-0">
      {item}
      {i < items.length - 1 && <span className="text-white ml-4">·</span>}
    </span>
  ))

  return (
    <div className="bg-[#3E9F97] py-[13px] overflow-hidden">
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
          className="absolute -bottom-10 -right-5 font-display font-black text-[#2dd4bf] pointer-events-none select-none leading-none tracking-tight"
          style={{ fontSize: 280, color: 'rgba(45,212,191,0.025)' }}
        >
          E
        </div>

        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-[#3E9F97] opacity-100" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#3E9F97] font-medium opacity-100">Our Studio</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-display font-bold leading-[1.08] mb-6 text-[#1F1F1C]"
            style={{ fontSize: 'clamp(36px, 4vw, 54px)' }}
          >
            A higher standard studio experience
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[15px] font-light text-[#6D6C67] leading-[1.8] max-w-[420px] mb-4">
            At Evolve Dance Center, training goes beyond technique. We create an environment where dancers build
            confidence, discipline, artistry, and a strong foundation for long-term growth. Whether a student is
            stepping into their first class or pursuing a more advanced path, our studio is built to support every
            stage with care, structure, and expert instruction.
          </p>
          <p className="text-[15px] font-light text-[#6D6C67] leading-[1.8] max-w-[420px] mb-11">
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
                <div className="font-display text-[40px] font-bold leading-none text-[#3E9F97]" style={{ textShadow: '0 0 30px rgba(62,159,151,0.2)' }}>
                  {s.num}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#6D6C67]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Right — studio image */}
      <div className="relative overflow-hidden h-[280px] md:h-auto bg-[#EAF3F0]">
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
    letter: 'E',
    body:
      'Our instructors bring experience, professionalism, and a commitment to helping every dancer build strong technique and confidence.',
  },
  {
    num: '02',
    title: 'Training with Purpose',
    letter: 'T',
    body:
      'Each class is designed to develop more than movement — shaping discipline, artistry, performance quality, and long-term progression.',
  },
  {
    num: '03',
    title: 'A Path for Every Dancer',
    letter: 'P',
    body:
      'From recreational programs to more advanced opportunities, dancers can grow at their own pace in a studio that supports both joy and excellence.',
  },
  {
    num: '04',
    title: 'A Studio Culture That Matters',
    letter: 'C',
    body:
      'We believe high standards and a positive environment should go hand in hand — creating a space where dancers feel encouraged, challenged, and proud.',
  },
] as const

export function WhyFamiliesChooseSection() {
  return (
    <section className="bg-[#0f2318] px-4 py-28 md:px-12">
      <Reveal>
        <SectionEyebrow label="Why Families Choose Evolve" />
      </Reveal>
      <Reveal delay={100}>
        <h2
          className="font-display font-bold text-[#f0faf8] leading-none mb-14"
          style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
        >
          What makes Evolve different
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(45,212,191,0.06)]">
        {whyFamiliesCards.map((card, i) => (
          <Reveal key={card.title} delay={120 + i * 80}>
            <WhyFamilyCard {...card} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WhyFamilyCard({ num, title, letter, body }: (typeof whyFamiliesCards)[number]) {
  return (
    <div className="group bg-[#0f2318] border border-[rgba(255,255,255,0.08)] p-6 md:p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between transition-colors duration-300 hover:bg-[#132a1f]">
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
      <div
        className="absolute -bottom-4 -right-2 font-display font-black leading-none pointer-events-none transition-colors duration-300 group-hover:opacity-[0.055]"
        style={{ fontSize: 130, color: 'rgba(45,212,191,0.03)' }}
      >
        {letter}
      </div>

      <div>
        <div className="text-[10px] font-semibold tracking-[0.22em] text-[#94a3b8] mb-5 transition-colors duration-300 group-hover:text-teal">
          {num} — {title}
        </div>
        <div className="font-display text-[26px] font-bold leading-[1.1] mb-3 text-[#f0faf8]">{title}</div>
        <div className="text-[12px] text-[#e2e8f0] leading-[1.65] flex-grow">{body}</div>
      </div>

      <div className="mt-7 pt-5 border-t border-[rgba(45,212,191,0.06)]" aria-hidden />
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
    <section className="bg-[#F7F5F1] px-4 py-28 md:px-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-14">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-px bg-[#3E9F97] opacity-100" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#3E9F97] font-medium opacity-100">What We Teach</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <>
              <h2 className="font-display font-bold text-[#1F1F1C] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
                Programs designed for every stage of growth
              </h2>
              <p className="text-[15px] font-light text-[#6D6C67] leading-[1.75]">
                From early movement classes to advanced training, our programs are built to meet dancers where they are and help them progress with confidence.
              </p>
            </>
          </Reveal>
        </div>
        <Reveal>
          <Link href="/classes" className="text-[10px] tracking-[0.18em] uppercase text-[#3E9F97] no-underline border-b border-[#3E9F97] pb-0.5 mb-1.5 hover:border-[#3E9F97] transition-colors">
            View All Classes →
          </Link>
        </Reveal>
      </div>

      {/* Mobile: horizontal scroll-snap gallery */}
      <div className="md:hidden -mx-4">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {classes.map(program => (
            <article
              key={program.id}
              className="w-[85vw] shrink-0 snap-start overflow-hidden rounded-sm bg-[#F5F2EC]"
            >
              <div className="relative aspect-[4/5] bg-[var(--teal-light)]">
                {program.image ? (
                  <Image src={program.image} alt={program.name} fill className="object-cover" sizes="85vw" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-3xl text-[#1D9E75]/40">{program.name}</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="mb-2 text-xs tracking-wider text-[#1F1F1C]/60">
                  {program.num} — {program.name}
                </p>
                <h3 className="font-display mb-3 text-2xl font-bold text-[#1F1F1C]">{program.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[#1F1F1C]/70">
                  {program.desc}
                </p>
                <div className="flex items-center justify-between border-t border-[#1F1F1C]/10 pt-4">
                  <span className="text-xs tracking-wider text-[#1D9E75]">{program.ages}</span>
                  <Link
                    href={program.href}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#1D9E75] text-[#1D9E75] transition-colors hover:bg-[#1D9E75] hover:text-white"
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
      <div className="mt-6 flex justify-center gap-1.5 md:hidden">
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
    <div className="group bg-[#FCFBF8] border border-[#D6DFDA] p-6 md:p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between transition-colors duration-300 hover:border-[#3E9F97]">
      {/* Bottom teal bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
      {/* Bg letter */}
      <div
        className="absolute -bottom-4 -right-2 font-display font-black leading-none pointer-events-none transition-colors duration-300 group-hover:opacity-[0.055]"
        style={{ fontSize: 130, color: 'rgba(45,212,191,0.03)' }}
      >
        {letter}
      </div>

      <div>
        <div className="text-[10px] font-semibold tracking-[0.22em] text-[#6D6C67] mb-5 transition-colors duration-300 group-hover:text-[#3E9F97]">
          {num} — {name}
        </div>
        <div className="font-display text-[26px] font-bold leading-[1.1] mb-3 text-[#1F1F1C]">{name}</div>
        <div className="text-[12px] text-[#6D6C67] leading-[1.65] flex-grow">{desc}</div>
      </div>

      <div className="flex items-center justify-between mt-7 pt-5 border-t border-[#D6DFDA]">
        <span className="text-[9px] tracking-[0.18em] uppercase text-[#3E9F97]">{ages}</span>
        <div className="w-[30px] h-[30px] border border-[#3E9F97] flex items-center justify-center text-[#3E9F97] text-sm transition-all duration-200 group-hover:bg-[#3E9F97] group-hover:text-black group-hover:shadow-[0_0_16px_rgba(45,212,191,0.4)] group-hover:border-[#3E9F97]">
          →
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// SCHEDULE PREVIEW
// ─────────────────────────────────────────

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const scheduleData = [
  { time: '4:00 PM', cls: 'Combo — Tap + Ballet',        instructor: 'Miss Ashley',   ages: 'Ages 2.5–5',  status: 'open' },
  { time: '4:45 PM', cls: 'Ballet Level 2',               instructor: 'Miss Rebeca',   ages: 'Ages 6–8',    status: 'open' },
  { time: '5:30 PM', cls: 'Hip Hop — Beginner',           instructor: 'Mr. Marcus',    ages: 'Ages 7–10',   status: 'full' },
  { time: '6:15 PM', cls: 'Jazz Level 3',                  instructor: 'Miss Danielle', ages: 'Ages 10–13',  status: 'open' },
  { time: '7:00 PM', cls: 'Contemporary — Advanced',      instructor: 'Miss Rebeca',   ages: 'Ages 14–18',  status: 'open' },
  { time: '7:45 PM', cls: 'Ballet Level 6 — Invite Only', instructor: 'Miss Rebeca',   ages: 'Ages 16+',    status: 'full' },
]

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState('Monday')

  return (
    <section className="bg-[#0f2318] px-4 py-28 md:px-12">
      <Reveal><SectionEyebrow label="This Week" /></Reveal>
      <div className="mt-4 mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal delay={100}>
          <>
            <h2 className="font-display font-bold text-[#f0faf8] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
              Class <em className="italic text-teal">schedule</em>
            </h2>
            <p className="text-[15px] font-light text-[#e2e8f0] leading-[1.8]">
              {siteConfig.scheduleIntro}
            </p>
          </>
        </Reveal>
        <Link href="/classes#schedule" className="text-[10px] tracking-[0.18em] uppercase text-teal no-underline border-b border-[rgba(45,212,191,0.3)] pb-0.5 mb-1.5 hover:border-teal transition-colors">
          Full Schedule →
        </Link>
      </div>

      {/* Day tabs */}
      <div className="flex gap-0 border-b border-[rgba(45,212,191,0.12)] mb-12 overflow-x-auto">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={cn(
              'text-[10px] font-medium tracking-[0.16em] uppercase px-6 py-3.5',
              'border-b-2 -mb-px transition-colors duration-200 whitespace-nowrap',
              activeDay === day
                ? 'text-white border-teal'
                : 'text-[#94a3b8] border-transparent hover:text-white'
            )}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="sm:hidden divide-y divide-[rgba(45,212,191,0.08)]">
        {scheduleData.map((c, i) => (
          <div key={i} className="py-4 flex items-start justify-between gap-2">
            <div>
              <div className="font-serif text-lg text-teal">{c.time}</div>
              <div className="font-medium text-sm text-[#f1f5f9] mt-0.5">{c.cls}</div>
              <div className="text-xs text-[#cbd5e1] mt-0.5">
                {c.instructor} · {c.ages}
              </div>
            </div>
            <div>
              <span className={cn(
                'inline-block px-3 py-1 text-[9px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap',
                c.status === 'open'
                  ? 'bg-[rgba(45,212,191,0.1)] text-teal border border-[rgba(45,212,191,0.2)]'
                  : 'bg-[rgba(255,107,107,0.08)] text-[#ff6b6b] border border-[rgba(255,107,107,0.15)]'
              )}>
                {c.status === 'open' ? 'Open' : 'Full'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="hidden sm:table w-full border-collapse schedule-table">
        <thead>
          <tr>
            {['Time', 'Class', 'Instructor', 'Ages', 'Status'].map(h => (
              <th key={h} className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[#94a3b8] text-left pb-3 border-b border-[rgba(45,212,191,0.12)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((row, i) => (
            <tr key={i} className="schedule-row border-b border-[rgba(45,212,191,0.06)] last:border-0 transition-colors duration-150">
              <td className="py-[18px] font-display text-[18px] text-teal w-32">{row.time}</td>
              <td className="py-[18px] font-medium text-[13.5px] text-[#f1f5f9]">{row.cls}</td>
              <td className="py-[18px] text-[12px] text-[#cbd5e1]">{row.instructor}</td>
              <td className="py-[18px] text-[10px] tracking-[0.12em] uppercase text-[#cbd5e1]">{row.ages}</td>
              <td className="py-[18px]">
                <span className={cn(
                  'inline-block px-3 py-1 text-[9px] font-semibold tracking-[0.12em] uppercase',
                  row.status === 'open'
                    ? 'bg-[rgba(45,212,191,0.1)] text-teal border border-[rgba(45,212,191,0.2)]'
                    : 'bg-[rgba(255,107,107,0.08)] text-[#ff6b6b] border border-[rgba(255,107,107,0.15)]'
                )}>
                  {row.status === 'open' ? 'Open' : 'Full'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

// ─────────────────────────────────────────
// INSTRUCTORS PREVIEW
// ─────────────────────────────────────────

const instructors = [
  { name: 'Cheryl Snow',      role: 'Director · Ballet · Contemporary', initial: 'C' },
  { name: 'Meghan Hoover',    role: 'Jazz · Hip Hop',                   initial: 'M' },
  { name: 'Alannah Newcomer', role: 'Lyrical · Contemporary',           initial: 'A' },
  { name: 'Brooke DeSoto',    role: 'Acro · Tumbling',                  initial: 'B' },
  { name: 'Eric Lehn',        role: 'Hip Hop · Jazz',                   initial: 'E' },
  { name: '+ 17 More',        role: 'View All Faculty →',               initial: '+' },
]

export function InstructorsSection() {
  return (
    <section className="bg-[#F7F5F1] px-4 py-28 md:px-12 overflow-hidden">
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-px bg-[#3E9F97] opacity-100" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#3E9F97] font-medium opacity-100">The Faculty</span>
        </div>
      </Reveal>
      <div className="mt-4 mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal delay={100}>
          <>
            <h2 className="font-display font-bold text-[#1F1F1C] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
              Meet the faculty behind the training
            </h2>
            <p className="text-[15px] font-light text-[#6D6C67] leading-[1.75]">
              Our team brings the experience, care, and high standards that shape confident dancers and meaningful progress in every class.
            </p>
          </>
        </Reveal>
        <Link href="/faculty" className="text-[10px] tracking-[0.18em] uppercase text-[#3E9F97] no-underline border-b border-[#3E9F97] pb-0.5 mb-1.5 hover:border-[#3E9F97] transition-colors">
          Full Faculty →
        </Link>
      </div>

      <Reveal>
        <>
          <div className="hidden md:flex instructor-strip bg-[#D6DFDA]">
            {instructors.map(inst => (
              <div
                key={inst.name}
                className="instructor-card group bg-[#FCFBF8] hover:bg-[#EAF3F0] relative overflow-hidden min-h-[300px] cursor-pointer transition-colors duration-300"
              >
                {/* Top teal bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

                {/* Initial watermark */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-display font-black leading-none pointer-events-none text-[#3E9F97]/10 transition-all duration-400 group-hover:opacity-[0.1] group-hover:-translate-y-[65%]"
                  style={{ fontSize: 100 }}
                >
                  {inst.initial}
                </div>

                <div className="absolute bottom-6 left-6 z-[1]">
                  <div className="font-display text-[20px] font-bold leading-[1.1] mb-1 text-[#1F1F1C]">
                    {inst.name}
                  </div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-[#3E9F97] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {inst.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden -mx-4">
            <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
              {instructors.map(inst => {
                const body = (
                  <>
                    <div className="mb-3 font-serif text-5xl font-black leading-none text-[#3E9F97]/10">
                      {inst.initial === '+' ? '+' : inst.name[0]}
                    </div>
                    <div className="text-sm font-medium text-[#1F1F1C]">{inst.name}</div>
                    <div className="mt-1 text-xs text-[#3E9F97]">{inst.role}</div>
                  </>
                )
                return (
                  <article
                    key={inst.name}
                    className="w-[65vw] shrink-0 snap-start overflow-hidden rounded-sm border border-[#D6DFDA] bg-[#FCFBF8] p-4"
                  >
                    {inst.name === '+ 17 More' ? (
                      <Link href="/faculty" className="block text-left no-underline text-inherit">
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
          <div className="mt-6 flex justify-center gap-1.5 md:hidden">
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
// TESTIMONIALS
// ─────────────────────────────────────────

const testimonials = [
  { quote: 'The classes are perfectly structured and the environment is positive, encouraging, and fun. She has shown so much growth under the instruction here.', author: 'Dance Parent · Google Review', featured: true },
  { quote: 'Our staff is passionate about creating a positive atmosphere and an all-around great experience for each and every dancer.', author: 'Dance Parent · Google Review', featured: false },
  { quote: 'Strong technical base, self-confidence, and a genuine passion for dance. My daughter looks forward to every single class.', author: 'Dance Parent · Google Review', featured: false },
]

export function TestimonialsSection() {
  return (
    <section className="bg-[#EAF3F0] px-4 py-28 md:px-12">
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-px bg-[#3E9F97] opacity-100" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#3E9F97] font-medium opacity-100">{siteConfig.reviewsLabel}</span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <>
          <h2 className="font-display font-bold mt-4 mb-4 leading-none text-[#1F1F1C]" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
            What families love about Evolve —{' '}
            <em className="italic text-[#3E9F97]">Reviews</em>
          </h2>
          <p className="text-[15px] font-light text-[#6D6C67] leading-[1.75] mb-14">
            Families choose Evolve for more than strong classes. They stay for the culture, the consistency, and the way their dancers grow over time.
          </p>
        </>
      </Reveal>

      {/* Mobile: horizontal scroll-snap reviews */}
      <div className="md:hidden -mx-4">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {testimonials.map((t, i) => {
            const teal = i % 2 === 0
            return (
              <article
                key={i}
                className={cn(
                  'w-[85vw] shrink-0 snap-start border p-6 transition-all duration-300',
                  teal
                    ? 'border-[#1D9E75] bg-[#1D9E75]'
                    : 'border-[#D6DFDA] bg-[#FCFBF8]',
                )}
              >
                <span className={cn('mb-4 block text-[11px] tracking-[3px]', teal ? 'text-white/80' : 'text-[#1D9E75]')}>
                  ★★★★★
                </span>
                <span className={cn('font-display mb-4 block text-[56px] leading-[0.8]', teal ? 'text-white/25' : 'text-[#1D9E75]')}>
                  "
                </span>
                <p className={cn('mb-6 font-serif text-[17px] font-normal italic leading-[1.6]', teal ? 'text-white' : 'text-[#1F1F1C]')}>
                  {t.quote}
                </p>
                <div className={cn('text-[10px] font-medium uppercase tracking-[0.16em]', teal ? 'text-white/70' : 'text-[#6D6C67]')}>
                  {t.author}
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-1.5 md:hidden">
        {testimonials.map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#1F1F1C]/20" aria-hidden />
        ))}
      </div>

      {/* Desktop: existing grid (unchanged) */}
      <div className="hidden gap-px md:grid md:grid-cols-[1.4fr_1fr_1fr]">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className={cn(
              'relative border p-6 transition-all duration-300 md:p-11',
              t.featured
                ? 'bg-[#3E9F97] border-[#3E9F97]'
                : 'bg-[#FCFBF8] border-[#D6DFDA]'
            )}>
              <span className={cn('text-[11px] tracking-[3px] mb-4 block', t.featured ? 'text-white/80' : 'text-[#3E9F97]')}>
                ★★★★★
              </span>
              <span className={cn('font-display text-[72px] leading-[0.8] mb-4 block', t.featured ? 'text-white/25' : 'text-[#3E9F97]')}>
                "
              </span>
              <p className={cn('font-display text-[18px] font-normal italic leading-[1.6] mb-6', t.featured ? 'text-white' : 'text-[#1F1F1C]')}>
                {t.quote}
              </p>
              <div className={cn('text-[10px] tracking-[0.16em] uppercase', t.featured ? 'text-white/70' : 'text-[#6D6C67]')}>
                {t.author}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// THE PROJECT
// ─────────────────────────────────────────

export function ProjectSection() {
  return (
    <section
      className="bg-[#173432] px-4 py-28 md:px-12 relative overflow-hidden text-center"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,212,191,0.07) 0%, transparent 60%)' }}
      />

      <div className="relative z-[1] max-w-[680px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="w-10 h-px bg-[#81D8D0]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#81D8D0] opacity-100">Competitive Team</span>
            <div className="w-10 h-px bg-[#81D8D0]" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            className="font-display font-black leading-[0.92] mb-7 text-[#F4FBF9]"
            style={{ fontSize: 'clamp(44px, 6.5vw, 88px)' }}
          >
            For dancers ready to take the{' '}
            <em className="italic text-[#81D8D0]">next step</em>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-[15px] font-light text-[rgba(244,251,249,0.7)] leading-[1.75] mb-11 max-w-[500px] mx-auto">
            The Project is Evolve&apos;s competitive team, created for dancers ready for a more advanced level of training, commitment, and performance opportunity.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Link
            href="/the-project"
            className="inline-flex items-center gap-2.5 clip-btn no-underline text-[11px] font-medium tracking-[0.15em] uppercase text-[#173432] bg-[#81D8D0] px-8 py-4 transition-all duration-200 hover:bg-[#3E9F97] hover:shadow-[0_0_40px_rgba(45,212,191,0.35)] hover:-translate-y-0.5"
          >
            Learn About The Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// ENROLL CTA
// ─────────────────────────────────────────

export function EnrollSection() {
  return (
    <section className="bg-[#3E9F97] px-4 pt-10 pb-20 md:px-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <Reveal>
        <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/70 block mb-4">
          Ready to Begin?
        </span>
        <h2
          className="font-display font-black text-white leading-[1.0]"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
        >
          Start your journey at Evolve
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p className="text-[15px] text-white/85 leading-[1.7] mb-8">
          Whether your dancer is just beginning or ready for more advanced training, we&apos;re here to help them grow in a studio built on strong instruction, support, and high standards.
        </p>
        <div className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-5">
          <Link
            href="/enroll"
            className="inline-flex w-full items-center justify-center gap-2.5 clip-btn whitespace-nowrap no-underline text-[11px] font-semibold tracking-[0.15em] uppercase text-[#F4FBF9] bg-[#173432] px-6 py-3.5 transition-all duration-200 hover:bg-[#0f2318] md:w-auto md:px-8 md:py-4"
          >
            Enroll Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </Link>
          <Link
            href="/classes#schedule"
            className="inline-flex w-full items-center justify-center gap-2.5 clip-btn whitespace-nowrap text-center no-underline text-[11px] font-medium leading-snug tracking-[0.12em] uppercase text-white bg-transparent border border-white/60 px-6 py-3.5 transition-colors duration-200 hover:border-white md:w-auto md:px-8 md:py-4 md:tracking-[0.15em]"
          >
            View Class Schedule
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
