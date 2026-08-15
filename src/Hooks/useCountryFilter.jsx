import { useMemo, useState } from 'react'

export const ALL_COUNTRIES = 'All Countries'
export const MISSING_COUNTRY = 'Missing Country'

// Client-side only — filters an already-fetched shows list by country, with a sentinel option for
// shows that have no country set at all (a data-quality gap worth surfacing, not just filtering).
export function useCountryFilter(shows) {
  const [country, setCountry] = useState(ALL_COUNTRIES)

  const countries = useMemo(
    () => [...new Set(shows.map((show) => show.country).filter(Boolean))].sort(),
    [shows],
  )

  const missingCount = useMemo(() => shows.filter((show) => !show.country).length, [shows])

  const filteredShows = useMemo(() => {
    if (country === ALL_COUNTRIES) return shows
    if (country === MISSING_COUNTRY) return shows.filter((show) => !show.country)
    return shows.filter((show) => show.country === country)
  }, [shows, country])

  return { country, setCountry, countries, missingCount, filteredShows }
}
