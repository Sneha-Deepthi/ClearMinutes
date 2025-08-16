'use client'
import { useState } from 'react'

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [instruction, setInstruction] = useState('')
  const [summary, setSummary] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

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
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">AI Meeting Notes Summarizer</h1>

      {/* Transcript Input */}
      <textarea
        className="w-full max-w-2xl p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300"
        rows="6"
        placeholder="Paste meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      {/* Instruction Input */}
      <input
        className="w-full max-w-2xl p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300"
        type="text"
        placeholder='Enter custom instruction (e.g., "Summarize in bullet points")'
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>

      {/* Summary Editor */}
      {summary && (
        <div className="w-full max-w-2xl mt-6">
          <h2 className="text-lg font-semibold mb-2">Generated Summary</h2>
          <textarea
            className="w-full p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300"
            rows="6"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="flex-1 p-3 border rounded-md focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendEmail}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
