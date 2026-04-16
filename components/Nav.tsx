'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/data/site'

export interface NavLinkItem {
  label: string
  href: string
}

export interface NavProps {
  links: NavLinkItem[]
}

export default function Nav({ links }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: '72px',
        backgroundColor: 'rgba(247,245,241,0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #D6DFDA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#1F1F1C',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            backgroundColor: '#0ABAB5',
            boxShadow: '0 0 8px #0ABAB5',
            flexShrink: 0,
          }} />
          {siteConfig.name}
        </Link>

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

        <ul className="nav-desktop" style={{
          gap: '32px',
          listStyle: 'none',
          margin: 0, padding: 0,
          alignItems: 'center',
        }}>
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase text-[#1F1F1C] no-underline [text-shadow:_0_1px_1px_rgb(0_0_0_/_0.08)] transition-colors duration-200 hover:text-[#81D8D0]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Desktop enroll */}
          <Link
            href="/enroll"
            className="nav-desktop group relative inline-flex items-center gap-2 bg-[#0ABAB5] px-5 py-2.5 text-xs font-medium tracking-wider text-white no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#087876] hover:shadow-lg hover:shadow-[#0ABAB5]/25 rounded-sm"
          >
            <span>{siteConfig.enrollCtaLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => {
              alert('clicked')
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
              display: 'block', width: '24px', height: '1.5px',
              backgroundColor: '#1F1F1C',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
              backgroundColor: '#1F1F1C',
              transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
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
                <Link href={link.href}
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
                </Link>
              </li>
            ))}
            <li style={{ marginTop: '28px' }}>
              <a href={siteConfig.jackrabbitEnroll}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'white',
                  backgroundColor: '#0ABAB5',
                  padding: '14px 28px',
                  textDecoration: 'none',
                }}>
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
