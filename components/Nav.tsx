'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { cn } from '@/lib/utils'
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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const mobileMenu = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#070a09',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        padding: '100px 32px 32px',
      }}
    >
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                fontSize: '20px',
                fontWeight: 300,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#f0faf8',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(45,212,191,0.08)',
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li style={{ marginTop: '24px' }}>
          <a
            href={siteConfig.jackrabbitEnroll}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#070a09',
              backgroundColor: '#2dd4bf',
              padding: '12px 24px',
              textDecoration: 'none',
            }}
          >
            {siteConfig.enrollCtaLabel}
          </a>
        </li>
      </ul>
    </div>
  )

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: '72px',
          backgroundColor: 'rgba(7,10,9,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(45,212,191,0.12)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#f0faf8',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#2dd4bf',
              boxShadow: '0 0 8px #2dd4bf',
              flexShrink: 0,
            }}
          />
          {siteConfig.name}
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          style={{
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,250,248,0.55)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <a
            href={siteConfig.jackrabbitEnroll}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#070a09',
              backgroundColor: '#2dd4bf',
              padding: '10px 24px',
              textDecoration: 'none',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
            }}
          >
            {siteConfig.enrollCtaLabel}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <span style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#f0faf8',
                transition: 'all 0.3s',
                transform: menuOpen 
                  ? 'rotate(45deg) translateY(6px)' 
                  : 'none',
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#f0faf8',
                transition: 'all 0.3s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#f0faf8',
                transition: 'all 0.3s',
                transform: menuOpen 
                  ? 'rotate(-45deg) translateY(-6px)' 
                  : 'none',
              }} />
            </span>
          </button>
        </div>
      </nav>

      {mounted && menuOpen && createPortal(
        mobileMenu, 
        document.body
      )}
    </>
  )
}
