# Spec: Shirdi Sai Darbar website MVP

## Goal
A simple, modern, minimal one-page site to demo to temple management, run locally first. It replaces a dated site
(no mobile viewport, ~18.8 MB, stale events, ~15 competing donate buttons, no WhatsApp or directions link).
Its one job: turn a visit into a temple visit, a gift or a WhatsApp join, in under a minute, on a phone.

Sources: UX audit (https://claude.ai/artifact/XUvRj4HPmYMnVH9h9imCux), design system v2 Sannidhi
(https://claude.ai/artifact/FfMV7Kkgm6azWF8JABQ96c), stack research ([research_tech_stack.md](../research_tech_stack.md)).
The prior v1 static build in `../shirdisaidarbar-site/` is reference only.

## Audiences
Regular devotee (today's timings), first-time visitor (directions), donor or sponsor, remote devotee (Live darshan),
volunteer (WhatsApp, signup), admin (posts Events from a phone in under 5 minutes, no developer).

## Page (order set by Venkat, 2026-10-24)
| # | Section | Content | Data |
|---|---|---|---|
| 1 | Header | seal mark, name, sections in page order (Temple · Live · Give · Events · Visit; a Menu below 1100px), Day/Night switch, Donate | site.json |
| 2 | Hero + day line (DS Sannidhi: ivory by day, sanctum by night; kolam on the open ground) | Baba full-bleed in the DS Day or Night photo (by day lifted onto ivory with a marigold glow and gold halo), the DS mantra श्रद्धा · सबुरी, headline, Get directions / Watch live; the day line: today's open hours, four aarti stops, a lamp at now, state in words; the strip sits on the seam between the hero and the sandal Temple band | schedule.json |
| 3 | Build Baba's temple (sandal) | appeal; the temple tour video (YouTube 2mB2Gdijo10, poster self-hosted, player on tap from 0:02) in the Darbar doorway; the front rendering as its poster; meter toward the $10M immediate goal (of the $20M vision), raised and amount to go; donor levels | Sheet: Settings, site.json |
| 4 | Live darshan + Baba's words (ivory) | the Twitch poster (Baba in close-up, 4:5, on phones; the shrine at 16:9 from 600px), player loads on tap only at 16:9; Open on Twitch button (Twitch purple, new tab); Baba's eleven assurances, starting on the day's, Previous and Next beside the words, Pause under them | site.json |
| 5 | Ways to give (sandal) | aarti-thali drawing; Seva choice → PayPal hand-off; other ways (Zelle, check, card, stock, company match, Paybee); EIN | sevas.json, giving.json |
| 6 | Upcoming events (ivory, kolam) | Join on WhatsApp beside the heading; the first event (pinned, else soonest) featured full width with its flyer (arch if tall, doorway if wide); lamp light on the next event only; up to 5 more; hidden after end date; the featured flyer opens whole in a dialog with its Sponsor or Sign up button; Festivals at the Darbar (four past festivals in carved gold arches with the doorway crown, opening the photo album) | Sheet: Events, festivals.json |
| 7 | Plan your visit (sandal) | the Darbar from the street in the doorway, opening directions (an Open in Maps chip on the photo) with a kolam step; a street map (OpenStreetMap drawing) fading into the band under the guidelines, the Darbar marked with the dhuni mark and named, three nearby roads labelled, credit line; address, Get directions, guidelines; Temple hours as seven arch tiles with today lit, Shani note | visit.json, schedule.json |
| 8 | Footer (ivory, kolam, toran) | seal, contact, links out (shop, Priest service, photo albums, sister temple), Follow the Darbar (WhatsApp channel, YouTube, Facebook, Instagram, Twitch), सबका मालिक एक, auto year | site.json |
| + | Mobile action bar | Directions · Live · Donate (phones only) | |
Also `/privacy` and a 404 page. Old URLs redirect to section anchors (`_redirects`, ported from v1).

## Decisions
| Topic | Decision |
|---|---|
| Stack | Static Astro, TypeScript, npm, no adapter ([ADR 0001](adr/0001-static-astro-site.md)) |
| Events + meter | Google Sheet published as CSV, fetched in the browser ([ADR 0002](adr/0002-google-sheet-as-event-source.md)); demo Sheet in Venkat's account, moved to saiseva@ at launch |
| Recurring happenings | One Event row per occurrence; no repeat rules |
| DS logic | bundle.js helpers ported to typed TS with unit tests; CSS and tokens copied verbatim |
| Missing links | `TODO:<label>` placeholders in data files; dev-only badge; production build fails while any remain |
| Highlights | Dropped by Venkat (it repeated Events): a deliberate deviation from the DS page order. The featured event card carries "this week's big thing"; the photo album is a link (Google Photos can't feed websites since 2025-03-31) |
| Repetition | Each fact is stated once where it belongs (stream timing in Live darshan, the goal in the meter, "All are welcome" in the hero, the calendar PDF in Events) |
| Giving | One PayPal checkout (general and per Seva); Paybee only for Event Sponsorships. The DS amount presets and One time/Monthly toggle wait until the temple sets amounts and per-seva links; until then the donor picks the amount and monthly on PayPal |
| Look and feel | Sannidhi-first, not a re-skin of v1. Product truth in PRODUCT.md; page direction contract in `.impeccable/surfaces/src-pages-index-astro.md` ("the day line") |
| Visit map | A street drawing from OpenStreetMap (ODbL, credited on the page), made once by `tools/osm-map.mjs` and coloured by the theme through a CSS mask, sits unframed under the guidelines with the Darbar marker (the DS dhuni mark in a saffron disc) and landmark labels from `src/data/visit.json`; the doorway holds the stage photo. Not a Google Maps screenshot: Google's guidelines steer sites to its embeds, two rasters would need recapturing, and a live map would be a third-party request |
| Fewer sections (M2.3) | Today at the Darbar removed (the day line carries the aartis; hours moved to Visit). Stay connected removed: one WhatsApp channel button in Events, socials in the footer. The channel link stands in until the Community invite is found |
| Frames | Dwarkamai arch only for tall things (tiles, portrait flyers); wide media (video, shrine photo, landscape flyers) in the Darbar doorway: double gold line crowned by a small arch, as the DS frames Live darshan |
| Band grounds (M2.6) | Two grounds only, ivory and gold-sandal (`color-mix` of the DS sunken and gold), strictly alternating. The hero is the DS sanctum (ivory by day, dark by night), so Temple, Give and Visit are sandal and Live, Events and the footer ivory. The DS kolam on the hero's open ground, Events and the footer. On sandal, muted text and links step toward ink to hold 4.5:1 in both themes; Night uses a lighter sandal mix for a warm dark. Border friezes removed |
| Sanctum zones | Day has no dark section: the DS Day hero is an ivory sanctum (Claude Design's light murti photos). Night keeps the DS dark hero. Live darshan is an ivory band in both themes (Venkat, 2026-10-23), overriding the DS's dark sanctum band |
| Hero image by theme | The hero photo is a CSS background chosen by `data-theme` and width, because `<picture>` media follows the device, not the Day/Night switch; only one file loads, and an inline script on the home page preloads the same file. Deviations from the DS: the phone photo is 29svh (not 48svh) so the day line clears the action bar, and from 1100px the photo ends above the day line so the strip never sits over Baba |

## Event fields (Sheet "Events" tab, fed by the Google Form)
Title*, Start date*, Start time, End date*, End time, Description*, Flyer image link, WhatsApp group link,
Signup or sponsor link, Pin to top (Yes/No). * = required. Settings tab: `raised` (blank hides the meter), `goal`.
A flyer link may be any public https image, or a path on this site.

## Non-functional requirements
- Mobile-first from 320px, no horizontal scroll; 48px touch targets; 18px body.
- First load < 1.5 MB; LCP < 2.5 s on 4G; Lighthouse ≥ 90 in all four categories (mobile).
- WCAG 2.2 AA in light and dark; status never by colour alone; reduced motion respected.
- No trackers, cookies or autoplay. All times computed in America/Los_Angeles.
- Never stale: Events expire automatically, footer year is generated.

## Done (demo-ready)
Vitest green · Playwright smoke at 375px and 1280px, light and dark · Lighthouse ≥ 90 ×4 · admin guide written.

## Out of scope (later)
Hosting and domain move (Cloudflare Workers static assets favoured; Vercel Hobby needs a payments-terms check),
real PayPal/WhatsApp/volunteer links, Hindi/Tamil/Telugu, donor wall, build-time Event structured data,
priest-service booking, gallery hosting.
