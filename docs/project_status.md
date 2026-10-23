# Project status

**Updated:** 2026-10-23 · **Branch:** `mvp` · **Current:** M1 done → next M2

## Milestones
- [x] M0 Docs: research, spec, architecture, CLAUDE.md, glossary, ADRs
- [x] M1 Foundation: Astro 7.3.8 scaffold, DS CSS and images, `src/lib` with 49 tests passing
- [ ] M2 Page: all components and the 11 sections from `src/data` plus demo CSV
- [ ] M3 Live data: Sheet CSVs wired, placeholder build guard, real photos in
- [ ] M4 Demo-ready: Playwright + Lighthouse ≥ 90 ×4, admin guide

## Decided 2026-10-23
Section 4 follows DS v2: **Highlights** (third Sheet tab) replaces the photo carousel. A Highlight points at
an Event or campaign and never replaces its card (GLOSSARY). Baba's words rotate daily, with Pause.

## Needed from Venkat
| Item | Needed by | Status |
|---|---|---|
| Google Form + Sheet (Events, Settings, Highlights), each tab published as CSV; URLs into `src/data/site.json` | M3 | waiting |
| 4–8 temple photos for demo Highlights slides | M3 | waiting |
| WhatsApp Community invite, volunteer form, Google Photos album link | launch | placeholders OK for demo |
| PayPal general link | | received |

## Risks
- No tech owner yet (routine edits must stay in the Sheet or `src/data`).
- Astro 7 strict HTML parsing when porting DS markup.
- bundle.css `@import`s Google Fonts, which may cost Lighthouse points (check in M4).
