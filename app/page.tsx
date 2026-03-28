import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoHeroSection from '@/components/sections/VideoHeroSection'
import {
  TickerSection,
  AboutSection,
  ClassesSection,
  ScheduleSection,
  InstructorsSection,
  TestimonialsSection,
  ProjectSection,
  EnrollSection,
} from '@/components/sections/HomeSections'

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
