import Script from 'next/script'
import type { Metadata } from 'next'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoHeroSection from '@/components/sections/VideoHeroSection'
import {
  TickerSection,
  AboutSection,
  WhyFamiliesChooseSection,
  ClassesSection,
  InstructorsSection,
  EnrollSection,
} from '@/components/sections/HomeSections'
import ScheduleSection from '@/components/sections/ScheduleSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { buildDanceSchoolJsonLd } from '@/lib/dance-school-jsonld'
import { getStudioHours, getFacultyPreview } from '@/sanity/lib/queries'

export const revalidate = 300

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [studioHours, facultyPreview] = await Promise.all([
    getStudioHours(),
    getFacultyPreview(),
  ])
  const jsonLd = buildDanceSchoolJsonLd(studioHours)

  return (
    <>
      <Script
        id="dance-school-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main>
        <VideoHeroSection
          videoSrc="/videos/hero.mp4"
          videoFallback="/videos/hero.webm"
          posterSrc="/images/hero-poster.jpg"
        />
        <TickerSection />
        <AboutSection />
        <WhyFamiliesChooseSection />
        <ClassesSection />
        <ScheduleSection />
        <InstructorsSection faculty={facultyPreview} />
        <TestimonialsSection />
        <EnrollSection />
      </main>

      <Footer />
    </>
  )
}
