import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Privacy Policy | Evolve Dance Center',
  description:
    'How Evolve Dance Center handles your information when you visit our website or contact us.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
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
              Privacy
            </span>
          </div>

          <div className="mb-12">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              Privacy Policy
            </h1>
            <p className="mt-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground-muted">
              <span className="italic">Last updated: {lastUpdated}.</span>{' '}
              This page explains what information we collect when you visit our website or get in touch with us, and
              what we do with it.
            </p>
          </div>

          <article className="font-sans">
            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Who we are</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Evolve Dance Center is a dance studio located at 6070 S Rainbow Blvd, Las Vegas, NV 89118. This privacy
              policy covers our website at evolvedancecenter.com and any contact you have with us through that website.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">What we collect</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We only collect information you give us directly. That usually means your name, email address, and phone
              number when you fill out a contact form, request a free trial class, or send us a message.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If you become a student or your child does, we also collect the information needed to enroll: dancer name,
              age, address, and emergency contacts. Tuition and billing information is handled through Jackrabbit Dance,
              a third-party platform with its own privacy practices.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Our website also automatically collects standard log data: IP address, browser type, pages visited, time on
              site. This helps us understand how the site is being used. We don&apos;t connect this data to individual
              people.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">How we use it</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We use your information to respond to questions, confirm trial classes, send registration details, and
              communicate about classes, recitals, and studio news. We don&apos;t sell or rent your information to anyone.
            </p>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              If you&apos;ve enrolled with us, we may send you essential updates (class cancellations, schedule changes,
              recital information), and you can&apos;t unsubscribe from those. Promotional emails are separate, and you can
              unsubscribe at any time.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Who we share it with</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We share information only with services we use to run the studio:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              <li>Jackrabbit Dance, for class registration and billing</li>
              <li>Google (Analytics), for understanding website traffic</li>
              <li>Vercel, which hosts the website</li>
              <li>Email and SMS services we use to communicate with families</li>
            </ul>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We may also share information if required by law.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Photos and video at the studio
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We sometimes take photos and video at classes, performances, and events for marketing, including our website,
              social media, and printed materials. If you&apos;d prefer that you or your dancer not appear in studio media,
              let us know in writing at info@evolvedancecenter.com and we&apos;ll keep that on file.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Children&apos;s privacy
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Our website isn&apos;t directed at children, and we don&apos;t knowingly collect information from anyone under 13
              without a parent or guardian. If you believe a child has submitted information through our site, contact us
              and we&apos;ll delete it.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Cookies</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Our site uses cookies to remember preferences and measure traffic through Google Analytics. You can disable
              cookies in your browser settings, though some parts of the site may not work as expected.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Your rights</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              You can ask us what information we have about you, update it, or have it deleted, at any time. Email
              info@evolvedancecenter.com.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
              Changes to this policy
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              We may update this policy as our practices change. The current version&apos;s last updated date is at the top of
              the page.
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">Contact</h2>
            <p className="mt-4 text-[15px] font-light leading-[1.8] md:text-[16px] text-foreground">
              Evolve Dance Center
              <br />
              6070 S Rainbow Blvd
              <br />
              Las Vegas, NV 89118
              <br />
              (702) 897-5095
              <br />
              info@evolvedancecenter.com
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
