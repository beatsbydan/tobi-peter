import { apiClient } from './client'

export async function sendSubscription({ email }) {
  const { data } = await apiClient.post('/subscribe/create', { email })
  return data
}
