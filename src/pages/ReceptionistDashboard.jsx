
import React, { useEffect, useState } from 'react';
import {
  ClipboardList,
  UserPlus,
  LogIn,
  LogOut,
  History,
  Users,
  UserCheck,
  CalendarDays,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

import ReceptionistNavbar from '../components/ReceptionistNavbar';
import { receptionistApi } from '../api/api';

const ReceptionistDashboard = () => {
  const [stats, setStats] = useState({
    registeredVisitors: 0,
    visitorsInside: 0,
    todayVisits: 0,
    totalVisits: 0,
  });

  const [recentVisits, setRecentVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      const [visitors, insideVisitors, history] = await Promise.all([
        receptionistApi.getVisitors(),
        receptionistApi.getVisitorsInside(),
        receptionistApi.getVisitHistory(),
      ]);

      const today = new Date().toLocaleDateString();

      const todayVisits = history.filter((visit) => {
        return new Date(visit.check_in_time).toLocaleDateString() === today;
      });

      setStats({
        registeredVisitors: visitors.length,
        visitorsInside: insideVisitors.length,
        todayVisits: todayVisits.length,
        totalVisits: history.length,
      });

      setRecentVisits(history.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Unable to load dashboard information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const quickActions = [
    {
      title: 'Review Visit Requests',
      description: 'View pending appointments and approve or reject requests.',
      icon: ClipboardList,
      link: '/receptionist/requests',
    },
    {
      title: 'Register Visitor',
      description: 'Create a visitor account or register a walk-in visitor.',
      icon: UserPlus,
      link: '/receptionist/register',
    },
    {
      title: 'Visitor Check-in',
      description: 'Record visitors arriving at the premises.',
      icon: LogIn,
      link: '/receptionist/check-in',
    },
    {
      title: 'Visitor Check-out',
      description: 'Record visitors leaving the premises.',
      icon: LogOut,
      link: '/receptionist/check-out',
    },
  ];

  const summaryCards = [
    {
      title: 'Registered Visitors',
      description: 'Active registered visitors',
      value: stats.registeredVisitors,
      icon: Users,
    },
    {
      title: 'Visitors Inside',
      description: 'Currently on the premises',
      value: stats.visitorsInside,
      icon: UserCheck,
    },
    {
      title: "Today's Visits",
      description: 'Visitors checked in today',
      value: stats.todayVisits,
      icon: CalendarDays,
    },
    {
      title: 'Total Visits',
      description: 'All recorded visits',
      value: stats.totalVisits,
      icon: History,
    },
  ];

  const formatDate = (date) => {
    if (!date) return '—';

    return new Date(date).toLocaleString();
  };

  return (
    <ReceptionistNavbar>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              RECEPTION MANAGEMENT
            </p>

            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Receptionist Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage visitor appointments, registrations, check-ins and check-outs.
            </p>
          </div>

          <button
            onClick={loadDashboard}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <Icon size={22} className="text-blue-600" />
                  </div>

                  <span className="text-2xl font-bold text-slate-800">
                    {loading ? '...' : card.value}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-800">
                  {card.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose an operation to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.title}
                  href={action.link}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <Icon size={23} className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={19}
                    className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent Visit Activity */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Recent Visit Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                The latest visitors recorded at reception.
              </p>
            </div>

            <a
              href="/receptionist/history"
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all <ArrowRight size={16} />
            </a>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Loading recent visits...
            </p>
          ) : recentVisits.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No visit activity recorded yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                    <th className="px-3 py-3 font-semibold">Visitor</th>
                    <th className="px-3 py-3 font-semibold">Destination</th>
                    <th className="px-3 py-3 font-semibold">Check-in</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentVisits.map((visit) => (
                    <tr
                      key={visit.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-3 py-4">
                        <p className="font-semibold text-slate-800">
                          {visit.visitor_name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {visit.email}
                        </p>
                      </td>

                      <td className="px-3 py-4 text-slate-600">
                        {visit.destination}
                      </td>

                      <td className="px-3 py-4 text-slate-600">
                        {formatDate(visit.check_in_time)}
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            visit.status === 'inside'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {visit.status === 'inside' ? 'Inside' : 'Checked Out'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Daily Responsibilities */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Daily Responsibilities
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                1. Review appointments
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Check visitor requests and provide approval or rejection.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                2. Manage arrivals
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Register visitors and record their arrival.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                3. Manage departures
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Record visitor departures and maintain visit history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ReceptionistNavbar>
  );
};

export default ReceptionistDashboard;
