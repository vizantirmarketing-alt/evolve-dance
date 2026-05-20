import type { Metadata } from 'next'

import FacultyCard from '@/components/faculty/FacultyCard'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getPublishedFaculty } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Our Dance Faculty',
  description:
    'Meet the Las Vegas dance teachers at Evolve Dance Center — working professionals training the next generation with care, technique, and high standards.',
  alternates: { canonical: '/faculty' },
}

export const revalidate = 300

export default async function FacultyPage() {
  const faculty = await getPublishedFaculty()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">Faculty</span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              The Faculty
            </h1>
            <p className="mt-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              The team at Evolve brings together working dancers, choreographers, and longtime educators. Many of them
              have performed professionally, taught at competition studios across the country, or trained the dancers
              you&apos;ve seen on tour.
            </p>
          </div>

          {faculty.length === 0 ? (
            <div className="mx-auto max-w-md py-16 text-center md:py-20">
              <p className="text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
                Faculty profiles are being added — check back soon.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {faculty.map((member) => (
                <li key={member._id}>
                  <FacultyCard faculty={member} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
