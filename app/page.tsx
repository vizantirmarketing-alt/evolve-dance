import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoHeroSection from '@/components/sections/VideoHeroSection'
import {
  TickerSection,
  AboutSection,
  WhyFamiliesChooseSection,
  ClassesSection,
  InstructorsSection,
  ProjectSection,
  EnrollSection,
} from '@/components/sections/HomeSections'
import ScheduleSection from '@/components/sections/ScheduleSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export const revalidate = 300

export default function HomePage() {
  return (
    <>
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
        <InstructorsSection />
        <TestimonialsSection />
        <ProjectSection />
        <EnrollSection />
      </main>

      <Footer />
    </>
  )
}
