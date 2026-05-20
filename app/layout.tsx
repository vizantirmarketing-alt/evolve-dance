import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import '../styles/globals.css'

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
  title: 'Evolve Dance Center — Las Vegas Dance Studio',
  description:
    'Las Vegas dance studio offering ballet, jazz, hip hop, contemporary, acro, lyrical, tap, and more for ages 18 months to 18 years. Quality training in a positive environment.',
  keywords: [
    'Las Vegas dance studio',
    'dance classes Las Vegas',
    'ballet Las Vegas',
    'hip hop dance Las Vegas',
    'kids dance classes Las Vegas',
    'Evolve Dance Center',
  ],
  openGraph: {
    title: 'Evolve Dance Center — Las Vegas',
    description: 'Serious training. Positive environment. Real results — for dancers ages 18 months to 18 years.',
    url: 'https://evolvedancecenter.com',
    siteName: 'Evolve Dance Center',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolve Dance Center — Las Vegas',
    description: 'Serious training. Positive environment. Real results.',
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
