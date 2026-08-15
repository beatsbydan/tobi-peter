import { apiClient, refreshAccessToken as refreshAccessTokenRequest } from './client'

export async function register({ email, password }) {
  const { data } = await apiClient.post('/admin/register', { email, password })
  return data
}

export async function login({ email, password }) {
  const { data } = await apiClient.post(
    '/admin/login',
    { email, password },
    { withCredentials: true },
  )
  return data
}

export async function forgotPassword({ email }) {
  const { data } = await apiClient.post('/admin/forgot-pass', { email })
  return data
}

export async function changePassword({ password }) {
  const { data } = await apiClient.put('/admin/change-pass', { password })
  return data
}

export async function logout() {
  const { data, status } = await apiClient.get('/admin/logout', { withCredentials: true })
  return { data, status }
}

export function refreshAccessToken() {
  return refreshAccessTokenRequest()
}

export async function getSubscribers() {
  const { data } = await apiClient.get('/subscribe/')
  return data.allSubscribers
}
