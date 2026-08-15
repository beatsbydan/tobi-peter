// src/Scripts/extract-country-names.js
import { feature } from 'topojson-client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const worldData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../public/world-110m.json'), 'utf-8'),
)

const geojson = feature(worldData, worldData.objects.countries)
const names = geojson.features.map((f) => f.properties.name).sort((a, b) => a.localeCompare(b))

const outPath = path.join(__dirname, '../data/countryNames.json')
fs.writeFileSync(outPath, JSON.stringify(names, null, 2))
console.log(`Wrote ${names.length} country names to ${outPath}`)
