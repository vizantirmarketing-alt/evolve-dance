'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SmartLink from '@/components/SmartLink'
import { buttonVariants } from '@/components/ui/button-styles'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { JACKRABBIT_ENROLL_URL } from '@/lib/jackrabbit'

export interface NavLinkItem {
  label: string
  href: string
}

export interface NavProps {
  links: NavLinkItem[]
}

export default function Nav({ links }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-all duration-300 px-5 py-2 md:py-1.5 lg:py-2 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md'
            : 'bg-background'
        }`}
      >
        {/* Logo */}
        <SmartLink
          href="/"
          aria-label="Evolve Dance Center home"
          className="group flex items-center no-underline transition-transform duration-200 ease-out hover:scale-[1.03]"
        >
          <img
            src="/logo/evolve-navbar.svg"
            alt="Evolve Dance Center"
            width={240}
            height={160}
            className="h-12 w-auto object-contain transition-opacity duration-200 ease-out group-hover:opacity-85 xl:h-14"
          />
        </SmartLink>

        {/* Desktop nav — hidden below 768px */}
        <style>{`
          @media (max-width: 767px) {
            .nav-desktop {
              display: none !important;
              pointer-events: none !important;
            }
            .nav-hamburger { display: flex !important; }
          }
          @media (min-width: 768px) {
            .nav-desktop { display: flex !important; }
            .nav-hamburger { display: none !important; }
          }
        `}</style>

        <ul className="nav-desktop m-0 flex list-none items-center gap-4 p-0 lg:gap-6 xl:gap-8">
          {links.map(link => (
            <li key={link.href} className="shrink-0">
              <SmartLink
                href={link.href}
                className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.15em] text-[#1F1F1C] no-underline [text-shadow:_0_1px_1px_rgb(0_0_0_/_0.08)] transition-colors duration-200 hover:text-[#81D8D0] md:text-[12px] lg:text-[13px]"
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Desktop enroll */}
          <a
            href={JACKRABBIT_ENROLL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'primary', size: 'nav', className: 'nav-desktop group relative shrink-0 whitespace-nowrap md:text-[12px]' })}
          >
            <span className="whitespace-nowrap">{siteConfig.enrollCtaLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </a>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => {
              setMenuOpen(v => !v)
            }}
            aria-label="Toggle menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px', height: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexDirection: 'column',
              gap: '5px',
            }}>
            <span style={{
              display: 'block', width: '24px', height: '1px',
              backgroundColor: '#1F1F1C',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1px',
              backgroundColor: '#1F1F1C',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu portal */}
      {mounted && menuOpen && createPortal(
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#F7F5F1',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 32px 32px',
          overflowY: 'auto',
        }}>
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: '16px', right: '16px',
              width: '44px', height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#0ABAB5',
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="#0ABAB5"
              strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>

          <ul style={{
            listStyle: 'none', margin: 0, padding: 0,
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            {links.map(link => (
              <li key={link.href}>
                <SmartLink href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '14px 0',
                    fontSize: '20px',
                    fontWeight: 300,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#1F1F1C',
                    textDecoration: 'none',
                    borderBottom: '1px solid #D6DFDA',
                  }}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
            <li style={{ marginTop: '28px' }}>
              <a href={JACKRABBIT_ENROLL_URL}
                target="_blank" rel="noopener noreferrer"
                className={buttonVariants({ variant: 'primary', size: 'nav' })}
                style={{ textDecoration: 'none' }}>
                {siteConfig.enrollCtaLabel}
              </a>
            </li>
          </ul>
        </div>,
        document.body
      )}
    </>
  )
}
