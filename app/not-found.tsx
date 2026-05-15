import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Page not found | Evolve Dance Center',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-background flex items-center justify-center px-6 py-24 md:py-32 min-h-[60vh]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-7 bg-teal" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal">404</span>
            <div className="h-px w-7 bg-teal" />
          </div>

          <h1
            className="font-display font-bold leading-[0.95] text-foreground mb-5"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            Looks like we missed a step.
          </h1>

          <p className="text-foreground-muted text-[15px] font-light leading-[1.8] max-w-md mx-auto mb-12 md:text-[16px]">
            The page you're looking for doesn't exist, or it may have moved. Try one of these instead — or head back home.
          </p>

          <div className="text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-foreground-muted mb-5">
            Popular pages
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link
              href="/classes"
              className="inline-flex items-center px-4 py-3 border border-border rounded-full text-[13px] text-foreground bg-background-warm hover:border-teal hover:text-teal transition-colors duration-200 md:text-[14px]"
            >
              Classes
            </Link>
            <Link
              href="/faculty"
              className="inline-flex items-center px-4 py-3 border border-border rounded-full text-[13px] text-foreground bg-background-warm hover:border-teal hover:text-teal transition-colors duration-200 md:text-[14px]"
            >
              Faculty
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center px-4 py-3 border border-border rounded-full text-[13px] text-foreground bg-background-warm hover:border-teal hover:text-teal transition-colors duration-200 md:text-[14px]"
            >
              Schedule
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-3 border border-border rounded-full text-[13px] text-foreground bg-background-warm hover:border-teal hover:text-teal transition-colors duration-200 md:text-[14px]"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-foreground/85 transition-colors duration-200 md:py-4 md:text-[13px]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
