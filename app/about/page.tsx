import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Evolve Dance Center | Las Vegas Dance Studio Founded 2017',
  description:
    'Founded in 2017 by BFA-trained dancers Meghan Hoover and Cheryl Snow, Evolve Dance Center offers exceptional dance training in Southwest Las Vegas — from recreational classes to elite competitive programs.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Evolve Dance Center | Las Vegas Dance Studio',
    description:
      'Meet the co-founders behind Las Vegas\'s premier dance studio. BFA-trained professionals offering recreational to elite competitive dance training since 2017.',
    url: '/about',
  },
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
