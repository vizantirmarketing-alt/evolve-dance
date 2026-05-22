import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits ? `tel:+${digits.startsWith('1') ? digits : `1${digits}`}` : '#'
}

const AGE_OPTIONS = ['Under 3', '3-5', '6-8', '9-12', '13-15', '16-18'] as const
const EXPERIENCE_OPTIONS = [
  'Brand new to dance',
  'Some experience',
  'Experienced dancer',
  'Competitive/advanced',
] as const

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later or call us directly.' },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const {
      parentName,
      email,
      phone,
      childName,
      childAge,
      experience,
      classInterests,
      preferredTimes,
      additionalNotes,
      turnstileToken,
    } = body

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json({ error: 'Security check is required.' }, { status: 400 })
      }

      const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '',
        }),
      })

      const verifyData = await verifyResponse.json()
      if (!verifyData.success) {
        console.error('Turnstile verification failed:', verifyData['error-codes'])
        return NextResponse.json({ error: 'Security check failed. Please try again.' }, { status: 400 })
      }
    }

    if (!parentName || !email || !phone || !childName || !childAge || !experience) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    if (!Array.isArray(classInterests) || classInterests.length === 0) {
      return NextResponse.json({ error: 'Please select at least one class interest.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!AGE_OPTIONS.includes(childAge)) {
      return NextResponse.json({ error: 'Please select a valid age range.' }, { status: 400 })
    }

    if (!EXPERIENCE_OPTIONS.includes(experience)) {
      return NextResponse.json({ error: 'Please select a valid experience level.' }, { status: 400 })
    }

    const safeParentName = escapeHtml(String(parentName).trim())
    const safeEmail = escapeHtml(String(email).trim())
    const safePhone = escapeHtml(String(phone).trim())
    const safeChildName = escapeHtml(String(childName).trim())
    const safeChildAge = escapeHtml(String(childAge))
    const safeExperience = escapeHtml(String(experience))
    const safeInterests = classInterests.map((item: string) => escapeHtml(String(item))).join(', ')
    const safePreferredTimes = preferredTimes ? escapeHtml(String(preferredTimes).trim()) : ''
    const safeAdditionalNotes = additionalNotes ? escapeHtml(String(additionalNotes).trim()) : ''
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const inboxEmail = process.env.EVOLVE_INBOX_EMAIL || 'evolvedancecenter@yahoo.com'
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'Evolve Dance Center <noreply@evolvedancecenter.com>'

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [inboxEmail],
      replyTo: String(email).trim(),
      subject: `🩰 New Free Trial Request — ${String(parentName).trim()} (${String(childName).trim()}, age ${childAge})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff;">
          <h2 style="color: #1A1A1A; font-size: 20px; margin: 0 0 8px;">
            New Free Trial Request
          </h2>
          <p style="color: #666; font-size: 13px; margin: 0 0 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e5e5;">
            Source: free-trial form · ${escapeHtml(timestamp)}
          </p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Parent</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${safeParentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #14b8a6; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;"><a href="${phoneHref(String(phone))}" style="color: #14b8a6; text-decoration: none;">${safePhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Dancer</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${safeChildName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Age</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${safeChildAge}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Experience</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${safeExperience}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Classes</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${safeInterests}</td>
            </tr>
            ${
              safePreferredTimes
                ? `<tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Preferred times</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px; white-space: pre-wrap;">${safePreferredTimes}</td>
            </tr>`
                : ''
            }
            ${
              safeAdditionalNotes
                ? `<tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Notes</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px; white-space: pre-wrap;">${safeAdditionalNotes}</td>
            </tr>`
                : ''
            }
          </table>

          <p style="margin-top: 32px; color: #999; font-size: 12px;">
            Reply directly to this email to respond to ${safeParentName}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send request. Please try again or call us directly.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Free trial form error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
