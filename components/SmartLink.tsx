'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

type SmartLinkProps = ComponentProps<typeof Link>

function isSameRoute(href: SmartLinkProps['href'], pathname: string): boolean {
  if (typeof href !== 'string') {
    const path = href.pathname ?? ''
    if (path !== pathname) return false
    if (href.search) {
      return typeof window !== 'undefined' && window.location.search === href.search
    }
    if (href.hash) {
      return typeof window !== 'undefined' && window.location.hash === href.hash
    }
    return true
  }

  if (
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) {
    return false
  }

  const [pathAndSearch, hash = ''] = href.split('#')
  const [path, search = ''] = pathAndSearch.split('?')

  if (path !== pathname) return false

  if (search) {
    return typeof window !== 'undefined' && window.location.search === `?${search}`
  }

  if (hash) {
    return typeof window !== 'undefined' && window.location.hash === `#${hash}`
  }

  return true
}

export default function SmartLink({ href, onClick, scroll = true, ...props }: SmartLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      scroll={scroll}
      {...props}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return

        if (isSameRoute(href, pathname)) {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
    />
  )
}
