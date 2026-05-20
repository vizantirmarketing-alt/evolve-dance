'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useState, useRef, type FormEvent } from 'react'
import { ChevronDown, ArrowRight, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

const fieldClassName =
  'w-full bg-transparent border border-border rounded-none px-0 py-3 text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-teal transition-colors border-t-0 border-l-0 border-r-0 text-[14px] md:text-[15px]'

const labelClassName = 'block text-[11px] uppercase tracking-[0.15em] text-foreground-muted mb-2 md:text-[12px]'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
}

export default function ContactForm() {
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
    <div className="max-w-2xl w-full">
      {status === 'success' ? (
        <div className="text-center">
          <div className="flex justify-center">
            <Check className="h-12 w-12 text-teal" aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-2xl text-foreground md:text-3xl">Thanks for reaching out.</h3>
          <p className="mx-auto mt-3 max-w-md text-[14px] font-light leading-[1.8] text-foreground-muted md:text-[15px]">
            We&apos;ll get back to you within one business day. In the meantime, feel free to call us at (702)
            897-5095.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="wide"
            className="mt-8"
            onClick={() => {
              setStatus('idle')
              setErrorMessage('')
            }}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal" />
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-teal">Send a Message</span>
          </div>

          <h2
            className="mb-4 font-display font-bold leading-[0.95] text-foreground"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            Quick inquiry.
          </h2>

          <p className="mb-10 text-[14px] font-light leading-[1.8] text-foreground-muted md:text-[15px]">
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
              <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-[13px] text-red-700 md:text-[14px]">
                {errorMessage}
              </div>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              size="wide"
              disabled={status === 'submitting'}
              className="mt-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting' ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </>
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
