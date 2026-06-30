'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import {
  RowsPhotoAlbum,
  type Photo,
  type RenderImageProps,
} from 'react-photo-album'
import 'react-photo-album/rows.css'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/styles.css'

import { urlFor } from '@/sanity/lib/image'
import type { ProjectGalleryPhoto } from '@/sanity/lib/queries'

type AlbumPhoto = Photo & {
  caption?: string
  blurDataURL: string
  fullSrc: string
}

const DESKTOP_MIN_WIDTH = 768

const photoVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: Math.min(i * 0.05, 0.4),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function isDesktopWidth(containerWidth: number | undefined): boolean {
  return (containerWidth ?? 0) >= DESKTOP_MIN_WIDTH
}

function renderGalleryImage(
  { src, alt, style }: RenderImageProps,
  { photo, index }: { photo: AlbumPhoto; index: number },
) {
  return (
    <div style={{ ...style, position: 'relative' }} className="cursor-zoom-in">
      <Image
        src={String(src)}
        alt={alt ?? ''}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        priority={index < 3}
        loading={index < 3 ? 'eager' : 'lazy'}
      />
    </div>
  )
}

export default function ProjectGalleryAlbum({
  photos,
}: {
  photos: ProjectGalleryPhoto[]
}) {
  const shouldReduceMotion = useReducedMotion()
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const albumPhotos = useMemo<AlbumPhoto[]>(
    () =>
      photos.map((photo) => ({
        src: urlFor(photo.image).width(1600).quality(85).url(),
        fullSrc: urlFor(photo.image).width(2400).quality(85).url(),
        width: photo.image.asset.metadata.dimensions.width,
        height: photo.image.asset.metadata.dimensions.height,
        alt: photo.alt,
        key: photo.id,
        caption: photo.caption,
        blurDataURL: photo.image.asset.metadata.lqip,
      })),
    [photos],
  )

  return (
    <div className="mx-auto max-w-7xl">
      <RowsPhotoAlbum
        photos={albumPhotos}
        breakpoints={[640, 1024]}
        defaultContainerWidth={1280}
        targetRowHeight={(containerWidth) =>
          isDesktopWidth(containerWidth) ? 360 : 240
        }
        rowConstraints={{ singleRowMaxHeight: 480 }}
        spacing={(containerWidth) => (isDesktopWidth(containerWidth) ? 16 : 8)}
        padding={0}
        onClick={({ index }) => setLightboxIndex(index)}
        render={{
          wrapper: (props, { index }) => {
            const figure = (
              <figure {...props} style={{ ...props.style, margin: 0 }} />
            )

            if (shouldReduceMotion) {
              return figure
            }

            return (
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={photoVariants}
              >
                {figure}
              </motion.div>
            )
          },
          image: renderGalleryImage,
          extras: (_, { photo }) => {
            const caption = photo.caption?.trim()
            return caption ? (
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-teal md:text-[12px]">
                {caption}
              </figcaption>
            ) : null
          },
        }}
      />

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={albumPhotos.map((p) => ({
          src: p.fullSrc,
          width: p.width,
          height: p.height,
          alt: p.alt,
        }))}
        plugins={[Zoom, Counter]}
        zoom={{
          maxZoomPixelRatio: 2,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        carousel={{ finite: false }}
        styles={{
          container: { backgroundColor: 'rgba(15, 35, 24, 0.95)' },
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  )
}
