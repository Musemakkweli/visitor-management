
import { useEffect, useState } from "react";
import ReceptionistNavbar from "../components/ReceptionistNavbar";
import { receptionistApi } from "../api/api";

const initialForm = {
  visitor_id: "",
  appointment_id: "",
  destination: "",
  purpose: "",
};

export default function ReceptionistCheckIn() {
  const [form, setForm] = useState(initialForm);

  const [search, setSearch] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");

  // Load registered visitors when the page opens.
  useEffect(() => {
    const loadVisitors = async () => {
      setSearchLoading(true);

      try {
        const data = await receptionistApi.getVisitors();
        setVisitors(data);
      } catch (err) {
        setSearchError(err.message);
      } finally {
        setSearchLoading(false);
      }
    };

    loadVisitors();
  }, []);

  // Search visitors.
  const handleSearch = async (e) => {
    e.preventDefault();

    setSearchLoading(true);
    setSearchError("");

    try {
      const data = await receptionistApi.getVisitors(search);
      setVisitors(data);
      setSelectedVisitor(null);
      setForm((previous) => ({
        ...previous,
        visitor_id: "",
      }));
    } catch (err) {
      setSearchError(err.message || "Unable to search visitors.");
    } finally {
      setSearchLoading(false);
    }
  };

  // Select a visitor.
  const handleSelectVisitor = (visitor) => {
    setSelectedVisitor(visitor);

    setForm((previous) => ({
      ...previous,
      visitor_id: visitor.id,
    }));

    setSuccess(null);
    setError("");
  };

  // Handle form changes.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Check in visitor.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(null);
    setError("");

    try {
      const visitData = {
        visitor_id: Number(form.visitor_id),
        appointment_id: form.appointment_id
          ? Number(form.appointment_id)
          : null,
        destination: form.destination.trim(),
        purpose: form.purpose.trim(),
      };

      const result = await receptionistApi.checkInVisitor(visitData);

      setSuccess(result);
      setForm({ ...initialForm });
      setSelectedVisitor(null);
    } catch (err) {
      setError(err.message || "Unable to check in visitor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReceptionistNavbar>
      <div className="min-h-screen bg-slate-100 p-5 md:p-8">
        <div className="mx-auto max-w-5xl">

          {/* Page Header */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-blue-700">
              RECEPTIONIST / VISIT MANAGEMENT
            </p>

            <h1 className="text-2xl font-bold text-slate-800">
              Visitor Check-in
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Find a registered visitor and record their arrival.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5">
              <h2 className="font-semibold text-green-800">
                Visitor checked in successfully!
              </h2>

              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-green-800 sm:grid-cols-2">
                <p>Visit ID: {success.id}</p>
                <p>Visitor ID: {success.visitor_id}</p>
                <p>Destination: {success.destination}</p>
                <p>Status: {success.status}</p>
              </div>
            </div>
          )}

          {/* General Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Visitor Search */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Find Visitor
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search using the visitor's name, email or phone number.
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search visitor..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="submit"
                disabled={searchLoading}
                className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {searchLoading ? "Searching..." : "Search"}
              </button>
            </form>

            {searchError && (
              <p className="mt-3 text-sm text-red-600">
                {searchError}
              </p>
            )}

            {/* Visitor Results */}
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Registered Visitors ({visitors.length})
              </h3>

              {searchLoading ? (
                <p className="py-5 text-center text-sm text-slate-500">
                  Loading visitors...
                </p>
              ) : visitors.length === 0 ? (
                <p className="rounded-lg bg-slate-50 p-5 text-center text-sm text-slate-500">
                  No visitors found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Visitor</th>
                        <th className="px-4 py-3 font-medium">Phone</th>
                        <th className="px-4 py-3 font-medium">Organization</th>
                        <th className="px-4 py-3 text-right font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {visitors.map((visitor) => (
                        <tr
                          key={visitor.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-medium text-slate-700">
                            #{visitor.id}
                          </td>

                          <td className="px-4 py-3">
                            <p className="font-medium text-slate-800">
                              {visitor.full_name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {visitor.email}
                            </p>
                          </td>

                          <td className="px-4 py-3 text-slate-600">
                            {visitor.phone || "—"}
                          </td>

                          <td className="px-4 py-3 text-slate-600">
                            {visitor.organization || "—"}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleSelectVisitor(visitor)}
                              className="rounded-md bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Selected Visitor */}
          {selectedVisitor && (
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                Selected Visitor
              </p>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {selectedVisitor.full_name}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {selectedVisitor.email}
                  </p>

                  <p className="text-sm text-slate-600">
                    {selectedVisitor.phone || "No phone number"}
                  </p>
                </div>

                <div className="rounded-lg bg-white px-4 py-3">
                  <p className="text-xs text-slate-500">Visitor ID</p>
                  <p className="text-lg font-bold text-blue-700">
                    #{selectedVisitor.id}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Check-in Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Visit Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete the details before confirming check-in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Visitor ID */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Visitor ID
                  </label>

                  <input
                    type="text"
                    value={
                      selectedVisitor
                        ? `#${selectedVisitor.id}`
                        : ""
                    }
                    readOnly
                    placeholder="Select a visitor above"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600 outline-none"
                  />
                </div>

                {/* Appointment ID */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Appointment ID
                  </label>

                  <input
                    type="number"
                    name="appointment_id"
                    value={form.appointment_id}
                    onChange={handleChange}
                    min="1"
                    placeholder="Optional for walk-in visitors"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Destination *
                  </label>

                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={150}
                    placeholder="Office or department"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Purpose of Visit *
                  </label>

                  <input
                    type="text"
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                    minLength={5}
                    placeholder="Reason for the visit"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={loading || !selectedVisitor}
                  className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Checking in..." : "Confirm Check-in"}
                </button>
              </div>

              {!selectedVisitor && (
                <p className="text-right text-xs text-slate-400">
                  Select a visitor before checking them in.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </ReceptionistNavbar>
  );
}
