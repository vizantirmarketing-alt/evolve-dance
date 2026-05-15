'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useState, useRef, type FormEvent } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
  Check,
} from 'lucide-react'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { siteConfig } from '@/data/site'

const GOOGLE_MAPS_EMBED_SRC =
  'https://maps.google.com/maps?q=6070+S+Rainbow+Blvd+Las+Vegas+NV+89118&t=&z=15&ie=UTF8&iwloc=&output=embed'
const GOOGLE_MAPS_SEARCH_HREF =
  'https://www.google.com/maps/search/?api=1&query=6070+S+Rainbow+Blvd+Las+Vegas+NV+89118'

const fieldClassName =
  'w-full bg-transparent border border-border rounded-none px-0 py-3 text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-teal transition-colors border-t-0 border-l-0 border-r-0 text-[15px]'

const labelClassName = 'block text-[10px] uppercase tracking-[0.15em] text-foreground-muted mb-2'

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
    'inline-flex text-foreground-muted hover:text-teal-soft transition-colors duration-200'
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

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
}

export default function ContactPage() {
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (turnstileSiteKey && !turnstileToken) {
      setStatus('error')
      setErrorMessage('Please complete the security check before submitting.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const resetTurnstileWidget = () => {
      turnstileRef.current?.reset()
      setTurnstileToken('')
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
          turnstileToken,
        }),
      })

      let payload: { error?: string } = {}
      try {
        payload = await res.json()
      } catch {
        /* ignore */
      }

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(payload.error ?? 'Something went wrong. Please try again.')
        resetTurnstileWidget()
        return
      }

      setStatus('success')
      setFormData({ ...emptyForm })
      resetTurnstileWidget()
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
      resetTurnstileWidget()
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:px-12 md:py-24 lg:px-16">
          <div className="flex flex-col">
            <div className="max-w-2xl w-full">
              {status === 'success' ? (
                <div className="text-center">
                  <div className="flex justify-center">
                    <Check className="h-12 w-12 text-teal" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-foreground md:text-3xl">Thanks for reaching out.</h3>
                  <p className="mx-auto mt-3 max-w-md text-[15px] font-light leading-[1.8] text-foreground-muted">
                    We&apos;ll get back to you within one business day. In the meantime, feel free to call us at (702)
                    897-5095.
                  </p>
                  <button
                    type="button"
                    className="mt-8 inline-flex items-center justify-center gap-2 bg-foreground px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-background transition-colors duration-200 hover:bg-foreground/85"
                    onClick={() => {
                      setStatus('idle')
                      setErrorMessage('')
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-7 bg-teal" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-teal">Send a Message</span>
                  </div>

                  <h2
                    className="mb-4 font-display font-bold leading-[0.95] text-foreground"
                    style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
                  >
                    Quick inquiry.
                  </h2>

                  <p className="mb-10 text-[15px] font-light leading-[1.8] text-foreground-muted">
                    Send us a message and we&apos;ll get back to you within one business day.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-6">
                      <label htmlFor="contact-name" className={labelClassName}>
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                        className={fieldClassName}
                        placeholder="Your name"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="contact-email" className={labelClassName}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                        className={fieldClassName}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="contact-phone" className={labelClassName}>
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                        className={fieldClassName}
                        placeholder="(702) 555-0100"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="contact-interest" className={labelClassName}>
                        Interest
                      </label>
                      <div className="relative">
                        <select
                          id="contact-interest"
                          name="interest"
                          value={formData.interest}
                          onChange={(e) => setFormData((d) => ({ ...d, interest: e.target.value }))}
                          className={`${fieldClassName} appearance-none pr-8`}
                        >
                          <option value="">What can we help with?</option>
                          <option value="Trial class">Trial class</option>
                          <option value="Class information">Class information</option>
                          <option value="Pricing & enrollment">Pricing & enrollment</option>
                          <option value="The Project (competition team)">The Project (competition team)</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
                          aria-hidden
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="contact-message" className={labelClassName}>
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                        className={fieldClassName}
                        placeholder="How can we help?"
                      />
                    </div>

                    {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                      <div className="mt-4 mb-6">
                        <Turnstile
                          ref={turnstileRef}
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onError={() => setTurnstileToken('')}
                          onExpire={() => setTurnstileToken('')}
                          options={{
                            theme: 'light',
                            size: 'normal',
                          }}
                        />
                      </div>
                    ) : null}

                    {status === 'error' && errorMessage ? (
                      <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-[13px] text-red-700">
                        {errorMessage}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="mt-4 inline-flex items-center justify-center gap-2 bg-foreground px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-background transition-colors duration-200 hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-7 bg-teal" />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-teal">VISIT US</span>
              </div>

              <h2
                className="font-display font-bold leading-tight text-foreground"
                style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
              >
                Find us in southwest Las Vegas.
              </h2>

              <p className="mt-4 max-w-md text-[14px] font-light leading-[1.7] text-foreground-muted">
                Drop in to see the studio or reach out anytime. We typically respond within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <MapPin className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted">Studio</div>
                  <div className="mt-1 text-[14px] font-medium text-foreground">6070 S Rainbow Blvd, Las Vegas, NV 89118</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <Phone className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted">Phone</div>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="mt-1 block text-[14px] font-medium text-foreground transition-colors hover:text-teal"
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
                  <div className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted">Email</div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block text-[14px] font-medium text-foreground transition-colors hover:text-teal"
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
                  <div className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted">Office Hours</div>
                  <div className="mt-1 text-[14px] font-medium text-foreground">Monday–Friday, 3pm–8pm</div>
                </div>
              </div>
            </div>

            <div className="relative h-[240px] w-full overflow-hidden rounded border border-border">
              <a
                href={GOOGLE_MAPS_SEARCH_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded bg-foreground px-3 py-2 text-[11px] text-background shadow-md transition-colors duration-200 hover:bg-foreground/85"
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
        </section>
      </main>
      <Footer />
    </>
  )
}
