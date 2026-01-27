'use client'
import HbButton from '@/components/widgets/hb-buttons'
import { SERVER_URL } from '@/constants/constants'
import publicApi from '@/publicApi'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)


    await fetch(
      `${SERVER_URL}/api/password-reset/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      }
    )

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p>
        If an account exists, a password reset link has been sent.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 items-start justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Forgot password</h1>

      <input
        type="email"
        placeholder="Enter your email address"
        className='px-3 py-2 rounded-md border-gray-500 border-2 w-60  md:w-80'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" disabled={loading} className='bg-hb-green hover:bg-hb-green-dark px-5 text-white p-2 rounded-md'>
        {loading ? 'Sending...' : 'Send reset link'}
      </button>
    </form>
  )
}
