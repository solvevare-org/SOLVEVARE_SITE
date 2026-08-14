/**
 * generate-nearby.js
 * Run: node js/generate-nearby.js
 * Output: js/nearby-locations.json
 *
 * For each unique city in locationsData.js, finds the 6 nearest cities
 * (within 100 miles) that have a page in /locations/.
 * Uses zip-code lat/lng from the free zippopotam.us API (rate-limited).
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

// ── helpers ──────────────────────────────────────────────────────────────────

function toKebab(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'solvevare-nearby-builder/1.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(null); }
      });
    }).on('error', reject);
  });
}

// ── load locationsData ────────────────────────────────────────────────────────

const raw = fs.readFileSync(path.join(__dirname, 'locationsData.js'), 'utf8');
// strip the window.locationsData= wrapper and trailing semicolon
const jsonStr = raw.replace(/^window\.locationsData\s*=\s*/, '').replace(/;?\s*$/, '');
const allEntries = JSON.parse(jsonStr);

// ── discover which pages actually exist ──────────────────────────────────────

const locationsDir = path.join(__dirname, '..', 'locations');
const existingFiles = new Set(fs.readdirSync(locationsDir));

function pageExists(stateSlug, citySlug) {
  const filename = `${toKebab(stateSlug)}-in-${toKebab(citySlug)}.html`;
  return existingFiles.has(filename);
}

// ── deduplicate: one entry per (state, city) pair ────────────────────────────

const seen = new Set();
const unique = [];
for (const e of allEntries) {
  const key = `${e.state_slug}|${e.city_slug}`;
  if (!seen.has(key) && pageExists(e.state_slug, e.city_slug)) {
    seen.add(key);
    unique.push(e);
  }
}

console.log(`Unique cities with pages: ${unique.length}`);

// ── geocode via zippopotam.us ─────────────────────────────────────────────────

async function geocodeZip(zip) {
  // pad zip to 5 digits
  const z = String(zip).padStart(5, '0');
  const data = await fetchJson(`https://api.zippopotam.us/us/${z}`);
  if (!data || !data.places || !data.places[0]) return null;
  return {
    lat: parseFloat(data.places[0].latitude),
    lng: parseFloat(data.places[0].longitude)
  };
}

// ── main ──────────────────────────────────────────────────────────────────────

(async () => {
  const coords = {}; // key -> {lat, lng}
  const BATCH = 5;
  const DELAY_MS = 250; // ~4 req/s to be polite

  console.log('Geocoding cities...');
  for (let i = 0; i < unique.length; i++) {
    const e = unique[i];
    const key = `${e.state_slug}|${e.city_slug}`;
    const geo = await geocodeZip(e.zip_code);
    if (geo) coords[key] = geo;
    if ((i + 1) % 100 === 0) console.log(`  ${i+1}/${unique.length}`);
    if ((i + 1) % BATCH === 0) await sleep(DELAY_MS);
  }

  console.log(`Geocoded: ${Object.keys(coords).length}/${unique.length}`);

  // ── compute nearby for each city ──────────────────────────────────────────

  const MAX_MILES = 100;
  const MAX_RESULTS = 6;
  const result = {};

  for (const e of unique) {
    const key = `${e.state_slug}|${e.city_slug}`;
    const origin = coords[key];
    if (!origin) continue;

    const nearby = [];
    for (const other of unique) {
      const otherKey = `${other.state_slug}|${other.city_slug}`;
      if (otherKey === key) continue;
      const dest = coords[otherKey];
      if (!dest) continue;
      const dist = haversine(origin.lat, origin.lng, dest.lat, dest.lng);
      if (dist <= MAX_MILES) {
        nearby.push({
          city: other.city,
          state: other.state,
          state_slug: toKebab(other.state_slug),
          city_slug: toKebab(other.city_slug),
          miles: Math.round(dist)
        });
      }
    }

    nearby.sort((a, b) => a.miles - b.miles);
    result[key] = nearby.slice(0, MAX_RESULTS);
  }

  const outPath = path.join(__dirname, 'nearby-locations.json');
  fs.writeFileSync(outPath, JSON.stringify(result));
  console.log(`Done. Written to ${outPath}`);
})();
