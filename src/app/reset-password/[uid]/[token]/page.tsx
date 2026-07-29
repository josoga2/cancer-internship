'use client'

import publicApi from '@/publicApi'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

function getResetError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return 'Unable to reset password. Please try again.'
  }

  const data = error.response?.data
  const passwordErrors = data?.new_password

  if (Array.isArray(passwordErrors) && passwordErrors.length > 0) {
    return passwordErrors.join(' ')
  }

  if (Array.isArray(data?.non_field_errors) && data.non_field_errors.length > 0) {
    return data.non_field_errors.join(' ')
  }

  return data?.detail || data?.error || 'Invalid or expired reset link'
}

export default function ResetPasswordPage() {
  const params = useParams()
  const uid = Array.isArray(params?.uid) ? params.uid[0] : params?.uid
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!uid || !token) {
      setError('Reset link is missing or invalid')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      await publicApi.post('/api/password-reset/confirm/', {
        uid,
        token,
        new_password: password,
      })
      setSuccess(true)
      window.setTimeout(() => router.replace('/login'), 1500)
    } catch (err: unknown) {
      setError(getResetError(err))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-white px-5 dark:bg-[#020617]">
        <section className="w-full max-w-md rounded-sm border border-gray-200 bg-white p-7 text-[#1f1f24] shadow-sm dark:border-slate-700 dark:bg-[#111827] dark:text-white">
          <h1 className="text-2xl font-semibold">Password updated</h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            Your password has been reset successfully. Redirecting you to login...
          </p>
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
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          Choose a strong new password for your HackBio account.
        </p>

        <label htmlFor="new-password" className="mt-6 block text-base font-medium">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          className="mt-2 w-full rounded-sm border border-gray-400 bg-white px-3 py-3 text-base text-[#1f1f24] outline-none focus:border-hb-green focus:ring-1 focus:ring-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password" className="mt-5 block text-base font-medium">
          Confirm password
        </label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm password"
          className="mt-2 w-full rounded-sm border border-gray-400 bg-white px-3 py-3 text-base text-[#1f1f24] outline-none focus:border-hb-green focus:ring-1 focus:ring-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
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
          {loading ? 'Resetting...' : 'Reset password'}
        </button>
      </form>
    </main>
  )
}
