
import {
  Users,
  UserCheck,
  Clock,
  UserX,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
} from 'lucide-react'

import AdminNavbar from '../components/AdminNavbar'

function Dashboard() {
  const stats = [
    {
      title: 'Total Visitors',
      value: '1,284',
      change: '+12.5%',
      positive: true,
      description: 'Compared to last month',
      icon: Users,
      iconStyle: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Currently Inside',
      value: '24',
      change: '+4.2%',
      positive: true,
      description: 'Compared to yesterday',
      icon: UserCheck,
      iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Pending Requests',
      value: '18',
      change: '-2.4%',
      positive: false,
      description: 'Compared to last week',
      icon: Clock,
      iconStyle: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Rejected Visits',
      value: '6',
      change: '-8.1%',
      positive: true,
      description: 'Compared to last month',
      icon: UserX,
      iconStyle: 'bg-rose-100 text-rose-600',
    },
  ]

  const recentVisitors = [
    {
      id: 'VIS-1001',
      name: 'Jean Claude',
      email: 'jean.claude@example.com',
      host: 'Mr. Emmanuel',
      purpose: 'Business Meeting',
      date: '26 Oct 2026',
      time: '09:30 AM',
      status: 'Checked In',
    },
    {
      id: 'VIS-1002',
      name: 'Alice Uwase',
      email: 'alice.uwase@example.com',
      host: 'Ms. Diane',
      purpose: 'Interview',
      date: '26 Oct 2026',
      time: '10:15 AM',
      status: 'Pending',
    },
    {
      id: 'VIS-1003',
      name: 'Eric Niyonzima',
      email: 'eric.n@example.com',
      host: 'Mr. Patrick',
      purpose: 'Delivery',
      date: '26 Oct 2026',
      time: '11:00 AM',
      status: 'Checked Out',
    },
    {
      id: 'VIS-1004',
      name: 'Grace Mukamana',
      email: 'grace.m@example.com',
      host: 'Ms. Alice',
      purpose: 'Official Visit',
      date: '26 Oct 2026',
      time: '11:45 AM',
      status: 'Rejected',
    },
    {
      id: 'VIS-1005',
      name: 'David Habimana',
      email: 'david.h@example.com',
      host: 'Mr. Emmanuel',
      purpose: 'Business Meeting',
      date: '26 Oct 2026',
      time: '01:00 PM',
      status: 'Checked In',
    },
  ]

  const requests = [
    {
      name: 'Alice Uwase',
      purpose: 'Interview',
      time: '10:15 AM',
    },
    {
      name: 'Peter Mugisha',
      purpose: 'Business Meeting',
      time: '01:30 PM',
    },
    {
      name: 'Diane Ingabire',
      purpose: 'Official Visit',
      time: '02:00 PM',
    },
  ]

  function getStatusStyle(status) {
    switch (status) {
      case 'Checked In':
        return 'bg-emerald-50 text-emerald-700'
      case 'Checked Out':
        return 'bg-gray-100 text-gray-700'
      case 'Pending':
        return 'bg-amber-50 text-amber-700'
      case 'Rejected':
        return 'bg-rose-50 text-rose-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AdminNavbar>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, Administrator. Here is your visitor overview.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <CalendarDays size={18} />
            26 October 2026
          </button>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold ${
                      stat.positive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </span>

                  <span className="text-gray-500">
                    {stat.description}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Activity and requests */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Visitor activity */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Visitor Activity
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Visitor check-ins over the last 7 days
                </p>
              </div>

              <select
                aria-label="Activity period"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
              >
                <option>This week</option>
                <option>This month</option>
              </select>
            </div>

            <div className="mt-8 flex h-52 items-end justify-between gap-3 border-b border-gray-100 px-2">
              {[
                { day: 'Mon', value: 45 },
                { day: 'Tue', value: 70 },
                { day: 'Wed', value: 55 },
                { day: 'Thu', value: 90 },
                { day: 'Fri', value: 65 },
                { day: 'Sat', value: 35 },
                { day: 'Sun', value: 50 },
              ].map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div
                    className="w-full max-w-10 rounded-t-md bg-blue-500 transition hover:bg-blue-600"
                    style={{ height: `${item.value}%` }}
                    title={`${item.value} visitor activity units`}
                  />

                  <span className="pb-2 text-xs text-gray-500">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              Visitor activity
            </div>
          </section>

          {/* Pending requests */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Pending Requests
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Requests awaiting approval
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                18 pending
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {requests.map((request) => (
                <div
                  key={request.name}
                  className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                    {request.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {request.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {request.purpose}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-xs text-gray-500">
                    {request.time}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigateToRequests()}
              className="mt-5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              View All Requests
            </button>
          </section>
        </div>

        {/* Recent visitors table */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-gray-900">
                Recent Visitors
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                A summary of the latest visitor records
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              View All Visitors
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Visitor</th>
                  <th className="px-5 py-4 font-semibold">Host</th>
                  <th className="px-5 py-4 font-semibold">Purpose</th>
                  <th className="px-5 py-4 font-semibold">Date &amp; Time</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentVisitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">
                        {visitor.name}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {visitor.id}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        {visitor.email}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {visitor.host}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {visitor.purpose}
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-gray-700">{visitor.date}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {visitor.time}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          visitor.status,
                        )}`}
                      >
                        {visitor.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        aria-label={`More actions for ${visitor.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-200 px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Showing 5 sample visitor records</p>
            <p>Visitor information shown here is demonstration data.</p>
          </div>
        </section>

        {/* Quick summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <CheckCircle2 className="text-emerald-600" size={22} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Check-in Tracking
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Monitor visitors on site
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <Clock className="text-amber-600" size={22} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Request Reviews
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Review pending visits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <XCircle className="text-rose-600" size={22} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Access Decisions
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Track rejected requests
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminNavbar>
  )
}

export default Dashboard
