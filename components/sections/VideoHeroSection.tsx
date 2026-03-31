'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/data/site'

// ── Types ────────────────────────────────────────────
interface VideoHeroProps {
  videoSrc?: string        // local path: '/videos/hero.mp4'
  videoFallback?: string   // webm: '/videos/hero.webm'
  posterSrc?: string       // first-frame image while video loads
}

// ── Stat strip data ──────────────────────────────────
const stats = [
  { number: '10+',   label: 'Dance Styles' },
  { number: '22',    label: 'Expert Faculty' },
  { number: '9',     label: 'Seasons Strong' },
  { number: '★ 5.0', label: 'Google Rating' },
]

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
      <section className="relative bg-[#070a09]" style={{ minHeight: '100dvh' }}>

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

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

        {/* Hero content */}
        <div
          className="relative z-20 flex flex-col justify-end w-full pb-48 md:pb-32 pt-24 px-6 md:px-12"
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
              <div className="w-8 h-px bg-teal opacity-70" />
              <span
                className="text-[10px] font-medium tracking-[0.25em] uppercase text-teal"
              >
                Las Vegas · Ages 18mo–18yrs · All Levels
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display font-black leading-[0.88] tracking-tight mb-7"
              style={{ fontSize: 'clamp(52px, 8vw, 112px)' }}
            >
              <span className="block text-[#f0faf8]">Where dancers</span>
              <span className="block text-[#f0faf8]">become</span>
              <span
                className="block text-teal italic"
                style={{
                  textShadow: '0 0 60px rgba(45,212,191,0.35), 0 0 140px rgba(45,212,191,0.12)',
                }}
              >
                extraordinary.
              </span>
            </motion.h1>

            {/* Subheading — short on mobile, full on md+ */}
            <motion.p
              variants={item}
              className="md:hidden text-[15px] font-light leading-[1.8] mb-12 max-w-[420px]"
              style={{ color: 'rgba(200,224,219,0.65)' }}
            >
              Dance classes in Las Vegas for ages 18 months to 18 years, from first time dancers to focused training.
            </motion.p>
            <motion.p
              variants={item}
              className="hidden md:block text-[15px] font-light leading-[1.8] mb-12 max-w-[420px]"
              style={{ color: 'rgba(200,224,219,0.65)' }}
            >
              {siteConfig.heroSubcopy}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap gap-4 items-start mb-6">
              {/* Primary — free trial */}
              <Link
                href="/enroll#free-trial"
                className="pointer-events-auto inline-flex items-center gap-3 w-full sm:w-auto text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-teal px-8 py-4 no-underline transition-all duration-200 hover:bg-teal-light hover:shadow-[0_0_48px_rgba(45,212,191,0.4)] hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
              >
                Book a Free Trial
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </Link>

              <div className="flex flex-row flex-wrap gap-4 items-center self-start w-auto">
                {/* View Schedule */}
                <Link
                  href="/classes#schedule"
                  className="pointer-events-auto text-[11px] font-normal tracking-[0.15em] uppercase no-underline pb-0.5 border-b border-[rgba(45,212,191,0.6)] transition-colors duration-200 hover:border-teal hover:text-teal"
                  style={{ color: 'rgba(240,250,248,0.85)' }}
                >
                  View Schedule
                </Link>

                {/* Watch the studio */}
                <button
                  onClick={() => setLightbox(true)}
                  className="pointer-events-auto inline-flex items-center gap-3 w-auto shrink-0 text-[11px] font-medium tracking-[0.15em] uppercase text-[#f0faf8] px-6 py-4 border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.08)] transition-all duration-200 hover:bg-[rgba(45,212,191,0.18)] hover:border-[rgba(45,212,191,0.6)]"
                >
                  {/* Play icon */}
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-teal flex-shrink-0"
                  >
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="#070a09">
                      <path d="M0 0L8 5L0 10V0Z" />
                    </svg>
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
            className="w-9 h-9 flex items-center justify-center border border-[rgba(45,212,191,0.25)] bg-[rgba(7,10,9,0.6)] backdrop-blur-sm text-[#f0faf8] transition-all duration-200 hover:border-teal hover:text-teal"
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
            className="w-9 h-9 flex items-center justify-center border border-[rgba(45,212,191,0.25)] bg-[rgba(7,10,9,0.6)] backdrop-blur-sm text-[#f0faf8] transition-all duration-200 hover:border-teal hover:text-teal"
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
              background: 'linear-gradient(to bottom, #2dd4bf, transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#5c7a74]"
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
          className="absolute bottom-0 left-0 right-0 z-[4] grid grid-cols-2 md:grid-cols-4 border-t border-[rgba(45,212,191,0.12)]"
          style={{ background: 'rgba(7,10,9,0.75)', backdropFilter: 'blur(16px)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'py-5 px-8 flex flex-col gap-0.5',
                i < stats.length - 1 ? 'border-r border-[rgba(45,212,191,0.12)]' : '',
              ].join(' ')}
            >
              <span className="font-display text-[24px] font-bold text-teal leading-none">
                {stat.number}
              </span>
              <span className="text-[9px] tracking-[0.18em] uppercase text-[#5c7a74]">
                {stat.label}
              </span>
            </div>
          ))}
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
                <p className="text-[12px] text-[#5c7a74] mt-1">
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
