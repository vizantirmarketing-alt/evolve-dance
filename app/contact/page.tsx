import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from 'lucide-react'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { siteConfig } from '@/data/site'
import {
  getStudioHours,
  type StudioHours,
  type StudioRegularHours,
  type StudioSpecialHours,
} from '@/sanity/lib/queries'

import ContactForm from './ContactForm'

export const revalidate = 300

const GOOGLE_MAPS_EMBED_SRC =
  'https://maps.google.com/maps?q=6070+S+Rainbow+Blvd+Las+Vegas+NV+89118&t=&z=15&ie=UTF8&iwloc=&output=embed'
const GOOGLE_MAPS_SEARCH_HREF =
  'https://www.google.com/maps/search/?api=1&query=6070+S+Rainbow+Blvd+Las+Vegas+NV+89118'

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.34a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.77Z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

function ContactSocialRow() {
  const linkClass =
    'inline-flex text-foreground-muted hover:text-teal-hover transition-colors duration-200'
  const iconClass = 'h-5 w-5 shrink-0'

  return (
    <div className="flex flex-wrap items-center gap-5 mt-2">
      {siteConfig.socialLinks.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={linkClass}
        >
          {s.network === 'instagram' ? (
            <InstagramIcon className={iconClass} />
          ) : s.network === 'facebook' ? (
            <FacebookIcon className={iconClass} />
          ) : s.network === 'tiktok' ? (
            <TikTokIcon className={iconClass} />
          ) : (
            <YoutubeIcon className={iconClass} />
          )}
        </a>
      ))}
    </div>
  )
}

function formatRegularDayLine(day: StudioRegularHours): string {
  if (!day.isOpen) return `${day.day}: Closed`
  if (day.openTime && day.closeTime) return `${day.day}: ${day.openTime} – ${day.closeTime}`
  if (day.openTime || day.closeTime) {
    return `${day.day}: ${[day.openTime, day.closeTime].filter(Boolean).join(' – ')}`
  }
  return `${day.day}: Open`
}

function formatSpecialDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatSpecialHoursLine(entry: StudioSpecialHours): string {
  if (entry.isClosed) return 'Closed'
  if (entry.openTime && entry.closeTime) return `${entry.openTime} – ${entry.closeTime}`
  if (entry.openTime || entry.closeTime) {
    return [entry.openTime, entry.closeTime].filter(Boolean).join(' – ')
  }
  return 'Open'
}

function StudioHoursBlock({ studioHours }: { studioHours: StudioHours | null }) {
  const regularHours = studioHours?.regularHours ?? []
  const specialHours = studioHours?.specialHours ?? []
  const holidayMessage = studioHours?.holidayMessage?.trim()

  if (!studioHours || regularHours.length === 0) {
    return (
      <p className="mt-1 text-[14px] font-medium text-foreground md:text-[15px]">
        Studio hours coming soon
      </p>
    )
  }

  return (
    <div className="mt-1 space-y-3">
      {holidayMessage ? (
        <p className="rounded border border-teal/20 bg-teal/8 px-3 py-2 text-[13px] font-medium leading-[1.6] text-foreground md:text-[14px]">
          {holidayMessage}
        </p>
      ) : null}

      <div className="space-y-1">
        {regularHours.map((day) => (
          <div key={day.day}>
            <p className="text-[14px] font-medium text-foreground md:text-[15px]">
              {formatRegularDayLine(day)}
            </p>
            {day.note?.trim() ? (
              <p className="text-[13px] font-light text-foreground-muted md:text-[14px]">
                {day.note.trim()}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {specialHours.length > 0 ? (
        <div className="space-y-2 pt-1">
          <p className="text-[11px] uppercase tracking-[0.15em] text-foreground-subtle md:text-[12px]">
            Upcoming schedule changes
          </p>
          <ul className="space-y-2">
            {specialHours.map((entry) => (
              <li key={`${entry.date}-${entry.label}`}>
                <p className="text-[14px] font-medium text-foreground md:text-[15px]">{entry.label}</p>
                <p className="text-[13px] font-light text-foreground-muted md:text-[14px]">
                  {formatSpecialDate(entry.date)} · {formatSpecialHoursLine(entry)}
                </p>
                {entry.note?.trim() ? (
                  <p className="text-[13px] font-light text-foreground-muted md:text-[14px]">
                    {entry.note.trim()}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default async function ContactPage() {
  const studioHours = await getStudioHours()

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="mb-10 md:mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal-hover">
                Contact
              </span>
            </div>
            <h1
              className="font-display font-bold leading-tight text-foreground"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Contact Evolve Dance Center
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-7 bg-teal" />
                <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal-hover">VISIT US</span>
              </div>

              <h3
                className="font-display font-bold leading-tight text-foreground"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
              >
                Find us in southwest Las Vegas.
              </h3>

              <p className="mt-4 max-w-md text-[14px] font-light leading-[1.7] text-foreground-muted md:text-[15px]">
                Drop in to see the studio or reach out anytime. We typically respond within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <MapPin className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">Studio</div>
                  <div className="mt-1 text-[14px] font-medium text-foreground md:text-[15px]">6070 S Rainbow Blvd, Las Vegas, NV 89118</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <Phone className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">Phone</div>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="mt-1 block text-[14px] font-medium text-foreground transition-colors hover:text-teal-hover md:text-[15px]"
                  >
                    (702) 897-5095
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <Mail className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">Email</div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block text-[14px] font-medium text-foreground transition-colors hover:text-teal-hover md:text-[15px]"
                  >
                    info@evolvedancecenter.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <Clock className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">
                    Studio Hours
                  </div>
                  <StudioHoursBlock studioHours={studioHours} />
                </div>
              </div>
            </div>

            <div className="relative h-[240px] w-full overflow-hidden rounded border border-border">
              <a
                href={GOOGLE_MAPS_SEARCH_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded bg-foreground px-3 py-2 text-[12px] text-background shadow-md transition-colors duration-200 hover:bg-foreground/85 md:text-[13px]"
              >
                <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden />
                Open in Maps
              </a>
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                className="absolute inset-0 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Evolve Dance Center location"
                allowFullScreen
              />
            </div>

            <ContactSocialRow />
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
