import type { Metadata } from 'next'
import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { buttonVariants } from '@/components/ui/button-styles'
import { getStudioVideos } from '@/sanity/lib/queries'

import StudioVideoTile from './StudioVideoTile'

export const metadata: Metadata = {
  title: 'Watch The Studio | Evolve Dance Center',
  description:
    'See what happens inside the studio. Real classes, rehearsals, and moments from Evolve Dance Center in Las Vegas.',
  alternates: { canonical: '/watch' },
}

export const revalidate = 60

export default async function WatchPage() {
  const studioVideos = await getStudioVideos()
  const videos = studioVideos?.videos
  const hasVideos = videos != null && videos.length > 0

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">
              Watch
            </span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              Inside the studio.
            </h1>
            <p className="mt-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              Real classes, rehearsals, and moments from the studio. Updated as new work happens.
            </p>
          </div>

          {hasVideos ? (
            <section aria-labelledby="videos-heading" className="mb-24 md:mb-32">
              <h2 id="videos-heading" className="sr-only">
                Studio Videos
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {videos.map((video) => (
                  <StudioVideoTile key={video.id} video={video} />
                ))}
              </div>
            </section>
          ) : (
            <div className="mx-auto max-w-md py-16 text-center md:py-20">
              <p className="text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
                New videos coming soon.
              </p>
            </div>
          )}

          <section aria-labelledby="cta-heading" className="mt-24 text-center md:mt-32">
            <h2 id="cta-heading" className="sr-only">
              Take the next step
            </h2>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Ready to see it in person?
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link
                href="/free-trial"
                className={buttonVariants({
                  variant: 'primary',
                  surface: 'dark',
                  className: 'pointer-events-auto w-full sm:w-auto md:w-auto md:justify-start',
                })}
              >
                Book a Free Trial
              </Link>
              <Link
                href="/classes"
                className={buttonVariants({
                  variant: 'secondary',
                  surface: 'dark',
                  className: 'pointer-events-auto w-full sm:w-auto md:w-auto md:justify-start',
                })}
              >
                Explore Classes
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
