// Draws the streets around the temple from OpenStreetMap as one 16:9 SVG, shown in the Plan your visit doorway as a
// mask (site.css colours it from the theme, so one file serves Day and Night). The temple sits at the centre, under
// the pin. Map data © OpenStreetMap contributors (ODbL 1.0); the page carries the credit.
// Run once, then commit the output: node tools/osm-map.mjs
import { writeFileSync } from 'node:fs';

const UA = 'shirdisaidarbar.org site build (map drawing tool)';
const ADDRESS = { street: '255 San Geronimo Way', city: 'Sunnyvale', state: 'CA', postalcode: '94085', country: 'us' };
const W = 1280, H = 720; // drawing units; the area is about 1.6 × 0.9 km
const HALF_W_KM = 0.8, HALF_H_KM = 0.45;
// Stroke width per road class, widest first; footpaths and tracks are left out.
const CLASSES = [
  [['motorway', 'trunk', 'motorway_link', 'trunk_link'], 11],
  [['primary', 'secondary', 'primary_link', 'secondary_link'], 8],
  [['tertiary', 'tertiary_link'], 6],
  [['residential', 'unclassified', 'living_street'], 3.5],
  [['service'], 1.6],
];

const out = new URL('../public/img/visit-map.svg', import.meta.url);
const meta = new URL('../public/img/visit-map.svg.json', import.meta.url);

const get = async (url, init) => {
  const res = await fetch(url, { ...init, headers: { 'User-Agent': UA, ...init?.headers } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
};

const [place] = await get(`https://nominatim.openstreetmap.org/search?${new URLSearchParams({ ...ADDRESS, format: 'json', limit: '1' })}`);
if (!place) throw new Error('Address not found');
const lat = Number(place.lat), lon = Number(place.lon);
const dLat = HALF_H_KM / 111.32, dLon = HALF_W_KM / (111.32 * Math.cos((lat * Math.PI) / 180));
const [s, w, n, e] = [lat - dLat, lon - dLon, lat + dLat, lon + dLon];

const kinds = CLASSES.flatMap(([k]) => k).join('|');
const query = `[out:json][timeout:30];way["highway"~"^(${kinds})$"](${s},${w},${n},${e});out geom;`;
const data = await get('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ data: query }),
});

const x = (lo) => (((lo - w) / (e - w)) * W).toFixed(1);
const y = (la) => (((n - la) / (n - s)) * H).toFixed(1);
const paths = CLASSES.map(([k, width]) => {
  const d = data.elements
    .filter((el) => k.includes(el.tags?.highway) && el.geometry?.length > 1)
    .map((el) => 'M' + el.geometry.map((p) => `${x(p.lon)} ${y(p.lat)}`).join('L'))
    .join('');
  return d ? `<path stroke-width="${width}" d="${d}"/>` : '';
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">${paths}</g>
</svg>
`;
writeFileSync(out, svg);

// Landmark candidates for the labels: named big roads (at their middle point), stations, parks and schools, as
// percentages of the drawing. A person picks the few that help and copies them into src/data/visit.json.
const lq = `[out:json][timeout:30];(way["highway"~"^(motorway|trunk|primary|secondary)$"]["name"](${s},${w},${n},${e});` +
  `nwr["railway"="station"](${s},${w},${n},${e});nwr["leisure"="park"]["name"](${s},${w},${n},${e});nwr["amenity"~"^(school|college)$"]["name"](${s},${w},${n},${e}););out center geom;`;
const ld = await get('https://overpass-api.de/api/interpreter', {
  method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ data: lq }),
});
const pct = (v) => Math.round(v * 10) / 10;
const seen = new Set();
const marks = ld.elements.flatMap((el) => {
  const name = el.tags?.ref && el.tags?.highway === 'motorway' ? el.tags.ref : el.tags?.name;
  if (!name || seen.has(name)) return [];
  seen.add(name);
  const p = el.center ?? (el.geometry ? el.geometry[Math.floor(el.geometry.length / 2)] : el);
  if (p?.lat == null) return [];
  const kind = el.tags.railway ? 'station' : el.tags.leisure ? 'park' : el.tags.amenity ? 'school' : 'road';
  return [{ name, kind, x: pct((x(p.lon) / W) * 100), y: pct((y(p.lat) / H) * 100) }];
});
console.log(JSON.stringify(marks, null, 1));
writeFileSync(meta, JSON.stringify({
  prompt: `origin: drawn from OpenStreetMap data (© OpenStreetMap contributors, ODbL 1.0) by tools/osm-map.mjs: roads within ${HALF_W_KM * 2} × ${HALF_H_KM * 2} km of ${ADDRESS.street}, ${ADDRESS.city} (${lat}, ${lon}), centred on the temple.`,
  createdAt: new Date().toISOString(),
}, null, 2) + '\n');
console.log(`Wrote ${out.pathname} (${(svg.length / 1024).toFixed(1)} KB, ${data.elements.length} ways)`);
