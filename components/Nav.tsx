'use client'

import { useState } from 'react'
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-4 h-20 transition-all duration-300 bg-[rgba(7,10,9,0.98)] backdrop-blur-xl border-b border-[rgba(45,212,191,0.12)]">
      {/* Logo — left side */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 font-sans font-semibold text-[13px] tracking-[0.22em] uppercase text-[#f0faf8] no-underline"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-dot"
            style={{ boxShadow: '0 0 8px #2dd4bf' }}
          />
          {siteConfig.name}
        </Link>
      </div>

      {/* Desktop nav links — center */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-8 list-none m-0 p-0">
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
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <a
          href={siteConfig.jackrabbitEnroll}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'hidden md:block',
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
          className="md:hidden flex items-center justify-center w-11 h-11"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-1.5">
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
          </span>
        </button>
      </div>

      {menuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#070a09] z-[998] flex flex-col px-8 pt-28 md:hidden"
          style={{ backgroundColor: '#070a09' }}
        >
          <ul className="flex flex-col list-none gap-6 mt-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[18px] font-light tracking-[0.14em] uppercase text-[#f0faf8] no-underline hover:text-teal transition-colors block py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <a
                href={siteConfig.jackrabbitEnroll}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[11px] font-medium tracking-[0.14em] uppercase text-black bg-teal px-6 py-3 no-underline"
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
