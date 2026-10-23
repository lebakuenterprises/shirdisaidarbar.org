# Project status

**Updated:** 2026-10-23 · **Branch:** `mvp` · **Current:** M0 done → next M1

## Milestones
- [x] M0 Docs: research, spec, architecture, CLAUDE.md, glossary, ADRs
- [ ] M1 Foundation: Astro scaffold (pinned 7.4.2, telemetry off, Node 24), DS CSS and assets pulled in, `src/lib` with Vitest green
- [ ] M2 Page: all components and the 11 sections from `src/data` plus demo CSV
- [ ] M3 Live data: Sheet CSVs wired, placeholder build guard, real photos in
- [ ] M4 Demo-ready: Playwright + Lighthouse ≥ 90 ×4, admin guide

## Needed from Venkat
| Item | Needed by | Status |
|---|---|---|
| 4–8 real temple photos in `src/assets/moments/` | M3 | waiting |
| Google Form + Sheet (Events, Settings), both tabs published as CSV; URLs pasted into `src/data/site.json` (steps in docs/ADMIN-GUIDE.md, written in M3) | M3 | waiting |
| PayPal links (general, construction, per Seva), WhatsApp Community invite, volunteer form, Priest service contact | launch | placeholders OK for demo |

## Risks
- No tech owner yet (routine edits must stay in the Sheet or `src/data`).
- Astro 7 strict HTML parsing when porting DS markup.
