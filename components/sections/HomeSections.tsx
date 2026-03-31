'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'

// ─────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-7 h-px bg-teal" />
      <span className="text-[10px] tracking-[0.22em] uppercase text-teal font-medium">{label}</span>
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
    <span key={i} className="px-10 text-[11px] font-semibold tracking-[0.2em] uppercase text-black flex-shrink-0">
      {item}
      {i < items.length - 1 && <span className="text-[rgba(7,10,9,0.3)] ml-4">·</span>}
    </span>
  ))

  return (
    <div className="bg-teal py-[13px] overflow-hidden">
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
      <div className="col-span-full md:col-span-1 bg-charcoal px-16 py-24 flex flex-col justify-center relative overflow-hidden">
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
          <SectionEyebrow label="Our Studio" />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-display font-bold leading-[1.08] mb-6 text-[#f0faf8]"
            style={{ fontSize: 'clamp(36px, 4vw, 54px)' }}
          >
            Built on <em className="italic text-teal">technique.</em>
            <br />Driven by passion.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[15px] font-light text-[rgba(200,224,219,0.55)] leading-[1.8] max-w-[420px] mb-11">
            {siteConfig.studioParagraph}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex gap-10">
            {[
              { num: '6',    lbl: 'Dance Rooms' },
              { num: '18mo', lbl: 'Youngest Dancer' },
              { num: '2016', lbl: 'Est. Las Vegas' },
            ].map(s => (
              <div key={s.lbl}>
                <div className="font-display text-[40px] font-bold text-teal leading-none" style={{ textShadow: '0 0 30px rgba(45,212,191,0.2)' }}>
                  {s.num}
                </div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#5c7a74] mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Right — studio image */}
      <div className="relative overflow-hidden h-[280px] md:h-auto">
        <img
          src="/images/about-studio.jpg"
          alt="Young dancers in ballet class at Evolve Dance Center"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// CLASSES
// ─────────────────────────────────────────

const classes = [
  { num: '01', name: 'Ballet',       letter: 'B', ages: 'Ages 3–18', desc: 'Precision, grace, and classical technique. Barre, center, across the floor, and pointe progressions for all levels.' },
  { num: '02', name: 'Jazz',         letter: 'J', ages: 'Ages 4–18', desc: 'High energy performance flair. Parallel movement, technique, and combinations taught from the ground up.' },
  { num: '03', name: 'Hip Hop',      letter: 'H', ages: 'Ages 5–18', desc: 'Street styles, groove-based movement, and freestyle expression — rooted in culture and rhythm.' },
  { num: '04', name: 'Contemporary', letter: 'C', ages: 'Ages 6–18', desc: 'A free, expressive style blending classical modern, jazz, and fluid improvisation. Requires ballet enrollment.' },
]

export function ClassesSection() {
  return (
    <section className="bg-black px-12 py-28">
      <div className="flex items-end justify-between mb-14">
        <div>
          <Reveal><SectionEyebrow label="What We Teach" /></Reveal>
          <Reveal delay={100}>
            <>
              <h2 className="font-display font-bold text-[#f0faf8] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
                Our <em className="italic text-teal">classes</em>
              </h2>
              <p className="text-[15px] font-light text-[rgba(200,224,219,0.55)] leading-[1.75]">
                {siteConfig.classesIntro}
              </p>
            </>
          </Reveal>
        </div>
        <Reveal>
          <Link href="/classes" className="text-[10px] tracking-[0.18em] uppercase text-teal no-underline border-b border-[rgba(45,212,191,0.3)] pb-0.5 mb-1.5 hover:border-teal transition-colors">
            View All Classes →
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(45,212,191,0.06)]">
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
    <div className="group bg-charcoal p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between transition-colors duration-300 hover:bg-[#131a18]">
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
        <div className="text-[10px] font-semibold tracking-[0.22em] text-[#5c7a74] mb-5 transition-colors duration-300 group-hover:text-teal">
          {num} — {name}
        </div>
        <div className="font-display text-[26px] font-bold leading-[1.1] mb-3 text-[#f0faf8]">{name}</div>
        <div className="text-[12px] text-[rgba(200,224,219,0.4)] leading-[1.65] flex-grow">{desc}</div>
      </div>

      <div className="flex items-center justify-between mt-7 pt-5 border-t border-[rgba(45,212,191,0.06)]">
        <span className="text-[9px] tracking-[0.18em] uppercase text-[rgba(45,212,191,0.5)]">{ages}</span>
        <div className="w-[30px] h-[30px] border border-[rgba(45,212,191,0.2)] flex items-center justify-center text-teal text-sm transition-all duration-200 group-hover:bg-teal group-hover:text-black group-hover:shadow-[0_0_16px_rgba(45,212,191,0.4)] group-hover:border-teal">
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
    <section className="bg-charcoal px-12 py-28">
      <Reveal><SectionEyebrow label="This Week" /></Reveal>
      <div className="flex items-end justify-between mt-4 mb-12">
        <Reveal delay={100}>
          <>
            <h2 className="font-display font-bold text-[#f0faf8] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
              Class <em className="italic text-teal">schedule</em>
            </h2>
            <p className="text-[15px] font-light text-[rgba(200,224,219,0.55)] leading-[1.8]">
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
                ? 'text-teal border-teal'
                : 'text-[#5c7a74] border-transparent hover:text-[rgba(45,212,191,0.7)]'
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
              <div className="font-medium text-sm text-white mt-0.5">{c.cls}</div>
              <div className="text-xs text-[#5c7a74] mt-0.5">
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
              <th key={h} className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[#5c7a74] text-left pb-3 border-b border-[rgba(45,212,191,0.12)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((row, i) => (
            <tr key={i} className="schedule-row border-b border-[rgba(45,212,191,0.06)] last:border-0 transition-colors duration-150">
              <td className="py-[18px] font-display text-[18px] text-teal w-32">{row.time}</td>
              <td className="py-[18px] font-medium text-[13.5px] text-[#f0faf8]">{row.cls}</td>
              <td className="py-[18px] text-[12px] text-[#5c7a74]">{row.instructor}</td>
              <td className="py-[18px] text-[10px] tracking-[0.12em] uppercase text-[#5c7a74]">{row.ages}</td>
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
    <section className="bg-black px-12 py-28 overflow-hidden">
      <Reveal><SectionEyebrow label="The Faculty" /></Reveal>
      <div className="flex items-end justify-between mt-4 mb-14">
        <Reveal delay={100}>
          <>
            <h2 className="font-display font-bold text-[#f0faf8] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
              Meet our <em className="italic text-teal">instructors</em>
            </h2>
            <p className="text-[15px] font-light text-[rgba(200,224,219,0.55)] leading-[1.75]">
              {siteConfig.facultyIntro}
            </p>
          </>
        </Reveal>
        <Link href="/faculty" className="text-[10px] tracking-[0.18em] uppercase text-teal no-underline border-b border-[rgba(45,212,191,0.3)] pb-0.5 mb-1.5 hover:border-teal transition-colors">
          Full Faculty →
        </Link>
      </div>

      <Reveal>
        <>
          <div className="hidden md:flex instructor-strip">
            {instructors.map(inst => (
              <div
                key={inst.name}
                className="instructor-card group bg-charcoal relative overflow-hidden min-h-[300px] cursor-pointer"
                style={{ background: '#111916' }}
              >
                {/* Top teal bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

                {/* Initial watermark */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-display font-black leading-none pointer-events-none transition-all duration-400 group-hover:opacity-[0.1] group-hover:-translate-y-[65%]"
                  style={{ fontSize: 100, color: 'rgba(45,212,191,0.06)' }}
                >
                  {inst.initial}
                </div>

                <div className="absolute bottom-6 left-6 z-[1]">
                  <div className="font-display text-[20px] font-bold leading-[1.1] mb-1 text-[#f0faf8]">
                    {inst.name}
                  </div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-teal opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {inst.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden grid grid-cols-2 gap-px bg-[rgba(45,212,191,0.06)]">
            {instructors.map(i => (
              <div key={i.name} className="bg-[#111916] p-4 overflow-hidden">
                <div className="font-serif text-5xl font-black leading-none mb-3 text-[rgba(45,212,191,0.15)]">{i.name[0]}</div>
                <div className="font-medium text-sm text-[#f0faf8]">{i.name}</div>
                <div className="text-xs text-[#2dd4bf] opacity-100 mt-1">{i.role}</div>
              </div>
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
    <section className="bg-charcoal px-12 py-28">
      <Reveal><SectionEyebrow label={siteConfig.reviewsLabel} /></Reveal>
      <Reveal delay={100}>
        <>
          <h2 className="font-display font-bold mt-4 mb-4 text-[#f0faf8] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
            ★★★★★ <em className="italic text-teal">Reviews</em>
          </h2>
          <p className="text-[15px] font-light text-[rgba(200,224,219,0.55)] leading-[1.75] mb-14">
            {siteConfig.reviewsIntro}
          </p>
        </>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-px">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className={cn(
              'p-11 relative border transition-all duration-300',
              t.featured
                ? 'bg-teal border-teal'
                : 'bg-[rgba(45,212,191,0.03)] border-[rgba(45,212,191,0.06)] hover:border-[rgba(45,212,191,0.2)] hover:bg-[rgba(45,212,191,0.04)]'
            )}>
              <span className={cn('text-[11px] tracking-[3px] mb-4 block', t.featured ? 'text-[rgba(7,10,9,0.5)]' : 'text-teal')}>
                ★★★★★
              </span>
              <span className={cn('font-display text-[72px] leading-[0.8] mb-4 block', t.featured ? 'text-[rgba(7,10,9,0.12)]' : 'text-[rgba(45,212,191,0.15)]')}>
                "
              </span>
              <p className={cn('font-display text-[18px] font-normal italic leading-[1.6] mb-6', t.featured ? 'text-black' : 'text-[#f0faf8]')}>
                {t.quote}
              </p>
              <div className={cn('text-[10px] tracking-[0.16em] uppercase', t.featured ? 'text-[rgba(7,10,9,0.6)]' : 'text-[#5c7a74]')}>
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
      className="bg-black px-12 py-28 relative overflow-hidden text-center"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,212,191,0.07) 0%, transparent 60%)' }}
      />

      <div className="relative z-[1] max-w-[680px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="w-10 h-px bg-[rgba(45,212,191,0.4)]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-teal">Competitive Team</span>
            <div className="w-10 h-px bg-[rgba(45,212,191,0.4)]" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            className="font-display font-black leading-[0.92] mb-7 text-[#f0faf8]"
            style={{ fontSize: 'clamp(44px, 6.5vw, 88px)' }}
          >
            Introducing<br />
            <em className="italic text-teal teal-glow-text">The Project</em>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-[15px] font-light text-[rgba(200,224,219,0.55)] leading-[1.75] mb-11 max-w-[500px] mx-auto">
            {siteConfig.projectBody}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Link
            href="/the-project"
            className="inline-flex items-center gap-2.5 clip-btn no-underline text-[11px] font-medium tracking-[0.15em] uppercase text-black bg-teal px-8 py-4 transition-all duration-200 hover:bg-teal-light hover:shadow-[0_0_40px_rgba(45,212,191,0.35)] hover:-translate-y-0.5"
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
    <section className="bg-teal px-12 pt-10 pb-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <Reveal>
        <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(7,10,9,0.5)] block mb-4">
          Ready to Begin?
        </span>
        <h2
          className="font-display font-black text-black leading-[1.0]"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
        >
          Start your<br />dance journey<br />today.
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p className="text-[15px] text-[rgba(7,10,9,0.65)] leading-[1.7] mb-8">
          {siteConfig.enrollBody}
        </p>
        <div className="flex gap-5 items-center">
          <Link
            href="/enroll"
            className="inline-flex items-center gap-2.5 clip-btn no-underline text-[11px] font-semibold tracking-[0.15em] uppercase text-teal bg-black px-8 py-4 transition-all duration-200 hover:shadow-[0_8px_32px_rgba(7,10,9,0.3)]"
          >
            Enroll Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </Link>
          <Link
            href="/enroll#free-trial"
            className="text-[11px] font-medium tracking-[0.15em] uppercase text-[rgba(7,10,9,0.7)] no-underline border-b border-[rgba(7,10,9,0.3)] pb-0.5 transition-colors duration-200 hover:text-black hover:border-black"
          >
            Book a Free Trial
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
