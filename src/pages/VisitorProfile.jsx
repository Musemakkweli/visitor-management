
import { useState } from 'react'
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  MapPin,
  Save,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowUpRight,
} from 'lucide-react'
import VisitorNavbar from '../components/VisitorNavbar'

const emptyProfile = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  address: '',
}

const fields = [
  {
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Enter your full name',
    icon: UserRound,
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'you@example.com',
    icon: Mail,
    type: 'email',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone number',
    placeholder: '+250 7XX XXX XXX',
    icon: Phone,
    type: 'tel',
    required: true,
  },
  {
    name: 'organization',
    label: 'Organization',
    placeholder: 'Company or institution',
    icon: Building2,
    type: 'text',
    required: false,
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'City, district, or street',
    icon: MapPin,
    type: 'text',
    required: false,
  },
]

function readProfile() {
  try {
    const saved = localStorage.getItem('visitorProfile')
    return saved
      ? { ...emptyProfile, ...JSON.parse(saved) }
      : { ...emptyProfile }
  } catch {
    return { ...emptyProfile }
  }
}

function VisitorProfile() {
  const [profile, setProfile] = useState(readProfile)
  const [saved, setSaved] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    try {
      localStorage.setItem('visitorProfile', JSON.stringify(profile))
      setSaved(true)
    } catch {
      setSaved(false)
      window.alert('Unable to save your profile in this browser.')
    }
  }

  function handleReset() {
    setProfile(readProfile())
    setSaved(false)
  }

  const initials = profile.fullName.trim()
    ? profile.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'VP'

  return (
    <VisitorNavbar>
      <main className="min-h-screen bg-[#f4f6fa] px-4 py-6 sm:px-7 sm:py-9">
        <div className="mx-auto max-w-5xl">
          {/* Page title */}
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Visitor portal / Account
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-[#17243b]">
                My Profile<span className="text-blue-600">.</span>
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Your information, all in one place.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Personal account
            </div>
          </div>

          {/* Distinctive profile header */}
          <section className="relative mb-7 overflow-hidden rounded-2xl bg-[#14243e] text-white">
            <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
              <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/[0.08]" />
              <div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/[0.08]" />
              <div className="absolute bottom-[-110px] right-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />

            <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-9">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-3xl font-semibold tracking-wide text-white shadow-xl shadow-black/10">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Visitor identity
                </p>

                <h2 className="break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                  {profile.fullName || 'Welcome, visitor'}
                </h2>

                <p className="mt-2 break-all text-sm text-slate-300">
                  {profile.email || 'Add your email address to complete your profile'}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={15} className="text-cyan-300" />
                    Visitor account
                  </span>

                  {profile.organization && (
                    <span className="inline-flex items-center gap-2">
                      <Building2 size={15} className="text-cyan-300" />
                      {profile.organization}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-slate-200 sm:self-center">
                Profile details
                <ArrowUpRight size={14} className="text-cyan-300" />
              </div>
            </div>
          </section>

          {/* Information form */}
          <form onSubmit={handleSubmit}>
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-8">
                <div>
                  <h3 className="text-lg font-bold text-[#17243b]">
                    Personal information
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Keep your contact details accurate and up to date.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 sm:flex">
                  <UserRound size={21} />
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
                  {fields.map((field, index) => {
                    const FieldIcon = field.icon

                    return (
                      <div
                        key={field.name}
                        className={index === 4 ? 'sm:col-span-2' : ''}
                      >
                        <label
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          {field.label}
                          {field.required && (
                            <span className="ml-1 text-blue-600">*</span>
                          )}
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-200 bg-[#f8faff] transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                          <div className="flex w-12 shrink-0 items-center justify-center self-stretch text-slate-400">
                            <FieldIcon size={18} strokeWidth={1.8} />
                          </div>

                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={profile[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={Boolean(field.required)}
                            maxLength={200}
                            autoComplete={
                              field.name === 'fullName'
                                ? 'name'
                                : field.name === 'email'
                                  ? 'email'
                                  : field.name === 'phone'
                                    ? 'tel'
                                    : 'off'
                            }
                            className="min-w-0 flex-1 border-0 bg-transparent py-3.5 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Form footer */}
              <div className="flex flex-col gap-4 border-t border-slate-100 bg-[#fbfcfe] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div className="min-h-5 text-sm" aria-live="polite">
                  {saved ? (
                    <span className="inline-flex items-center gap-2 font-medium text-emerald-700">
                      <Check size={17} />
                      Profile saved successfully.
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      <span className="text-blue-600">*</span> Required fields
                    </span>
                  )}
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    <Save size={17} />
                    Save changes
                  </button>
                </div>
              </div>
            </section>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400">
            Profile information is currently saved in this browser.
          </p>
        </div>
      </main>
    </VisitorNavbar>
  )
}

export default VisitorProfile
