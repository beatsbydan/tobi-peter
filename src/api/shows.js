import { apiClient } from './client'
import { geocodeCity } from './geocode'

export async function getShows() {
  const { data } = await apiClient.get('/show/')
  return { upcomingShows: data.pendingShows, pastShows: data.completedShows }
}

export async function getShow(id) {
  const { data } = await apiClient.get(`/show/${id}`)
  return data.show
}

export async function getShowStats() {
  const { data } = await apiClient.get('/show/stats')
  return { byCountry: data.byCountry, byCity: data.byCity }
}

async function buildShowPayload(show) {
  const { lat, lng } = await geocodeCity(show.city, show.country)
  return {
    title: show.title,
    venue: show.venue,
    date: show.date,
    ticketLink: show.ticketLink,
    country: show.country,
    city: show.city,
    longitude: lng,
    latitude: lat,
  }
}

export async function createShow(show) {
  const payload = await buildShowPayload(show)
  const { data } = await apiClient.post('/show/create', payload)
  return data
}

export async function updateShow(id, show) {
  const payload = await buildShowPayload(show)
  const { data } = await apiClient.patch(`/show/update/${id}`, payload)
  return data
}

export async function deleteShow(id) {
  const { data } = await apiClient.delete(`/show/delete/${id}`)
  return data
}

export async function completeShow(id) {
  const { data } = await apiClient.get(`/show/complete/${id}`)
  return data
}
