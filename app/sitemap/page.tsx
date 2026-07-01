import type { Metadata } from 'next'
import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { JACKRABBIT_ENROLL_URL } from '@/lib/jackrabbit'

export const metadata: Metadata = {
  title: 'Site Map',
  description:
    'A directory of every page at Evolve Dance Center in Las Vegas — classes, schedule, faculty, and more.',
  alternates: { canonical: '/sitemap' },
}

type SitemapLink = {
  label: string
  href: string
  description: string
  external?: boolean
}

type SitemapSection = {
  eyebrow: string
  heading: string
  links: SitemapLink[]
}

const sections: SitemapSection[] = [
  {
    eyebrow: 'Main',
    heading: 'Explore the studio',
    links: [
      { label: 'Home', href: '/', description: 'The Evolve Dance Center homepage' },
      { label: 'Classes', href: '/classes', description: 'Browse every program we offer' },
      { label: 'Schedule', href: '/schedule', description: "This week's live class schedule" },
      { label: 'Faculty', href: '/faculty', description: 'Meet the teachers behind the training' },
      { label: 'The Project', href: '/the-project', description: 'Our competition team program' },
      { label: 'Events', href: '/events', description: 'Recitals, showcases, and studio events' },
      { label: 'About', href: '/about', description: 'Our story, mission, and studio' },
      { label: 'Contact', href: '/contact', description: 'Visit us or send a message' },
    ],
  },
  {
    eyebrow: 'Get started',
    heading: 'Join us',
    links: [
      { label: 'Book a Free Trial', href: '/free-trial', description: 'Try your first class on us' },
      {
        label: 'Enroll Now',
        href: JACKRABBIT_ENROLL_URL,
        description: 'Register through our enrollment system',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Resources',
    heading: 'Learn more',
    links: [
      { label: 'Blog', href: '/blog', description: 'Studio updates and articles' },
      { label: 'FAQ', href: '/faq', description: 'Answers to common questions' },
      { label: 'Studio Policies', href: '/policies', description: 'Rules, dress code, and expectations' },
    ],
  },
  {
    eyebrow: 'Legal',
    heading: 'Fine print',
    links: [
      { label: 'Privacy Policy', href: '/privacy', description: 'How we handle your information' },
      { label: 'Media Usage', href: '/media-usage', description: 'Photo and video policy' },
    ],
  },
]

const linkClass =
  'text-[15px] font-medium text-foreground transition-colors hover:text-teal-hover md:text-[16px]'

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <h1
            className="font-display font-bold leading-none text-foreground"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            Site Map
          </h1>
          <p className="mt-6 text-[15px] font-light leading-[1.75] text-foreground-muted md:text-[16px]">
            A directory of every page at Evolve Dance Center.
          </p>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
            {sections.map((section) => (
              <section key={section.eyebrow}>
                <p className="text-xs uppercase tracking-[0.15em] text-teal-hover">{section.eyebrow}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
                  {section.heading}
                </h2>
                <ul className="mt-8 space-y-6">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${linkClass} inline-flex items-baseline gap-1`}
                        >
                          {link.label}
                          <span aria-hidden className="text-[13px] font-normal text-foreground-muted">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                      <p className="mt-1 text-[14px] leading-[1.6] text-foreground-muted md:text-[15px]">
                        {link.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
