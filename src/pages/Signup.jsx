
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.')
      return
    }

    setError('')
    alert('Signup interface is working! Account creation will be connected to FastAPI later.')
    navigate('/login')
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

  const labelClass =
    'mb-1.5 block text-sm font-medium text-slate-700'

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
              <span className="text-lg font-bold">Visitor Management</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight">
              Welcome to a smarter workplace.
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Create your account and discover a simpler way to manage
              visitor experiences.
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
            Enter your details to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

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
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                  className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

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

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create account
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
