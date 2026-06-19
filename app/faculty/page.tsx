import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-styles'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getFacultyForPage } from '@/sanity/lib/queries'
import { FacultyStage } from './faculty-stage'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Faculty | Evolve Dance Center',
  description:
    'Working Strip professionals, conservatory-trained company members, and competitive choreographers — teaching the next generation in Las Vegas.',
  alternates: { canonical: '/faculty' },
  openGraph: {
    title: 'Faculty | Evolve Dance Center',
    description:
      'Meet the directors and faculty at Evolve Dance Center in Las Vegas.',
    type: 'website',
    url: '/faculty',
  },
}

export default async function FacultyPage() {
  const faculty = await getFacultyForPage()

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <FacultyStage faculty={faculty} />

        {/* Bottom CTA — matches /classes pattern */}
        <section className="w-full border-t border-[#D6DFDA] bg-[#0ABAB5] px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display mb-6 text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-[#070a09]">
              Train with our faculty
            </h2>
            <p className="mb-10 text-[15px] leading-[1.75] text-[#070a09]/85">
              Find a class taught by the instructor you want to learn from. First class is on us.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/classes"
                className={buttonVariants({ variant: 'primary', surface: 'inverse', size: 'wide' })}
              >
                Browse Classes
              </Link>
              <Link
                href="/free-trial"
                className={buttonVariants({ variant: 'secondary', surface: 'inverse', size: 'wide' })}
              >
                Book a Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
