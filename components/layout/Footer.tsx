'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { footerLinks } from '@/data/navigation'

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.34a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.77Z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

function SocialIconsRow() {
  const linkClass =
    'inline-flex text-[rgba(247,245,241,0.45)] hover:text-[#81D8D0] transition-colors duration-200'
  const iconClass = 'h-5 w-5 shrink-0'

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-5">
      {siteConfig.socialLinks.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={linkClass}
        >
          {s.network === 'instagram' ? (
            <InstagramIcon className={iconClass} />
          ) : s.network === 'facebook' ? (
            <FacebookIcon className={iconClass} />
          ) : s.network === 'tiktok' ? (
            <TikTokIcon className={iconClass} />
          ) : (
            <YoutubeIcon className={iconClass} />
          )}
        </a>
      ))}
    </div>
  )
}

function MobileFooterAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs tracking-wider uppercase text-[#0ABAB5]">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/60 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && <div className="pb-4 flex flex-col gap-3">{children}</div>}
    </div>
  )
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<'classes' | 'studio' | 'contact' | null>(null)

  const toggle = (id: 'classes' | 'studio' | 'contact') => {
    setOpenSection((current) => (current === id ? null : id))
  }

  return (
    <footer className="bg-[#1F1F1C] px-12 pb-[calc(2.5rem+5rem+env(safe-area-inset-bottom,0px))] pt-[72px] md:pb-10">
      <div className="pb-14 border-b border-[rgba(255,255,255,0.08)] mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:items-stretch">
          {/* Brand */}
          <div className="flex min-h-0 flex-col gap-8 md:h-full md:gap-0">
            <div>
              <div className="mb-4">
                <Link
                  href="/"
                  aria-label="Evolve Dance Center home"
                  className="flex items-center no-underline"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault()
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                >
                  <Image
                    src="/logo/evolve-footer.png"
                    alt="Evolve Dance Center"
                    width={360}
                    height={240}
                    className="h-16 md:h-20 w-auto object-contain"
                  />
                </Link>
              </div>
              <p className="text-[13px] text-[rgba(247,245,241,0.45)] leading-[1.7] max-w-[260px]">
                {siteConfig.tagline}
              </p>
            </div>
            <div className="md:mt-auto md:shrink-0">
              <SocialIconsRow />
            </div>
          </div>

          {/* Mobile — accordions */}
          <div className="md:hidden -mt-2">
            <MobileFooterAccordion
              title="Classes"
              open={openSection === 'classes'}
              onToggle={() => toggle('classes')}
            >
              {footerLinks.classes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </MobileFooterAccordion>
            <MobileFooterAccordion
              title="Studio"
              open={openSection === 'studio'}
              onToggle={() => toggle('studio')}
            >
              {footerLinks.studio.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </MobileFooterAccordion>
            <MobileFooterAccordion
              title="Contact"
              open={openSection === 'contact'}
              onToggle={() => toggle('contact')}
            >
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
              >
                {siteConfig.addressLine1}
              </a>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
              >
                {siteConfig.addressLine2}
              </a>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
              >
                {siteConfig.email}
              </a>
              <Link
                href="/contact"
                className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
              >
                Schedule a Visit
              </Link>
            </MobileFooterAccordion>
          </div>

          {/* Desktop — link columns */}
          <div className="hidden md:block">
            <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-[#81D8D0] mb-5">Classes</div>
            <ul className="flex flex-col gap-2.5 list-none">
              {footerLinks.classes.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-[#81D8D0] mb-5">Studio</div>
            <ul className="flex flex-col gap-2.5 list-none">
              {footerLinks.studio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-[#81D8D0] mb-5">Contact</div>
            <ul className="flex flex-col gap-2.5 list-none">
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  {siteConfig.addressLine1}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  {siteConfig.addressLine2}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
                >
                  Schedule a Visit
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap items-center">
          <Link
            href="/privacy"
            className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
          >
            Privacy
          </Link>
          <span
            className="text-[11px] text-[rgba(247,245,241,0.45)] mx-2 shrink-0"
            aria-hidden
          >
            {' · '}
          </span>
          <Link
            href="/policies"
            className="text-[13px] text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
          >
            Policies
          </Link>
          <span
            className="text-[11px] text-[rgba(247,245,241,0.45)] mx-2 shrink-0"
            aria-hidden
          >
            {' · '}
          </span>
          <span className="text-[11px] text-[rgba(247,245,241,0.45)]">
            © 2026 {siteConfig.name}. All rights reserved. · Site by{' '}
            <a
              href="https://vizantir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#81D8D0] no-underline hover:underline"
            >
              Vizantir
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
