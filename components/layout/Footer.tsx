import Link from 'next/link'
import { siteConfig } from '@/data/site'
import { footerLinks } from '@/data/navigation'

export default function Footer() {
  return (
    <footer className="bg-[#040605] pt-[72px] pb-10 px-12">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[rgba(45,212,191,0.06)] mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 font-sans font-semibold text-sm tracking-[0.2em] uppercase text-[#f0faf8] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" style={{ boxShadow: '0 0 6px #2dd4bf' }} />
            {siteConfig.name}
          </div>
          <p className="text-[13px] text-[#5c7a74] leading-[1.7] max-w-[260px]">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Classes */}
        <div>
          <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-teal mb-5">Classes</div>
          <ul className="flex flex-col gap-2.5 list-none">
            {footerLinks.classes.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio */}
        <div>
          <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-teal mb-5">Studio</div>
          <ul className="flex flex-col gap-2.5 list-none">
            {footerLinks.studio.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-teal mb-5">Contact</div>
          <ul className="flex flex-col gap-2.5 list-none">
            <li>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
              >
                {siteConfig.addressLine1}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
              >
                {siteConfig.addressLine2}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[13px] text-[rgba(240,250,248,0.65)] no-underline hover:text-teal transition-colors duration-200"
              >
                Schedule a Visit
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="text-[11px] text-[rgba(200,224,219,0.2)]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </span>
        <div className="flex gap-5">
          {siteConfig.socialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.14em] uppercase text-[rgba(200,224,219,0.25)] no-underline hover:text-teal transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
