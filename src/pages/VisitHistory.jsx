
import { useMemo, useState } from 'react'
import {
  History,
  Search,
  Download,
  Eye,
  X,
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  XCircle,
  Ban,
  FileText,
} from 'lucide-react'
import AdminNavbar from '../components/AdminNavbar'

const initialHistory = [
  {
    id: 'VIS-001',
    visitor: 'Jean Claude',
    email: 'jean.claude@example.com',
    phone: '+250 788 123 456',
    organization: 'ABC Company',
    destination: 'Human Resources',
    purpose: 'Job interview',
    date: '2026-10-20',
    time: '09:00',
    status: 'Completed',
    checkedIn: '09:02',
    checkedOut: '10:15',
    notes: 'Interview with the HR department.',
  },
  {
    id: 'VIS-002',
    visitor: 'Alice Mukamana',
    email: 'alice.m@example.com',
    phone: '+250 788 234 567',
    organization: 'XYZ Ltd',
    destination: 'Finance Department',
    purpose: 'Business meeting',
    date: '2026-10-21',
    time: '10:30',
    status: 'Completed',
    checkedIn: '10:25',
    checkedOut: '11:40',
    notes: 'Meeting about the service contract.',
  },
  {
    id: 'VIS-003',
    visitor: 'Eric Niyonzima',
    email: 'eric.n@example.com',
    phone: '+250 788 345 678',
    organization: 'Independent',
    destination: 'IT Department',
    purpose: 'Technical support',
    date: '2026-10-22',
    time: '14:00',
    status: 'Rejected',
    checkedIn: '—',
    checkedOut: '—',
    notes: 'The appointment was not approved.',
  },
  {
    id: 'VIS-004',
    visitor: 'Diane Uwase',
    email: 'diane.u@example.com',
    phone: '+250 788 456 789',
    organization: 'Diane Enterprises',
    destination: 'Management Office',
    purpose: 'Partnership discussion',
    date: '2026-10-23',
    time: '11:00',
    status: 'Cancelled',
    checkedIn: '—',
    checkedOut: '—',
    notes: 'The visitor cancelled the appointment.',
  },
  {
    id: 'VIS-005',
    visitor: 'Patrick Habimana',
    email: 'patrick.h@example.com',
    phone: '+250 788 567 890',
    organization: 'Tech Solutions',
    destination: 'ICT Department',
    purpose: 'Project discussion',
    date: '2026-10-24',
    time: '13:30',
    status: 'Completed',
    checkedIn: '13:27',
    checkedOut: '14:35',
    notes: 'Discussed the proposed software project.',
  },
]

const statusStyles = {
  Completed: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-rose-50 text-rose-700',
  Cancelled: 'bg-slate-100 text-slate-600',
}

const statusIcons = {
  Completed: CheckCircle2,
  Rejected: XCircle,
  Cancelled: Ban,
}

function formatDate(date) {
  if (!date) return '—'

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function VisitHistory() {
  const [history, setHistory] = useState(initialHistory)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedVisit, setSelectedVisit] = useState(null)

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase()

    return history.filter((visit) => {
      const matchesSearch = [
        visit.id,
        visit.visitor,
        visit.email,
        visit.destination,
        visit.purpose,
        visit.organization,
      ].some((value) => value.toLowerCase().includes(query))

      const matchesStatus =
        statusFilter === 'All' || visit.status === statusFilter

      const matchesFrom = !dateFrom || visit.date >= dateFrom
      const matchesTo = !dateTo || visit.date <= dateTo

      return matchesSearch && matchesStatus && matchesFrom && matchesTo
    })
  }, [history, search, statusFilter, dateFrom, dateTo])

  const completedCount = history.filter(
    (visit) => visit.status === 'Completed',
  ).length

  const rejectedCount = history.filter(
    (visit) => visit.status === 'Rejected',
  ).length

  const cancelledCount = history.filter(
    (visit) => visit.status === 'Cancelled',
  ).length

  function exportCSV() {
    const headers = [
      'Request ID',
      'Visitor',
      'Email',
      'Phone',
      'Organization',
      'Destination',
      'Purpose',
      'Visit Date',
      'Scheduled Time',
      'Status',
      'Check-in Time',
      'Check-out Time',
      'Notes',
    ]

    const escapeCSV = (value) =>
      `"${String(value ?? '').replace(/"/g, '""')}"`

    const rows = filteredHistory.map((visit) => [
      visit.id,
      visit.visitor,
      visit.email,
      visit.phone,
      visit.organization,
      visit.destination,
      visit.purpose,
      visit.date,
      visit.time,
      visit.status,
      visit.checkedIn,
      visit.checkedOut,
      visit.notes,
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(','))
      .join('\r\n')

    const blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'visitor-history.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  function resetFilters() {
    setSearch('')
    setStatusFilter('All')
    setDateFrom('')
    setDateTo('')
  }

  function removeRecord(id) {
    const confirmed = window.confirm(
      'Remove this record from the current history view?',
    )

    if (!confirmed) return

    setHistory((previous) => previous.filter((visit) => visit.id !== id))
    setSelectedVisit(null)
  }

  return (
    <AdminNavbar>
      <div className="min-h-screen bg-gray-50 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <History size={16} />
                <span>Administration</span>
                <span>/</span>
                <span>Visit History</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Visit History
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Review previous appointments and visitor activity.
              </p>
            </div>

            <button
              type="button"
              onClick={exportCSV}
              disabled={filteredHistory.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryItem
              title="Total Records"
              value={history.length}
              icon={History}
              iconClass="bg-blue-50 text-blue-600"
            />
            <SummaryItem
              title="Completed Visits"
              value={completedCount}
              icon={CheckCircle2}
              iconClass="bg-emerald-50 text-emerald-600"
            />
            <SummaryItem
              title="Rejected Requests"
              value={rejectedCount}
              icon={XCircle}
              iconClass="bg-rose-50 text-rose-600"
            />
            <SummaryItem
              title="Cancelled Visits"
              value={cancelledCount}
              icon={Ban}
              iconClass="bg-slate-100 text-slate-600"
            />
          </div>

          {/* Search and filters */}
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="xl:col-span-2">
                <label
                  htmlFor="history-search"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Search records
                </label>

                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Search size={18} className="shrink-0 text-gray-400" />
                  <input
                    id="history-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Name, ID, destination..."
                    className="w-full bg-transparent py-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="history-status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Visit status
                </label>

                <select
                  id="history-status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="history-from"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  From date
                </label>
                <input
                  id="history-from"
                  type="date"
                  value={dateFrom}
                  max={dateTo || undefined}
                  onChange={(event) => setDateFrom(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="history-to"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  To date
                </label>
                <input
                  id="history-to"
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(event) => setDateTo(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-800">
                  {filteredHistory.length}
                </span>{' '}
                of {history.length} records
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            </div>
          </section>

          {/* History table */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Historical Records
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Select a record to view its details.
                </p>
              </div>
              <History size={21} className="text-gray-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Request ID</th>
                    <th className="px-5 py-4 font-semibold">Visitor</th>
                    <th className="px-5 py-4 font-semibold">Destination</th>
                    <th className="px-5 py-4 font-semibold">Visit Date</th>
                    <th className="px-5 py-4 font-semibold">Time</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredHistory.map((visit) => {
                    const StatusIcon = statusIcons[visit.status]

                    return (
                      <tr
                        key={visit.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-blue-700">
                          {visit.id}
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900">
                            {visit.visitor}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {visit.organization}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {visit.destination}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                          {formatDate(visit.date)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                          {visit.time}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[visit.status]}`}
                          >
                            <StatusIcon size={14} />
                            {visit.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedVisit(visit)}
                            aria-label={`View ${visit.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}

                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-16 text-center">
                        <History
                          size={32}
                          className="mx-auto mb-3 text-gray-300"
                        />
                        <p className="font-semibold text-gray-800">
                          No records found
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Visit details modal */}
      {selectedVisit && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedVisit(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="visit-detail-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Visit record
                </p>
                <h2
                  id="visit-detail-title"
                  className="mt-1 text-xl font-bold text-gray-900"
                >
                  {selectedVisit.visitor}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedVisit.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVisit(null)}
                aria-label="Close visit details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${statusStyles[selectedVisit.status]}`}
                >
                  {selectedVisit.status === 'Completed' ? (
                    <CheckCircle2 size={16} />
                  ) : selectedVisit.status === 'Rejected' ? (
                    <XCircle size={16} />
                  ) : (
                    <Ban size={16} />
                  )}
                  {selectedVisit.status}
                </span>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Visitor information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailItem
                    icon={Mail}
                    label="Email address"
                    value={selectedVisit.email}
                  />
                  <DetailItem
                    icon={Phone}
                    label="Phone number"
                    value={selectedVisit.phone}
                  />
                  <DetailItem
                    icon={Building2}
                    label="Organization"
                    value={selectedVisit.organization}
                  />
                  <DetailItem
                    icon={MapPin}
                    label="Destination"
                    value={selectedVisit.destination}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Visit information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailItem
                    icon={CalendarDays}
                    label="Visit date"
                    value={formatDate(selectedVisit.date)}
                  />
                  <DetailItem
                    icon={Clock}
                    label="Scheduled time"
                    value={selectedVisit.time}
                  />
                  <DetailItem
                    icon={CheckCircle2}
                    label="Check-in time"
                    value={selectedVisit.checkedIn}
                  />
                  <DetailItem
                    icon={Clock}
                    label="Check-out time"
                    value={selectedVisit.checkedOut}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FileText size={17} />
                  Purpose of visit
                </div>
                <p className="text-sm text-gray-700">
                  {selectedVisit.purpose}
                </p>

                <p className="mb-1 mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Notes
                </p>
                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                  {selectedVisit.notes || 'No additional notes.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedVisit(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => removeRecord(selectedVisit.id)}
                className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Remove demo record
              </button>
            </div>
          </section>
        </div>
      )}
    </AdminNavbar>
  )
}

function SummaryItem({ title, value, icon: Icon, iconClass }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 rounded-lg bg-gray-100 p-2 text-gray-600">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-gray-800">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

export default VisitHistory
