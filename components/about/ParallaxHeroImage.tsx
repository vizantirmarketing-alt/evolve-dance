'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import type { AboutImage } from '@/lib/about-images'

type Props = {
  image: AboutImage
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

/**
 * Hero image with subtle scroll-linked parallax zoom.
 * Starts at scale(1.05) and eases to scale(1.0) as it enters view.
 * Respects prefers-reduced-motion.
 */
export function ParallaxHeroImage({ image, alt, sizes, priority, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const target = imageRef.current
    if (!wrapper || !target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      target.style.transform = 'scale(1)'
      return
    }

    let rafId = 0
    const update = () => {
      const rect = wrapper.getBoundingClientRect()
      const viewportH = window.innerHeight
      // progress: 0 when wrapper top is at viewport bottom, 1 when wrapper bottom is at viewport top
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewportH))
      const scale = 1.05 - 0.05 * progress
      target.style.transform = `scale(${scale.toFixed(4)})`
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={className} style={{ overflow: 'hidden' }}>
      <div
        ref={imageRef}
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(1.05)',
          transformOrigin: 'center center',
          willChange: 'transform',
          transition: 'transform 80ms linear',
        }}
      >
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={image.placeholder}
          className="object-cover object-center"
        />
      </div>
    </div>
  )
}
