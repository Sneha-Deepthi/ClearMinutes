import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { email, summary } = await req.json()

    if (!email || !summary) {
      return NextResponse.json({ error: 'Email and summary are required' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'AI Summarizer <onboarding@resend.dev>',
      to: email,
      subject: 'Meeting Summary',
      text: summary,
    })

    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ message: '✅ Email sent successfully!', data })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: '❌ Failed to send email' }, { status: 500 })
  }
}
