'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0F6E56] bg-[#1D9E75] transition-colors active:bg-[#0F6E56] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        href="/enroll#free-trial"
        className="flex items-center justify-center gap-2 py-4 text-sm font-medium tracking-wider text-white no-underline"
      >
        BOOK A FREE TRIAL
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </Link>
    </div>
  )
}
