'use client'

import { SERVER_URL } from '@/constants/constants'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResetPasswordPage() {
  const params = useParams()
  const uid = Array.isArray(params?.uid) ? params.uid[0] : params?.uid
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      const res = await fetch(
        `${SERVER_URL}/api/password-reset/confirm/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid,
            token,
            new_password: password,
          }),
        }
      )

      setLoading(false)

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.detail || data?.error || 'Invalid or expired reset link')
        return
      }

      router.push('/login')
    } catch (err) {
      setLoading(false)
      setError('Unable to reset password. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-start justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Reset password</h1>
      <p className='text-base font-bold'>Enter your new password</p>

      <input
        type="password"
        placeholder="New password"
        className='px-3 py-2 rounded-md border-gray-500 border-2 w-60  md:w-80'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm password"
        className='px-3 py-2 rounded-md border-gray-500 border-2 w-60  md:w-80'
        required
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading} className='bg-hb-green hover:bg-hb-green-dark px-5 text-white p-2 rounded-md'>
        {loading ? 'Resetting...' : 'Reset password'}
      </button>
    </form>
  )
}
