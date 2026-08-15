import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { useShowsColorScale } from '../../../Hooks/useShowsColorScale'
import useIsMobile from '../../../Hooks/useIsMobile'
import { duration, easing, usePrefersReducedMotion } from '../../../lib/motion'

const GEO_URL = '/world-110m.json'

export default function ShowsMap({ byCountry, byCity }) {
  const { getColor, countMap } = useShowsColorScale(byCountry)
  const [zoomState, setZoomState] = useState({ center: [0, 0], zoom: 1 })
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [hoverPos, setHoverPos] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile(700)
  // The cities-in-country panel is a `fixed`-positioned box offset from the cursor, not a child of
  // the hovered country shape — moving the mouse from the shape to the panel crosses a gap where
  // neither element is "hovered", so a bare onMouseLeave on the shape would hide the panel before
  // the cursor arrives. Delay the clear, and cancel it if the shape or the panel is re-entered
  // within the window (standard hover-intent bridge for a detached flyout).
  const clearHoverTimeoutRef = useRef(null)
  const isPanelHoveredRef = useRef(false)
  const containerRef = useRef(null)

  const cancelClearHover = useCallback(() => {
    if (clearHoverTimeoutRef.current) {
      clearTimeout(clearHoverTimeoutRef.current)
      clearHoverTimeoutRef.current = null
    }
  }, [])

  const clearHoverSoon = useCallback(() => {
    cancelClearHover()
    clearHoverTimeoutRef.current = setTimeout(() => {
      setHoveredCountry(null)
      setHoverPos(null)
    }, 150)
  }, [cancelClearHover])

  useEffect(() => cancelClearHover, [cancelClearHover])

  const PANEL_WIDTH = 220
  const PANEL_MAX_HEIGHT = 220

  const countriesWithShows = useMemo(
    () => [...byCountry].sort((a, b) => b.count - a.count),
    [byCountry],
  )
  const topCountries = countriesWithShows.slice(0, 5)
  const topCities = useMemo(
    () => [...byCity].sort((a, b) => b.count - a.count).slice(0, 5),
    [byCity],
  )

  // The panel shows whichever country is hovered, falling back to the clicked/selected one when
  // nothing is currently hovered. The fallback matters for accessibility: the only keyboard/screen
  // reader-operable way to pick a country is the button lists below (mouse hover has no keyboard
  // equivalent) — without it, activating a country from those lists would zoom the map in but never
  // show its city breakdown for anyone not using a mouse.
  const panelCountry = hoveredCountry ?? selectedCountry

  const citiesInPanel = useMemo(() => {
    if (!panelCountry) return []
    return byCity.filter((c) => c.country === panelCountry).sort((a, b) => b.count - a.count)
  }, [panelCountry, byCity])

  function selectCountry(name) {
    const cities = byCity.filter((c) => c.country === name)
    if (cities.length) {
      const avgLng = cities.reduce((s, c) => s + c.lng, 0) / cities.length
      const avgLat = cities.reduce((s, c) => s + c.lat, 0) / cities.length
      setZoomState({ center: [avgLng, avgLat], zoom: 4 })
    }
    setSelectedCountry(name)
  }

  const handleReset = useCallback(() => {
    setZoomState({ center: [0, 0], zoom: 1 })
    setSelectedCountry(null)
    // Touch has no real hover: tapping a country fires a synthesized mouseenter (setting
    // `hoveredCountry`) but never a matching mouseleave, since there's no pointer to move away —
    // it stays stuck forever otherwise. `panelCountry` falls back to `hoveredCountry` when set, so
    // without this the panel would survive Reset entirely on mobile.
    cancelClearHover()
    setHoveredCountry(null)
    setHoverPos(null)
  }, [cancelClearHover])

  // Clicking a country on the map: switches to it if it has shows, otherwise (a "dead" country with
  // no data) dismisses whatever's currently shown instead of silently doing nothing — without this,
  // tapping a zero-show country next to the selected one looked exactly like the stuck-panel bug.
  function handleCountryClick(geo) {
    const name = geo.properties.name
    if ((countMap[name] ?? 0) === 0) {
      if (selectedCountry || hoveredCountry) handleReset()
      return
    }
    selectCountry(name)
  }

  // Tapping blank ocean (the SVG background, not a country `<path>` or a city `<circle>` marker) is
  // the natural mobile "close this" gesture once a country's picked — clicks on a Geography/Marker
  // bubble up here too (React's synthetic onClick doesn't stop propagation), so only reset when the
  // click didn't land on either.
  function handleMapBackgroundClick(evt) {
    const tag = evt.target.tagName.toLowerCase()
    if (tag !== 'path' && tag !== 'circle' && (selectedCountry || hoveredCountry)) {
      handleReset()
    }
  }

  // Tapping/clicking anywhere outside the whole component (not just outside the map itself) also
  // dismisses — standard "click away" behavior for a flyout, and the only way to get rid of it on
  // mobile if the user doesn't spot the small reset pill. Registered once; reads current
  // selection/hover state via a ref (kept in sync below) rather than effect deps, since re-adding a
  // global listener on every hover change would be wasteful.
  const hasActiveSelectionRef = useRef(false)
  hasActiveSelectionRef.current = Boolean(selectedCountry || hoveredCountry)

  useEffect(() => {
    const handleOutsideClick = (evt) => {
      if (hasActiveSelectionRef.current && !containerRef.current?.contains(evt.target)) {
        handleReset()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [handleReset])

  const handleMouseMove = (evt) => {
    // Frozen while the cursor is over the panel itself — otherwise reading/scrolling the city list
    // keeps recomputing its own anchor position (`hoverPos`) and it visibly jitters under the cursor.
    if (hoveredCountry && !isPanelHoveredRef.current) {
      setHoverPos({ x: evt.clientX, y: evt.clientY })
    }
  }

  // Clamped to the viewport so the panel never runs off-screen near the map's edges — only relevant
  // for the mouse-hover case (`hoverPos` set); the keyboard/list-activation fallback (`selectedCountry`
  // with no active hover) instead anchors to the map's own bottom-right corner, see the panel's
  // className below.
  const panelPosition = hoverPos
    ? {
        left: Math.min(hoverPos.x + 16, window.innerWidth - PANEL_WIDTH - 12),
        top: Math.min(hoverPos.y + 16, window.innerHeight - PANEL_MAX_HEIGHT - 12),
      }
    : null

  const liveAnnouncement = selectedCountry
    ? `${selectedCountry}: ${countMap[selectedCountry] ?? 0} shows`
    : ''

  const mapTransition = prefersReducedMotion
    ? { duration: duration.fast }
    : { duration: duration.slow, ease: easing.standard }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove}>
      {/* Screen-reader-only live region — announces the selection a mouse/keyboard user just made,
          since the SVG choropleth itself has no accessible text content per country. */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* Everything absolutely positioned relative to the map itself (reset button, panel) lives in
          this wrapper, separate from the always-visible top lists / accessible fallback below — a
          shared positioning context with those would anchor the bottom-right panel to the bottom of
          the whole component instead of the map, landing it on top of unrelated content below. */}
      <div className="relative">
        <AnimatePresence>
          {selectedCountry && (
            <motion.button
              type="button"
              onClick={handleReset}
              aria-label="Reset map to show all countries"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: duration.fast }}
              className="absolute top-2 left-2 z-10 cursor-pointer rounded-full bg-ink px-3 py-1.5 text-xs text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              ← All countries
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={mapTransition}
          onClick={handleMapBackgroundClick}
        >
          {/* Default ComposableMap height (600) leaves ~100 viewBox units of blank ocean above and
              below the actual world landmasses (which only span roughly y=104..498 at scale 150) —
              a shorter height re-centers the projection's translate ([width/2, height/2], computed
              internally by react-simple-maps) so the SVG box hugs the content instead of padding it.
              On mobile the container itself now bleeds to the full viewport width (Epk.jsx's
              `max-[700px]:` bleed), which made the map noticeably *wider* but, since width/height set
              the SVG's own aspect ratio, left it just as short and letterboxed as before — a taller
              height plus a proportionally bigger scale (so the continents fill that extra height
              instead of just padding it with more ocean) is what actually makes it read as bigger. */}
          <ComposableMap
            width={800}
            height={isMobile ? 640 : 480}
            projectionConfig={{ scale: isMobile ? 190 : 150 }}
          >
            <ZoomableGroup
              center={zoomState.center}
              zoom={zoomState.zoom}
              onMoveEnd={({ coordinates, zoom }) => setZoomState({ center: coordinates, zoom })}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name
                    const isSelected = name === selectedCountry
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getColor(name)}
                        stroke="var(--color-cream)"
                        strokeWidth={0.5}
                        onClick={() => handleCountryClick(geo)}
                        onMouseEnter={(evt) => {
                          const count = countMap[name] ?? 0
                          if (count === 0) return
                          cancelClearHover()
                          setHoveredCountry(name)
                          setHoverPos({ x: evt.clientX, y: evt.clientY })
                        }}
                        onMouseLeave={clearHoverSoon}
                        style={{
                          default: {
                            outline: 'none',
                            stroke: isSelected ? 'var(--color-ink)' : 'var(--color-cream)',
                            strokeWidth: isSelected ? 1.5 : 0.5,
                            transition: 'fill 0.3s ease, opacity 0.3s ease',
                          },
                          hover: {
                            outline: 'none',
                            cursor: (countMap[name] ?? 0) > 0 ? 'pointer' : 'default',
                            opacity: 0.85,
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    )
                  })
                }
              </Geographies>

              {zoomState.zoom > 1 &&
                byCity.map(({ city, count, lat, lng }) => (
                  <Marker key={city} coordinates={[lng, lat]}>
                    <circle
                      r={Math.max(2, Math.min(8, count / 15)) / Math.sqrt(zoomState.zoom)}
                      fill="var(--color-ink)"
                      stroke="var(--color-cream)"
                      strokeWidth={0.5}
                    />
                  </Marker>
                ))}
            </ZoomableGroup>
          </ComposableMap>
        </motion.div>

        <AnimatePresence>
          {panelCountry && citiesInPanel.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: duration.base, ease: easing.standard }}
              // Mouse hover positions the panel next to wherever the cursor is on the map (clamped to
              // the viewport in `panelPosition`, computed above); the keyboard/list-activation fallback
              // (`selectedCountry` set with no active hover — see `panelCountry`'s definition) has no
              // cursor position to anchor to, so it falls back to the map's own bottom-right corner.
              className={
                hoverPos
                  ? 'fixed z-20 max-h-55 min-w-40 max-w-55 overflow-y-auto rounded-[9px] border border-hairline bg-cream p-3 shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
                  : 'absolute right-3 bottom-3 max-h-55 min-w-40 max-w-55 overflow-y-auto rounded-[9px] border border-hairline bg-cream p-3 shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
              }
              style={panelPosition ?? undefined}
              onMouseEnter={() => {
                isPanelHoveredRef.current = true
                cancelClearHover()
              }}
              onMouseLeave={() => {
                isPanelHoveredRef.current = false
                clearHoverSoon()
              }}
            >
              <h4 className="m-0 mb-2 text-[13px] text-ink">{panelCountry}</h4>
              <ul className="m-0 list-none p-0">
                {citiesInPanel.map((c) => (
                  <li
                    key={c.city}
                    className="flex justify-between gap-3 py-0.75 text-xs text-muted"
                  >
                    <span>{c.city}</span>
                    <span>{c.count} shows</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Always-visible top-5 ranked lists. Rows are buttons that reuse the same selectCountry(...)
          zoom/select flow as clicking a country shape on the map itself (city rows zoom to that
          city's country). This is also now the only keyboard/screen-reader-operable way to pick a
          country — the SVG choropleth shapes have no keyboard focus/activation of their own, and the
          "view all countries" `<details>` fallback that used to cover ranks beyond the top 5 was
          deliberately removed, so anything ranked 6th or lower is mouse/touch-only.
          Two levels of centering, both needed: `max-w-[620px] mx-auto` on the grid keeps the pair of
          columns centered as a unit instead of stretching to the map's full (now up to 1050px) width,
          and `max-w-[280px] mx-auto` on each column's own wrapper centers that column's heading+list
          *within* its grid track — without it, a grid column being wider than its 280px content just
          left-aligns that content inside the track, which reads as off-center (most visible on mobile,
          where the grid collapses to one column spanning the full width and the gap is largest). */}
      <div className="mx-auto mt-6 grid max-w-155 grid-cols-2 gap-8 max-[500px]:grid-cols-1">
        <div className="mx-auto w-full max-w-70">
          <h4 className="mb-2 text-sm font-semibold text-ink">TOP COUNTRIES</h4>
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {topCountries.map(({ country, count }, index) => (
              <li key={country}>
                <button
                  type="button"
                  onClick={() => selectCountry(country)}
                  className="flex w-full cursor-pointer justify-between gap-2 rounded px-1 py-1 text-left text-sm text-muted hover:bg-[rgba(217,217,217,0.36)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span>
                    {index + 1}. {country}
                  </span>
                  <span className="font-semibold text-ink">{count}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="mx-auto w-full max-w-70">
          <h4 className="mb-2 text-sm font-semibold text-ink">TOP CITIES</h4>
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {topCities.map(({ city, country, count }, index) => (
              <li key={city}>
                <button
                  type="button"
                  onClick={() => selectCountry(country)}
                  className="flex w-full cursor-pointer justify-between gap-2 rounded px-1 py-1 text-left text-sm text-muted hover:bg-[rgba(217,217,217,0.36)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span>
                    {index + 1}. {city}
                  </span>
                  <span className="font-semibold text-ink">{count}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
