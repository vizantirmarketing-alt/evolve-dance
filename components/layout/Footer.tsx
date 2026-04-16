'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { footerLinks } from '@/data/navigation'

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
    <footer className="bg-[#1F1F1C] pt-[72px] pb-10 px-12">
      <div className="pb-14 border-b border-[rgba(255,255,255,0.08)] mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 font-sans font-semibold text-sm tracking-[0.2em] uppercase text-[rgba(247,245,241,0.9)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#81D8D0]" style={{ boxShadow: '0 0 6px #81D8D0' }} />
              {siteConfig.name}
            </div>
            <p className="text-[13px] text-[rgba(247,245,241,0.45)] leading-[1.7] max-w-[260px]">
              {siteConfig.tagline}
            </p>
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
      <div className="flex items-center justify-between flex-wrap gap-4">
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
        <div className="flex gap-5">
          {siteConfig.socialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.14em] uppercase text-[rgba(247,245,241,0.45)] no-underline hover:text-[#81D8D0] transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
