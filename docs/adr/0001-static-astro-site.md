# Static Astro site, no server

The temple has no tech volunteer, the page is a single devotional landing page, and Hindi, Tamil and Telugu versions come in phase 2. We build with Astro using `output: 'static'` and no adapter, so `dist/` is plain files that any free host serves. Astro was chosen over plain HTML (four copies of the page once languages arrive), Eleventy (close second, smaller community), Hugo (Go templates are hard to hand over) and Next.js export (React runtime, the design system rewritten as JSX). Scores and sources are in [research_tech_stack.md](../../research_tech_stack.md).

## Consequences

- Versions are pinned exactly and upgraded deliberately, at most once a year. There are no automatic dependency PRs, because Astro ships breaking majors often and patches only the previous one.
- No adapter, no `/_image` endpoint and no View Transitions, which keeps most of Astro's 2026 security advisories out of scope.
- Anything that needs a server (forms, payments, an admin UI) is handled by an outside service, never by this repo.
