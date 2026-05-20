import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Studio Policies',
  description:
    'Tuition, attendance, dress code, recital, and studio policies for families enrolled at Evolve Dance Center — Las Vegas dance studio.',
  alternates: { canonical: '/policies' },
  robots: {
    index: true,
    follow: true,
  },
}

function ConfirmMarker({ label }: { label: string }) {
  return (
    <span className="rounded border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-sm font-medium text-orange-700">
      [CONFIRM: {label}]
    </span>
  )
}

export default function PoliciesPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal opacity-100">
              Studio Policies
            </span>
          </div>

          <div className="mb-12">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              Studio Policies
            </h1>
            <p className="mt-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              <span className="italic">Last updated: {lastUpdated}.</span> The rules below cover tuition, attendance,
              dress code, recital, and what to expect during the season. If anything&apos;s unclear, ask us; we&apos;d
              rather have the conversation than have you assume.
            </p>
          </div>

          <article className="font-sans">
            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Registration</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              A non-refundable registration fee is due when you sign up. The fee is{' '}
              <ConfirmMarker label="dollar amount, typically $25–$75" /> per dancer per season. The season runs{' '}
              <ConfirmMarker label="month to month, typically August through June" />.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Tuition</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Tuition is billed monthly through Jackrabbit Dance. The amount depends on how many classes per week your
              dancer takes. Payments are due on the <ConfirmMarker label="which day of the month, typically the 1st" /> of
              each month and run on autopay.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Tuition isn&apos;t prorated for missed classes, holidays, or partial months. The monthly amount is the same
              regardless of how many class meetings fall in a given month.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Late payments are charged a <ConfirmMarker label="dollar amount, typically $10–$25" /> late fee after the{' '}
              <ConfirmMarker label="which day, typically 5th or 10th" /> of the month. Returned or declined payments are
              charged a <ConfirmMarker label="$25–$35" /> NSF fee.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Families with balances over <ConfirmMarker label="number of days, typically 30 or 60" /> days past due may be
              unenrolled until the balance is cleared.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Withdrawal and refunds
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              To withdraw a dancer from classes, send us written notice (email is fine) at least{' '}
              <ConfirmMarker label="30 days standard" /> before the next billing cycle. Anything less than that and
              you&apos;re responsible for the next month&apos;s tuition.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We don&apos;t refund tuition for missed classes or for partial months. Costume fees and recital fees are
              non-refundable once charged.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If we cancel a class for any reason on our end, we&apos;ll either reschedule it or credit your account.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Attendance</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Consistent attendance matters, especially as recital approaches. If your dancer needs to miss class, let us
              know; email or text is fine.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Dancers who arrive more than <ConfirmMarker label="15 minutes is standard" /> minutes late may be asked to
              observe rather than participate, since they&apos;ve missed the warm-up. This is for safety, not punishment.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              For The Project (competition team), attendance expectations are higher and are detailed in the team
              agreement.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Dress code</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Dress code varies by class style. The basics:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              <li>
                <strong className="font-medium">Ballet</strong> — leotard, tights, ballet shoes, hair pulled back in a bun.
                No jewelry.
              </li>
              <li>
                <strong className="font-medium">Jazz, Contemporary, Lyrical</strong> — fitted dancewear (leotard or fitted
                top with shorts or leggings), appropriate shoes for the style, hair pulled back.
              </li>
              <li>
                <strong className="font-medium">Hip Hop</strong> — comfortable, movement-friendly clothing. Clean indoor
                sneakers required (separate from outdoor shoes).
              </li>
              <li>
                <strong className="font-medium">Tap</strong> — fitted dancewear, tap shoes, hair pulled back.
              </li>
              <li>
                <strong className="font-medium">Acro, Tumbling</strong> — fitted leotard or fitted top and shorts, bare
                feet, hair pulled back.
              </li>
            </ul>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Full details for each class are sent with your enrollment confirmation.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Recital</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Our year-end recital is held <ConfirmMarker label="month, typically May or June" /> at{' '}
              <ConfirmMarker label="venue name and city" />. Every class that participates performs at least one routine.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              The recital fee is <ConfirmMarker label="typical range $75–$150" /> per dancer and covers production costs.
              This is separate from class tuition.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Costumes are ordered per class. Costume fees are typically{' '}
              <ConfirmMarker label="$75–$150 per costume per class" /> and are billed in{' '}
              <ConfirmMarker label="when, typically fall or early winter" />.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Dress rehearsal and picture day are required. Dates are announced{' '}
              <ConfirmMarker label="how far in advance, typically a couple months ahead" />.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Tickets are sold separately, usually starting <ConfirmMarker label="how many weeks before recital" />.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              The Project (competition team)
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              The Project is Evolve&apos;s competition team. Auditions are held annually, typically in{' '}
              <ConfirmMarker label="month" />.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Project dancers commit to multiple classes per week, additional rehearsals, and a competition schedule that
              runs roughly <ConfirmMarker label="month range, typically January through April" />. Tuition, costumes,
              competition fees, and travel are detailed in the separate Project agreement and are higher than recreational
              classes.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If you&apos;re considering The Project, talk to us before auditioning. We&apos;ll be honest about whether your
              dancer is ready.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Studio conduct</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              A few ground rules to keep classes running well:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              <li>No street shoes on the studio floors. Dance shoes only.</li>
              <li>Water bottles are allowed in studios. Food and other drinks stay in the lobby.</li>
              <li>Phones stay in dancer bags during class.</li>
              <li>
                Lobby etiquette: siblings and guests should keep voices low; we run multiple classes at once.
              </li>
              <li>
                Evolve isn&apos;t responsible for personal items left in studios or lobby. Don&apos;t leave anything valuable
                behind.
              </li>
            </ul>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Safety and injury</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Dance involves physical activity, and there&apos;s always some risk of injury. By enrolling your dancer at
              Evolve, you acknowledge that risk and accept that Evolve isn&apos;t liable for injuries that happen during
              normal class participation.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If a dancer has a medical condition, allergy, or injury we should know about, tell us at enrollment and keep
              us updated.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Photos and video</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We take photos and video at classes, performances, and events for the studio&apos;s marketing: our website,
              social media, and printed materials. By enrolling, you agree to this unless you tell us otherwise in writing at
              info@evolvedancecenter.com.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Communication</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We send class updates, schedule changes, recital information, and registration reminders by email and
              occasionally by text. The Jackrabbit parent portal is where you&apos;ll find your dancer&apos;s schedule,
              account balance, and registration history.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Please make sure your email is current. Most issues can be solved with one quick email (info@evolvedancecenter.com)
              or a phone call at (702) 897-5095.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Changes to these policies
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Studio policies are reviewed annually before the start of each season. We&apos;ll let you know about meaningful
              changes.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
