import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { urlFor } from '@/sanity/lib/image'
import { getProjectGallery } from '@/sanity/lib/queries'

import ProjectGalleryAlbum from './ProjectGalleryAlbum'

export const revalidate = 60

const PAGE_TITLE = 'Gallery — The Project'
const PAGE_DESCRIPTION =
  'Photos from inside The Project at Evolve Dance Center: audition days, masterclasses, and the work between.'

export async function generateMetadata(): Promise<Metadata> {
  const gallery = await getProjectGallery()
  const firstPhoto = gallery?.photos?.[0]

  const openGraph: Metadata['openGraph'] = {
    title: `${PAGE_TITLE} | Evolve Dance Center`,
    description: PAGE_DESCRIPTION,
    url: '/the-project/gallery',
    type: 'website',
  }

  if (firstPhoto) {
    const { width, height } = firstPhoto.image.asset.metadata.dimensions
    openGraph.images = [
      {
        url: urlFor(firstPhoto.image).width(1200).quality(85).url(),
        width,
        height,
        alt: firstPhoto.alt,
      },
    ]
  }

  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: '/the-project/gallery' },
    robots: { index: true, follow: true },
    openGraph,
  }
}

export default async function ProjectGalleryPage() {
  const gallery = await getProjectGallery()
  const photos = gallery?.photos ?? []

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <section className="px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                Gallery
              </span>
            </div>
            <h1
              className="mb-6 font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
            >
              Inside The Project
            </h1>
            <p className="mb-10 max-w-xl text-[14px] leading-[1.75] text-foreground-muted md:mb-12 md:text-[15px]">
              A growing archive from audition days, masterclasses, and the work between.
            </p>

            {photos.length > 0 ? <ProjectGalleryAlbum photos={photos} /> : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
