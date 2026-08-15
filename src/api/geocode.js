// OpenCage is a third-party geocoding API, not our backend — deliberately not routed through
// the shared apiClient (no baseURL/auth-header interceptor apply here).
export async function geocodeCity(city, country) {
  const key = import.meta.env.VITE_OPENCAGE_KEY
  const query = encodeURIComponent(`${city}, ${country}`)
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${key}&limit=1`,
  )
  const data = await response.json()
  const result = data.results?.[0]
  if (!result) throw new Error(`Could not geocode "${city}, ${country}"`)
  return { lat: result.geometry.lat, lng: result.geometry.lng }
}
