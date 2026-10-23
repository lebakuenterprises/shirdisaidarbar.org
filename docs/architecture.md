# Architecture

A static Astro site. Everything is rendered to HTML at build time except two live things computed in the visitor's
browser: the Schedule status (open now, next Aarti) and the Sheet data (Events and the meter).

```
 build time (npm run build)                          browser (page load)
 ─────────────────────────                           ───────────────────
 src/data/*.json ──┐                                  schedule data (inlined JSON)
 src/components ───┼─> src/pages/index.astro ─> dist/ ──> scripts/live.ts    → status chip, Today strip, next Aarti (every 30 s)
 src/styles (DS) ──┤        (static HTML)              ──> scripts/events.ts  → fetch Events CSV   → cards / empty / error
 src/assets ───────┘  (images → WebP)                  ──> scripts/meter.ts   → fetch Settings CSV → meter or hidden
                                                       ──> scripts/highlights.ts → fetch Highlights CSV → slides or band hidden
                                                       ──> vachan.ts, live-darshan.ts (Twitch on tap), seva.ts (PayPal)
```

## Modules
| Path | Role | Rule |
|---|---|---|
| `src/data/` | site, schedule, sevas, giving and visit content | the only place to edit content outside the Sheet |
| `src/lib/` | pure TS: `time`, `schedule`, `events`, `settings`, `csv`, `ics`, `links` | no DOM; fully unit-tested; Pacific time |
| `src/scripts/` | thin browser glue calling `src/lib` | DOM only; no business rules |
| `src/components/` | one `.astro` per design-system component | markup copied from DS previews |
| `src/styles/` | `bundle.css` copied from the DS; `tokens.css` generated | never edited here |
| `design-system/` | DS sources: `tokens.json` (input to `tools/tokens-to-css.mjs`), `bundle.js` and `index.d.ts` (reference for the `src/lib` port) | replaced wholesale on a DS re-sync |
| `public/` | DS images and icons, `_redirects`, `_headers`, `demo/*.csv` | |

## Sheet data flow
1. Admin submits the Google Form → a row lands in the Events tab (or edits the Settings tab).
2. Google republishes the CSV within about 5 minutes.
3. `events.ts` fetches `site.json → sheet.eventsCsv`, `csv.ts` parses it, and `events.visibleEvents()` drops Events past their end date
   (Pacific), sorts pinned first then by start, and caps at 6.
4. Failure states: loading → empty ("No events are posted right now", WhatsApp link) → error ("Events could not load just now").
5. If no CSV URL is set in dev, it falls back to `public/demo/*.csv`.

## Build guard
An Astro integration fails `astro build` if any `TODO:` link remains in `src/data`, unless `ALLOW_PLACEHOLDERS=1`.
`DevPlaceholderBadge` marks those links only in `astro dev`.

## Decisions
[ADR 0001 static Astro](adr/0001-static-astro-site.md) · [ADR 0002 Sheet in the browser](adr/0002-google-sheet-as-event-source.md)
