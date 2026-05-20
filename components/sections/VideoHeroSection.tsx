'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-styles'

// ── Types ────────────────────────────────────────────
interface VideoHeroProps {
  videoSrc?: string        // local path: '/videos/hero.mp4'
  videoFallback?: string   // webm: '/videos/hero.webm'
  posterSrc?: string       // first-frame image while video loads
}

// ── Stat strip data ──────────────────────────────────
const stats = [
  { number: '9', label: 'Seasons Strong' },
  { number: '4.6★', label: 'Google Rating' },
  { number: 'Ages 18mo–18yrs', label: 'All Levels Welcome' },
  { number: '6', label: 'Dance Rooms' },
]

const statsStripSubline =
  'A studio families trust, dancers grow in, and performers are proud to represent.'

// ── Stagger variants ─────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// ════════════════════════════════════════════════════
export default function VideoHeroSection({
  videoSrc     = '/videos/hero.mp4',
  videoFallback = '/videos/hero.webm',
  posterSrc    = '/images/hero-poster.jpg',
}: VideoHeroProps) {
  const videoRef      = useRef<HTMLVideoElement>(null)
  const [muted, setMuted]   = useState(true)
  const [playing, setPlaying] = useState(true)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
  }, [])

  const toggleMute  = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(m => !m)
  }

  const togglePlay  = () => {
    if (!videoRef.current) return
    playing ? videoRef.current.pause() : videoRef.current.play()
    setPlaying(p => !p)
  }

  return (
    <>
      <section className="relative min-h-[640px] bg-[var(--background)] md:min-h-[calc(100vh-80px)]">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Mobile — static image, no video */}
          <div className="md:hidden absolute inset-0 z-0">
            <img
              src={posterSrc}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Desktop — video plays */}
          <div className="hidden md:block absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={posterSrc}
              className="h-full w-full object-cover object-center"
              style={{ pointerEvents: 'none' }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/40 to-black/60 md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-transparent pointer-events-none" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[640px] w-full flex-col justify-start px-4 pt-24 pb-16 md:min-h-[calc(100vh-80px)] md:justify-end md:px-12 md:pb-24 md:pt-32">
        {/* ── Main content ─────────────────────────── */}
        <div className="relative z-[30] w-full md:mt-0">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="max-w-[680px]"
          >
            {/* Eyebrow */}
            <motion.div variants={item} className="mb-7 flex w-full items-center justify-start gap-4 text-left">
              <div className="w-8 shrink-0 bg-[#0ABAB5] h-px" />
              <span
                className="text-left text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 md:text-[12px] md:tracking-[0.25em] whitespace-normal md:whitespace-nowrap"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
              >
                Las Vegas · Ages 18mo–18yrs · All Levels
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-left font-display font-black leading-[0.88] tracking-tight mb-6"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
            >
              <span className="block text-[#F7F5F1]">Where dancers</span>
              <span className="block text-[#F7F5F1]">become</span>
              <span
                className="block text-[#0ABAB5] italic"
                style={{
                  textShadow: '0 0 60px rgba(10,186,181,0.35), 0 0 140px rgba(10,186,181,0.12)',
                }}
              >
                extraordinary.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="mb-8 max-w-[380px] text-left text-[15px] font-light leading-[1.75] text-[#F7F5F1]/80 md:mb-10 md:text-[16px]"
              style={{
                textShadow: '0 1px 12px rgba(0,0,0,0.6)',
              }}
            >
              Ages 18 months to 18 years. Twenty-two working teachers. Six studio rooms in southwest Las Vegas. A team that's been training dancers here since 2016.
            </motion.p>

            {/* CTA buttons — mobile: primary + watch link; desktop: all three */}
            <motion.div variants={item} className="mb-6 w-full md:mb-6">
              <div className="flex flex-col items-start gap-3 md:hidden">
                <Link
                  href="/enroll#free-trial"
                  className={buttonVariants({
                    variant: 'primary',
                    surface: 'dark',
                    className: 'group pointer-events-auto self-start w-full sm:w-auto',
                  })}
                >
                  Book a Free Trial
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
                <Link
                  href="/classes"
                  className={buttonVariants({
                    variant: 'secondary',
                    surface: 'dark',
                    className: 'group pointer-events-auto self-start w-full sm:w-auto',
                  })}
                >
                  Explore Classes
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className={buttonVariants({
                    variant: 'tertiary',
                    surface: 'dark',
                    className: 'group pointer-events-auto self-start gap-2.5 px-2',
                  })}
                >
                  <Play className="h-3.5 w-3.5 shrink-0 fill-current opacity-80 transition-opacity group-hover:opacity-100" aria-hidden />
                  Watch the Studio
                </button>
              </div>

              <div className="hidden md:flex md:flex-row md:flex-wrap md:items-start md:gap-4">
                <Link
                  href="/enroll#free-trial"
                  className={buttonVariants({
                    variant: 'primary',
                    surface: 'dark',
                    className: 'group pointer-events-auto md:w-auto md:justify-start',
                  })}
                >
                  <span>Book a Free Trial</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>

                <Link
                  href="/classes"
                  className={buttonVariants({
                    variant: 'secondary',
                    surface: 'dark',
                    className: 'group pointer-events-auto md:w-auto md:justify-start',
                  })}
                >
                  Explore Classes
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>

                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className={buttonVariants({
                    variant: 'tertiary',
                    surface: 'dark',
                    className: 'group pointer-events-auto gap-2.5 px-2 md:w-auto md:justify-start',
                  })}
                >
                  <Play className="h-3.5 w-3.5 shrink-0 fill-current opacity-80 transition-opacity group-hover:opacity-100" aria-hidden />
                  Watch the Studio
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Video controls ───────────────────────── */}
        <div className="absolute top-6 right-6 z-[60] hidden md:flex gap-2">
          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="w-9 h-9 flex items-center justify-center border border-[#D6DFDA] bg-[rgba(247,245,241,0.8)] backdrop-blur-sm text-[#1F1F1C] transition-all duration-200 hover:border-teal hover:text-teal"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* Play/Pause toggle */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 flex items-center justify-center border border-[#D6DFDA] bg-[rgba(247,245,241,0.8)] backdrop-blur-sm text-[#1F1F1C] transition-all duration-200 hover:border-teal hover:text-teal"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>

        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 flex flex-col border-t border-[#D6DFDA] bg-[#F7F5F1]"
      >
        <p className="mx-auto max-w-[36rem] border-b border-[#D6DFDA] px-4 py-3 text-center text-[12px] font-light leading-[1.6] text-[#6D6C67] md:px-12 md:py-3.5 md:text-[13px]">
          {statsStripSubline}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'py-5 px-8 flex flex-col gap-0.5',
                i < stats.length - 1 ? 'border-r border-[#D6DFDA]' : '',
              ].join(' ')}
            >
              <span className="font-display text-[clamp(16px,3.5vw,24px)] font-bold text-[#0ABAB5] leading-tight">
                {stat.number}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#6D6C67] md:text-[12px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Lightbox ─────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(7,10,9,0.96)] backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.95,    opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-[900px] mx-6 border border-[rgba(10,186,181,0.2)]"
              onClick={e => e.stopPropagation()}
            >
              {/* Lightbox video */}
              <div className="relative aspect-video bg-black">
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                >
                  <source src={videoFallback} type="video/webm" />
                  <source src={videoSrc}      type="video/mp4" />
                </video>
              </div>

              {/* Close button */}
              <button
                onClick={() => setLightbox(false)}
                className="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center bg-teal text-black font-bold text-lg transition-transform hover:scale-110"
              >
                ×
              </button>

              {/* Caption */}
              <div className="bg-[#111916] px-6 py-4 border-t border-[rgba(10,186,181,0.12)]">
                <p className="text-[11px] tracking-[0.15em] uppercase text-teal font-medium">
                  Evolve Dance Center — Las Vegas
                </p>
                <p className="text-[12px] text-[#e2e8f0] mt-1">
                  Classes, recitals, and performances from Season 9
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
