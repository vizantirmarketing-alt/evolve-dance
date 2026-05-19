import type { NavLinkItem } from '@/components/Nav'

export const navLinks: NavLinkItem[] = [
  { label: 'Classes', href: '/classes' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Events', href: '/events' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'The Project', href: '/the-project' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const footerLinks: {
  studio: NavLinkItem[]
  classes: NavLinkItem[]
} = {
  studio: [
    { label: 'The Faculty', href: '/faculty' },
    { label: 'The Project', href: '/the-project' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  classes: [
    { label: 'Ballet', href: '/classes?style=ballet' },
    { label: 'Jazz', href: '/classes?style=jazz' },
    { label: 'Hip Hop', href: '/classes?style=hiphop' },
    { label: 'Contemporary', href: '/classes?style=contemporary' },
    { label: 'View All', href: '/classes' },
  ],
}
