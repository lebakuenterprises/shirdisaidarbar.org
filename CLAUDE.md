# CLAUDE.md

One-page, mobile-first website for Shirdi Sai Darbar (Sunnyvale), a static Astro site. MVP for a demo to temple management.

## Read first
- [docs/project_status.md](docs/project_status.md): where we are and what's next
- [docs/spec.md](docs/spec.md): what we're building · [docs/architecture.md](docs/architecture.md): how it fits together
- [GLOSSARY.md](GLOSSARY.md): use these terms in code and copy (Seva ≠ Donation ≠ Sponsorship; Event ≠ Schedule)
- Design system "Shirdi Sai Darbar" v2 Sannidhi: https://claude.ai/artifact/FfMV7Kkgm6azWF8JABQ96c (read `project/README.md` via the Artifact tool)

## Commands (from M1)
- `npm run dev`: http://localhost:4321
- `npm test`: Vitest unit tests
- `npm run build`: fails while `TODO:` links remain; `ALLOW_PLACEHOLDERS=1 npm run build` for a demo build
- `npx playwright test`: smoke tests against `npm run preview`
- `node tools/tokens-to-css.mjs`: regenerate `src/styles/tokens.css` after replacing `design-system/tokens.json`
- `node tools/osm-map.mjs`: redraw `public/img/visit-map.svg` from OpenStreetMap (only if the temple moves)
- Set `ASTRO_TELEMETRY_DISABLED=1` in CI. New dependencies: exact versions at least 2 weeks old.

## Hard rules
- Design-system fidelity: copy markup from its component previews; `tokens.css`/`bundle.css` are verbatim copies, never edited here.
- All time logic runs in America/Los_Angeles, whatever the device time zone.
- No trackers, no autoplay, nothing over Baba's murti, no stock or AI images of Baba.
- Pin exact dependency versions (no `^`/`~`). No adapter, no View Transitions (see docs/adr/0001).
- Content that changes a few times a year lives in `src/data/*.json`; Events and the meter come from the Google Sheet (docs/adr/0002).
- Copy voice: no em/en dashes, sentence case, no emoji, no exclamation marks in headings.

## Doc-update rule (keep docs lean)
At the end of each milestone (M0–M4 in project_status.md):
1. Rewrite `docs/project_status.md` (≤ 40 lines).
2. Add a 2–3 bullet entry to `docs/changelog.md`.
3. Touch `docs/architecture.md` or `docs/spec.md` only if structure or scope changed.
4. Add to GLOSSARY.md the moment a new domain term is settled; add an ADR only for hard-to-reverse, surprising trade-offs.
Link, don't repeat: no doc restates another.
