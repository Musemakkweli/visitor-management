
import { apiRequest } from './api'

// Register a new visitor or employee
export function signupUser(signupData) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(signupData),
  })
}

// Login using email or employee number
export function loginUser(loginData) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
  })
}
