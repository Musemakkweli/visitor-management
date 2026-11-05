
//const API_BASE_URL = "http://127.0.0.1:8000";
const API_BASE_URL = "https://visitor-management-backend-67a7.onrender.com";
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = Array.isArray(data?.detail)
      ? data.detail.map((item) => item.msg).join(", ")
      : data?.detail || "Something went wrong.";

    throw new Error(message);
  }

  return data;
}

// =====================================================
// RECEPTIONIST API
// =====================================================

export const receptionistApi = {
  // Register a new visitor
  registerVisitor: (visitorData) =>
    apiRequest("/receptionist/register-visitor", {
      method: "POST",
      body: JSON.stringify(visitorData),
    }),

  // Search and retrieve registered visitors
  getVisitors: (search = "") =>
    apiRequest(
      `/receptionist/visitors?search=${encodeURIComponent(search)}`
    ),

  // Check in a visitor
  checkInVisitor: (visitData) =>
    apiRequest("/visits/check-in", {
      method: "POST",
      body: JSON.stringify(visitData),
    }),
    // Check those inside  visitor
    getVisitorsInside: () =>
  apiRequest("/visits/inside"),
    // Check out a visitor
    checkOutVisitor: (visitId) =>
  apiRequest(`/visits/${visitId}/check-out`, {
    method: "PATCH",
  }),
  // Get visit history
  getVisitHistory: () =>
  apiRequest("/visits/history"),
  // Get all appointments
  getAllAppointments: () =>
  apiRequest("/appointments/all"),
  // Review an appointment
  reviewAppointment: (appointmentId, reviewData) =>
  apiRequest(`/appointments/${appointmentId}/review`, {
    method: "PATCH",
    body: JSON.stringify(reviewData),
  }),
};
