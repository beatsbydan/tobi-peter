import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import ShowsMap from '../ShowsMap'

const byCountry = [
  { country: 'Nigeria', count: 12 },
  { country: 'Ghana', count: 3 },
]

const byCity = [
  { city: 'Lagos', country: 'Nigeria', count: 9, lat: 6.5244, lng: 3.3792 },
  { city: 'Abuja', country: 'Nigeria', count: 3, lat: 9.0765, lng: 7.3986 },
  { city: 'Accra', country: 'Ghana', count: 3, lat: 5.6037, lng: -0.187 },
]

// None of these tests exercise the SVG country paths, only the accessible top-5 list buttons — stub
// the world-atlas fetch with an empty-but-valid topology so react-simple-maps doesn't log a
// (harmless, but noisy) fetch error for the relative `/world-110m.json` URL jsdom can't resolve.
const emptyTopology = {
  type: 'Topology',
  objects: { countries: { type: 'GeometryCollection', geometries: [] } },
  arcs: [],
}

beforeEach(() => {
  // `react-simple-maps`'s internal fetchGeographies checks `res.ok` before calling `res.json()` —
  // without it, the mock silently fell down its catch branch (logging "There was a problem when
  // fetching the data" and resolving to `undefined`) instead of actually returning `emptyTopology`.
  // Tests still passed either way (both paths end up with zero geographies), but only with `ok: true`
  // does this stub genuinely exercise the intended empty-topology response instead of an error path.
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(emptyTopology) }),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ShowsMap', () => {
  test('shows the top-5 countries and cities without any interaction', () => {
    render(<ShowsMap byCountry={byCountry} byCity={byCity} />)

    expect(screen.getByText('TOP COUNTRIES')).toBeInTheDocument()
    expect(screen.getByText('TOP CITIES')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /1\.\s*Nigeria/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /2\.\s*Ghana/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /1\.\s*Lagos/ })).toBeInTheDocument()
  })

  test('selecting a country from the top list shows the reset button and city breakdown', async () => {
    const user = userEvent.setup()
    render(<ShowsMap byCountry={byCountry} byCity={byCity} />)

    expect(screen.queryByRole('button', { name: /reset map/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /1\.\s*Nigeria/ }))

    expect(await screen.findByRole('button', { name: /reset map/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nigeria' })).toBeInTheDocument()
    expect(screen.getByText('Lagos')).toBeInTheDocument()
    expect(screen.getByText('Abuja')).toBeInTheDocument()
  })

  test('resetting clears the selection and city breakdown', async () => {
    const user = userEvent.setup()
    render(<ShowsMap byCountry={byCountry} byCity={byCity} />)

    await user.click(screen.getByRole('button', { name: /1\.\s*Nigeria/ }))
    await user.click(await screen.findByRole('button', { name: /reset map/i }))

    // AnimatePresence plays an exit transition before actually unmounting these — wait for that.
    await waitForElementToBeRemoved(() => screen.queryByRole('heading', { name: 'Nigeria' }))
    expect(screen.queryByRole('button', { name: /reset map/i })).not.toBeInTheDocument()
  })

  test('a country with zero shows cannot be selected', () => {
    render(<ShowsMap byCountry={byCountry} byCity={byCity} />)

    expect(screen.queryByRole('button', { name: /Kenya/ })).not.toBeInTheDocument()
  })
})
