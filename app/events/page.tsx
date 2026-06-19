import type { Metadata } from 'next'

import EventCard from '@/components/events/EventCard'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getPastEvents, getUpcomingEvents } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Studio Events & Recitals',
  description:
    'Recitals, auditions, summer programs, workshops, and important dates at Evolve Dance Center — your Las Vegas dance studio for families and competitive dancers.',
  alternates: { canonical: '/events' },
}

export const revalidate = 60

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([getUpcomingEvents(), getPastEvents()])

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">
              Events
            </span>
          </div>

          <div className="mb-12 max-w-3xl">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              Upcoming &amp; Recent
            </h1>
            <p className="mt-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              A running list of what&apos;s on the calendar at Evolve: performances, auditions, summer programs,
              workshops, and the days we close for holidays or breaks. Click through when you need details or a signup
              link.
            </p>
          </div>

          <section className="mb-16 md:mb-20" aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Upcoming
            </h2>

            {upcomingEvents.length === 0 ? (
              <div className="mx-auto max-w-md py-16 text-center md:py-20">
                <p className="text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
                  Nothing on the calendar right now — check back soon.
                </p>
              </div>
            ) : (
              <ul className="mt-10 flex flex-col gap-10">
                {upcomingEvents.map((event) => (
                  <li key={event._id}>
                    <EventCard event={event} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {pastEvents.length > 0 ? (
            <section aria-labelledby="past-heading">
              <h2
                id="past-heading"
                className="font-display text-2xl font-bold text-foreground-muted md:text-3xl"
              >
                Recent past events
              </h2>
              <ul className="mt-10 flex flex-col gap-10">
                {pastEvents.map((event) => (
                  <li key={event._id}>
                    <EventCard event={event} variant="past" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}
