import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    // navigate('/visitor/dashboard')
       navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        <div className="hidden bg-slate-900 p-12 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
                V
              </div>
              <span className="text-xl font-bold">Visitor Management</span>
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
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => alert('Password recovery will be added later.')}
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

           
<button
  type="submit"
  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
 // onClick={() => navigate('/visitor/dashboard')}
  onClick={() => navigate('/admin/dashboard')}
>
  Sign in
</button>

          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-800">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
