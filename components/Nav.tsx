'use client'

import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 h-[72px]',
        'transition-all duration-400',
        scrolled
          ? 'bg-[rgba(7,10,9,0.96)] backdrop-blur-xl border-b border-[rgba(45,212,191,0.12)]'
          : 'bg-gradient-to-b from-[rgba(7,10,9,0.9)] to-transparent'
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 font-sans font-semibold text-[13px] tracking-[0.22em] uppercase text-[#f0faf8] no-underline"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-dot"
          style={{ boxShadow: '0 0 8px #2dd4bf' }}
        />
        {siteConfig.name}
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'relative text-[11px] font-normal tracking-[0.14em] uppercase',
                'text-[rgba(240,250,248,0.55)] no-underline transition-colors duration-200',
                'hover:text-teal',
                'teal-underline'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href={siteConfig.jackrabbitEnroll}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'hidden md:inline-flex items-center',
          'text-[11px] font-medium tracking-[0.14em] uppercase',
          'text-black bg-teal px-6 py-2.5 clip-btn no-underline',
          'transition-all duration-200 hover:bg-teal-light',
          'hover:shadow-[0_0_40px_rgba(45,212,191,0.35)]'
        )}
      >
        {siteConfig.enrollCtaLabel}
      </a>

      <button
        type="button"
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className={cn(
            'w-6 h-px bg-[#f0faf8] transition-all duration-300',
            menuOpen && 'rotate-45 translate-y-2'
          )}
        />
        <span
          className={cn(
            'w-6 h-px bg-[#f0faf8] transition-all duration-300',
            menuOpen && 'opacity-0'
          )}
        />
        <span
          className={cn(
            'w-6 h-px bg-[#f0faf8] transition-all duration-300',
            menuOpen && '-rotate-45 -translate-y-2'
          )}
        />
      </button>

      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[rgba(7,10,9,0.98)] backdrop-blur-xl border-b border-[rgba(45,212,191,0.12)] py-6 md:hidden">
          <ul className="flex flex-col list-none px-12 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] tracking-[0.14em] uppercase text-[rgba(240,250,248,0.7)] no-underline hover:text-teal transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={siteConfig.jackrabbitEnroll}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[11px] font-medium tracking-[0.14em] uppercase text-black bg-teal px-6 py-2.5 clip-btn no-underline"
              >
                {siteConfig.enrollCtaLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
