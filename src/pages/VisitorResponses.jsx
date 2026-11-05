
import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import VisitorNavbar from '../components/VisitorNavbar'
import {
  MessageSquare,
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'

function VisitorResponses() {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await apiRequest('/appointments/my-responses')
        setResponses(data)
      } catch (err) {
        setError(err.message || 'Failed to load responses.')
      } finally {
        setLoading(false)
      }
    }

    fetchResponses()
  }, [])

  return (
    <VisitorNavbar>
      <div className="w-full">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-800">
            My Responses
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View updates and messages about your visit requests.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-blue-600">
            <Loader2 className="animate-spin" size={22} />
            <span>Loading responses...</span>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : responses.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
            <MessageSquare className="mx-auto mb-3 text-slate-400" size={36} />
            <h2 className="font-semibold text-slate-700">No responses yet</h2>
            <p className="mt-2 text-sm text-slate-500">
              Your approved or rejected visit requests will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {responses.map((item) => {
              const approved = item.status === 'approved'

              return (
                <div
                  key={item.id}
                  className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Request number
                      </p>
                      <h2 className="mt-1 font-semibold text-slate-800">
                        {item.request_number}
                      </h2>
                    </div>

                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      approved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {approved ? <CheckCircle size={15} /> : <XCircle size={15} />}
                      {approved ? 'Approved' : 'Rejected'}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 text-blue-600" size={18} />
                      <div>
                        <p className="text-xs text-slate-400">Destination</p>
                        <p className="text-sm font-medium text-slate-700">{item.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 text-blue-600" size={18} />
                      <div>
                        <p className="text-xs text-slate-400">Visit date</p>
                        <p className="text-sm font-medium text-slate-700">{item.visit_date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 text-blue-600" size={18} />
                      <div>
                        <p className="text-xs text-slate-400">Visit time</p>
                        <p className="text-sm font-medium text-slate-700">
                          {item.visit_time?.slice(0, 5)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-0.5 text-blue-600" size={18} />
                      <div>
                        <p className="text-xs text-slate-400">Reviewed on</p>
                        <p className="text-sm font-medium text-slate-700">
                          {item.reviewed_at
                            ? new Date(item.reviewed_at).toLocaleString()
                            : 'Not available'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-slate-50 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Receptionist's message
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {item.response_message || 'No message was provided.'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </VisitorNavbar>
  )
}

export default VisitorResponses
