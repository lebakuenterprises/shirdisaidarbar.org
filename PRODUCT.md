# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Regular devotees:** check today's aarti times and whether the Darbar is open, at a glance, usually from a WhatsApp link on a phone.
- **First-time visitors:** find the address and get directions, often from Google.
- **Donors and sponsors:** give to the Temple construction or sponsor a Seva in about three taps, with the tax ID and receipt promise visible.
- **Remote devotees and family:** watch Live darshan and give from afar.
- **Volunteers:** join the WhatsApp community and sign up for seva.
- **Admin (Ashok, non-technical):** posts Events, Highlights and the construction total from a phone, with no developer.

## Product Purpose

Turn a visit to the URL into a visit to the temple, a gift, or a WhatsApp join, in under a minute, on a phone. The page must never go stale: times, the open state and Events are computed from data with end dates.

## Positioning

Baba's own Darbar in Sunnyvale: the temple's real murti photographs, the four aartis of Shirdi by name, and a volunteer community building a marble temple for the next hundred years.

## Operating Context

WhatsApp is the communication backbone; the site is the permanent, searchable record it links to. Events, Highlights and the meter come from a Google Sheet that a Google Form feeds. Giving goes to PayPal (one general link today), and Event Sponsorships go to Paybee. Live darshan streams on Twitch during the four aartis.

## Capabilities and Constraints

- Static Astro site with no server (docs/adr/0001); Sheet CSVs fetched in the browser (docs/adr/0002).
- No trackers, no cookies, no autoplay audio or video.
- First load under 1.5 MB; LCP under 2.5 s on 4G; Lighthouse 90 or above in all four categories.
- Terminology in GLOSSARY.md (Seva, Donation and Sponsorship are distinct; an Event is not the Schedule; a Highlight points at things).
- Phase 2: Hindi, Tamil and Telugu.
- Undecided: Seva amounts and per-seva PayPal links; static map image; final visit-guideline wording; the hours around Kakad Aarti.

## Brand Commitments

- The Claude Design system "Shirdi Sai Darbar" v2 Sannidhi is binding: https://claude.ai/artifact/FfMV7Kkgm6azWF8JABQ96c
- Voice: warm and familial, "we" and "you"; sentence case; no em or en dashes; no emoji; no exclamation marks in headings.
- Nothing is ever placed over Baba's murti. Only the Darbar's own photographs of Baba; no stock, painted or AI images.

## Evidence on Hand

Murti and shrine photographs, the seal and mark (`public/img/`), the EIN, address, phone and email, the aarti times and temple hours (`src/data/`). Absent, so never fabricate: testimonials, donor names, a real raised total (the demo figure is a placeholder), and temple event photographs (pending from Venkat).

## Product Principles

1. Devotion first, transaction second.
2. Readable by elders on a phone.
3. Never stale.
4. Routine updates never need a developer.

## Accessibility & Inclusion

WCAG 2.2 AA in both themes: 18px body, 48px touch targets, status never shown by colour alone, reduced motion respected, reflow at 320px.
