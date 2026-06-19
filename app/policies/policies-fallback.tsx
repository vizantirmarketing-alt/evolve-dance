import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

import { linkClass } from './policy-portable-text'

export function PoliciesFallback() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-prose">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal opacity-100 md:text-[12px]">
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
            <p className="mt-3 text-[13px] font-light tracking-wide text-foreground-muted md:text-[14px]">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-foreground-muted md:text-[16px]">
              The rules below cover tuition, attendance, dress code, recital, and what to expect during the season. If
              anything&apos;s unclear, ask us; we&apos;d rather have the conversation than have you assume.
            </p>
          </div>

          <article className="font-sans">
            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Registration</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              A non-refundable registration fee is due when you sign up. The fee is <strong>$40 per dancer</strong>, or{' '}
              <strong>$65 per family</strong> per season. The season runs{' '}
              <strong>August 10, 2026 through June 12, 2027</strong>.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Tuition</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Tuition is billed monthly through Jackrabbit Dance. The amount depends on how many classes per week your
              dancer takes. Payments are due on the <strong>25th of the prior month</strong> and run on autopay.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Tuition isn&apos;t prorated for missed classes, holidays, or partial months. The monthly amount is the same
              regardless of how many class meetings fall in a given month.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Late payments are charged a <strong>$25 late fee</strong> if not received by the <strong>1st of the month</strong>.
              Returned or declined payments are charged a <strong>$35 NSF fee</strong>.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Families with balances over <strong>30 days past due</strong> may be unenrolled until the balance is cleared.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Withdrawal and refunds
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              To withdraw a dancer from classes, send us written notice (email is fine) by the{' '}
              <strong>15th of the prior month</strong>. Anything later than that and you&apos;re responsible for the next
              month&apos;s tuition.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              We don&apos;t refund tuition for missed classes or for partial months. Costume fees and concert fees are
              non-refundable once charged.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              If we cancel a class for any reason on our end, we&apos;ll either reschedule it or credit your account.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Attendance</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Consistent attendance matters, especially as the Annual Dance Concert approaches. If your dancer needs to miss
              class, let us know; email or text is fine.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Dancers who arrive more than <strong>15 minutes late</strong> may be asked to observe rather than participate,
              since they&apos;ve missed the warm-up. This is for safety, not punishment.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              For the Evolve Dance Project (competition team), attendance expectations are higher and are detailed in the
              team agreement.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Dress code</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Dress code varies by class style. The basics:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              <li>
                <strong>Ballet</strong> — leotard, tights, ballet shoes, hair pulled back in a bun. No jewelry.
              </li>
              <li>
                <strong>Jazz, Contemporary, Lyrical</strong> — fitted dancewear (leotard or fitted top with shorts or
                leggings), appropriate shoes for the style, hair pulled back.
              </li>
              <li>
                <strong>Hip Hop</strong> — comfortable, movement-friendly clothing. Clean indoor sneakers required
                (separate from outdoor shoes).
              </li>
              <li>
                <strong>Tap</strong> — fitted dancewear, tap shoes, hair pulled back.
              </li>
              <li>
                <strong>Acro, Tumbling</strong> — fitted leotard or fitted top and shorts, bare feet, hair pulled back.
              </li>
            </ul>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Full details for each class are sent with your enrollment confirmation.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Annual Dance Concert</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Our year-end Dance Concert is held <strong>June 12, 2027 at Durango High School</strong>. Every class that
              participates performs at least one routine.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              The concert fee is <strong>$60 per dancer</strong>, or <strong>$90 per family</strong>, and covers production
              costs. This is separate from class tuition.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Costumes are ordered per class. Costume fees range from <strong>$75 to $150 per costume</strong> and are
              billed in <strong>December</strong>.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Dress rehearsal and picture day are required. Dates are announced in <strong>April</strong>.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Tickets are sold separately, starting in <strong>May</strong>.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Evolve Dance Project (competition team)
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              The Evolve Dance Project is our competition team. Auditions are held annually in <strong>June</strong>.
              Private auditions are available; contact the studio to arrange one.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Project dancers commit to multiple classes per week, additional rehearsals, and a competition schedule that
              runs from <strong>late August through the end of June</strong>. Tuition, costumes, competition fees, and
              travel are detailed in the separate Project agreement and are higher than recreational classes.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              If you&apos;re considering the Evolve Dance Project, talk to us before auditioning. We&apos;ll be honest about
              whether your dancer is ready.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Studio conduct</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              A few ground rules to keep classes running well:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
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
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Dance involves physical activity, and there&apos;s always some risk of injury. By enrolling your dancer at
              Evolve, you acknowledge that risk and accept that Evolve isn&apos;t liable for injuries that happen during
              normal class participation.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              If a dancer has a medical condition, allergy, or injury we should know about, tell us at enrollment and keep
              us updated.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Photos and video</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              We take photos and video at classes, performances, and events for the studio&apos;s marketing: our website,
              social media, and printed materials. By enrolling, you agree to this unless you tell us otherwise in writing
              at{' '}
              <a href="mailto:info@evolvedancecenter.com" className={linkClass}>
                info@evolvedancecenter.com
              </a>
              .
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Communication</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              We send class updates, schedule changes, concert information, and registration reminders by email and
              occasionally by text. The Jackrabbit parent portal is where you&apos;ll find your dancer&apos;s schedule,
              account balance, and registration history.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
              Please make sure your email is current. Most issues can be solved with one quick email (
              <a href="mailto:info@evolvedancecenter.com" className={linkClass}>
                info@evolvedancecenter.com
              </a>
              ) or a phone call at{' '}
              <a href="tel:+17028975095" className={linkClass}>
                (702) 897-5095
              </a>
              .
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Changes to these policies
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground md:text-[16px]">
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
