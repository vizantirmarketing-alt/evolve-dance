import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Blog | Evolve Dance Center',
  description: 'Studio news, technique notes, and writing on dance from Evolve Dance Center.',
  robots: { index: true, follow: true },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
