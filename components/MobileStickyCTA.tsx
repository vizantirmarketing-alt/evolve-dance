'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 bg-teal shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.15)] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        href="/enroll#free-trial"
        className="flex w-full items-center justify-center gap-3 border-t border-foreground/10 bg-teal py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white no-underline transition-colors duration-150 hover:bg-teal/90 active:bg-teal/80"
      >
        BOOK A FREE TRIAL
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </Link>
    </div>
  )
}
