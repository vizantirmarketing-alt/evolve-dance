'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button-styles'
import { JACKRABBIT_ENROLL_URL } from '@/lib/jackrabbit'

const stats = [
  { number: '10+',  label: 'Dance Styles' },
  { number: '22',   label: 'Expert Faculty' },
  { number: '8',    label: 'Seasons Strong' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-12 pb-20 overflow-hidden">

      {/* ── Background layers ── */}
      {/* Radial teal glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 65% 40%, rgba(10,186,181,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(10,186,181,0.05) 0%, transparent 50%),
            linear-gradient(160deg, rgba(7,10,9,0.2) 0%, rgba(7,10,9,0.85) 55%, rgba(7,10,9,0.99) 100%)
          `,
        }}
      />

      {/* Teal grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,186,181,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,186,181,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 20%, transparent 70%)',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute z-0 rounded-full animate-orb-float pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(10,186,181,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: -100, right: '10%',
        }}
      />
      <div
        className="absolute z-0 rounded-full animate-orb-float-r pointer-events-none"
        style={{
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(10,186,181,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '20%', right: '30%',
        }}
      />

      {/* ── Art panel (right side) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] z-[1] overflow-hidden">
        <div
          className="w-full h-full clip-panel relative flex items-center justify-center scan-lines"
          style={{ background: 'linear-gradient(135deg, #0d1613 0%, #080c0b 100%)' }}
        >
          {/* Pulsing dancer ring */}
          <div
            className="absolute rounded-full animate-ring-pulse"
            style={{
              right: 'calc(12% - 40px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 360, height: 360,
              border: '1px solid rgba(10,186,181,0.15)',
            }}
          />

          {/* Dancer SVG silhouette */}
          <motion.svg
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute"
            style={{ right: '12%', top: '50%', transform: 'translateY(-50%)', width: 280 }}
            viewBox="0 0 280 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="148" cy="48" r="30" fill="#0ABAB5" opacity="0.9" />
            <line x1="148" y1="78" x2="148" y2="100" stroke="#0ABAB5" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
            <path d="M148 100 C122 125 110 162 116 198 C120 222 138 238 148 242 C158 238 176 222 180 198 C186 162 174 125 148 100Z" fill="#0ABAB5" opacity="0.85" />
            <path d="M118 130 C96 112 68 88 42 60" stroke="#0ABAB5" strokeWidth="13" strokeLinecap="round" opacity="0.8" />
            <path d="M178 128 C202 114 232 106 262 108" stroke="#0ABAB5" strokeWidth="13" strokeLinecap="round" opacity="0.8" />
            <path d="M138 240 C130 278 122 316 116 352 C110 378 104 400 100 426" stroke="#0ABAB5" strokeWidth="15" strokeLinecap="round" opacity="0.8" />
            <path d="M158 240 C168 268 184 300 208 334 C228 360 250 378 272 392" stroke="#0ABAB5" strokeWidth="15" strokeLinecap="round" opacity="0.8" />
            <path d="M100 426 C92 440 84 450 76 452" stroke="#0ABAB5" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
            <path d="M272 392 C282 398 290 400 296 397" stroke="#0ABAB5" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
            <circle cx="148" cy="48" r="30" fill="#0ABAB5" opacity="0.15" filter="url(#glow)" />
          </motion.svg>
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-[2] max-w-[620px]">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-teal" />
          <span className="text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-teal font-medium opacity-100">
            Las Vegas · Ages 18mo–18yrs · All Levels
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-display font-black leading-[0.88] tracking-tight mb-7"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
        >
          <span className="block text-[#f0faf8]">Where</span>
          <span className="block text-teal italic teal-glow-text">dancers</span>
          <span className="block text-[#f0faf8]">become artists.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[15px] font-light text-[#cbd5e1] leading-[1.75] max-w-[400px] mb-11 md:text-[16px]"
        >
          Ballet, jazz, hip hop, contemporary, acro, and more — serious training in a positive environment that produces real results.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex gap-5 items-center"
        >
          <a
            href={JACKRABBIT_ENROLL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'primary', size: 'wide' })}
          >
            Book a Free Trial
          </a>

          <Link
            href="/schedule"
            className={buttonVariants({ variant: 'secondary', size: 'wide' })}
          >
            View Schedule
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-[3] grid grid-cols-3 border-t border-[rgba(10,186,181,0.12)]"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              'py-5 px-8 flex flex-col gap-0.5',
              i < stats.length - 1 ? 'border-r border-[rgba(10,186,181,0.12)]' : '',
            ].join(' ')}
          >
            <span className="font-display text-[28px] font-bold text-teal leading-none">
              {stat.number}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#94a3b8] md:text-[12px]">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
