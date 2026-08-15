import { apiClient } from './client'

export async function sendBookingRequest(booking) {
  const { data } = await apiClient.post('/admin/contact', booking)
  return data
}
