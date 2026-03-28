'use client'

import Nav from '@/components/Nav'
import { navLinks } from '@/data/navigation'

export default function Navbar() {
  return <Nav links={navLinks} />
}
