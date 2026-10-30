
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  CalendarPlus,
  ClipboardList,
  MapPin,
} from 'lucide-react'
import VisitorNavbar from '../components/VisitorNavbar'

const appointments = [
  {
    id: 'VIS-001',
    destination: 'IT Department',
    purpose: 'Discuss a technical issue',
    date: '28 Oct 2026',
    time: '10:00 AM',
    status: 'Pending',
  },
  {
    id: 'VIS-002',
    destination: 'Human Resources',
    purpose: 'Submit documents',
    date: '30 Oct 2026',
    time: '02:00 PM',
    status: 'Approved',
  },
]

function VisitorHome() {
  const stats = [
    {
      title: 'Total Requests',
      value: appointments.length,
      icon: ClipboardList,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Pending',
      value: appointments.filter((item) => item.status === 'Pending').length,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Approved',
      value: appointments.filter((item) => item.status === 'Approved').length,
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Rejected',
      value: appointments.filter((item) => item.status === 'Rejected').length,
      icon: XCircle,
      color: 'bg-red-50 text-red-600',
    },
  ]

  function statusStyle(status) {
    if (status === 'Approved') {
      return 'bg-green-50 text-green-700'
    }

    if (status === 'Rejected') {
      return 'bg-red-50 text-red-700'
    }

    return 'bg-amber-50 text-amber-700'
  }

  return (
    <VisitorNavbar>
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            VISITOR PORTAL
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back!
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage your visits and track your appointment requests.
          </p>
        </div>

        <Link
          to="/visitor/request"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <CalendarPlus size={18} />
          Request a Visit
        </Link>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          )
        })}
      </section>

      <section className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-white p-3 text-blue-600">
              <CalendarDays size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Planning to visit?
              </h3>

              <p className="mt-1 max-w-xl text-sm text-gray-600">
                Submit your preferred date, time, destination and
                purpose. Staff will review your request.
              </p>
            </div>
          </div>

          <Link
            to="/visitor/request"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Book an appointment
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-bold text-gray-900">
              Recent Visit Requests
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review the progress of your appointments.
            </p>
          </div>

          <Link
            to="/visitor/requests"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Request ID</th>
                <th className="px-5 py-4 font-semibold">Destination</th>
                <th className="px-5 py-4 font-semibold">Visit Date</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {appointment.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {appointment.destination}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {appointment.purpose}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    <p>{appointment.date}</p>
                    <p className="mt-1 text-xs">{appointment.time}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/visitor/request"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
        >
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <MapPin size={22} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Request a new visit
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose your destination and preferred time.
            </p>
          </div>

          <ArrowRight size={18} className="text-gray-400" />
        </Link>

        <Link
          to="/visitor/requests"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
        >
          <div className="rounded-lg bg-green-50 p-3 text-green-600">
            <ClipboardList size={22} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Track your requests
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Check pending, approved and rejected appointments.
            </p>
          </div>

          <ArrowRight size={18} className="text-gray-400" />
        </Link>
      </section>

      <p className="mt-8 text-center text-xs text-gray-400">
        VisitorMS · Visitor Management System
      </p>
    </VisitorNavbar>
  )
}

export default VisitorHome
