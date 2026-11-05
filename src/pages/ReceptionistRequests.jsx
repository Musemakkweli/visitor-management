
import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  X,
} from 'lucide-react';

import ReceptionistNavbar from '../components/ReceptionistNavbar';
import { receptionistApi } from '../api/api';

const ReceptionistRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewStatus, setReviewStatus] = useState('approved');
  const [responseMessage, setResponseMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await receptionistApi.getAllAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Unable to load appointment requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.visitor_name?.toLowerCase().includes(search.toLowerCase()) ||
        appointment.request_number?.toLowerCase().includes(search.toLowerCase()) ||
        appointment.visitor_email?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const counts = {
    all: appointments.length,
    pending: appointments.filter((item) => item.status === 'pending').length,
    approved: appointments.filter((item) => item.status === 'approved').length,
    rejected: appointments.filter((item) => item.status === 'rejected').length,
  };

  const openReview = (appointment, status) => {
    setSelectedAppointment(appointment);
    setReviewStatus(status);
    setResponseMessage('');
  };

  const submitReview = async (event) => {
    event.preventDefault();

    if (!selectedAppointment) return;

    try {
      setSubmitting(true);
      setError('');

      await receptionistApi.reviewAppointment(
        selectedAppointment.id,
        {
          status: reviewStatus,
          response_message: responseMessage.trim() || null,
        }
      );

      setSelectedAppointment(null);
      setResponseMessage('');

      await loadAppointments();
    } catch (err) {
      setError(err.message || 'Unable to review this appointment.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';

    return new Date(`${date}T00:00:00`).toLocaleDateString();
  };

  const formatTime = (time) => {
    if (!time) return '—';

    return time.slice(0, 5);
  };

  const statusStyle = (status) => {
    if (status === 'approved') return 'bg-green-50 text-green-700';
    if (status === 'rejected') return 'bg-red-50 text-red-700';

    return 'bg-amber-50 text-amber-700';
  };

  const summaryCards = [
    {
      title: 'All Requests',
      value: counts.all,
      icon: ClipboardList,
      color: 'text-blue-600',
      background: 'bg-blue-50',
    },
    {
      title: 'Pending',
      value: counts.pending,
      icon: Clock,
      color: 'text-amber-600',
      background: 'bg-amber-50',
    },
    {
      title: 'Approved',
      value: counts.approved,
      icon: CheckCircle,
      color: 'text-green-600',
      background: 'bg-green-50',
    },
    {
      title: 'Rejected',
      value: counts.rejected,
      icon: XCircle,
      color: 'text-red-600',
      background: 'bg-red-50',
    },
  ];

  return (
    <ReceptionistNavbar>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">

          {/* Page Header */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                RECEPTION MANAGEMENT
              </p>

              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Visit Requests
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Review and manage visitor appointment requests.
              </p>
            </div>

            <button
              onClick={loadAppointments}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-50"
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
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`rounded-lg p-3 ${card.background}`}>
                      <Icon size={22} className={card.color} />
                    </div>

                    <span className="text-2xl font-bold text-slate-800">
                      {loading ? '...' : card.value}
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-800">
                    {card.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Requests Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Search and Filter */}
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-bold text-slate-800">
                  Appointment Requests
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  View visitor details and review their requests.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search visitor or request..."
                    className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Visitor</th>
                    <th className="px-5 py-4 font-semibold">Request No.</th>
                    <th className="px-5 py-4 font-semibold">Destination</th>
                    <th className="px-5 py-4 font-semibold">Visit Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">
                        Loading appointment requests...
                      </td>
                    </tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">
                        No appointment requests found.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800">
                            {appointment.visitor_name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {appointment.visitor_email}
                          </p>
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-600">
                          {appointment.request_number}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {appointment.destination}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          <p>{formatDate(appointment.visit_date)}</p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatTime(appointment.visit_time)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyle(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openReview(appointment, appointment.status)}
                              title="View details"
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                            >
                              <Eye size={16} />
                            </button>

                            {appointment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => openReview(appointment, 'approved')}
                                  className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() => openReview(appointment, 'rejected')}
                                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
              Showing {filteredAppointments.length} of {appointments.length} requests
            </div>
          </div>
        </div>

        {/* Review / Details Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-xl">

              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Appointment Details
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Request: {selectedAppointment.request_number}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Visitor Name</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedAppointment.visitor_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedAppointment.visitor_email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedAppointment.visitor_phone || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Destination</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedAppointment.destination}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Visit Date</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {formatDate(selectedAppointment.visit_date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Visit Time</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {formatTime(selectedAppointment.visit_time)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Purpose of Visit</p>
                  <p className="mt-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                    {selectedAppointment.purpose}
                  </p>
                </div>

                {selectedAppointment.status !== 'pending' ? (
                  <div>
                    <p className="text-xs text-slate-500">Current Status</p>
                    <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyle(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>

                    {selectedAppointment.response_message && (
                      <div className="mt-3">
                        <p className="text-xs text-slate-500">Receptionist Response</p>
                        <p className="mt-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                          {selectedAppointment.response_message}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={submitReview} className="space-y-4 border-t border-slate-200 pt-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Decision
                      </label>

                      <select
                        value={reviewStatus}
                        onChange={(e) => setReviewStatus(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      >
                        <option value="approved">Approve Request</option>
                        <option value="rejected">Reject Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Response Message
                      </label>

                      <textarea
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        rows="3"
                        placeholder="Write a message for the visitor..."
                        className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedAppointment(null)}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ReceptionistNavbar>
  );
};

export default ReceptionistRequests;
