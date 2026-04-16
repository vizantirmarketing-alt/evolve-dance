import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { ScheduleFilters } from '@/components/sections/ScheduleFilters'
import { siteConfig } from '@/data/site'
import { getJackrabbitClasses, getPublicClasses } from '@/lib/jackrabbit'

export const metadata: Metadata = {
  title: 'Class Schedule | Evolve Dance Center',
  description:
    "Browse this week's classes at Evolve Dance Center in Las Vegas. Live schedule with ballet, jazz, hip hop, contemporary, tap, acro, and more for ages 18 months to 18 years.",
}

export const revalidate = 300

export default async function SchedulePage() {
  let classes: Awaited<ReturnType<typeof getJackrabbitClasses>> = []
  try {
    const all = await getJackrabbitClasses()
    classes = getPublicClasses(all)
  } catch {
    classes = []
  }

  const categories = [...new Set(classes.map((c) => c.category))].sort((a, b) => a.localeCompare(b))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0f2318] px-4 pb-32 pt-24 text-[#f0faf8] md:px-12 md:pt-28">
        <div className="mx-auto max-w-6xl">
          {classes.length === 0 ? (
            <div className="mx-auto max-w-lg py-16 text-center">
              <p className="text-[15px] font-light leading-[1.8] text-[#e2e8f0]">
                Live schedule temporarily unavailable. Call{' '}
                <a href={`tel:${siteConfig.phoneTel}`} className="text-teal underline-offset-2 hover:underline">
                  {siteConfig.phone}
                </a>{' '}
                or book a free trial.
              </p>
              <Link
                href="/enroll#free-trial"
                className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#0ABAB5] px-8 py-3.5 text-xs font-medium uppercase tracking-wider text-white no-underline transition-colors hover:bg-[#087876]"
              >
                BOOK A FREE TRIAL
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-7 bg-teal opacity-100" />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">
                  Class schedule
                </span>
              </div>

              <div className="mb-12 max-w-3xl">
                <h1
                  className="font-display font-bold leading-none text-[#f0faf8]"
                  style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
                >
                  Browse this week&apos;s <em className="italic text-teal">classes</em>
                </h1>
                <p className="mt-6 text-[15px] font-light leading-[1.8] text-[#e2e8f0]">
                  Live schedule updates from our registration system. Book a free trial to join any open class.
                </p>
              </div>

              <ScheduleFilters classes={classes} categories={categories} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
