'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
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
        zIndex: 9999,
        height: '72px',
        backgroundColor: 'rgba(7,10,9,0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(45,212,191,0.12)',
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
          color: '#f0faf8',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            backgroundColor: '#2dd4bf',
            boxShadow: '0 0 8px #2dd4bf',
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
              <Link href={link.href} style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(240,250,248,0.55)',
                textDecoration: 'none',
              }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Desktop enroll */}
          <a href={siteConfig.jackrabbitEnroll}
            target="_blank" rel="noopener noreferrer"
            className="nav-desktop"
            style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#070a09',
              backgroundColor: '#2dd4bf',
              padding: '10px 24px',
              textDecoration: 'none',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              whiteSpace: 'nowrap',
            }}>
            {siteConfig.enrollCtaLabel}
          </a>

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
              backgroundColor: '#f0faf8',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
              backgroundColor: '#f0faf8',
              transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
              backgroundColor: '#f0faf8',
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
          backgroundColor: '#070a09',
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
              color: '#2dd4bf',
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="#2dd4bf"
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
                    color: '#f0faf8',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(45,212,191,0.08)',
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
                  color: '#070a09',
                  backgroundColor: '#2dd4bf',
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
