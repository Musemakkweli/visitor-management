
import { useEffect, useState } from 'react'
import {
  Settings as SettingsIcon,
  UserRound,
  Bell,
  ShieldCheck,
  CalendarDays,
  Save,
  RotateCcw,
  CheckCircle2,
  LockKeyhole,
} from 'lucide-react'
import AdminNavbar from '../components/AdminNavbar'

const defaultSettings = {
  name: 'Administrator',
  email: 'admin@example.com',
  phone: '',
  organization: 'Visitor Management System',
  emailNotifications: true,
  appointmentNotifications: true,
  reminderNotifications: false,
  requireApproval: true,
  allowSameDayRequests: false,
  advanceBookingDays: 30,
  openingTime: '08:00',
  closingTime: '17:00',
  sessionTimeout: '30',
  twoFactorReminder: true,
}

const sections = [
  { id: 'profile', label: 'Administrator Profile', icon: UserRound },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appointments', label: 'Appointment Rules', icon: CalendarDays },
  { id: 'security', label: 'Security', icon: ShieldCheck },
]

function Settings() {
  const [settings, setSettings] = useState(defaultSettings)
  const [activeSection, setActiveSection] = useState('profile')
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('adminSettings')

      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) })
      }
    } catch {
      setSettings(defaultSettings)
    }
  }, [])

  function updateSetting(field, value) {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }))
    setMessage('')
  }

  function saveSettings(event) {
    event.preventDefault()

    try {
      localStorage.setItem('adminSettings', JSON.stringify(settings))
      setMessage('Your settings have been saved successfully.')
    } catch {
      setMessage('Unable to save settings in this browser.')
    }
  }

  function resetSettings() {
    const confirmed = window.confirm(
      'Reset all settings to their default values?',
    )

    if (!confirmed) return

    setSettings(defaultSettings)
    localStorage.removeItem('adminSettings')
    setMessage('Settings have been reset to their defaults.')
  }

  return (
    <AdminNavbar>
      <div className="min-h-screen bg-gray-50 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <SettingsIcon size={16} />
              <span>Administration</span>
              <span>/</span>
              <span>Settings</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your administrator profile, appointment rules, and system preferences.
            </p>
          </div>

          {message && (
            <div
              role="status"
              className="mb-5 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <p>{message}</p>
            </div>
          )}

          <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="rounded-xl border border-gray-200 bg-white p-3">
              <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                General
              </p>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  const active = activeSection === section.id

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                        active
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={19} />
                      {section.label}
                    </button>
                  )
                })}
              </nav>

              <div className="mt-5 border-t border-gray-100 px-3 pt-4">
                <div className="flex items-start gap-2 text-xs leading-5 text-gray-500">
                  <LockKeyhole size={16} className="mt-0.5 shrink-0" />
                  <p>
                    Changes on this page are saved in this browser only.
                  </p>
                </div>
              </div>
            </aside>

            <form onSubmit={saveSettings} className="space-y-6">
              {activeSection === 'profile' && (
                <SettingsSection
                  title="Administrator Profile"
                  description="Update the contact information displayed for the administrator."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name">
                      <input
                        required
                        value={settings.name}
                        onChange={(e) => updateSetting('name', e.target.value)}
                        placeholder="Enter full name"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Email address">
                      <input
                        required
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting('email', e.target.value)}
                        placeholder="admin@example.com"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Phone number">
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => updateSetting('phone', e.target.value)}
                        placeholder="+250 7XX XXX XXX"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Organization name">
                      <input
                        value={settings.organization}
                        onChange={(e) => updateSetting('organization', e.target.value)}
                        placeholder="Organization name"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </SettingsSection>
              )}

              {activeSection === 'notifications' && (
                <SettingsSection
                  title="Notifications"
                  description="Choose which notifications you want the system to display or send."
                >
                  <div className="divide-y divide-gray-100">
                    <ToggleRow
                      title="Email notifications"
                      description="Enable email alerts for relevant system activity."
                      checked={settings.emailNotifications}
                      onChange={(value) => updateSetting('emailNotifications', value)}
                    />

                    <ToggleRow
                      title="Appointment notifications"
                      description="Receive alerts when visitors submit appointment requests."
                      checked={settings.appointmentNotifications}
                      onChange={(value) => updateSetting('appointmentNotifications', value)}
                    />

                    <ToggleRow
                      title="Appointment reminders"
                      description="Enable reminders for upcoming scheduled visits."
                      checked={settings.reminderNotifications}
                      onChange={(value) => updateSetting('reminderNotifications', value)}
                    />
                  </div>

                  <p className="mt-4 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                    These preferences are saved locally. Actual emails and reminders
                    require backend notification services.
                  </p>
                </SettingsSection>
              )}

              {activeSection === 'appointments' && (
                <SettingsSection
                  title="Appointment Rules"
                  description="Configure the default rules for visitor appointment requests."
                >
                  <div className="divide-y divide-gray-100">
                    <ToggleRow
                      title="Require administrator approval"
                      description="Appointment requests must be reviewed before they are approved."
                      checked={settings.requireApproval}
                      onChange={(value) => updateSetting('requireApproval', value)}
                    />

                    <ToggleRow
                      title="Allow same-day requests"
                      description="Allow visitors to request an appointment for today."
                      checked={settings.allowSameDayRequests}
                      onChange={(value) => updateSetting('allowSameDayRequests', value)}
                    />
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Advance booking limit (days)">
                      <input
                        type="number"
                        min="1"
                        max="365"
                        required
                        value={settings.advanceBookingDays}
                        onChange={(e) =>
                          updateSetting('advanceBookingDays', e.target.value)
                        }
                        className={inputClass}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        How far ahead visitors may book.
                      </p>
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Opening time">
                        <input
                          type="time"
                          required
                          value={settings.openingTime}
                          onChange={(e) => updateSetting('openingTime', e.target.value)}
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Closing time">
                        <input
                          type="time"
                          required
                          value={settings.closingTime}
                          onChange={(e) => updateSetting('closingTime', e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>
                </SettingsSection>
              )}

              {activeSection === 'security' && (
                <SettingsSection
                  title="Security Preferences"
                  description="Review basic security-related preferences for the administration portal."
                >
                  <Field label="Session timeout">
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                      className={inputClass}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      This preference does not enforce session expiry yet.
                      Backend authentication must implement the actual timeout.
                    </p>
                  </Field>

                  <div className="mt-5">
                    <ToggleRow
                      title="Two-factor authentication reminder"
                      description="Display a reminder to configure two-factor authentication."
                      checked={settings.twoFactorReminder}
                      onChange={(value) => updateSetting('twoFactorReminder', value)}
                    />
                  </div>

                  <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex gap-3">
                      <ShieldCheck size={20} className="shrink-0 text-amber-700" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900">
                          Security note
                        </p>
                        <p className="mt-1 text-sm leading-6 text-amber-800">
                          Password changes, account permissions, and two-factor
                          authentication must be implemented securely on the backend.
                          Do not store administrator passwords in localStorage.
                        </p>
                      </div>
                    </div>
                  </div>
                </SettingsSection>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <button
                  type="button"
                  onClick={resetSettings}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <RotateCcw size={16} />
                  Reset defaults
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Save size={17} />
                  Save settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminNavbar>
  )
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

function SettingsSection({ title, description, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6 border-b border-gray-100 pb-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  )
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

export default Settings
