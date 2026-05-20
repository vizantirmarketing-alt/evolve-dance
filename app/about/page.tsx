import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Evolve Dance Center',
  description:
    'Premier Las Vegas dance studio established in 2016. Six professional studios, twenty-two working teachers, programs for ages 18 months to 18 years.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
