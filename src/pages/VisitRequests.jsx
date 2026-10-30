
import { useMemo, useState } from 'react'
import {
  ClipboardList,
  Search,
  Eye,
  Check,
  X,
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Phone,
  Building2,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock3,
  UserRound,
  MessageSquareText,
} from 'lucide-react'
import AdminNavbar from '../components/AdminNavbar'

const initialRequests = [
  {
    id: 'REQ-001',
    visitor: 'Jean Claude Niyonzima',
    email: 'jean.claude@example.com',
    phone: '+250 788 123 456',
    organization: 'Rwanda Tech Hub',
    destination: 'IT Department',
    purpose: 'Discuss a software integration project with the IT team.',
    date: '2026-10-28',
    time: '10:00',
    notes: 'I would like to meet with the software team.',
    status: 'Pending',
    submittedAt: '2026-10-26',
  },
  {
    id: 'REQ-002',
    visitor: 'Aline Uwase',
    email: 'aline.uwase@example.com',
    phone: '+250 783 456 789',
    organization: 'Independent',
    destination: 'Human Resources',
    purpose: 'Submit employment documents.',
    date: '2026-10-29',
    time: '14:00',
    notes: '',
    status: 'Pending',
    submittedAt: '2026-10-27',
  },
  {
    id: 'REQ-003',
    visitor: 'Eric Mugisha',
    email: 'eric.mugisha@example.com',
    phone: '+250 790 234 567',
    organization: 'Smart Solutions Ltd',
    destination: 'Finance Department',
    purpose: 'Discuss an invoice and payment process.',
    date: '2026-10-30',
    time: '09:30',
    notes: 'Please let me know if I need to bring supporting documents.',
    status: 'Approved',
    submittedAt: '2026-10-25',
  },
  {
    id: 'REQ-004',
    visitor: 'Diane Mukamana',
    email: 'diane.mukamana@example.com',
    phone: '+250 788 987 654',
    organization: 'University of Rwanda',
    destination: 'Management',
    purpose: 'Discuss a research collaboration.',
    date: '2026-10-31',
    time: '11:00',
    notes: '',
    status: 'Rejected',
    submittedAt: '2026-10-24',
  },
  {
    id: 'REQ-005',
    visitor: 'Patrick Habimana',
    email: 'patrick.habimana@example.com',
    phone: '+250 785 345 678',
    organization: 'Independent',
    destination: 'Administration',
    purpose: 'Ask about administrative services.',
    date: '2026-11-02',
    time: '13:00',
    notes: 'A short meeting is preferred.',
    status: 'Completed',
    submittedAt: '2026-10-23',
  },
]

const statuses = ['All Statuses', 'Pending', 'Approved', 'Rejected', 'Completed']

const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  Completed: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

function VisitRequests() {
  const [requests, setRequests] = useState(initialRequests)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [decisionNote, setDecisionNote] = useState('')
  const [notice, setNotice] = useState('')

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase()

    return requests.filter((request) => {
      const matchesSearch = [
        request.id,
        request.visitor,
        request.email,
        request.destination,
        request.purpose,
      ].some((value) => value.toLowerCase().includes(query))

      const matchesStatus =
        statusFilter === 'All Statuses' || request.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [requests, search, statusFilter])

  function openDetails(request) {
    setSelectedRequest(request)
    setDecisionNote(request.decisionNote || '')
    setNotice('')
  }

  function closeDetails() {
    setSelectedRequest(null)
    setDecisionNote('')
    setNotice('')
  }

  function updateRequestStatus(requestId, status) {
    const updatedRequest = requests.find((request) => request.id === requestId)

    if (!updatedRequest || updatedRequest.status !== 'Pending') return

    const updated = {
      ...updatedRequest,
      status,
      decisionNote: decisionNote.trim(),
      reviewedAt: new Date().toISOString(),
    }

    setRequests((current) =>
      current.map((request) =>
        request.id === requestId ? updated : request,
      ),
    )

    setSelectedRequest(updated)
    setNotice(`Request ${requestId} has been ${status.toLowerCase()}.`)
  }

  const counts = {
    total: requests.length,
    pending: requests.filter((request) => request.status === 'Pending').length,
    approved: requests.filter((request) => request.status === 'Approved').length,
    rejected: requests.filter((request) => request.status === 'Rejected').length,
  }

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  function formatDate(date) {
    if (!date) return '—'
    return dateFormatter.format(new Date(`${date}T12:00:00`))
  }

  function formatTime(time) {
    if (!time) return '—'

    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(Number(hours), Number(minutes), 0, 0)

    return new Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <AdminNavbar>
      <main className="min-h-screen bg-gray-50 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page heading */}
          <div className="mb-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
              Administration / Appointments
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Visit Requests
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review appointment requests and manage visitor approvals.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: 'Total requests',
                value: counts.total,
                icon: ClipboardList,
                iconClass: 'bg-blue-50 text-blue-700',
              },
              {
                label: 'Awaiting review',
                value: counts.pending,
                icon: Clock3,
                iconClass: 'bg-amber-50 text-amber-700',
              },
              {
                label: 'Approved',
                value: counts.approved,
                icon: CheckCircle2,
                iconClass: 'bg-emerald-50 text-emerald-700',
              },
              {
                label: 'Rejected',
                value: counts.rejected,
                icon: XCircle,
                iconClass: 'bg-red-50 text-red-600',
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${item.iconClass}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Requests table */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Appointment requests
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredRequests.length} request
                  {filteredRequests.length === 1 ? '' : 's'} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-72">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search requests..."
                    aria-label="Search visit requests"
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter requests by status"
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 sm:w-44"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
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
                    <th className="px-5 py-4">Destination</th>
                    <th className="px-5 py-4">Requested date</th>
                    <th className="px-5 py-4">Submitted</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                            {request.visitor
                              .split(' ')
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join('')
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {request.visitor}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {request.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {request.destination}
                        </p>
                        <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                          {request.purpose}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {formatDate(request.date)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatTime(request.time)}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(request.submittedAt)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            statusStyles[request.status] ||
                            'bg-slate-100 text-slate-600 ring-slate-500/20'
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => openDetails(request)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={16} />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-16 text-center">
                        <ClipboardList
                          size={30}
                          className="mx-auto mb-3 text-slate-300"
                        />
                        <p className="font-semibold text-slate-700">
                          No requests found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try a different search or status filter.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </section>

          {/* Request details and decision modal */}
          {selectedRequest && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDetails()
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="request-details-title"
                className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-start justify-between bg-slate-950 px-6 py-5 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                      {selectedRequest.id}
                    </p>
                    <h2
                      id="request-details-title"
                      className="mt-1 text-xl font-bold"
                    >
                      Visit request details
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                      Review the information before making a decision.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeDetails}
                    aria-label="Close request details"
                    className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-6">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                        {selectedRequest.visitor
                          .split(' ')
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {selectedRequest.visitor}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {selectedRequest.organization}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[selectedRequest.status] ||
                        'bg-slate-100 text-slate-600 ring-slate-500/20'
                      }`}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      {
                        label: 'Email address',
                        value: selectedRequest.email,
                        icon: Mail,
                      },
                      {
                        label: 'Phone number',
                        value: selectedRequest.phone,
                        icon: Phone,
                      },
                      {
                        label: 'Destination',
                        value: selectedRequest.destination,
                        icon: Building2,
                      },
                      {
                        label: 'Visit date',
                        value: formatDate(selectedRequest.date),
                        icon: CalendarDays,
                      },
                      {
                        label: 'Preferred time',
                        value: formatTime(selectedRequest.time),
                        icon: Clock,
                      },
                      {
                        label: 'Submitted on',
                        value: formatDate(selectedRequest.submittedAt),
                        icon: ClipboardList,
                      },
                    ].map((item) => {
                      const ItemIcon = item.icon

                      return (
                        <div
                          key={item.label}
                          className="flex items-start gap-3"
                        >
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                            <ItemIcon size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">
                              {item.label}
                            </p>
                            <p className="mt-1 break-words text-sm font-medium text-slate-800">
                              {item.value || '—'}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Purpose of visit
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {selectedRequest.purpose}
                    </p>
                  </div>

                  {selectedRequest.notes && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-4">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <MessageSquareText size={15} />
                        Additional notes
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {selectedRequest.notes}
                      </p>
                    </div>
                  )}

                  {selectedRequest.status === 'Pending' ? (
                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <label
                        htmlFor="decision-note"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Decision note <span className="font-normal text-slate-400">(optional)</span>
                      </label>

                      <textarea
                        id="decision-note"
                        value={decisionNote}
                        onChange={(event) => setDecisionNote(event.target.value)}
                        maxLength={500}
                        rows={3}
                        placeholder="Add a reason or instructions for the visitor..."
                        className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <p className="mt-1 text-right text-xs text-slate-400">
                        {decisionNote.length}/500
                      </p>
                    </div>
                  ) : (
                    selectedRequest.decisionNote && (
                      <div className="mt-5 rounded-lg bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Decision note
                        </p>
                        <p className="mt-2 text-sm text-slate-700">
                          {selectedRequest.decisionNote}
                        </p>
                      </div>
                    )
                  )}

                  {notice && (
                    <p
                      aria-live="polite"
                      className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                    >
                      {notice}
                    </p>
                  )}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={closeDetails}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Close
                  </button>

                  {selectedRequest.status === 'Pending' && (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          updateRequestStatus(selectedRequest.id, 'Rejected')
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                      >
                        <X size={16} />
                        Reject request
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateRequestStatus(selectedRequest.id, 'Approved')
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Check size={17} />
                        Approve request
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </AdminNavbar>
  )
}

export default VisitRequests
