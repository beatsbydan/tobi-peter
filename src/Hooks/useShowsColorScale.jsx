import { scaleLinear } from 'd3-scale'
import { useMemo } from 'react'

export function useShowsColorScale(byCountry) {
  return useMemo(() => {
    const counts = byCountry.map((d) => d.count)
    const max = Math.max(...counts, 1)

    // Single-hue sequential ramp anchored to the site's ink color (--color-ink, #1d3557) rather
    // than an arbitrary palette — light end (#a4b1c9) is validated via the dataviz skill's ordinal
    // ramp checks (monotone lightness, >=0.06 adjacent-step gaps, >=2:1 contrast against the cream
    // page surface) so low-count countries still read against the background.
    const colorScale = scaleLinear().domain([0, max]).range(['#a4b1c9', '#1d3557'])

    const countMap = Object.fromEntries(byCountry.map((d) => [d.country, d.count]))

    const getColor = (countryName) => {
      const count = countMap[countryName] ?? 0
      return count === 0 ? 'var(--color-hairline)' : colorScale(count)
    }

    return { getColor, countMap }
  }, [byCountry])
}
