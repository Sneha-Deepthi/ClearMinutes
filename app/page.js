'use client'
import { useState } from 'react'

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [instruction, setInstruction] = useState('')
  const [summary, setSummary] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, instruction }),
      })
      const data = await res.json()
      setSummary(data.summary)
    } catch (err) {
      console.error(err)
      alert('Error generating summary')
    }
    setLoading(false)
  }

  const handleSendEmail = async () => {
    setSending(true)
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, summary }),
      })
      const data = await res.json()
      alert(data.message)
    } catch (err) {
      console.error(err)
      alert('Error sending email')
    }
    setSending(false)
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-serif text-indigo-700 mb-6 text-center">
          ClearMinutes
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card: Transcript + Instruction */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Meeting Transcript
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              rows="6"
              placeholder="Paste meeting transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />

            <label className="block mb-2 text-sm font-medium text-gray-600">
              Custom Instruction
            </label>
            <input
              className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              type="text"
              placeholder='E.g., "Summarize in bullet points"'
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />

            <button
              onClick={handleSummarize}
              disabled={loading || !transcript}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Generating...' : '✨ Generate Summary'}
            </button>
          </div>

          {/* Right Card: Summary + Email */}
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Generated Summary
            </h2>

            {summary ? (
              <>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg mb-4 flex-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  rows="8"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
                <div className="flex gap-3">
                  <input
                    className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    type="email"
                    placeholder="Recipient email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    onClick={handleSendEmail}
                    disabled={sending || !email}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? '📤 Sending...' : 'Send'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                ⚡ Generate a summary to see results here
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
