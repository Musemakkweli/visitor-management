
import { useMemo, useState } from 'react'
import {
  Users,
  UserPlus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  CalendarDays,
  Mail,
  Phone,
  Building2,
  MapPin,
  UserRound,
  CheckCircle2,
  Clock3,
  UserCheck,
  Download,
} from 'lucide-react'
import AdminNavbar from '../components/AdminNavbar'

const initialVisitors = [
  {
    id: 'VIS-001',
    name: 'Jean Claude Niyonzima',
    email: 'jean.claude@example.com',
    phone: '+250 788 123 456',
    organization: 'Rwanda Tech Hub',
    purpose: 'Business meeting',
    type: 'Appointment',
    status: 'Checked In',
    date: '2026-10-27',
  },
  {
    id: 'VIS-002',
    name: 'Aline Uwase',
    email: 'aline.uwase@example.com',
    phone: '+250 783 456 789',
    organization: 'Independent',
    purpose: 'Document submission',
    type: 'Walk-in',
    status: 'Registered',
    date: '2026-10-27',
  },
  {
    id: 'VIS-003',
    name: 'Eric Mugisha',
    email: 'eric.mugisha@example.com',
    phone: '+250 790 234 567',
    organization: 'Smart Solutions Ltd',
    purpose: 'Technical consultation',
    type: 'Appointment',
    status: 'Checked Out',
    date: '2026-10-26',
  },
  {
    id: 'VIS-004',
    name: 'Diane Mukamana',
    email: 'diane.mukamana@example.com',
    phone: '+250 788 987 654',
    organization: 'University of Rwanda',
    purpose: 'Research discussion',
    type: 'Appointment',
    status: 'Registered',
    date: '2026-10-26',
  },
  {
    id: 'VIS-005',
    name: 'Patrick Habimana',
    email: 'patrick.habimana@example.com',
    phone: '+250 785 345 678',
    organization: 'Independent',
    purpose: 'General inquiry',
    type: 'Walk-in',
    status: 'Checked Out',
    date: '2026-10-25',
  },
]

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  purpose: '',
  type: 'Walk-in',
}

const statusStyles = {
  'Checked In': 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  Registered: 'bg-blue-50 text-blue-700 ring-blue-600/15',
  'Checked Out': 'bg-slate-100 text-slate-600 ring-slate-500/15',
}

function Visitors() {
  const [visitors, setVisitors] = useState(initialVisitors)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [modal, setModal] = useState(null)
  const [selectedVisitor, setSelectedVisitor] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  const today = new Date().toISOString().slice(0, 10)

  const filteredVisitors = useMemo(() => {
    const query = search.trim().toLowerCase()

    return visitors.filter((visitor) => {
      const matchesSearch = [
        visitor.id,
        visitor.name,
        visitor.email,
        visitor.organization,
        visitor.phone,
      ].some((value) => value.toLowerCase().includes(query))

      const matchesStatus =
        statusFilter === 'All Statuses' || visitor.status === statusFilter

      const matchesType =
        typeFilter === 'All Types' || visitor.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [visitors, search, statusFilter, typeFilter])

  const checkedInCount = visitors.filter(
    (visitor) => visitor.status === 'Checked In',
  ).length

  const registeredCount = visitors.filter(
    (visitor) => visitor.status === 'Registered',
  ).length

  const todayCount = visitors.filter(
    (visitor) => visitor.date === today,
  ).length

  function openAddModal() {
    setSelectedVisitor(null)
    setForm(emptyForm)
    setFormError('')
    setModal('add')
  }

  function openEditModal(visitor) {
    setSelectedVisitor(visitor)
    setForm({
      name: visitor.name,
      email: visitor.email,
      phone: visitor.phone,
      organization: visitor.organization,
      purpose: visitor.purpose,
      type: visitor.type,
    })
    setFormError('')
    setModal('edit')
  }

  function closeModal() {
    setModal(null)
    setSelectedVisitor(null)
    setFormError('')
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setFormError('')

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.purpose.trim()) {
      setFormError('Please complete all required fields.')
      return
    }

    if (modal === 'add') {
      const newVisitor = {
        ...form,
        id: `VIS-${String(Date.now()).slice(-6)}`,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        organization: form.organization.trim() || 'Independent',
        purpose: form.purpose.trim(),
        status: 'Registered',
        date: today,
      }

      setVisitors((current) => [newVisitor, ...current])
    } else if (modal === 'edit' && selectedVisitor) {
      setVisitors((current) =>
        current.map((visitor) =>
          visitor.id === selectedVisitor.id
            ? {
                ...visitor,
                ...form,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                organization: form.organization.trim() || 'Independent',
                purpose: form.purpose.trim(),
              }
            : visitor,
        ),
      )
    }

    closeModal()
  }

  function handleDelete(visitor) {
    const confirmed = window.confirm(
      `Delete the visitor record for ${visitor.name}?`,
    )

    if (confirmed) {
      setVisitors((current) =>
        current.filter((item) => item.id !== visitor.id),
      )
    }
  }

  function exportVisitors() {
    const columns = [
      'Visitor ID',
      'Full Name',
      'Email',
      'Phone',
      'Organization',
      'Purpose',
      'Type',
      'Status',
      'Date',
    ]

    const rows = filteredVisitors.map((visitor) =>
      [
        visitor.id,
        visitor.name,
        visitor.email,
        visitor.phone,
        visitor.organization,
        visitor.purpose,
        visitor.type,
        visitor.status,
        visitor.date,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(','),
    )

    const csv = [columns.join(','), ...rows].join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'visitor-records.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <AdminNavbar>
      <div className="min-h-screen bg-gray-50 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Administration / Records
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Visitors
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage visitor records and track arrivals at your organization.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={exportVisitors}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download size={17} />
                Export CSV
              </button>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <UserPlus size={17} />
                Add Visitor
              </button>
            </div>
          </div>

          {/* Overview statistics */}
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Users size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total visitors</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {visitors.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <UserCheck size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Currently checked in</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {checkedInCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                <CalendarDays size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Registered today</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {todayCount}
                </p>
              </div>
            </div>
          </div>

          {/* Visitor records table */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Visitor directory
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredVisitors.length} record
                  {filteredVisitors.length === 1 ? '' : 's'} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-64">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search visitors..."
                    aria-label="Search visitors"
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter by status"
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 sm:w-40"
                  >
                    <option>All Statuses</option>
                    <option>Registered</option>
                    <option>Checked In</option>
                    <option>Checked Out</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
                    aria-label="Filter by visitor type"
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 sm:w-36"
                  >
                    <option>All Types</option>
                    <option>Appointment</option>
                    <option>Walk-in</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">Visitor</th>
                    <th className="px-5 py-4">Organization</th>
                    <th className="px-5 py-4">Visit date</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredVisitors.map((visitor) => (
                    <tr
                      key={visitor.id}
                      className="transition hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                            {visitor.name
                              .split(' ')
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join('')
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {visitor.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {visitor.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {visitor.organization}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {visitor.purpose}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {dateFormatter.format(
                          new Date(`${visitor.date}T12:00:00`),
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {visitor.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            statusStyles[visitor.status] ||
                            'bg-slate-100 text-slate-600 ring-slate-500/15'
                          }`}
                        >
                          {visitor.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            title="View visitor"
                            aria-label={`View ${visitor.name}`}
                            onClick={() => {
                              setSelectedVisitor(visitor)
                              setModal('view')
                            }}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            title="Edit visitor"
                            aria-label={`Edit ${visitor.name}`}
                            onClick={() => openEditModal(visitor)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-700"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            title="Delete visitor"
                            aria-label={`Delete ${visitor.name}`}
                            onClick={() => handleDelete(visitor)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredVisitors.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-16 text-center">
                        <Users
                          size={30}
                          className="mx-auto mb-3 text-slate-300"
                        />
                        <p className="font-semibold text-slate-700">
                          No visitors found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try another search or change your filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredVisitors.length} of {visitors.length} visitors
              </span>
              <span>Visitor Management System</span>
            </div>
          </section>

          {/* Add / Edit modal */}
          {(modal === 'add' || modal === 'edit') && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeModal()
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="visitor-form-title"
                className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                  <div>
                    <h2
                      id="visitor-form-title"
                      className="text-xl font-bold text-slate-900"
                    >
                      {modal === 'add' ? 'Register visitor' : 'Edit visitor'}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {modal === 'add'
                        ? 'Enter the visitor details below.'
                        : 'Update this visitor’s information.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close form"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-5 p-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="visitor-name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Full name *
                      </label>
                      <div className="relative">
                        <UserRound
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="visitor-name"
                          name="name"
                          value={form.name}
                          onChange={handleFormChange}
                          required
                          maxLength={100}
                          placeholder="Visitor's full name"
                          className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="visitor-email"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Email address *
                      </label>
                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="visitor-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleFormChange}
                          required
                          maxLength={150}
                          placeholder="visitor@example.com"
                          className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="visitor-phone"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Phone number *
                      </label>
                      <div className="relative">
                        <Phone
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="visitor-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleFormChange}
                          required
                          maxLength={30}
                          placeholder="+250 7XX XXX XXX"
                          className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="visitor-organization"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Organization
                      </label>
                      <div className="relative">
                        <Building2
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="visitor-organization"
                          name="organization"
                          value={form.organization}
                          onChange={handleFormChange}
                          maxLength={150}
                          placeholder="Company or institution"
                          className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="visitor-purpose"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Visit purpose *
                      </label>
                      <input
                        id="visitor-purpose"
                        name="purpose"
                        value={form.purpose}
                        onChange={handleFormChange}
                        required
                        maxLength={250}
                        placeholder="Reason for the visit"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="visitor-type"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Visitor type
                      </label>
                      <select
                        id="visitor-type"
                        name="type"
                        value={form.type}
                        onChange={handleFormChange}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option>Walk-in</option>
                        <option>Appointment</option>
                      </select>
                    </div>
                  </div>

                  {formError && (
                    <p className="mx-6 mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                      {formError}
                    </p>
                  )}

                  <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      {modal === 'add' ? 'Register visitor' : 'Save changes'}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {/* Visitor details modal */}
          {modal === 'view' && selectedVisitor && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeModal()
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="visitor-details-title"
                className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between bg-slate-950 px-6 py-5 text-white">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-blue-300">
                      Visitor record
                    </p>
                    <h2
                      id="visitor-details-title"
                      className="mt-1 text-xl font-bold"
                    >
                      Visitor details
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close details"
                    className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700">
                      {selectedVisitor.name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="break-words font-bold text-slate-900">
                        {selectedVisitor.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {selectedVisitor.id}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: 'Email address',
                        value: selectedVisitor.email,
                        icon: Mail,
                      },
                      {
                        label: 'Phone number',
                        value: selectedVisitor.phone,
                        icon: Phone,
                      },
                      {
                        label: 'Organization',
                        value: selectedVisitor.organization,
                        icon: Building2,
                      },
                      {
                        label: 'Visit purpose',
                        value: selectedVisitor.purpose,
                        icon: MapPin,
                      },
                      {
                        label: 'Visit date',
                        value: dateFormatter.format(
                          new Date(`${selectedVisitor.date}T12:00:00`),
                        ),
                        icon: CalendarDays,
                      },
                    ].map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <div
                          key={item.label}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-500">
                            <ItemIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">
                              {item.label}
                            </p>
                            <p className="mt-1 break-words text-sm font-medium text-slate-800">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <div>
                      <p className="mb-2 text-xs text-slate-500">
                        Current status
                      </p>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                          statusStyles[selectedVisitor.status] ||
                          'bg-slate-100 text-slate-600 ring-slate-500/15'
                        }`}
                      >
                        {selectedVisitor.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEditModal(selectedVisitor)}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      <Pencil size={16} />
                      Edit visitor
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </AdminNavbar>
  )
}

export default Visitors
