import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Dance Studio FAQ',
  description:
    'Answers to common questions about dance classes, enrollment, tuition, dress code, and studio policies at Evolve Dance Center in Las Vegas.',
  alternates: { canonical: '/faq' },
  robots: { index: true, follow: true },
}

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children
}
