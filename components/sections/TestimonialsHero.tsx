'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Expand, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/sanity/lib/queries'

const TEAL = '#3E9F97'
const NAVY = '#1a2e2c'
const IVORY = '#F7F5F1'
const ROTATION_MS = 6000

function formatReviewDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function formatAttribution(
  reviewerName: string,
  source: string,
  reviewDate: string,
): string {
  const formattedDate = formatReviewDate(reviewDate)
  return [reviewerName, source, formattedDate].filter(Boolean).join(' · ')
}

function formatSourceDate(source: string, reviewDate: string): string {
  const formattedDate = formatReviewDate(reviewDate)
  return [source, formattedDate].filter(Boolean).join(' · ')
}

function reviewerInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?'
}

function StarRating({ className }: { className?: string }) {
  return (
    <span
      className={cn('block text-[11px] tracking-[3px]', className)}
      style={{ color: TEAL }}
      aria-hidden
    >
      ★★★★★
    </span>
  )
}

function ProgressIndicators({
  count,
  currentIndex,
  isPaused,
  reducedMotion,
  cycleKey,
}: {
  count: number
  currentIndex: number
  isPaused: boolean
  reducedMotion: boolean
  cycleKey: number
}) {
  return (
    <div
      className="absolute bottom-4 left-4 flex gap-1.5 md:bottom-8 md:left-10"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-[2px] w-8 overflow-hidden rounded-full md:w-10',
            i === currentIndex ? 'bg-white/25' : 'bg-white/15',
          )}
        >
          {i < currentIndex && (
            <div className="h-full w-full" style={{ backgroundColor: TEAL }} />
          )}
          {i === currentIndex && (
            <div
              key={`${cycleKey}-${currentIndex}`}
              className={cn(
                'h-full w-full origin-left',
                !reducedMotion && 'animate-testimonial-progress',
                isPaused && '[animation-play-state:paused]',
              )}
              style={{
                backgroundColor: TEAL,
                ...(reducedMotion ? { transform: 'scaleX(1)' } : {}),
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function HeroSlideContent({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-4 px-6 py-8 md:grid-cols-[auto_1fr] md:gap-10 md:px-12 md:py-0">
      <div
        className="mx-auto flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full font-display text-[26px] font-normal md:mx-0"
        style={{ backgroundColor: TEAL, color: IVORY }}
        aria-hidden
      >
        {reviewerInitial(testimonial.reviewerName)}
      </div>
      <div className="min-w-0 text-center md:text-left">
        <StarRating className="mb-2 md:mb-4" />
        <p
          className="font-display mb-3 line-clamp-3 text-[16px] font-normal italic leading-snug md:mb-5 md:text-[19px] md:leading-relaxed"
          style={{ color: IVORY }}
        >
          &ldquo;{testimonial.reviewText}&rdquo;
        </p>
        <div
          className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-70 md:text-[11px]"
          style={{ color: IVORY }}
        >
          {formatAttribution(
            testimonial.reviewerName,
            testimonial.source,
            testimonial.reviewDate,
          )}
        </div>
      </div>
    </div>
  )
}

function TestimonialModal({
  testimonials,
  modalIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  reducedMotion,
}: {
  testimonials: Testimonial[]
  modalIndex: number
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  reducedMotion: boolean
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  const testimonial = testimonials[modalIndex]
  const nameId = `testimonial-modal-name-${testimonial._id}`

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const focusables = () => {
      if (!modalRef.current) return [] as HTMLElement[]
      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>('[data-modal-focus]'),
      ).sort(
        (a, b) =>
          Number(a.tabIndex || 0) - Number(b.tabIndex || 0),
      )
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) return
    previousFocusRef.current?.focus()
    previousFocusRef.current = null
  }, [isOpen])

  if (!mounted) return null

  const modalTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="testimonial-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={modalTransition}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[4px]"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={nameId}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            transition={modalTransition}
            className="relative w-full max-w-[720px] rounded-sm px-8 py-10 md:px-14 md:py-12"
            style={{ backgroundColor: NAVY, color: IVORY }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              data-modal-focus
              tabIndex={1}
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-sm text-white/70 transition-colors hover:text-white"
              aria-label="Close testimonial"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <header className="mb-6 flex items-center gap-4 pr-10">
              <div
                className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full font-display text-[22px] font-normal"
                style={{ backgroundColor: TEAL, color: IVORY }}
                aria-hidden
              >
                {reviewerInitial(testimonial.reviewerName)}
              </div>
              <div className="min-w-0">
                <h3
                  id={nameId}
                  className="font-display text-[20px] font-normal leading-tight"
                  style={{ color: IVORY }}
                >
                  {testimonial.reviewerName}
                </h3>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] opacity-70 md:text-[11px]">
                  {formatSourceDate(testimonial.source, testimonial.reviewDate)}
                </p>
              </div>
            </header>

            <StarRating className="mb-5" />

            <p
              className="font-display mb-8 text-[17px] font-normal italic leading-[1.65] md:text-[19px]"
              style={{ color: IVORY }}
            >
              &ldquo;{testimonial.reviewText}&rdquo;
            </p>

            <a
              href="#"
              data-modal-focus
              tabIndex={4}
              className="mb-10 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] transition-opacity hover:opacity-80 md:text-[12px]"
              style={{ color: TEAL }}
              onClick={(event) => event.preventDefault()}
            >
              View on Google Reviews →
            </a>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                data-modal-focus
                tabIndex={2}
                onClick={onPrevious}
                className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white md:text-[12px]"
              >
                Previous
              </button>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50 md:text-[12px]">
                {modalIndex + 1} of {testimonials.length}
              </span>
              <button
                type="button"
                data-modal-focus
                tabIndex={3}
                onClick={onNext}
                className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white md:text-[12px]"
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default function TestimonialsHero({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLButtonElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalIndex, setModalIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)

  const slideStartRef = useRef(Date.now())
  const count = testimonials.length
  const canRotate = count > 1 && !reducedMotion
  const rotationPaused = isPaused || isHovered

  const slideVariants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        initial: { opacity: 0, scale: 0.98, x: 28 },
        animate: {
          opacity: 1,
          scale: 1,
          x: 0,
          transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          x: -28,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }

  useEffect(() => {
    slideStartRef.current = Date.now()
    setCycleKey((key) => key + 1)
  }, [currentIndex])

  useEffect(() => {
    if (!canRotate || rotationPaused) return

    const elapsed = Date.now() - slideStartRef.current
    const remaining = Math.max(0, ROTATION_MS - elapsed)

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % count)
    }, remaining)

    return () => window.clearTimeout(timeoutId)
  }, [canRotate, count, currentIndex, rotationPaused])

  const openModal = useCallback(() => {
    setModalIndex(currentIndex)
    setIsModalOpen(true)
    setIsPaused(true)
  }, [currentIndex])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setIsPaused(false)
  }, [])

  const goToPrevious = useCallback(() => {
    setModalIndex((index) => (index - 1 + count) % count)
  }, [count])

  const goToNext = useCallback(() => {
    setModalIndex((index) => (index + 1) % count)
  }, [count])

  const current = testimonials[currentIndex]

  return (
    <>
      <button
        ref={heroRef}
        type="button"
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="View testimonial details"
        className={cn(
          'testimonial-hero-stage group relative h-[340px] w-full cursor-pointer overflow-hidden rounded-sm text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 md:h-[360px]',
          (rotationPaused || reducedMotion) && 'testimonial-hero-stage--paused',
          reducedMotion && 'testimonial-hero-stage--reduced-motion',
        )}
        style={{ backgroundColor: NAVY, color: IVORY }}
      >
        <div
          className="testimonial-hero-bg testimonial-hero-bg--one pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div
          className="testimonial-hero-bg testimonial-hero-bg--two pointer-events-none absolute inset-0"
          aria-hidden
        />

        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] opacity-60 transition-opacity group-hover:opacity-90 md:right-10 md:top-8 md:text-[11px]">
          Read full
          <Expand className="h-3.5 w-3.5" aria-hidden />
        </div>

        <div className="relative z-[1] flex h-full flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideVariants}
              className="flex h-full w-full items-center"
            >
              <HeroSlideContent testimonial={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        {canRotate && (
          <ProgressIndicators
            count={count}
            currentIndex={currentIndex}
            isPaused={rotationPaused}
            reducedMotion={!!reducedMotion}
            cycleKey={cycleKey}
          />
        )}
      </button>

      <TestimonialModal
        testimonials={testimonials}
        modalIndex={modalIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
        reducedMotion={!!reducedMotion}
      />
    </>
  )
}
