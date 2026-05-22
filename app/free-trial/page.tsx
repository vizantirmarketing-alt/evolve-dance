import type { Metadata } from 'next'
import Script from 'next/script'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

import { FreeTrialContent } from './FreeTrialContent'

export const metadata: Metadata = {
  title: 'Free First Dance Class | Evolve Dance Center Las Vegas',
  description:
    "Your dancer's first class at Evolve Dance Center is free. BFA-trained instructors, ballet, hip hop, contemporary, jazz, and more. Ages 18 months to 18 years. Southwest Las Vegas.",
  alternates: { canonical: '/free-trial' },
  openGraph: {
    title: 'Free First Dance Class | Evolve Dance Center',
    description:
      "Try a free first class at Las Vegas's premier dance studio. BFA-trained instructors, all genres, ages 18 months to 18 years.",
    url: '/free-trial',
  },
}

const freeTrialJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Free Trial Dance Class',
  provider: {
    '@type': 'DanceSchool',
    name: 'Evolve Dance Center',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6070 S Rainbow Blvd',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89118',
    },
  },
  areaServed: 'Las Vegas, NV',
  description: 'Free trial dance class at Evolve Dance Center. Try a class before enrolling.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function FreeTrialPage() {
  return (
    <>
      <Script id="free-trial-jsonld" type="application/ld+json">
        {JSON.stringify(freeTrialJsonLd)}
      </Script>
      <Navbar />
      <main className="bg-background">
        <FreeTrialContent />
      </main>
      <Footer />
    </>
  )
}
