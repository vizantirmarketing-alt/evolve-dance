import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later or call us directly.' },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const { name, email, phone, interest, message, turnstileToken } = body

    // Verify Turnstile token (only if secret key is set)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: 'Security check is required.' },
          { status: 400 }
        )
      }

      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip:
              request.headers.get('cf-connecting-ip') ||
              request.headers.get('x-forwarded-for') ||
              '',
          }),
        }
      )

      const verifyData = await verifyResponse.json()
      if (!verifyData.success) {
        console.error('Turnstile verification failed:', verifyData['error-codes'])
        return NextResponse.json(
          { error: 'Security check failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Evolve Dance Center <onboarding@resend.dev>',
      to: ['evolvedancecenter@yahoo.com'],
      replyTo: email,
      subject: `New inquiry from ${name}${interest ? ` — ${interest}` : ''}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff;">
          <h2 style="color: #1A1A1A; font-size: 20px; margin: 0 0 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e5e5;">
            New Inquiry from evolvedancecenter.com
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;"><a href="mailto:${email}" style="color: #14b8a6; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;"><a href="tel:${phone}" style="color: #14b8a6; text-decoration: none;">${phone}</a></td>
            </tr>` : ''}
            ${interest ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Interest</td>
              <td style="padding: 8px 0; color: #1A1A1A; font-size: 15px;">${interest}</td>
            </tr>` : ''}
          </table>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
            <div style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message</div>
            <div style="color: #1A1A1A; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          
          <p style="margin-top: 32px; color: #999; font-size: 12px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or call us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
