import { NextResponse } from 'next/server'

const API_KEY = process.env.GROQ_API_KEY

export async function POST(req) {
  try {
    const { transcript, instruction } = await req.json()

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 })
    }

    const prompt = `
      You are an AI meeting summarizer.
      Transcript:
      ${transcript}

      Instruction:
      ${instruction || 'Summarize concisely'}
      `

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const summary = data.choices?.[0]?.message?.content || 'No summary generated.'

    return NextResponse.json({ summary })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}
