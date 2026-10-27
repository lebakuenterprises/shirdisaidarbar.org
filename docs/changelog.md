# Changelog

Format: one entry per milestone, newest first ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).

## M3.2 Beta (2026-10-27)
- A floating "Tell us what you think" button (lower right, above the phone action bar, hidden while the hero shows Baba) and a footer Website feedback link open the beta Google Form with the device answer pre-filled.
- Cloudflare Workers static-assets config (`wrangler.jsonc`); the 2026 calendar links to the current site, since the 29 MB PDF exceeds the 25 MiB file limit.

## M3.1 Frames and taps (2026-10-27)
- The day line now sits on the seam between the hero and the sandal Temple band (no bare strip under it); the hero kolam is whole again.
- Every link away from the page now opens in a new tab (one rule, `opensNewTab`, tested; recorded in CLAUDE.md).
- Festival photos sit in carved gold arches with the doorway crown and a kolam step; the featured flyer opens whole in a dialog with its Sponsor button; the Visit photo opens directions.

## M3 Live data, part 1 (2026-10-25)
- Events and the meter now read the live Google Sheet (Events and Settings tabs, Form for admins); the Google Photos album and a Volunteer with us footer link are set.
- Goals revised to $10M immediate and $20M vision (the meter says how much is left); the tour video shows the front rendering; Seva options show placeholder suggested amounts until the temple confirms them.
- Plan your visit shows the Darbar from the street; Live darshan shows Baba in close-up on phones; the assurance arrows sit beside the words; Festivals at the Darbar closes Events; the hero kolam fades out before the day line.

## M2.7 Stage photo and labelled map (2026-10-24)
- Plan your visit: the temple's stage photo (WebP, 143 KB and 55 KB for phones) in the doorway; the street map moved under the guidelines, fading into the band, with the Darbar marked by the dhuni mark and named, and Central Expressway, East Arques Avenue and North Fair Oaks Avenue labelled.
- The hero photo is capped at 1600px and centred on wide screens, so Baba stays beside the words.

## M2.6 Day and Night hero, map on Visit (2026-10-24)
- The hero is the DS Sannidhi again, now with Claude Design's light murti photos by day and the dark sanctum by night, swapped by theme as a CSS background (one file loads). Give joins the header nav.
- Bands shifted by one so the alternation continues below the hero; Live darshan shows the shrine photo; Plan your visit shows a street map drawn from OpenStreetMap (`tools/osm-map.mjs`), coloured by the theme.

## M2.5 Order and two grounds (2026-10-24)
- New order: hero, temple, Live darshan, give, events, visit (Live darshan now sits between the two asks; Events lead into Plan your visit). Nav and Menu follow.
- Two grounds only, ivory and gold-sandal, strictly alternating; the rose, marigold and saffron grounds are gone. The DS kolam now marks the hero and footer as well as Events.

## M2.4 Light day theme (2026-10-23)
- No dark sections in Day: the hero is a saffron-dawn band with Baba in the DS DarshanFrame; Live darshan is a light sindoor-rose band. Five palette-mixed band grounds alternate light and deep so every neighbour differs in value; all text holds 4.5:1 in both themes (5.35:1 minimum in Day). The hero now sits on the page grid.
- Twitch player now fills its frame at 16:9; Open on Twitch is a Twitch-purple button opening a new tab. Removed the arch and dhuni border friezes.

## M2.3 Fewer sections, varied bands (2026-10-23)
- Removed Today at the Darbar (hours moved into Plan your visit) and Stay connected (one WhatsApp channel button in Events; YouTube, Facebook, Instagram, Twitch and WhatsApp in the footer).
- The temple tour video replaces the drawing in Build Baba's temple (self-hosted poster, no-cookie player on tap); wide media now sit in the Darbar doorway frame, arches only on tall items.
- Every band differs from its neighbours (new diya-glow ground with a dhuni lamp row; arch colonnade on Visit); re-synced the DS for the new Dwarkamai dhuni FlameMark.

## M2.2 Order and richness (2026-10-23)
- New order: hero, temple, events, give, live, today, connect, visit. Dropped the Highlights carousel (the featured event card now carries the week's big thing) and stated each repeated fact once.
- Lower half: an aarti-thali drawing for Ways to give, time-of-day glyphs on the aartis, a hanging bell in the Stay connected doorway, a kolam step under the Visit photo, and faint lamp-glow washes.

## M2.1 Sannidhi redesign (2026-10-23)
- Replaced the Today strip with the day line (the four aartis on a thread, open hours, a lamp at now, one sentence of state). Fixed the lopsided wide hero by capping the photo at 1600px and ending it before the day line.
- Menu in page order, with a phone Menu sheet, scroll-spy and a Day/Night switch. Added Sannidhi embellishment: hanging-diya threads, a temple line drawing, week arch tiles, giving disclosures, and arched doorways for Visit and Stay connected.
- Added PRODUCT.md, the page direction contract (`.impeccable/surfaces/`) and DESIGN.md. A fresh-context finish review scored 7 of 8 fixes resolved; the eighth was a stated scope change.

## M2 Page (2026-10-23)
- Built all 11 DS sections, the action bar, `/privacy` and the 404 page from `src/data` and demo CSVs (events, settings, highlights), with live Today strip, Highlights carousel, rotating assurances, Twitch on tap and Seva → PayPal.
- Added `src/lib/highlights.ts` (57 tests in total) and `site.css`; checked at 320, 360, 375 and 1280px in light and dark (fixed a Seva fieldset overflow on phones).

## M1 Foundation (2026-10-23)
- Scaffolded Astro 7.3.8 (static, strict TS, exact pins, telemetry off), with DS bundle.css, generated tokens.css and DS images in `public/img/`.
- Added `src/lib` (time, schedule, events, settings, csv, ics, links), ported from DS bundle.js with multi-window hours; 49 Vitest tests pass with the device zone set to India.
- Added `src/data/schedule.json` and `site.json`, including the general PayPal link.

## M0 Docs (2026-10-23)
- Added the stack research: Astro (static) recommended, 86 vs Eleventy 85 ([research_tech_stack.md](../research_tech_stack.md)).
- Added the spec, architecture, CLAUDE.md, GLOSSARY.md and project status.
- Recorded ADR 0001 (static Astro, no server) and ADR 0002 (Google Sheet read in the browser).
