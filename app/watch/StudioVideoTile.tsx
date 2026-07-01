'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { StudioVideo } from '@/sanity/lib/queries'

type Props = {
  video: StudioVideo
}

export default function StudioVideoTile({ video }: Props) {
  const [hasStarted, setHasStarted] = useState(false)
  const [error, setError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const aspectRatio = video.poster.asset.metadata.dimensions.aspectRatio
  const isPortrait = aspectRatio < 1
  const hasAudioRights = video.hasAudioRights === true

  useEffect(() => {
    if (!hasStarted || hasAudioRights) return
    const videoEl = videoRef.current
    if (!videoEl) return

    videoEl.muted = true

    const enforceMuted = () => {
      if (!videoEl.muted) videoEl.muted = true
    }

    videoEl.addEventListener('volumechange', enforceMuted)
    return () => videoEl.removeEventListener('volumechange', enforceMuted)
  }, [hasStarted, hasAudioRights])

  return (
    <figure className="group">
      <div
        className={`relative ${isPortrait ? 'mx-auto aspect-[9/16]' : 'w-full aspect-video'} overflow-hidden rounded-lg bg-black`}
        style={isPortrait ? { width: '100%', maxWidth: '420px' } : undefined}
      >
        {!hasStarted && !error && (
          <>
            <Image
              src={video.poster.asset.url}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={video.poster.asset.metadata.lqip}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setHasStarted(true)}
                aria-label={`Play ${video.title}`}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110 md:h-20 md:w-20"
              >
                <Play
                  className="h-6 w-6 fill-[#0f2318] text-[#0f2318] md:h-7 md:w-7"
                  aria-hidden
                />
              </button>
            </div>
          </>
        )}
        {hasStarted && !error && (
          <video
            ref={videoRef}
            src={video.video.asset.url}
            poster={video.poster.asset.url}
            controls
            autoPlay
            playsInline
            preload="metadata"
            muted={!hasAudioRights}
            className="h-full w-full object-cover"
            onError={() => setError(true)}
          />
        )}
        {error && (
          <>
            <Image
              src={video.poster.asset.url}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={video.poster.asset.metadata.lqip}
            />
            <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
              Video unavailable
            </div>
          </>
        )}
      </div>

      <figcaption
        className="mt-4 space-y-1"
        style={isPortrait ? { maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' } : undefined}
      >
        <h3 className="font-display text-lg font-medium text-foreground md:text-xl">
          {video.title}
        </h3>
        {video.caption && (
          <p className="text-[14px] font-light leading-[1.7] text-foreground-muted md:text-[15px]">
            {video.caption}
          </p>
        )}
      </figcaption>
    </figure>
  )
}
