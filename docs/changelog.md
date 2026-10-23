# Changelog

Format: one entry per milestone, newest first ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).

## M1 Foundation (2026-10-23)
- Scaffolded Astro 7.3.8 (static, strict TS, exact pins, telemetry off), with DS bundle.css, generated tokens.css and DS images in `public/img/`.
- Added `src/lib` (time, schedule, events, settings, csv, ics, links), ported from DS bundle.js with multi-window hours; 49 Vitest tests pass with the device zone set to India.
- Added `src/data/schedule.json` and `site.json`, including the general PayPal link.

## M0 Docs (2026-10-23)
- Added the stack research: Astro (static) recommended, 86 vs Eleventy 85 ([research_tech_stack.md](../research_tech_stack.md)).
- Added the spec, architecture, CLAUDE.md, GLOSSARY.md and project status.
- Recorded ADR 0001 (static Astro, no server) and ADR 0002 (Google Sheet read in the browser).
