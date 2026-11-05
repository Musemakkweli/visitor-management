
import { useState } from "react";
import ReceptionistNavbar from "../components/ReceptionistNavbar";
import { receptionistApi } from "../api/api";

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  organization: "",
  address: "",
  password: "",
};

export default function ReceptionistRegisterVisitor() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await receptionistApi.registerVisitor(form);

      setMessage("Visitor registered successfully!");
      setForm({ ...initialForm });
    } catch (err) {
      setError(err.message || "Unable to register visitor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReceptionistNavbar>
      <div className="min-h-screen bg-slate-100 p-5 md:p-8">
        <div className="mx-auto max-w-4xl">

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Register Visitor
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a visitor account and record their information.
            </p>
          </div>

          {/* Registration Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Success Message */}
            {message && (
              <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    autoComplete="name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Organization
                  </label>

                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Company or organization"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    autoComplete="street-address"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter address"
                  />
                </div>

                {/* Temporary Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Temporary Password *
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="At least 8 characters"
                  />
                </div>

              </div>

              {/* Form Actions */}
              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Registering..." : "Register Visitor"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </ReceptionistNavbar>
  );
}
