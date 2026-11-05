
import { useEffect, useState } from "react";
import ReceptionistNavbar from "../components/ReceptionistNavbar";
import { receptionistApi } from "../api/api";

export default function ReceptionistVisitHistory() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load visit history.
  const loadHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await receptionistApi.getVisitHistory();
      setVisits(data);
    } catch (err) {
      setError(err.message || "Unable to load visit history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Filter visits by search and status.
  const filteredVisits = visits.filter((visit) => {
    const searchText = `
      ${visit.visitor_name}
      ${visit.email}
      ${visit.phone || ""}
      ${visit.destination}
      ${visit.purpose}
    `.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || visit.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <ReceptionistNavbar>
      <div className="min-h-screen bg-slate-100 p-5 md:p-8">
        <div className="mx-auto max-w-5xl">

          {/* Page Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-700">
                RECEPTIONIST / VISIT MANAGEMENT
              </p>

              <h1 className="text-2xl font-bold text-slate-800">
                Visit History
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and track all recorded visitor activities.
              </p>
            </div>

            <button
              type="button"
              onClick={loadHistory}
              disabled={loading}
              className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? "Loading..." : "Refresh History"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Statistics */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Visits</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">
                {visits.length}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Currently Inside</p>
              <h2 className="mt-2 text-2xl font-bold text-blue-700">
                {visits.filter((visit) => visit.status === "inside").length}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Checked Out</p>
              <h2 className="mt-2 text-2xl font-bold text-green-700">
                {visits.filter((visit) => visit.status === "checked_out").length}
              </h2>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Search Visit Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search using visitor name, email, destination or purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search visit records..."
                className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:col-span-2"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="all">All Visits</option>
                <option value="inside">Currently Inside</option>
                <option value="checked_out">Checked Out</option>
              </select>
            </div>
          </div>

          {/* Visit History Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Visit Records
              </h2>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {filteredVisits.length} Records
              </span>
            </div>

            {loading ? (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading visit history...
              </p>
            ) : filteredVisits.length === 0 ? (
              <p className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
                No visit records found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className="px-4 py-3 font-medium">Visitor</th>
                      <th className="px-4 py-3 font-medium">Destination</th>
                      <th className="px-4 py-3 font-medium">Purpose</th>
                      <th className="px-4 py-3 font-medium">Check-in</th>
                      <th className="px-4 py-3 font-medium">Check-out</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredVisits.map((visit) => (
                      <tr
                        key={visit.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-800">
                            {visit.visitor_name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {visit.email}
                          </p>
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {visit.destination}
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {visit.purpose}
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {new Date(visit.check_in_time).toLocaleString()}
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {visit.check_out_time
                            ? new Date(visit.check_out_time).toLocaleString()
                            : "Not checked out"}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              visit.status === "inside"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {visit.status === "inside"
                              ? "Inside"
                              : "Checked Out"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </ReceptionistNavbar>
  );
}
