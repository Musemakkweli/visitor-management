
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authApi'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const formData = new FormData(event.currentTarget)

    const loginData = {
      identifier: formData.get('identifier').trim(),
      password: formData.get('password'),
    }

    try {
      setLoading(true)

      const result = await loginUser(loginData)

      // Save login information
      localStorage.setItem('access_token', result.access_token)
      localStorage.setItem('user', JSON.stringify(result.user))

      // Redirect according to account role
      if (result.user.role === 'visitor') {
        navigate('/visitor/dashboard')
      } else if (result.user.role === 'receptionist') {
        navigate('/receptionist/dashboard')
      } else if (result.user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        setError(
          'Your account has an unrecognized role. Contact the administrator.'
        )
      }
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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* Left panel */}
        <div className="hidden bg-slate-900 p-12 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
                V
              </div>

              <span className="text-xl font-bold">
                Visitor Management
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Welcome back to your workplace.
            </h1>

            <p className="mt-5 leading-7 text-slate-300">
              Manage visitors, monitor arrivals, and keep your workplace
              organized with one simple system.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            Secure visitor management, made simple.
          </p>
        </div>

        {/* Login form */}
        <div className="p-7 sm:p-12">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                V
              </div>

              <span className="font-bold text-slate-900">
                Visitor Management
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Sign in
          </h2>

          <p className="mt-2 text-slate-500">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  onClick={() =>
                    alert('Password recovery will be added later.')
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex rounded-lg border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4 text-sm font-medium text-slate-500 hover:text-blue-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
