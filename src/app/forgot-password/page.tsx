'use client'
import publicApi from '@/publicApi'
import Link from 'next/link'
import { useState } from 'react'
import { trackPasswordResetStart } from '@/lib/analytics'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    trackPasswordResetStart()

    try {
      await publicApi.post('/api/password-reset/', {
        email: email.trim().toLowerCase(),
      })
      setSubmitted(true)
    } catch {
      setError('Unable to request a reset link right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-white px-5 dark:bg-[#020617]">
        <section className="w-full max-w-md rounded-sm border border-gray-200 bg-white p-7 text-[#1f1f24] shadow-sm dark:border-slate-700 dark:bg-[#111827] dark:text-white">
          <h1 className="text-2xl font-semibold">Check your email</h1>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            If an account exists for that email, we have sent a password reset
            link. Check your inbox and spam folder.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="rounded-sm bg-hb-green px-5 py-2.5 text-base font-medium text-white hover:bg-hb-green-dark"
            >
              Back to login
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-base text-hb-green underline underline-offset-2"
            >
              Try another email
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-5 dark:bg-[#020617]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-sm border border-gray-200 bg-white p-7 text-[#1f1f24] shadow-sm dark:border-slate-700 dark:bg-[#111827] dark:text-white"
      >
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          Enter your account email and we will send you a secure reset link.
        </p>

        <label htmlFor="reset-email" className="mt-6 block text-base font-medium">
          Email address
        </label>
        <input
          id="reset-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-sm border border-gray-400 bg-white px-3 py-3 text-base text-[#1f1f24] outline-none focus:border-hb-green focus:ring-1 focus:ring-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error ? (
          <p role="alert" className="mt-3 text-base text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-sm bg-hb-green px-5 py-3 text-base font-medium text-white hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
        <Link
          href="/login"
          className="mt-4 block text-center text-base text-hb-green underline underline-offset-2"
        >
          Back to login
        </Link>
      </form>
    </main>
  )
}
