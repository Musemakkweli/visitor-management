
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState('visitor')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const formData = new FormData(event.currentTarget)

    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const signupData = {
      full_name: formData.get('fullName').trim(),
      email: formData.get('email').trim(),
      password,
      confirm_password: confirmPassword,
      account_type: accountType,
      employee_number:
        accountType === 'employee'
          ? formData.get('employeeNumber').trim().toUpperCase()
          : null,
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })

      const result = await response.json()

      if (!response.ok) {
        const message = Array.isArray(result.detail)
          ? result.detail.map((item) => item.msg).join(', ')
          : result.detail || 'Registration failed.'

        throw new Error(message)
      }

      alert('Account created successfully! Please sign in.')
      navigate('/login')
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the server. Make sure FastAPI is running.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'

  const selectedCard =
    'border-blue-600 bg-blue-50 ring-2 ring-blue-100'

  const normalCard =
    'border-slate-200 bg-white hover:border-blue-300'

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* Left panel */}
        <div className="hidden bg-slate-900 p-9 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
                V
              </div>
              <span className="text-lg font-bold">
                Visitor Management
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight">
              Welcome to a smarter workplace.
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Create your account and enjoy a simpler, more organized
              visitor management experience.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            Secure visitor management, made simple.
          </p>
        </div>

        {/* Signup form */}
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              V
            </div>
            <span className="font-bold text-slate-900">
              Visitor Management
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Create account
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select your account type and enter your details.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">

            {/* Account type selection */}
            <div>
              <label className={labelClass}>
                Account type
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setAccountType('visitor')}
                  aria-pressed={accountType === 'visitor'}
                  className={`rounded-xl border p-3 text-left transition ${
                    accountType === 'visitor'
                      ? selectedCard
                      : normalCard
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xl">👤</span>
                    <span className={`h-4 w-4 rounded-full border-2 ${
                      accountType === 'visitor'
                        ? 'border-blue-600 bg-blue-600 ring-2 ring-blue-200'
                        : 'border-slate-300'
                    }`} />
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    Visitor
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    For guests and visitors
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('employee')}
                  aria-pressed={accountType === 'employee'}
                  className={`rounded-xl border p-3 text-left transition ${
                    accountType === 'employee'
                      ? selectedCard
                      : normalCard
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xl">💼</span>
                    <span className={`h-4 w-4 rounded-full border-2 ${
                      accountType === 'employee'
                        ? 'border-blue-600 bg-blue-600 ring-2 ring-blue-200'
                        : 'border-slate-300'
                    }`} />
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    Employee
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    For organization staff
                  </p>
                </button>
              </div>
            </div>

            {/* Full name */}
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                minLength={2}
                required
                className={inputClass}
              />
            </div>

            {/* Employee number */}
            {accountType === 'employee' && (
              <div>
                <label htmlFor="employeeNumber" className={labelClass}>
                  Employee number
                </label>
                <input
                  id="employeeNumber"
                  name="employeeNumber"
                  type="text"
                  placeholder="Enter your employee number"
                  required
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-slate-500">
                  Your employee number must be authorized by the organization.
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="signupEmail" className={labelClass}>
                Email address
              </label>
              <input
                id="signupEmail"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signupPassword" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="signupPassword"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-blue-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter password again"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-16`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-blue-600"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs leading-5 text-slate-600">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
              />
              <span>
                I agree to the terms of service and privacy policy.
              </span>
            </label>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
