import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'FAQ | Evolve Dance Center',
  description:
    'Answers to common questions about classes, enrollment, and studio policies at Evolve Dance Center.',
  robots: { index: true, follow: true },
}

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children
}
