'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

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
      <section className="relative" style={{ minHeight: '100dvh', backgroundColor: 'var(--background)' }}>

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
              className="w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Gradient overlay — darker left, lighter right */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(247,245,241,0.15) 0%, rgba(247,245,241,0.05) 50%, rgba(247,245,241,0) 100%)',
          }}
        />

        {/* Hero content */}
        <div
          className="relative z-20 flex flex-col justify-end w-full pb-52 md:pb-28 pt-24 px-6 md:px-12"
          style={{ minHeight: '100dvh' }}
        >
        {/* ── Main content — z above stat strip (z-[4]) */}
        <div className="relative z-[30] w-full">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="max-w-[680px]"
          >
            {/* Eyebrow */}
            <motion.div variants={item} className="flex items-center gap-4 mb-7">
              <div className="w-8 h-px bg-[#3E9F97]" />
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#3E9F97] opacity-100 whitespace-nowrap">
                Las Vegas · Ages 18mo–18yrs · All Levels
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display font-black leading-[0.88] tracking-tight mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 112px)' }}
            >
              <span className="block text-[#F7F5F1]">Where dancers</span>
              <span className="block text-[#F7F5F1]">become</span>
              <span
                className="block text-[#3E9F97] italic"
                style={{
                  textShadow: '0 0 60px rgba(62,159,151,0.35), 0 0 140px rgba(62,159,151,0.12)',
                }}
              >
                extraordinary.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="text-[15px] md:text-[16px] font-light leading-[1.75] mb-10 max-w-[380px] text-[#F7F5F1]/80"
              style={{
                textShadow: '0 1px 12px rgba(0,0,0,0.6)',
              }}
            >
              For ages 18 months to 18 years, Evolve offers a supportive studio culture, experienced faculty, and a clear path from first class to advanced performance.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-col md:flex-row flex-wrap gap-4 items-start mb-6">
              <Link
                href="/enroll#free-trial"
                className="group pointer-events-auto relative inline-flex w-full items-center gap-2 md:w-auto bg-[#1D9E75] px-6 py-3 text-sm font-medium tracking-wider text-white no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0F6E56] hover:shadow-lg hover:shadow-[#1D9E75]/25 rounded-sm"
              >
                <span>Book a Free Trial</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>

              <div className="flex flex-row flex-wrap items-center gap-4 self-start w-auto md:contents">
                <Link
                  href="/classes"
                  className="group pointer-events-auto inline-flex items-center gap-2 rounded-sm border border-white/20 bg-black/30 px-6 py-3 text-sm font-medium tracking-wider text-white no-underline backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/50"
                >
                  Explore Classes
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>

                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="group pointer-events-auto inline-flex items-center gap-3 rounded-sm border border-white/20 bg-black/30 px-5 py-3 text-sm font-medium tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                    <Play className="ml-0.5 h-3 w-3 fill-white text-white" aria-hidden />
                  </span>
                  Watch the Studio
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Video controls ───────────────────────── */}
        <div className="absolute top-6 right-6 z-[10] hidden md:flex gap-2">
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

        {/* ── Scroll indicator ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-24 right-12 z-[3] flex flex-col items-center gap-2"
        >
          <div
            className="w-px h-14"
            style={{
              background: 'linear-gradient(to bottom, #3E9F97, transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#6D6C67]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </motion.div>

        {/* ── Stat strip ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-[4] flex flex-col border-t border-[#D6DFDA]"
          style={{ background: 'rgba(247,245,241,0.92)', backdropFilter: 'blur(16px)' }}
        >
          <p className="text-center text-[11px] md:text-[12px] font-light leading-[1.6] text-[#6D6C67] px-6 md:px-12 py-3 md:py-3.5 max-w-[36rem] mx-auto border-b border-[#D6DFDA]">
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
                <span className="font-display text-[clamp(16px,3.5vw,24px)] font-bold text-[#3E9F97] leading-tight">
                  {stat.number}
                </span>
                <span className="text-[9px] tracking-[0.18em] uppercase text-[#6D6C67]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CSS keyframes ────────────────────────── */}
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(0.8) translateY(-4px); }
            50%       { opacity: 1;   transform: scaleY(1) translateY(0); }
          }
        `}</style>
        </div>
      </section>

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
              className="relative w-full max-w-[900px] mx-6 border border-[rgba(45,212,191,0.2)]"
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
              <div className="bg-[#111916] px-6 py-4 border-t border-[rgba(45,212,191,0.12)]">
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
