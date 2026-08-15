// One-off maintenance script: back-fills city/country on shows that are missing them,
// by geocoding each show's `venue` string via OpenCage. Not part of the app build —
// run directly with `node`, not through Vite (so it uses process.env, not import.meta.env).
//
// Usage:
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node src/Scripts/backfill-show-locations.js
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node src/Scripts/backfill-show-locations.js --apply
//
// Without --apply this only prints what it WOULD do (dry run). Pass --apply to actually
// PATCH the backend. Country names must match src/data/countryNames.json exactly (that's
// what ShowsMap keys off) — any show whose geocoded country doesn't match exactly is
// skipped and reported for manual review instead of writing a guessed/aliased name.

import 'dotenv/config'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const countryNames = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/countryNames.json'), 'utf-8'),
)
const countryNameSet = new Set(countryNames)

// Hand-verified corrections for venues that don't geocode well as-written — either the raw
// venue string is too sparse/typo'd, or (for "National Stadium, Lagos") the full string
// caused a bad match and only the trailing location text should be queried. Keyed by the
// exact `venue` string as stored on the show. See the dry-run manual-review output for how
// each of these was diagnosed before being added here.
const VENUE_QUERY_OVERRIDES = {
  'Voda Beach Club Lekki': 'Voda Beach Club, Lekki, Lagos',
  'Kyma Beach, Lekki': 'Kyma Beach, Lekki, Lagos',
  'Nexthought Creative Hub, Lekki': 'Nexthought Creative Hub, Lekki, Lagos',
  'Creed, Apapa Road, Portharcourt': 'Creed, Apapa Road, Port Harcourt',
  'National Stadium, Lagos': 'Lagos', // full string false-matched "New Laos National Stadium"
  'Jax District, Riyadh, Saudi Arabia': 'Riyadh, Saudi Arabia',
}

// Venues whose original full-string geocode was manually confirmed correct even though it
// didn't pass locationHintConfirmed (the match's formatted address just didn't happen to
// repeat the venue's trailing words verbatim, e.g. "Ibeju Lekki" for venue "Lekki, Lagos").
const VENUE_HINT_CHECK_EXCEPTIONS = new Set(['Ilorin, Kwara', 'Lekki, Lagos'])

const BASE_URL = process.env.VITE_BASE_URL
const OPENCAGE_KEY = process.env.VITE_OPENCAGE_KEY
const EMAIL = process.env.ADMIN_EMAIL
const PASSWORD = process.env.ADMIN_PASSWORD
const APPLY = process.argv.includes('--apply')

if (!BASE_URL || !OPENCAGE_KEY) {
  throw new Error('VITE_BASE_URL and VITE_OPENCAGE_KEY must be set (see .env).')
}
if (!EMAIL || !PASSWORD) {
  throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD env vars are required.')
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function login() {
  const { data } = await axios.post(`${BASE_URL}/admin/login`, {
    email: EMAIL,
    password: PASSWORD,
  })
  return data.token
}

async function geocodeVenue(venue) {
  const query = encodeURIComponent(venue)
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${OPENCAGE_KEY}&limit=1&language=en`,
  )
  const data = await response.json()
  const result = data.results?.[0]
  if (!result) return null

  const components = result.components ?? {}
  const city =
    components.city ??
    components.town ??
    // `suburb` (a well-known neighborhood, e.g. "Victoria Island") beats `village` here —
    // for venues that only match down to a hyper-local admin unit, OpenCage's `village`
    // is often a tiny/obscure name derived from the street ("Itirin" for "Itirin Court"),
    // while `suburb` is the recognizable area name. Prefer the more legible one.
    components.suburb ??
    components.village ??
    // OpenCage's own best-guess "display city" when the match only resolves to a broader
    // area (state/region) with no city/town/village/suburb component — e.g. many Lagos
    // venues resolve to `_type: "state"` with only `_normalized_city: "Victoria Island"` set.
    components._normalized_city ??
    components.county ??
    components.state_district ??
    null
  const country = components.country ?? null

  return {
    city,
    country,
    lat: result.geometry.lat,
    lng: result.geometry.lng,
    formatted: result.formatted,
  }
}

// Free-text geocoding of a generic venue name can silently match the wrong place entirely
// — e.g. "National Stadium, Lagos" matched a literal "New Laos National Stadium" in Laos
// (found during manual review of a dry run; "Lagos"/"Laos" are a one-letter apart). If the
// venue string names a location after the venue itself ("Venue, Area, City"), require that
// at least one of those location words shows up verbatim in the match's formatted address —
// cheap, general corroboration that the geocoder didn't wander off to an unrelated place.
function locationHintConfirmed(venue, formatted) {
  const segments = venue
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (segments.length < 2) return true // no separate location hint to corroborate against

  const hintWords = segments
    .slice(1)
    .join(' ')
    .match(/[\p{L}\p{N}]+/gu)
    ?.filter((w) => w.length >= 3)
  if (!hintWords || hintWords.length === 0) return true

  const formattedLower = formatted.toLowerCase()
  return hintWords.some((w) => new RegExp(`\\b${w.toLowerCase()}\\b`, 'u').test(formattedLower))
}

async function main() {
  const token = await login()
  const client = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  })

  const { data } = await client.get('/show/')
  const allShows = [...(data.pendingShows ?? []), ...(data.completedShows ?? [])]
  const missingShows = allShows.filter((show) => !show.city || !show.country)

  console.log(`${allShows.length} shows total, ${missingShows.length} missing city/country.`)
  console.log(APPLY ? 'Mode: APPLY (will write updates)' : 'Mode: DRY RUN (no writes)')
  console.log('')

  const updated = []
  const skippedNoVenue = []
  const skippedGeocodeFailed = []
  const skippedNoCountryMatch = []
  const skippedLocationMismatch = []

  for (const show of missingShows) {
    if (!show.venue) {
      skippedNoVenue.push(show)
      continue
    }

    const query = VENUE_QUERY_OVERRIDES[show.venue] ?? show.venue

    let geocoded
    try {
      geocoded = await geocodeVenue(query)
    } catch (err) {
      skippedGeocodeFailed.push({ show, reason: err.message })
      continue
    }
    await sleep(300) // OpenCage free-tier rate limit friendliness

    if (!geocoded || !geocoded.city || !geocoded.country) {
      skippedGeocodeFailed.push({ show, reason: 'no usable geocode result' })
      continue
    }

    if (!countryNameSet.has(geocoded.country)) {
      skippedNoCountryMatch.push({ show, geocoded })
      continue
    }

    if (
      !VENUE_HINT_CHECK_EXCEPTIONS.has(show.venue) &&
      !locationHintConfirmed(query, geocoded.formatted)
    ) {
      skippedLocationMismatch.push({ show, geocoded })
      continue
    }

    const payload = {
      title: show.title,
      venue: show.venue,
      date: show.date,
      ticketLink: show.ticketLink,
      country: geocoded.country,
      city: geocoded.city,
      longitude: geocoded.lng,
      latitude: geocoded.lat,
    }

    console.log(
      `${APPLY ? 'UPDATING' : 'WOULD UPDATE'} "${show.title}" (venue: "${show.venue}") -> city="${geocoded.city}", country="${geocoded.country}"`,
    )

    if (APPLY) {
      await client.patch(`/show/update/${show._id ?? show.id}`, payload)
    }
    updated.push({ show, geocoded })
  }

  console.log('')
  console.log('--- Summary ---')
  console.log(`${updated.length} ${APPLY ? 'updated' : 'would update'}`)
  console.log(`${skippedNoVenue.length} skipped (no venue set)`)
  console.log(`${skippedGeocodeFailed.length} skipped (geocode failed)`)
  console.log(`${skippedNoCountryMatch.length} skipped (country name didn't match countryNames.json — needs manual review)`)
  console.log(`${skippedLocationMismatch.length} skipped (geocode match didn't corroborate venue's location text — needs manual review)`)

  if (skippedNoCountryMatch.length > 0) {
    console.log('')
    console.log('Manual review needed (geocoded country not in countryNames.json):')
    for (const { show, geocoded } of skippedNoCountryMatch) {
      console.log(
        `  "${show.title}" (venue: "${show.venue}") -> geocoded country "${geocoded.country}", city "${geocoded.city}"`,
      )
    }
  }
  if (skippedLocationMismatch.length > 0) {
    console.log('')
    console.log('Manual review needed (geocode match looks unrelated to the venue text — possible bad match):')
    for (const { show, geocoded } of skippedLocationMismatch) {
      console.log(
        `  "${show.title}" (venue: "${show.venue}") -> matched "${geocoded.formatted}" (city "${geocoded.city}", country "${geocoded.country}")`,
      )
    }
  }
  if (skippedGeocodeFailed.length > 0) {
    console.log('')
    console.log('Geocode failures:')
    for (const { show, reason } of skippedGeocodeFailed) {
      console.log(`  "${show.title}" (venue: "${show.venue}") -> ${reason}`)
    }
  }
  if (skippedNoVenue.length > 0) {
    console.log('')
    console.log('No venue set (cannot geocode):')
    for (const show of skippedNoVenue) {
      console.log(`  "${show.title}" (id: ${show._id ?? show.id})`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
