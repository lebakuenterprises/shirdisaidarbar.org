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

## Page (fixed order, from the design system)
| # | Section | Content | Data |
|---|---|---|---|
| 1 | Header | seal mark, name, anchors (Visit · Events · Live · Connect), Donate | site.json |
| 2 | Hero + Today strip | murti full-bleed in sanctum, kicker श्रद्धा · सबुरी, headline, status chip, next Aarti countdown, Get directions / Watch live | schedule.json |
| 3 | Build Baba's temple | appeal, meter toward $3M (of $10M), walkthrough video, donor levels | Sheet: Settings |
| 4 | Today at the Darbar | four Aartis, hours by weekday (multi-window), Shani note, today highlighted | schedule.json |
| 5 | Upcoming events | up to 6 cards: pinned first, then by date; hidden after end date; Add to calendar, WhatsApp group, Sponsor, flyer | Sheet: Events |
| 6 | Live darshan + Baba's words | Twitch poster, player loads on tap only; vachan | site.json |
| 7 | Moments at the Darbar | manual carousel, 4–8 real temple photos, captions below | moments.json |
| 8 | Ways to give | Seva choice → PayPal hand-off; other ways (Zelle, check, card, stock, company match, Paybee); EIN | sevas.json, giving.json |
| 9 | Stay connected | WhatsApp Community, volunteer signup, Facebook, YouTube | site.json |
| 10 | Plan your visit | photo, address, Get directions, Before-you-visit guidelines | visit.json |
| 11 | Footer | seal, contact, links out (shop, Priest service, calendar PDF, sister temple), सबका मालिक एक, auto year | site.json |
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
| Photos | Venkat supplies originals; Astro converts to WebP at build |
| Giving | One PayPal checkout (general and per Seva); Paybee only for Event Sponsorships |

## Event fields (Sheet "Events" tab, fed by the Google Form)
Title*, Start date*, Start time, End date*, End time, Description*, Flyer image link, WhatsApp group link,
Signup or sponsor link, Pin to top (Yes/No). * = required. Settings tab: `raised` (blank hides the meter), `goal`.

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
