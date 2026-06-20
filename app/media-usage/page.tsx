import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'Media Usage | Evolve Dance Center',
  description: 'How photos and video on this site may and may not be used.',
  alternates: { canonical: '/media-usage' },
  robots: {
    index: true,
    follow: true,
  },
}

export default function MediaUsagePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">
              Photos, video, and your dancer&apos;s image
            </span>
          </div>

          <div className="mb-12">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              Media usage
            </h1>
            <p className="mt-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              Evolve Dance Center photographs and films our students, faculty, and studio spaces to share with our
              community and to represent who we are. The photos and video you see on this site exist to tell the story of
              our dancers — not to be downloaded, reposted, or used by anyone else. This page explains what that means in
              practice and how to request a photo of your own dancer for personal use.
            </p>
          </div>

          <article className="font-sans">
            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">What we own</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              All photographs and video on evolvedancecenter.com are the property of Evolve Dance Center, including images
              of our students, faculty, performances, and facilities. This applies whether the image was captured by our
              staff, by a hired photographer, or contributed by a parent for studio use. Reproducing, downloading,
              screenshotting for republication, or republishing any of this content without written permission is not
              allowed.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              What&apos;s not permitted
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Without written permission from Evolve Dance Center, you may not:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              <li>
                Download, save, or screenshot any photo or video on this site for use outside personal viewing
              </li>
              <li>
                Repost, republish, or share our photos or video to social media, blogs, news outlets, or any third-party
                platform
              </li>
              <li>
                Use any image of our students, faculty, or studio for commercial purposes, advertising, or promotion of
                another business or studio
              </li>
              <li>Edit, crop, filter, or otherwise modify our photos or video and present them as your own work</li>
              <li>
                Train, fine-tune, or otherwise feed our photos or video into machine learning models, AI image
                generators, or dataset collections
              </li>
            </ul>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Photos of your own dancer
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If your dancer is featured in a photo or video on this site and you&apos;d like a copy for personal use — a
              family album, a holiday card, a private social post — we&apos;re happy to share. Email us with the page where
              the image appears and we&apos;ll send you the original file along with usage guidance.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Personal use means sharing within your own family and friends. It does not mean reposting on a business
              account, using the photo to promote a different studio or program, or selling prints. Those uses still
              require written permission.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Faculty photos</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Photos of our faculty are licensed for use by Evolve Dance Center only. Faculty members retain the right to
              use their own portraits for their personal portfolios. Other studios, agencies, or publications may not use
              faculty photos from this site without written permission from both Evolve Dance Center and the faculty member
              pictured.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Reporting unauthorized use
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If you see Evolve Dance Center photos or video being used somewhere they shouldn&apos;t be — a
              competitor&apos;s website, an unauthorized social account, a commercial advertisement — please let us know. We
              take image rights seriously and will pursue removal.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Contact</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              For permission requests, personal-use photo requests, or to report unauthorized use, email us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-teal hover:underline underline-offset-2">
                {siteConfig.email}
              </a>
              .
            </p>

            <p className="mt-12 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              <span className="italic">Last updated: June 2026.</span>
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
