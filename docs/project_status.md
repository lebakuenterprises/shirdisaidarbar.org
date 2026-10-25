# Project status

**Updated:** 2026-10-24 · **Branch:** `mvp` · **Current:** M2.7 done → next M3

## Milestones
- [x] M0 Docs: research, spec, architecture, CLAUDE.md, glossary, ADRs
- [x] M1 Foundation: Astro 7.3.8 scaffold, DS CSS and images, `src/lib` with tests
- [x] M2 Page: 11 sections, action bar, privacy and 404; demo CSVs
- [x] M2.1 Sannidhi redesign: the day line, menu in page order, Day/Night switch, embellished bands; finish review 7 of 8 fixes resolved, 1 scope change; PRODUCT.md, DESIGN.md
- [x] M2.2 Order and richness: Venkat's section order, Highlights dropped, repetition cut, lower-half drawings
- [x] M2.3 Six sections: Today and Stay connected removed, temple tour video, doorway frames, varied bands, DS dhuni FlameMark, footer socials
- [x] M2.4 Light day theme: no dark sections in Day, palette-mixed band grounds, Twitch at 16:9 with a Twitch button, friezes removed
- [x] M2.5 Order and two grounds: Live darshan third, Events fifth; ivory and sandal alternating; kolam on hero, Events, footer
- [x] M2.6 Day and Night hero (DS light photos), bands shifted, shrine on Live, OSM street map on Visit, Give in the nav
- [x] M2.7 Stage photo in the Visit doorway; labelled OSM map with a Darbar marker; hero capped at 1600px
- [ ] M3 Live data: Sheet CSVs wired, placeholder build guard, admin guide draft, real photos as event flyers
- [ ] M4 Demo-ready: Playwright + Lighthouse ≥ 90 ×4, admin guide

## See it
`npm run dev`, then http://localhost:4321. Red dashed outlines mark links still `TODO:` (dev only).

## Needed from Venkat
| Item | Needed by | Status |
|---|---|---|
| Google Form + Sheet (Events, Settings), each tab published as CSV; URLs into `src/data/site.json` | M3 | waiting |
| 4–8 temple photos (event flyers, the featured card) | M3 | waiting |
| WhatsApp Community invite (the channel link stands in), Google Photos album link | launch | channel live; album placeholder |
| Seva amounts and per-seva PayPal links (to turn on DS presets and Monthly) | launch | ask Ashok |
| Static map image (4:3 WebP) and confirmed visit-guideline wording | launch | optional |

## Risks
- No tech owner yet (routine edits must stay in the Sheet or `src/data`).
- bundle.css `@import`s Google Fonts, which may cost Lighthouse points (check in M4).
- Kakad Aarti (6:45 AM) is before opening (7:00 AM); confirm hours with the temple.
- Phone day line clears the action bar with little margin at 375×812; recheck when copy changes.
