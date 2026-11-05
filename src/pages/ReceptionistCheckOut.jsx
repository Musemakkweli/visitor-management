
import { useEffect, useState } from "react";
import ReceptionistNavbar from "../components/ReceptionistNavbar";
import { receptionistApi } from "../api/api";

export default function ReceptionistCheckOut() {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Load visitors currently inside.
  const loadVisitors = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await receptionistApi.getVisitorsInside();
      setVisitors(data);
    } catch (err) {
      setError(err.message || "Unable to load visitors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  // Search visitors currently inside.
  const filteredVisitors = visitors.filter((visitor) =>
    `${visitor.visitor_name} ${visitor.email} ${visitor.phone || ""} ${visitor.destination}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Check out visitor.
  const handleCheckOut = async (visitId) => {
    const confirmed = window.confirm(
      "Are you sure you want to check out this visitor?"
    );

    if (!confirmed) return;

    setCheckoutLoading(visitId);
    setSuccess("");
    setError("");

    try {
      await receptionistApi.checkOutVisitor(visitId);

      setSuccess("Visitor checked out successfully.");

      await loadVisitors();
    } catch (err) {
      setError(err.message || "Unable to check out visitor.");
    } finally {
      setCheckoutLoading(null);
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
              Visitor Check-out
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View visitors currently inside and record their departure.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Visitor Search */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Visitors Currently Inside
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search for a visitor to record their check-out.
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {visitors.length} Inside
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search visitor by name, email or destination..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={loadVisitors}
                disabled={loading}
                className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>

            {/* Visitor Results */}
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Current Visits ({filteredVisitors.length})
              </h3>

              {loading ? (
                <p className="py-6 text-center text-sm text-slate-500">
                  Loading visitors...
                </p>
              ) : filteredVisitors.length === 0 ? (
                <p className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No visitors currently inside.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[750px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Visitor</th>
                        <th className="px-4 py-3 font-medium">Phone</th>
                        <th className="px-4 py-3 font-medium">Destination</th>
                        <th className="px-4 py-3 font-medium">Check-in Time</th>
                        <th className="px-4 py-3 text-right font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredVisitors.map((visitor) => (
                        <tr
                          key={visitor.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-medium text-slate-700">
                            #{visitor.id}
                          </td>

                          <td className="px-4 py-3">
                            <p className="font-medium text-slate-800">
                              {visitor.visitor_name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {visitor.email}
                            </p>
                          </td>

                          <td className="px-4 py-3 text-slate-600">
                            {visitor.phone || "—"}
                          </td>

                          <td className="px-4 py-3 text-slate-600">
                            {visitor.destination}
                          </td>

                          <td className="px-4 py-3 text-slate-600">
                            {new Date(
                              visitor.check_in_time
                            ).toLocaleString()}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleCheckOut(visitor.id)}
                              disabled={checkoutLoading !== null}
                              className="rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {checkoutLoading === visitor.id
                                ? "Checking out..."
                                : "Check Out"}
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

          {/* Information */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Note:</span> Checking out a
              visitor records their departure time and removes them from the
              list of visitors currently inside.
            </p>
          </div>

        </div>
      </div>
    </ReceptionistNavbar>
  );
}
