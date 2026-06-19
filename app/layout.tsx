import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import '../styles/globals.css'
import { siteUrl } from '@/lib/site-url'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Las Vegas Dance Studio',
    template: '%s | Evolve Dance Center',
  },
  description:
    'Las Vegas dance studio for ages 18 months to 18 years. Ballet, jazz, hip hop, contemporary, acro, tap, and more — quality training in a supportive environment.',
  keywords: [
    'Las Vegas dance studio',
    'dance classes Las Vegas',
    'ballet Las Vegas',
    'hip hop dance Las Vegas',
    'kids dance classes Las Vegas',
    'Evolve Dance Center',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Las Vegas Dance Studio | Evolve Dance Center',
    description:
      'Serious training, positive environment, and real results for dancers ages 18 months to 18 years in southwest Las Vegas.',
    url: siteUrl,
    siteName: 'Evolve Dance Center',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Evolve Dance Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Vegas Dance Studio | Evolve Dance Center',
    description:
      'Serious training, positive environment, and real results for dancers ages 18 months to 18 years.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
