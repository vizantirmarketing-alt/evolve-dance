import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Contact | Evolve Dance Center',
  description:
    'Visit Evolve Dance Center in southwest Las Vegas. 6070 S Rainbow Blvd. Call (702) 897-5095 or email info@evolvedancecenter.com.',
  robots: { index: true, follow: true },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
