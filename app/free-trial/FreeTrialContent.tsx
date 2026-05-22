'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Check, ChevronDown, Clock, Loader2, MapPin, Phone } from 'lucide-react'

import Button from '@/components/ui/Button'
import { buttonVariants } from '@/components/ui/button-styles'
import { siteConfig } from '@/data/site'

const fieldClassName =
  'w-full bg-transparent border border-border rounded-none px-0 py-3 text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-teal transition-colors border-t-0 border-l-0 border-r-0 text-[14px] md:text-[15px]'

const labelClassName = 'block text-[11px] uppercase tracking-[0.15em] text-foreground-muted mb-2 md:text-[12px]'

const errorClassName = 'mt-1.5 text-[12px] text-red-600 md:text-[13px]'

const AGE_OPTIONS = ['Under 3', '3-5', '6-8', '9-12', '13-15', '16-18'] as const

const EXPERIENCE_OPTIONS = [
  'Brand new to dance',
  'Some experience',
  'Experienced dancer',
  'Competitive/advanced',
] as const

const CLASS_INTEREST_OPTIONS = [
  'Ballet',
  'Jazz',
  'Hip Hop',
  'Contemporary',
  'Lyrical',
  'Acrobatics',
  'Tap',
  'Tumbling',
  'Ballroom',
  'Pom',
  'Stretch & Pilates',
  'Not sure — help me decide',
] as const

const WHAT_TO_EXPECT = [
  "We'll reach out within 1 business day to confirm your trial class",
  'Your dancer attends their first class completely free',
  'Meet the instructors and see the studio in person',
  "If you love it, we'll help you enroll — no pressure",
] as const

const TRUST_ELEMENTS = [
  'BFA-trained co-founders',
  '22 professional instructors',
  'Six professional dance rooms',
  'Established 2017 · Southwest Las Vegas',
] as const

type FormData = {
  parentName: string
  email: string
  phone: string
  childName: string
  childAge: string
  experience: string
  classInterests: string[]
  preferredTimes: string
  additionalNotes: string
}

type FieldErrors = Partial<Record<keyof FormData, string>>

const emptyForm: FormData = {
  parentName: '',
  email: '',
  phone: '',
  childName: '',
  childAge: '',
  experience: '',
  classInterests: [],
  preferredTimes: '',
  additionalNotes: '',
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: keyof FormData, value: FormData[keyof FormData]): string {
  switch (name) {
    case 'parentName':
      return typeof value === 'string' && value.trim() ? '' : 'Your name is required.'
    case 'email':
      if (typeof value !== 'string' || !value.trim()) return 'Email is required.'
      return emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address.'
    case 'phone':
      return typeof value === 'string' && value.trim() ? '' : 'Phone number is required.'
    case 'childName':
      return typeof value === 'string' && value.trim() ? '' : "Dancer's name is required."
    case 'childAge':
      return typeof value === 'string' && value ? '' : "Please select your dancer's age."
    case 'experience':
      return typeof value === 'string' && value ? '' : 'Please select an experience level.'
    case 'classInterests':
      return Array.isArray(value) && value.length > 0 ? '' : 'Please select at least one class.'
    default:
      return ''
  }
}

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {}
  ;(['parentName', 'email', 'phone', 'childName', 'childAge', 'experience', 'classInterests'] as const).forEach(
    (field) => {
      const message = validateField(field, data[field])
      if (message) errors[field] = message
    },
  )
  return errors
}

export function FreeTrialContent() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedParentName, setSubmittedParentName] = useState('')
  const [submittedChildName, setSubmittedChildName] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)

  const fieldErrors = useMemo(() => validateForm(formData), [formData])
  const turnstileRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  const isFormValid = Object.keys(fieldErrors).length === 0 && (!turnstileRequired || Boolean(turnstileToken))

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function toggleClassInterest(option: string) {
    setFormData((prev) => {
      const selected = prev.classInterests.includes(option)
        ? prev.classInterests.filter((item) => item !== option)
        : [...prev.classInterests, option]
      return { ...prev, classInterests: selected }
    })
    setTouched((prev) => ({ ...prev, classInterests: true }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const errors = validateForm(formData)
    setTouched({
      parentName: true,
      email: true,
      phone: true,
      childName: true,
      childAge: true,
      experience: true,
      classInterests: true,
    })

    if (Object.keys(errors).length > 0) return

    if (turnstileRequired && !turnstileToken) {
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
      const res = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: formData.parentName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          childName: formData.childName.trim(),
          childAge: formData.childAge,
          experience: formData.experience,
          classInterests: formData.classInterests,
          preferredTimes: formData.preferredTimes.trim(),
          additionalNotes: formData.additionalNotes.trim(),
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

      setSubmittedParentName(formData.parentName.trim())
      setSubmittedChildName(formData.childName.trim())
      setStatus('success')
      setFormData({ ...emptyForm })
      setTouched({})
      resetTurnstileWidget()
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
      resetTurnstileWidget()
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <div className="mb-10 md:mb-14">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-7 bg-teal" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
            First Class Free
          </span>
        </div>
        <h1
          className="font-display font-bold leading-tight text-foreground"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Try your first class on us
        </h1>
        <p className="mt-5 max-w-2xl text-[14px] font-light leading-[1.8] text-foreground-muted md:text-[15px]">
          Your dancer&apos;s first class at Evolve is on the house. Pick a class that fits their age and interest, come
          experience the studio in person, and meet the instructors before you enroll. No pressure, no payment required
          — just a chance to see if Evolve is the right fit for your family.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-1 md:order-1">
          {status === 'success' ? (
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-7 bg-teal" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                  Thank You
                </span>
              </div>
              <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-foreground">
                Free class request received
              </h2>
              <p className="mt-4 text-[14px] font-light leading-[1.8] text-foreground-muted md:text-[15px]">
                Thanks, {submittedParentName}! We&apos;ve received your request and will reach out within 1 business day
                to confirm {submittedChildName}&apos;s free class. Keep an eye on your email — and if you don&apos;t hear
                back within 24 hours, feel free to call us at{' '}
                <a href={`tel:${siteConfig.phoneTel}`} className="text-teal underline-offset-2 hover:underline">
                  {siteConfig.phone}
                </a>
                .
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/schedule" className={buttonVariants({ variant: 'primary', size: 'wide' })}>
                  View Class Schedule
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link href="/faculty" className={buttonVariants({ variant: 'secondary', size: 'wide' })}>
                  Meet Our Instructors
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-7 bg-teal" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                  Request a Trial
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-6">
                  <label htmlFor="trial-parent-name" className={labelClassName}>
                    Your Name
                  </label>
                  <input
                    id="trial-parent-name"
                    name="parentName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData((d) => ({ ...d, parentName: e.target.value }))}
                    onBlur={() => handleBlur('parentName')}
                    className={fieldClassName}
                    placeholder="Parent or guardian name"
                  />
                  {touched.parentName && fieldErrors.parentName ? (
                    <p className={errorClassName}>{fieldErrors.parentName}</p>
                  ) : null}
                </div>

                <div className="mb-6">
                  <label htmlFor="trial-email" className={labelClassName}>
                    Email
                  </label>
                  <input
                    id="trial-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    onBlur={() => handleBlur('email')}
                    className={fieldClassName}
                    placeholder="you@example.com"
                  />
                  {touched.email && fieldErrors.email ? (
                    <p className={errorClassName}>{fieldErrors.email}</p>
                  ) : null}
                </div>

                <div className="mb-6">
                  <label htmlFor="trial-phone" className={labelClassName}>
                    Phone
                  </label>
                  <input
                    id="trial-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                    onBlur={() => handleBlur('phone')}
                    className={fieldClassName}
                    placeholder="(702) 555-0123"
                  />
                  {touched.phone && fieldErrors.phone ? (
                    <p className={errorClassName}>{fieldErrors.phone}</p>
                  ) : null}
                </div>

                <div className="mb-6">
                  <label htmlFor="trial-child-name" className={labelClassName}>
                    Dancer&apos;s Name
                  </label>
                  <input
                    id="trial-child-name"
                    name="childName"
                    type="text"
                    required
                    value={formData.childName}
                    onChange={(e) => setFormData((d) => ({ ...d, childName: e.target.value }))}
                    onBlur={() => handleBlur('childName')}
                    className={fieldClassName}
                    placeholder="Your child's name"
                  />
                  {touched.childName && fieldErrors.childName ? (
                    <p className={errorClassName}>{fieldErrors.childName}</p>
                  ) : null}
                </div>

                <div className="mb-6">
                  <label htmlFor="trial-child-age" className={labelClassName}>
                    Dancer&apos;s Age
                  </label>
                  <div className="relative">
                    <select
                      id="trial-child-age"
                      name="childAge"
                      required
                      value={formData.childAge}
                      onChange={(e) => setFormData((d) => ({ ...d, childAge: e.target.value }))}
                      onBlur={() => handleBlur('childAge')}
                      className={`${fieldClassName} appearance-none pr-8`}
                    >
                      <option value="">Select age range</option>
                      {AGE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
                      aria-hidden
                    />
                  </div>
                  {touched.childAge && fieldErrors.childAge ? (
                    <p className={errorClassName}>{fieldErrors.childAge}</p>
                  ) : null}
                </div>

                <div className="mb-6">
                  <label htmlFor="trial-experience" className={labelClassName}>
                    Experience Level
                  </label>
                  <div className="relative">
                    <select
                      id="trial-experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData((d) => ({ ...d, experience: e.target.value }))}
                      onBlur={() => handleBlur('experience')}
                      className={`${fieldClassName} appearance-none pr-8`}
                    >
                      <option value="">Select experience level</option>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
                      aria-hidden
                    />
                  </div>
                  {touched.experience && fieldErrors.experience ? (
                    <p className={errorClassName}>{fieldErrors.experience}</p>
                  ) : null}
                </div>

                <fieldset className="mb-6">
                  <legend className={labelClassName}>Which classes are you interested in?</legend>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {CLASS_INTEREST_OPTIONS.map((option) => {
                      const checked = formData.classInterests.includes(option)
                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-start gap-2.5 border px-3 py-2.5 text-[13px] transition-colors md:text-[14px] ${
                            checked
                              ? 'border-teal bg-teal/8 text-foreground'
                              : 'border-border text-foreground-muted hover:border-teal/40'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleClassInterest(option)}
                            onBlur={() => handleBlur('classInterests')}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-teal"
                          />
                          <span>{option}</span>
                        </label>
                      )
                    })}
                  </div>
                  {touched.classInterests && fieldErrors.classInterests ? (
                    <p className={errorClassName}>{fieldErrors.classInterests}</p>
                  ) : null}
                </fieldset>

                <div className="mb-6">
                  <label htmlFor="trial-preferred-times" className={labelClassName}>
                    Preferred Days or Times (Optional)
                  </label>
                  <textarea
                    id="trial-preferred-times"
                    name="preferredTimes"
                    rows={2}
                    value={formData.preferredTimes}
                    onChange={(e) => setFormData((d) => ({ ...d, preferredTimes: e.target.value }))}
                    className={fieldClassName}
                    placeholder="e.g., Tuesdays after 4pm, or weekends"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="trial-notes" className={labelClassName}>
                    Anything else we should know?
                  </label>
                  <textarea
                    id="trial-notes"
                    name="additionalNotes"
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData((d) => ({ ...d, additionalNotes: e.target.value }))}
                    className={fieldClassName}
                    placeholder="Goals, concerns, special needs, or questions"
                  />
                </div>

                {turnstileRequired ? (
                  <div className="mb-6">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
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
                  disabled={status === 'submitting' || !isFormValid}
                  className="mt-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book My Dancer&apos;s Free Class
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>

        <aside className="order-2 md:order-2">
          <div className="border border-border bg-[#FCFBF8] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">
                What to Expect
              </span>
            </div>

            <ul className="space-y-4">
              {WHAT_TO_EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  <span className="text-[14px] font-light leading-[1.7] text-foreground-muted md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="my-8 h-px bg-border" />

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <MapPin className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">
                    Studio
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-foreground md:text-[15px]">
                    {siteConfig.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <Phone className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">
                    Phone
                  </div>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="mt-1 block text-[14px] font-medium text-foreground transition-colors hover:text-teal md:text-[15px]"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/8">
                  <Clock className="h-4 w-4 text-teal" aria-hidden />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted md:text-[12px]">
                    Hours
                  </div>
                  <Link
                    href="/faq"
                    className="mt-1 inline-block text-[14px] font-medium text-teal underline-offset-2 hover:underline md:text-[15px]"
                  >
                    View studio hours
                  </Link>
                </div>
              </div>
            </div>

            <div className="my-8 h-px bg-border" />

            <ul className="space-y-3">
              {TRUST_ELEMENTS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-foreground md:text-[14px]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
