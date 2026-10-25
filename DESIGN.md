---
name: Shirdi Sai Darbar
description: Baba's home in the Bay Area. The Sannidhi design system (v2) as built for the one-page site.
colors:
  sindoor: "#8C2416"
  action-hover: "#741C11"
  link: "#A8460B"
  saffron: "#E87915"
  saffron-ui: "#D4640F"
  gold: "#C9A24A"
  marigold: "#F2A93B"
  leaf: "#3F6B35"
  surface: "#FBF7EF"
  surface-raised: "#FFFDF8"
  surface-sunken: "#F3E9DA"
  glow-soft: "#F8E6CF"
  band-ivory: "#FBF7EF"
  band-sandal: "color-mix(in oklab, #F3E9DA, #C9A24A 30%)"
  muted-on-tint: "color-mix(in oklab, #2B1E1A 78%, #FBF7EF)"
  link-on-tint: "color-mix(in oklab, #A8460B 72%, #2B1E1A)"
  twitch: "#9146FF"
  twitch-hover: "#772CE8"
  sanctum: "#140C08"
  ink: "#2B1E1A"
  ink-muted: "#6B605A"
  on-action: "#FFF9F0"
  on-sanctum: "#FFF6EA"
  on-sanctum-muted: "#E9D6BE"
  line: "#E6DAC6"
  line-strong: "#8E7D70"
  open: "#2E6A3E"
  danger: "#B3261E"
  night-surface: "#140E0B"
  night-surface-raised: "#1E1612"
  night-surface-sunken: "#281D18"
  night-ink: "#F3E7D8"
  night-heading: "#F6D9B8"
  night-action: "#EE8A2E"
  action-sanctum: "#EE8A2E"
  gold-light: "#E3C27A"
typography:
  display-lg:
    fontFamily: "Tiro Devanagari Hindi, Tiro Tamil, Tiro Telugu, Georgia, Times New Roman, serif"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: "68px"
    letterSpacing: "-0.015em"
  display:
    fontFamily: "Tiro Devanagari Hindi, Tiro Tamil, Tiro Telugu, Georgia, Times New Roman, serif"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: "44px"
    letterSpacing: "-0.01em"
  section-title-lg:
    fontFamily: "Tiro Devanagari Hindi, Georgia, serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: "50px"
  section-title:
    fontFamily: "Tiro Devanagari Hindi, Georgia, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: "38px"
  vachan:
    fontFamily: "Tiro Devanagari Hindi, Georgia, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: "36px"
  event-feature-title:
    fontFamily: "Tiro Devanagari Hindi, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.15
  title:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: "28px"
  lead:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "32px"
  body:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "29px"
  time:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  button:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "20px"
  small:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "Anek Latin, Anek Devanagari, Noto Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
    letterSpacing: "0.08em"
rounded:
  sm: "10px"
  md: "16px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
  space-9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.sindoor}"
    textColor: "{colors.on-action}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-twitch:
    backgroundColor: "{colors.twitch}"
    textColor: "#FFFFFF"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-twitch-hover:
    backgroundColor: "{colors.twitch-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.sindoor}"
    rounded: "{rounded.pill}"
    height: "48px"
  button-hero-glow:
    backgroundColor: "{colors.sindoor}"
    textColor: "{colors.on-action}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "48px"
  button-hero-glow-night:
    backgroundColor: "{colors.action-sanctum}"
    textColor: "#1A110C"
  button-hero-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sindoor}"
    rounded: "{rounded.pill}"
    height: "48px"
  button-hero-ghost-night:
    backgroundColor: "transparent"
    textColor: "{colors.on-sanctum}"
  card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.md}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "48px"
  tag:
    backgroundColor: "{colors.glow-soft}"
    textColor: "{colors.sindoor}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  week-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.sindoor}"
    rounded: "{rounded.md}"
  arch-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.sindoor}"
    width: "40px"
    height: "44px"
  day-line:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.md}"
    padding: "16px 32px 24px"
  hero-day:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.sindoor}"
  hero-night:
    backgroundColor: "{colors.sanctum}"
    textColor: "{colors.on-sanctum}"
  visit-map:
    backgroundColor: "{colors.band-sandal}"
    textColor: "{colors.gold}"
---

# Design System: Shirdi Sai Darbar

**Source of truth.** The visual world is the Claude Design system "Shirdi Sai Darbar" v2 Sannidhi ([artifact](https://claude.ai/artifact/FfMV7Kkgm6azWF8JABQ96c)), binding per PRODUCT.md. `design-system/tokens.json`, `src/styles/tokens.css` (generated from it) and `src/styles/bundle.css` are that system's files: they are replaced wholesale on a re-sync and never edited here. Token meaning and usage notes live in `tokens.json`; this file records how the build applies them and the page layer in `src/styles/site.css`. Architecture and status live in `docs/`.

**Recorded deviations.** The DS specifies two dark sanctum zones (the hero and Live darshan). Venkat overrode this for the Day theme on 2026-10-23 (M2.4): no dark sections, with section contrast carried by alternating light grounds instead, simplified to two (ivory and gold sandal) in M2.5. In M2.6 the hero became the DS Sannidhi hero, an ivory sanctum by day and the dark sanctum by night; Live darshan stays an ivory band in both themes. The hero's own deviations (photo as a background by theme, the 29svh phone photo, the photo ending above the day line) are recorded under Hero below and in `docs/spec.md`.

## Overview

**Creative North Star: "Lamp light in the sanctum"**

The site reads like a small mandir at the hour of aarti: two grounds from the temple's own materials (kafni ivory and chandan with gold), sindoor headings, Baba's murti full-bleed in the sanctum hero, and light only where something is happening now or next. Everything at rest stays calm and warm; the lit flame, the glow, the saffron thread mark the active moment. Two themes, Day (Kakad) and Night (Shej), share every rule. Day has no dark section: the hero is an ivory sanctum, Baba lifted onto ivory with a marigold glow and a gold halo baked into the photograph. In Night the hero is the DS dark sanctum with its breathing glow, and the two grounds below become warm darks.

Density is generous and elder-first: 18px body, 48px touch targets, one column on phones and short split layouts on desktop. Devotional devices come from the temple itself and are rationed: the toran garland twice a page (hero top, footer top), the dhuni mark (Dwarkamai arch, crossed logs, flame) on every section head, Dwarkamai arches on tall things, the Darbar doorway around wide media (the tour video, the Visit stage photo, landscape flyers), the DS kolam on three grounds (the hero's open ground, Events, footer) and a kolam on the Visit doorstep, and one gold line drawing (the thali) on the page.

Page order and grounds: hero and day line (ivory sanctum by day, dark sanctum by night, kolam on the open ground), Build Baba's temple (gold sandal), Live darshan and Baba's words (ivory), Ways to give (gold sandal), Upcoming events (ivory, with kolam), Plan your visit (gold sandal), footer (ivory, with kolam and toran). Two grounds strictly alternate from hero to footer, so every neighbour differs in value (1.36:1 in Day, 1.54:1 in Night). Contrast between bands comes from the ground itself, not from seam friezes.

**Key Characteristics:**
- Light marks only the active: next aarti, next event, now on the day line, today in the week, the selected choice.
- Nothing is ever placed over Baba's murti, the day line included; text and controls sit beside or below his photograph.
- One display serif weight (Tiro 400) for headings and Baba's words; Anek for everything read or pressed.
- Arches for tall things, the doorway for wide media, pills and 16px holds; no sharp corners.
- Motion is feedback, state and lamp light only, and stops under reduced motion.

## Colors

A warm temple palette: ivory and sandal grounds, sindoor for voice and action, saffron and marigold for flame, gold for thread and frame. Night swaps grounds and inks per `tokens.css`; values above prefixed `night-` are the main Night counterparts.

### Primary
- **Sindoor** (`sindoor`): headings by day, the primary action fill (the Day hero's glow button included), focus ring by day. By night action becomes **Lamp Saffron** (`night-action`; `action-sanctum` with dark text on the Night hero's glow button).

### Secondary
- **Bhagwa Saffron** (`saffron`, `saffron-ui`): flame, the day line's elapsed thread and next-stop ring, the next event's ring, meter fill, the 3px saffron lip on the day line card, the ring of the Darbar disc on the Visit map. `saffron-ui` is the text-safe and UI-safe step.

### Tertiary
- **Mukut Gold** (`gold`): hairlines, doorway and Live darshan frame lines and crowns, the Visit map's streets (at 0.55) and the outer ring of its Darbar disc, the thali drawing, kolam at 12% opacity, and 30% of the sandal band. **Gold light** (`gold-light`) is the Night hero's mantra.
- **Marigold** (`marigold`): the lamp at now, flame cores, the meter's tip, and the Night hero's breathing glow.

### Neutral
- **Kafni Ivory** (`surface`), **Raised** (`surface-raised`), **Chandan** (`surface-sunken`): page and the Day hero ground, cards and bars, date tiles.
- **Diya Glow** (`glow-soft`): the one highlighted row, event, day or choice; hover fill for quiet controls and the Day hero's ghost button; the appeal's faint wash; arch tiles on ivory.
- **Sannidhi** (`sanctum`): the Night hero's ground (`--hero-bg`) and the Live poster strip in Night. No band uses it.
- **Ink** (`ink`, `ink-muted`), **Line** (`line`, `line-strong`): text and rules. Status uses `open`, `danger` (also live), always with words.

### Band grounds (site.css)
Two site-level tokens declared in `site.css` `:root`, taken from the DS's own ivory and chandan grounds. They strictly alternate from hero to footer; there is no third band ground. The hero counts as ivory (its Day ground is `surface`).
- **Kafni ivory** (`band-ivory`, `surface`): the hero by day, Live darshan, Upcoming events (with kolam) and the footer (with kolam and toran).
- **Gold sandal** (`band-sandal`, `surface-sunken` with `gold` 30% in OKLab, class `.sd-band--sunken`): Build Baba's temple, Ways to give and Plan your visit.
- **Neighbour step:** measured luminance ratio between the two grounds is 1.36:1 in Day and 1.54:1 in Night.
- **Night mix:** `[data-theme="night"]` and the `prefers-color-scheme: dark` fallback re-declare sandal at gold 16% over the Night `surface-sunken`, a warm dark; a stronger mix would pull it toward pastel.
- **On-tint text** (`muted-on-tint`, `link-on-tint`): on `.sd-band--sunken` only, `--ink-muted` and `--link` are re-pointed to these steps toward ink. Measured minimum text contrast on a band ground: 5.54:1 in Day, 5.91:1 in Night.
- **Edges on sandal:** `.sd-way` rules become `line-strong`, `.sd-arch-tile` and the week's tiles take `surface-raised`, and the doorway's ring gap follows the band (`--frame-ground: var(--band-sandal)`).

### Third-party brand
- **Twitch purple** (`twitch`, `twitch-hover`): the Open on Twitch button only, with a white label (4.65:1). It is the one deliberate off-palette colour on the site and the one deliberate literal colour in the page layer; it never spreads to other controls.

### Named Rules
**The Lamp Light Rule.** Saffron glow, `glow-soft` and the lit flame belong only to what is now, next, today or selected. A resting element never glows. The ambient lights belong to the sanctum and stay there: a faint `glow-soft` radial wash behind the appeal's content, the marigold glow and gold halo baked into the Day hero photographs, and the DS breathing glow behind Baba in the Night hero (6s, still under reduced motion). The hero's glow button is the DS lamp-lit action: Watch live takes it within the soon window of an aarti or while live (`live.ts`), Get directions otherwise.

**The Value Step Rule.** Two grounds alternate strictly from hero to footer: hero (ivory sanctum, or the dark sanctum by night), sandal, ivory, sandal, ivory, sandal, ivory. Every neighbour differs in value (1.36:1 Day, 1.54:1 Night) and never only in hue. A new band takes whichever of the two keeps the alternation; no third ground, no dark ground below the hero, and none in the hero by day.

**The Words First Rule.** Status (open, closed, live, soon) is always written; colour and dots only repeat it.

## Typography

**Display Font:** Tiro Devanagari Hindi (with Tiro Tamil, Tiro Telugu, Georgia)
**Body Font:** Anek Latin (with Anek Devanagari, Tamil, Telugu, Noto Sans)

**Character:** A calm classical serif in one weight against a humanist sans drawn for the same four scripts, so Hindi, Tamil and Telugu need no new decisions.

### Hierarchy
- **Display** (400, fluid 40px to 68px): the hero H1 only, once per page, in `--hero-ink` (heading by day, `on-sanctum` by night).
- **Section title** (400, fluid 32px to 44px): every section H2, in `heading` colour.
- **Vachan** (400 italic, fluid 24px to 32px): Baba's words, in `heading` colour on the ivory Live darshan band.
- **Title** (600, 22px): H3, seva legend.
- **Event feature title** (Tiro 400, 28px, 1.15; 34px from 900px): the featured event's title only.
- **Lead / Body** (400, 20px / 18px, measure 65ch): section leads and running text. The hero lead is 18px, 20px from 768px and 21px from 1100px, in `--hero-muted`.
- **Time** (600, 20px, tabular lining numerals): aarti times, amounts, day line labels (14px to 15px).
- **Label** (600, 14px, 0.08em, uppercase): small caps labels; never caps or tracking in Indic scripts.

### Named Rules
**The One Weight Rule.** Tiro is only ever 400; emphasis comes from size and colour, never bold serif.

**The Mantra Rule.** The hero's line above the H1 is the DS Devanagari devotional mantra ("श्रद्धा · सबुरी", Tiro 19px, 22px from 1100px, in `--hero-kicker`: `link` by day, `gold-light` by night), set between two short rules on phones and followed by one from 1100px. It is not an English eyebrow. Section heads carry the dhuni mark, not a text label; a section headed by its own drawing (Ways to give, the thali) drops the mark.

## Layout

Mobile first from 320px, content max 1120px, gutters 16px (phones) to 32px. Band grounds follow the page order above. Sections breathe at 64px (phones) and 96px from 1024px. Breakpoints: 768px (two columns, hero buttons show, action bar hides, the hero photo grows), 900px (wide day line, seven-arch week, featured event splits), 1100px (the hero goes full-bleed with copy left, full header nav, three remaining events go three across). Page layer helpers: split grids of `minmax(420px, 1fr)` columns and simple stacks on the spacing scale.

Hero (DS Sannidhi): on phones Baba comes first, the photo full width at `--hero-img-h` (`min(29svh, 300px)`; `min(40svh, 440px)` from 768px) fading into the ground, with mantra, H1 and lead centred below and the buttons hidden until 768px (the action bar carries them), so the whole day line clears the action bar on the first screen. From 1100px the hero fills the viewport height (up to 860px) with Baba full-bleed on the right and the copy on the left (at most `min(540px, 38vw)`); the photo ends above the day line (`bottom: var(--today-overlap)`) with a one-layer bottom fade, so the strip never sits over Baba. The photo is capped at `min(100%, 1600px)` and centred, so on wide screens Baba stays beside the words instead of drifting to the window edge; from 1601px a `::after` veil in the hero's own colour (`--hero-bg`, 4% on each side) blends its side edges into the ground. It is a veil, not a second mask layer, because composited mask layers leave a hairline. The kolam sits on the open ground only: below the photo on phones, on the left half from 1100px, fading out from 55% so it never crosses him.

Phone chrome: a fixed three-item action bar (Directions, Watch, Donate) at 64px plus safe area. The header Menu opens as a two-column sheet rising above the action bar on phones, never a dropdown over the murti.

## Elevation & Depth

Warm, low, mostly tonal. Bands and sunken fills carry structure; shadows are reserved for raised cards (`shadow-soft`), the day line, hovered cards and menus (`shadow-md`), and the action bar cast upward (`shadow-bar`). Lamp light (`shadow-glow`, a 6px saffron ring, and `halo`) is the only glow. The doorway frame uses concentric rings instead of shadow (inset gold hairline, a 6px gap in the band's ground, gold hairline); a resting featured event, the flyer stage and the Live darshan frame use a single gold hairline, the last with `shadow-soft`.

### Named Rules
**The Warm Shadow Rule.** Shadows are tinted ink by day and black by night, never grey, never hard offset.

## Shapes

Pill for what you press (buttons, chips, tags, segments), 16px for what holds (cards, rows, media), 10px for fields. Media inside a frame (the live and tour posters, the Visit stage photo, doorway images) round at 12px, the DS sanctum frame's inner radius (`radius-md` less the 4px frame inset).

**The Tall Arch Rule.** The Dwarkamai arch (pill top, `radius-sm` or `radius-md` foot) frames only tall things: icon and date tiles, the week's day tiles (phones: a 56px by 72px pill-top name tile; from 900px the whole day tile, `50% 50% 16px 16px / 80px 80px 16px 16px`) and portrait event flyers (pill top hugging the image's own width, chosen when the image is taller than 1.2:1). Wide media never take the arch.

**The Darbar doorway** is the wide frame: a 16px rectangle in a double gold line, crowned by a small Dwarkamai arch (120px by 30px, gold line with a gold finial) centred above it, echoing the Live darshan frame's crown. It holds the temple tour poster, the Visit stage photo (`darbar-stage.webp`, 800w and 1600w, 16:9) and landscape flyers. Its ring gap is the band's ground (`--frame-ground`).

Icons are Phosphor regular, inlined as SVG, including the brand marks in the footer.

## Components

All base components (buttons including the glow and ghost pair, chip, tag, card, event card, meter, seva choices, segmented control, field, live facade, sanctum frame, Sannidhi hero, header, footer, toran, flame, arch tile, kolam) are defined by the design system in `bundle.css`; use them as shipped. The DS's highlights carousel, aarti list, connect block, sanctum band and DarshanFrame are not used on this site (the murti-arch photograph appears only as a demo event flyer).

### Buttons
- **Shape:** full pill (999px), 48px min height, 17px semibold.
- **Primary:** sindoor fill, ivory text; hover darkens and adds the lamp glow.
- **Secondary / Quiet:** line-strong outline in heading colour; quiet is link-coloured text with a glow-soft hover.
- **Hero glow and ghost (DS):** the hero pairs Get directions and Watch live as glow and ghost; the glow one leads. By day the glow is the sindoor primary with a soft sindoor shadow and the ghost a line-strong outline in heading colour; by night the glow is `action-sanctum` with dark text and `shadow-glow`, the ghost an `on-sanctum` outline.
- **Open on Twitch:** the DS pill in Twitch purple with a white label and the Twitch glyph; hover deepens the purple and lifts 1px. It opens the channel in a new tab (`target="_blank" rel="noopener"`) and says so to screen readers ("opens in a new tab").

### Cards / Containers
- Raised surface, 1px `line` border, 16px radius, 24px padding, `shadow-soft`.

### Navigation
- Sticky 64px header on `surface` with section links in page order (Temple, Live, Give, Events, Visit) and Donate; the current section gets `glow-soft` and heading colour. Below 1100px the links collapse into a Menu disclosure with the same list. The Day/Night switch is a 44px round button showing moon or sun; it sets `data-theme="day"|"night"` on the root and remembers it in `localStorage` key `sd-theme`, otherwise the OS scheme applies.

### Hero (DS Sannidhi, site.css)
The DS hero with colours from its `--hero-*` variables: ivory ground by day, `sanctum` by night. The photograph is a CSS background on `div.sd-sannidhi__img` (role img, with alt text), chosen by `[data-theme]` and width: below 1100px `murti-face-wide-light` (Night `murti-face-wide`), from 1100px `murti-hero-wide-light-1280` (Night `murti-hero-wide-1280`), from 1400px or 1.5dppx the 1920 files. From 1100px it is at most 1600px wide and centred, with side veils in `--hero-bg` from 1601px. An inline script in `index.astro` preloads the same file with the same media queries, so only one loads. The toran hangs at the top; the kolam (`div.sd-kolam.sd-sannidhi__kolam`) sits on the open ground. Nothing sits over Baba, the day line included.

### The day line (signature, site.css)
A raised card rising 64px over the hero foot (below the photo, never over it) with a saffron top lip. A gold thread (50% opacity) runs Kakad to Shej; open hours are `halo` bands; four 30px diya stops sit on the thread, muted except the next, which gets `glow-soft`, a saffron ring and the lit flame. Elapsed time is a saffron-ui line ending in a marigold lamp at now. One centred sentence of state sits above it, with a status dot. Thread and lamp animate in once; static under reduced motion.

### Lamp-lit events (site.css)
Only the soonest event is `.is-next`: `glow-soft` fill, 1.5px `saffron-ui` ring and `shadow-glow`; its date tile and tag turn raised, the tag with a gold inset ring. The first visible event (pinned, else soonest) renders as `.sd-event--feature`, full width, resting on a gold hairline unless it is also next. It has a larger arch date tile (44px day, chandan with a gold inset line) and, when the row has a flyer, the flyer shown whole on a stage (`glow-soft` to chandan radial, gold inset line), arched if portrait, in the doorway if wide, on the right from 900px. The remaining three go three across from 1100px. A Join on WhatsApp button shares the section head's row, wrapping below it on phones.

### Live darshan (site.css)
The DS sanctum frame and crown, lightened for the ivory band: `surface-raised` ground, gold inset line, `shadow-soft`, gold crown finial. The poster is the Darbar's own shrine photograph (`darbar-shrine.webp`). The Twitch player loads only on tap and fills the poster's 16:9. The poster's label strip is light in Day and keeps the DS dark strip in Night. Below the frame sit one line of stream times and the Open on Twitch button, then the lotus divider and Baba's words.

### Temple tour video (site.css)
The DS live facade (poster, play disc, label on the scrim) inside the Darbar doorway, up to 760px wide in the sandal appeal. The poster is self-hosted; the no-cookie YouTube player loads only on tap and takes the poster's place at 16:9.

### Visit map (site.css)
The street map sits unframed under the guidelines: the OpenStreetMap drawing `public/img/visit-map.svg` (16:9, made once by `tools/osm-map.mjs`), used as a CSS mask filled with `gold` at 0.55, so the streets follow the theme, and faded into the band by an elliptical radial mask (`#000` 72% to transparent). Landmark labels are real text from `src/data/visit.json` (`mapLabels`), placed in % of the drawing: 13px uppercase, weight 600, 0.04em tracking, `ink-muted` on a `band-sandal` chip (11px on phones). `phoneX` moves a label along its road on phones; `wideOnly` labels are hidden on phones. The Darbar is marked at the centre by the DS dhuni flame in a `surface-raised` disc (44px, 36px on phones) ringed `saffron-ui`, then `surface-raised`, then `gold`, with the name in the display face (18px, 16px on phones) on a `surface-raised` chip beside it; on phones the name sits above the disc. No map pin. Measured contrast: labels 6.12:1 in Day and 5.91:1 in Night; the name 8.68:1 in Day and 13.18:1 in Night. Below the address, a small credit line, "Map data © OpenStreetMap contributors", links to the copyright page. Role img with a written description naming the address and the landmarks.

### Week of arches (site.css)
Temple hours, inside Plan your visit. Phones: rows with a pill-top day-name tile. From 900px: seven arch-topped day tiles. Name tiles (phones) and day tiles (900px up) take `surface-raised` on the sandal band; today lifts to `glow-soft` with a saffron ring and its tag.

### Line drawing (site.css)
Inline SVG in gold line (`.sd-drawing__line`: 1.4 stroke, round caps and joins), aria-hidden, at most one saffron or marigold accent. The aarti thali heads Ways to give in place of the dhuni mark.

### Giving disclosures (site.css)
Ways to give as hairline-ruled disclosures: arch tile, name, one-line summary, and a link-coloured chevron that rotates open. The section is gold sandal, so the rules step up to `line-strong` and the tiles take `surface-raised`.

### Visit doorstep and footer (site.css)
Under the Visit doorway (the stage photo) a kolam doorstep (a repeating dot-and-loop SVG pattern in gold, 75% opacity) marks the threshold. The footer is ivory with the DS kolam under the toran. Its Follow the Darbar list pairs each network's Phosphor brand mark, in heading colour, with its name in 40px rows.

## Do's and Don'ts

### Do:
- **Do** take every value from `tokens.css` or the band tokens mixed from it in `site.css`; the one deliberate literal colour in the page layer is Twitch purple.
- **Do** keep light on the active: one next aarti, one next event, one lamp at now, one today.
- **Do** hang the toran at most twice a page (hero top, footer top).
- **Do** alternate the two grounds from hero to footer (hero ivory or sanctum, then sandal, ivory, sandal, ivory, sandal, ivory), and re-point muted text and links to the on-tint steps on every sandal band.
- **Do** set the hero photo as a CSS background chosen by `[data-theme]` and width, and preload the same file with the same media queries.
- **Do** put wide media in the Darbar doorway and keep the arch for tall things; let the doorway's ring gap follow the band.
- **Do** keep 48px touch targets and 18px body in both themes, and test Day and Night.
- **Do** re-sync the design system by replacing `tokens.json`, `tokens.css` and `bundle.css` wholesale, then fix the page layer.

### Don't:
- **Don't** place text, controls, menus or the day line over Baba's murti; the hero photo ends above the day line and the kolam fades before him.
- **Don't** use `<picture>` or `<img>` media for the hero photo: it follows the device, not the Day/Night switch.
- **Don't** use stock, painted or AI images of Baba; only the Darbar's own photographs and the DS's light treatments of them.
- **Don't** edit `bundle.css`, `tokens.css` or `tokens.json` locally; extend in `site.css`.
- **Don't** bold Tiro, or add English eyebrow labels above headings.
- **Don't** glow, flicker or animate anything that is not now, next or selected, beyond the sanctum's own ambient lights named in the Lamp Light Rule.
- **Don't** add a third band ground, use a dark ground for a section below the hero or for the hero by day, or bring back seam friezes to separate bands.
- **Don't** use colour outside the palette, except a third-party brand's own button (Twitch purple).
