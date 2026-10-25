# Architecture

A static Astro site. Everything is rendered to HTML at build time except two live things computed in the visitor's
browser: the Schedule status (open now, next Aarti) and the Sheet data (Events and the meter).

```
 build time (npm run build)                          browser (page load)
 ─────────────────────────                           ───────────────────
 src/data/*.json ──┐                                  inline head script → Day/Night theme before paint (localStorage, else device)
 src/components ───┼─> src/pages/index.astro ─> dist/ ──> scripts/header.ts  → theme switch, Menu, section scroll-spy
                   │                                   ──> scripts/live.ts    → day line, Aarti list, week tiles, hero buttons (every 30 s)
 src/styles (DS) ──┘        (static HTML)              ──> scripts/events.ts  → fetch Events CSV   → featured card + cards / empty / error
                                                       ──> scripts/meter.ts   → fetch Settings CSV → meter or hidden
                                                       ──> vachan.ts; Twitch and YouTube on tap, Seva → PayPal in main.ts
```

## Modules
| Path | Role | Rule |
|---|---|---|
| `src/data/` | site, schedule, sevas, giving and visit content | the only place to edit content outside the Sheet |
| `src/lib/` | pure TS: `time`, `schedule`, `dayline`, `events`, `settings`, `csv`, `ics`, `links`, `site` | no DOM; unit-tested; Pacific time |
| `src/scripts/` | thin browser glue calling `src/lib`; `main.ts` is the one entry | DOM only; no business rules |
| `src/components/` | one `.astro` per page section; `Icon`, `Flame` (DS dhuni mark), `SectionHead`, `DoorwayFrame`; gold line drawings (`ThaliDrawing`, `KolamThreshold`) | markup from the DS previews; drawings share `.sd-drawing__line` |
| `src/styles/site.css` | the page layer over the DS (day line, menu, doorways, band motifs, week arches, featured event, dev TODO labels); see DESIGN.md | tokens only |
| `src/styles/` | `bundle.css` copied from the DS; `tokens.css` generated | never edited here |
| `design-system/` | DS sources: `tokens.json` (input to `tools/tokens-to-css.mjs`), `bundle.js` and `index.d.ts` (reference for the `src/lib` port) | replaced wholesale on a DS re-sync |
| `public/` | DS images and icons (the hero's Day and Night photos), the Visit street map `img/visit-map.svg`, `_redirects`, `_headers`, `demo/*.csv` | |
| `tools/` | `tokens-to-css.mjs`; `osm-map.mjs` draws the Visit map from OpenStreetMap, run once and committed | not part of the build |

## Sheet data flow
1. Admin submits the Google Form → a row lands in the Events tab (or edits the Settings tab).
2. Google republishes the CSV within about 5 minutes.
3. `events.ts` fetches `site.json → sheet.eventsCsv`, `csv.ts` parses it, and `events.visibleEvents()` drops Events past their end date
   (Pacific), sorts pinned first then by start, and caps at 6.
4. Failure states: loading → empty ("No events are posted right now", WhatsApp link) → error ("Events could not load just now").
5. If no CSV URL is set, dev and `ALLOW_PLACEHOLDERS=1` builds fall back to `public/demo/*.csv` (decided in `src/pages/index.astro`).
6. The meter fails quietly (stays hidden); Events show the could-not-load notice.

## Build guard
An Astro integration fails `astro build` if any `TODO:` link remains in `src/data`, unless `ALLOW_PLACEHOLDERS=1`.
`DevPlaceholderBadge` marks those links only in `astro dev`.

## Decisions
[ADR 0001 static Astro](adr/0001-static-astro-site.md) · [ADR 0002 Sheet in the browser](adr/0002-google-sheet-as-event-source.md)
