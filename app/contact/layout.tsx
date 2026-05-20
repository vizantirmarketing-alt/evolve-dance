import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Contact Our Studio',
  description:
    'Contact Evolve Dance Center in southwest Las Vegas. Visit 6070 S Rainbow Blvd, call (702) 897-5095, or email — we respond within one business day.',
  alternates: { canonical: '/contact' },
  robots: { index: true, follow: true },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
