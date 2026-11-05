
import { apiRequest } from './api'

// Get all registered users
export function getAllUsers() {
  return apiRequest('/users')
}

// Promote a receptionist to administrator
export function promoteUserToAdmin(userId) {
  return apiRequest(`/users/${userId}/promote-to-admin`, {
    method: 'PATCH',
  })
}

// Demote an administrator to receptionist
export function demoteAdminToReceptionist(userId) {
  return apiRequest(`/users/${userId}/demote-to-receptionist`, {
    method: 'PATCH',
  })
}

// Delete a user
export function deleteUser(userId) {
  return apiRequest(`/users/${userId}`, {
    method: 'DELETE',
  })
}
