import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'The Project | Evolve Dance Center',
  description:
    "The Project is Evolve Dance Center's competition team — serious training for serious dancers. Auditions held annually in May. Located in southwest Las Vegas.",
  robots: { index: true, follow: true },
}

export default function TheProjectPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Hero */}
        <section className="px-6 pb-16 pt-16 md:px-16 md:pb-20 md:pt-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-7 bg-teal" />
                  <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal">
                    The Competition Team
                  </span>
                </div>
                <h1
                  className="font-display font-bold leading-[0.95] text-foreground"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
                >
                  The Project.
                </h1>
                <h2
                  className="mb-6 font-display font-bold italic leading-[0.95] text-foreground"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
                >
                  Where serious dancers train.
                </h2>
                <p className="mb-8 max-w-md text-[15px] font-light leading-[1.75] text-foreground-muted md:text-[16px]">
                  Evolve&apos;s invitation-only competition team for dancers ready to take their training to the next
                  level. We compete locally and nationally, and our dancers go on to drill teams, college programs, and
                  professional companies.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/the-project#audition"
                    className="inline-flex items-center gap-2 bg-foreground px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-200 hover:bg-foreground/85 md:text-[13px]"
                  >
                    Audition info →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-foreground px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background md:text-[13px]"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="flex aspect-[4/5] items-center justify-center rounded border border-border bg-background-warm">
                <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted md:text-[13px]">
                  [Hero photo of the team]
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What it is */}
        <section className="bg-background-warm px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
              <div className="pt-2 text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-foreground-muted">01 — What it is</div>
              <div>
                <h2
                  className="mb-6 font-display font-bold text-foreground"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
                >
                  A serious commitment for serious dancers.
                </h2>
                <p className="mb-4 text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">
                  The Project is Evolve&apos;s competition team — a dedicated group of dancers who train across ballet,
                  jazz, contemporary, lyrical, hip hop, and acro. We don&apos;t just chase trophies. We build dancers
                  who carry themselves with discipline, artistry, and confidence on and off the stage.
                </p>
                <p className="mb-4 text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">
                  Project dancers commit to multiple weekly classes, additional rehearsals, and a competition schedule
                  that runs January through April. We attend regional competitions, conventions, and out-of-state
                  Nationals annually.
                </p>
                <p className="mb-4 text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">
                  If you&apos;re considering The Project, talk to us before auditioning. We&apos;ll be honest about
                  whether your child is ready — and what training will get them there.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-16 md:px-16 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 rounded-lg border border-border bg-background-warm p-10 md:grid-cols-4 md:gap-10 md:p-12">
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  15+
                </div>
                <div className="mt-2 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">Years competing</div>
              </div>
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  6
                </div>
                <div className="mt-2 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">
                  Competitions / season
                </div>
              </div>
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  3
                </div>
                <div className="mt-2 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">Team levels</div>
              </div>
              <div>
                <div
                  className="font-display font-bold leading-none text-foreground"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  100%
                </div>
                <div className="mt-2 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">
                  Senior placement rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team levels */}
        <section className="bg-foreground px-6 py-20 md:px-16 md:py-28 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-px w-7 bg-white/40" />
                <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-white/60">Team Levels</span>
                <div className="h-px w-7 bg-white/40" />
              </div>
              <h2
                className="font-display font-bold text-background"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.05' }}
              >
                Three levels. One team.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-white/65 md:text-[15px]">
                Dancers are placed by age, training, and audition performance.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
                <div className="mb-3 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-teal">Ages 5–8</div>
                <div className="mb-4 font-display font-bold text-background" style={{ fontSize: '26px', lineHeight: '1.1' }}>
                  Prep
                </div>
                <div className="mb-5 text-[14px] leading-[1.6] text-white/65 md:text-[15px]">
                  Introduction to competition for young dancers. One group routine, local competitions, foundation
                  training.
                </div>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Classes / week</span>
                    <span className="font-medium text-background">4–6 hrs</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Competitions</span>
                    <span className="font-medium text-background">2 local</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Nationals</span>
                    <span className="font-medium text-background">Optional</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
                <div className="mb-3 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-teal">Ages 9–13</div>
                <div className="mb-4 font-display font-bold text-background" style={{ fontSize: '26px', lineHeight: '1.1' }}>
                  Junior
                </div>
                <div className="mb-5 text-[14px] leading-[1.6] text-white/65 md:text-[15px]">
                  Intermediate competitors building advanced technique across multiple styles. Regional travel begins.
                </div>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Classes / week</span>
                    <span className="font-medium text-background">8–10 hrs</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Competitions</span>
                    <span className="font-medium text-background">4 regional</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Nationals</span>
                    <span className="font-medium text-background">Required</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
                <div className="mb-3 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-teal">Ages 14–18</div>
                <div className="mb-4 font-display font-bold text-background" style={{ fontSize: '26px', lineHeight: '1.1' }}>
                  Senior
                </div>
                <div className="mb-5 text-[14px] leading-[1.6] text-white/65 md:text-[15px]">
                  Advanced dancers preparing for collegiate, professional, or industry-level training. Conventions and
                  out-of-state competition.
                </div>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Classes / week</span>
                    <span className="font-medium text-background">12+ hrs</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Competitions</span>
                    <span className="font-medium text-background">6+ regional + Nationals</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-[14px]">
                    <span className="text-white/50">Nationals</span>
                    <span className="font-medium text-background">Required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-7 bg-teal" />
                  <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal">The Commitment</span>
                </div>
                <h2
                  className="mb-5 font-display font-bold text-foreground"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.1' }}
                >
                  What it takes.
                </h2>
                <p className="text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">
                  Project is a year-round commitment. Here&apos;s what families should expect.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">Season</div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      August through June, with competitions January through April.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">
                      Required classes
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      Ballet (weekly), jazz technique, plus level-specific genre classes.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">
                      Choreography camps
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      Mandatory team rehearsals in late summer to learn group routines.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">Conventions</div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      All Junior and Senior dancers attend at least one convention per season.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal/[0.08] text-[14px] text-teal">
                    ◆
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-foreground-muted">
                      Additional fees
                    </div>
                    <div className="text-[14px] leading-[1.6] text-foreground">
                      Costumes, competition fees, and travel are billed separately from tuition. Detailed in the Project
                      agreement.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="bg-background-warm px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-px w-7 bg-teal" />
                <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal">Recent Achievements</span>
                <div className="h-px w-7 bg-teal" />
              </div>
              <h2
                className="font-display font-bold text-foreground"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1.05' }}
              >
                Hard work, recognized.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-7">
                <div className="mb-3 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-teal">2024 Season</div>
                <div className="mb-2 font-display font-bold text-foreground" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                  Platinum Award
                </div>
                <div className="text-[13px] leading-[1.6] text-foreground-muted md:text-[14px]">Senior Lyrical Group — KAR Nationals</div>
              </div>
              <div className="rounded-lg border border-border bg-background p-7">
                <div className="mb-3 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-teal">2024 Season</div>
                <div className="mb-2 font-display font-bold text-foreground" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                  1st Place Overall
                </div>
                <div className="text-[13px] leading-[1.6] text-foreground-muted md:text-[14px]">
                  Junior Jazz Line — Showbiz Regionals
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background p-7">
                <div className="mb-3 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-teal">2023 Season</div>
                <div className="mb-2 font-display font-bold text-foreground" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                  Studio Excellence Award
                </div>
                <div className="text-[12px] leading-[1.5] text-foreground-muted">Hollywood Vibe Las Vegas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal">Gallery</span>
            </div>
            <h2
              className="mb-10 font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(28px, 3.5vw, 30px)', lineHeight: '1.1' }}
            >
              On stage.
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="flex aspect-[8/4] items-center justify-center border border-border bg-background-warm md:col-span-2">
                <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted md:text-[13px]">[Performance photo]</span>
              </div>
              <div className="flex aspect-[3/4] items-center justify-center border border-border bg-background-warm">
                <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted md:text-[13px]">[Group shot]</span>
              </div>
              <div className="flex aspect-[3/4] items-center justify-center border border-border bg-background-warm">
                <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted md:text-[13px]">[Solo competition]</span>
              </div>
              <div className="flex aspect-[3/4] items-center justify-center border border-border bg-background-warm">
                <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted md:text-[13px]">[Backstage]</span>
              </div>
              <div className="flex aspect-[8/4] items-center justify-center border border-border bg-background-warm md:col-span-2">
                <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted md:text-[13px]">[Awards ceremony]</span>
              </div>
            </div>
          </div>
        </section>

        {/* Audition CTA */}
        <section id="audition" className="bg-foreground px-6 py-20 md:px-16 md:py-28 lg:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-white/40" />
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-white/60">Auditions</span>
              <div className="h-px w-7 bg-white/40" />
            </div>
            <h2
              className="mb-5 font-display font-bold text-background"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1' }}
            >
              Ready to join The Project?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[15px] leading-[1.7] text-white/70">
              Auditions are held annually in May for the following season. New dancers and current Evolve students are
              both welcome to audition.
            </p>
            <div className="mb-8 inline-block rounded border border-teal/30 bg-teal/[0.12] px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-teal">
              Next Audition: May 2026
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-teal px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors duration-200 hover:bg-teal/90 md:text-[13px]"
              >
                Sign up for auditions →
              </Link>
              <Link
                href="mailto:info@evolvedancecenter.com"
                className="inline-flex items-center gap-2 border border-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-200 hover:bg-white hover:text-foreground md:text-[13px]"
              >
                Email us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
