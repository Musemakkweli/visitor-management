
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Eye,
  X,
  Plus,
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
  ClipboardList,
} from 'lucide-react'
import VisitorNavbar from '../components/VisitorNavbar'

function MyRequests() {
  const [requests, setRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('visitorRequests') || '[]')
    } catch {
      return []
    }
  })

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedRequest, setSelectedRequest] = useState(null)

  const statusStyles = {
    Pending: 'bg-amber-50 text-amber-700',
    Approved: 'bg-emerald-50 text-emerald-700',
    Rejected: 'bg-red-50 text-red-700',
    Completed: 'bg-blue-50 text-blue-700',
    Cancelled: 'bg-gray-100 text-gray-600',
  }

  const filteredRequests = requests.filter((request) => {
    const query = search.toLowerCase()

    const matchesSearch = [
      request.id,
      request.destination,
      request.purpose,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query)

    const matchesStatus =
      statusFilter === 'All' || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  function cancelRequest(id) {
    if (!window.confirm('Are you sure you want to cancel this request?')) {
      return
    }

    const updated = requests.map((request) =>
      request.id === id
        ? { ...request, status: 'Cancelled' }
        : request,
    )

    setRequests(updated)
    localStorage.setItem('visitorRequests', JSON.stringify(updated))
    setSelectedRequest(null)
  }

  return (
    <VisitorNavbar>
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/visitor/dashboard" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-800">My Requests</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              My Requests
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Track your appointment requests and review their current status.
            </p>
          </div>

          <Link
            to="/visitor/request"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            New Visit Request
          </Link>
        </div>

        {/* Request list */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Appointment History
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredRequests.length} request
                {filteredRequests.length === 1 ? '' : 's'} found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative sm:w-64">
                <Search
                  size={17}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search requests..."
                  aria-label="Search requests"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter requests by status"
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <ClipboardList size={26} />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                {requests.length === 0
                  ? 'No appointment requests yet'
                  : 'No matching requests'}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {requests.length === 0
                  ? 'When you submit a visit request, it will appear here so you can track its progress.'
                  : 'Try changing your search or selecting a different status.'}
              </p>

              {requests.length === 0 && (
                <Link
                  to="/visitor/request"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Create your first request
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Request ID</th>
                    <th className="px-5 py-4 font-semibold">Destination</th>
                    <th className="px-5 py-4 font-semibold">Visit Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {request.id}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Appointment request
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">
                          {request.destination}
                        </p>
                        <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">
                          {request.purpose}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-gray-800">{request.visitDate}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {request.visitTime}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[request.status] ||
                            'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(request)}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredRequests.length > 0 && (
            <div className="border-t border-gray-100 px-5 py-3">
              <p className="text-xs text-gray-500">
                Showing {filteredRequests.length} of {requests.length} requests
              </p>
            </div>
          )}
        </section>

        <p className="mt-5 text-xs text-gray-400">
          Request statuses are updated after staff review.
        </p>
      </div>

      {/* Request details dialog */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-details-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Appointment details
                </p>
                <h3
                  id="request-details-title"
                  className="mt-1 text-xl font-bold text-gray-900"
                >
                  {selectedRequest.id}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                aria-label="Close request details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedRequest.destination}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">Purpose of visit</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">
                  {selectedRequest.purpose}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CalendarDays size={17} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Preferred date</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {selectedRequest.visitDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock size={17} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Preferred time</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {selectedRequest.visitTime}
                    </p>
                  </div>
                </div>
              </div>

              {selectedRequest.notes && (
                <div>
                  <p className="text-xs text-gray-500">Additional notes</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">Current status</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[selectedRequest.status] ||
                    'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedRequest.status}
                </span>
              </div>

              {selectedRequest.status === 'Pending' && (
                <button
                  type="button"
                  onClick={() => cancelRequest(selectedRequest.id)}
                  className="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cancel Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </VisitorNavbar>
  )
}

export default MyRequests
