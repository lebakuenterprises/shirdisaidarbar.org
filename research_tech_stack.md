# Tech stack research: Shirdi Sai Darbar website

**Date:** 2026-10-23
**Question:** Which stack should we use to rebuild shirdisaidarbar.org as an MVP, judged on quality, robustness and ease of maintenance?

**Answer:** Use **Astro with static output**. Pin exact versions and turn telemetry off. Astro and Eleventy came out effectively tied in the scoring (86 vs 85 out of 100). Astro wins on the factors that matter most when there is no tech volunteer:

- Image optimization and i18n routing are built in, so there are fewer packages to wire together.
- Its community is far larger, which makes it more familiar to AI coding assistants. npm downloads were about 4.8M a week, against about 138k for Eleventy [[55]][[56]].
- Its core team is now employed full-time by Cloudflare, and the project stays MIT-licensed and platform-agnostic [[1]].

The main cost is churn. Astro shipped two major versions in 2026 (6.0 in March, 7.0 in June), and it gives security fixes only to the one previous major [[2]][[5]]. That cost is easy to contain on a static site: the build output is plain files with no server runtime, so a pinned version can stay put for years. **Eleventy is the right choice instead** if the team cares more about low churn and HTML going in exactly as written than about ecosystem size (see "What would change the decision"). Next.js static export is a poor fit. Plain HTML stays a valid fallback for the English-only MVP but gets worse once Hindi, Tamil and Telugu pages arrive.

---

## Requirements recap (criteria)

| # | Criterion | Source of requirement |
|---|---|---|
| R1 | First load under 1.5 MB. LCP of 2.5 s or less on 4G (web.dev "good" threshold, measured at the 75th percentile [[53]]). Lighthouse 90 or above in all four categories | UX audit |
| R2 | WCAG 2.2 AA [[54]], works from 320 px, no trackers | UX audit |
| R3 | Uses the existing plain HTML/CSS design system (`sd-` classes, tokens.css, about 40 KB CSS) and the about 10 KB vanilla JS bundle unchanged | Design system README |
| R4 | Events and the "raised" figure stay a browser-side CSV fetch from Google Sheets. Other content changes a few times a year | Content model |
| R5 | Phase 2: Hindi, Tamil and Telugu versions built from shared templates | Roadmap |
| R6 | No tech owner today, so it must be maintainable by a part-timer or with AI assistants | Org reality |
| R7 | Builds locally on Windows 11 / Node 24. Output portable to any free static host | Environment |

---

## Options at a glance

| Option | Quality | Robustness | Maintenance | i18n (phase 2) | Fit |
|---|---|---|---|---|---|
| 1. Plain HTML/CSS/JS | Excellent output. Images optimized by hand | Best: no dependencies, nothing to upgrade | Easy now. Four copies of the page in phase 2 | None. Copy the page per language | Good for MVP, weak for phase 2 |
| 2. Astro (static) | Zero JS by default. Built-in `<Image>`/`<Picture>` (Sharp) | Funded full-time team (Cloudflare). 5 majors since Aug 2023. Security fixes only for previous major | Excellent docs, huge community, AI-friendly | Built in (`i18n` config + helpers) | **Strong** |
| 3. Eleventy (Build Awesome) | Zero JS by default. HTML in, HTML out. Image plugin transforms every `<img>` | v3 stable since Oct 2024, still patched. 134 transitive deps. Rename and v4 alpha add uncertainty | Simple. Smaller community. Template-language choice | Official plugin bundled in core | **Strong** |
| 4. Hugo | Zero JS. Built-in image processing | Single executable, no Node. Still 0.x, minor releases contain breaking changes | Go templates are the hardest for non-experts | Best built-in multilingual | Good, but hard to hand over |
| 5. Next.js static export | Ships the React runtime. `next/image` default loader unsupported | Good LTS policy. ~300 MB install. Monthly security releases in 2026 | Design system must be rewritten as JSX | No built-in routing. Docs rely on Proxy, which is unavailable in export | Poor |

---

## 1. Plain HTML/CSS/vanilla JS (no build step)

**What it is:** Hand-written `index.html`, `privacy.html` and `404.html` that link the design system's CSS and JS directly. This is what v1 already is.

**Strengths**
- Nothing to install, upgrade or break. The v1 README's claim that "nothing here needs upgrading to keep working" holds.
- Uses the design system exactly as delivered (R3), since its README says no framework is required.
- Any host, any editor, any AI assistant can handle it. A routine edit (an aarti time) means editing one line of HTML or a JS data object.

**Risks**
- **Phase 2 i18n:** Four languages means four full copies of the page. Every structural or schedule change has to be made four times, and the copies will drift. Rendering translations from JSON in the browser would avoid duplication, but it costs LCP and SEO on a page whose hero text is the LCP element.
- **Images:** No pipeline. Each carousel photo needs AVIF/WebP and several widths made by hand (for example with the sharp CLI), and the `srcset` written by hand. This works, but it is the step a non-expert is most likely to skip, and skipping it would break the 1.5 MB budget (R1).
- No shared partials (header and footer are copied into privacy and 404).

**Evidence:** No external dependencies, so there is no release, support or CVE record to assess. The risks above follow from the project requirements, not from a cited source.

---

## 2. Astro (static output)

**What it is:** A content-focused framework. `.astro` components are an HTML superset and render to static HTML at build time. The latest version is **7.4.2** [[7]].

**Strengths**
- **Quality:** Zero client JS by default, and "everything is still just HTML, CSS, and JavaScript" [[11]]. Sharp is the default image service. `<Image>` infers width and height to prevent layout shift, and `<Picture>` emits multiple formats and sizes [[10]]. Astro 6 added a built-in Fonts API and a stable CSP API, which helps hit Lighthouse Best Practices [[4]].
- **Consumes the design system cleanly:** Paste `sd-` markup into `.astro` files, import `tokens.css` and `bundle.css`, and include the vanilla JS. Plain `<script>` tags are bundled as modules and deduplicated. `is:inline` leaves a script exactly as written [[12]].
- **i18n built in:** `locales`, `defaultLocale`, `prefixDefaultLocale` and `fallback`, plus helpers such as `getRelativeLocaleUrl()`. These work for prerendered (static) pages. Only `domains` and custom locale paths need a server [[9]].
- **Governance and funding:** On 2026-01-16 all full-time staff of The Astro Technology Company became Cloudflare employees. Astro "stays open-source and MIT-licensed", its "open governance and current roadmap remain in place", and the team is "fully committed to maintaining Astro as a platform-agnostic framework" [[1]][[67]].
- **Community and AI familiarity:** 4.78M npm downloads in the week of Oct 12 to 18, 2026 [[55]]. Astro 7 detects AI coding agents and runs `astro dev --background` for them [[3]].

**Risks**
- **Churn:** Majors arrived on 2023-08-30 (v3), 2023-12-05 (v4), 2024-12-03 (v5), 2026-03-10 (v6) and 2026-06-22 (v7) [[15]][[16]][[17]][[2]]. That is 5 majors in about 3 years, 2 of them in 2026.
- **Short support window:** "Extended maintenance for security fixes only for one previous major version", with no stated duration and no LTS [[5]].
- **v7 parser changes hit pasted HTML:** HTML auto-correction was removed, unclosed tags and unterminated attributes are now errors, and newlines between inline elements no longer render a space (`compressHTML: 'jsx'`) [[3]][[6]]. Hand-written design-system markup needs checking for both.
- **Footprint:** 52 direct dependencies, including Vite, Rolldown, Shiki and SVGO, plus optional `sharp` [[7]]. Node floor is `>=22.23.4` [[8]]. Node 24 meets it.
- **Security:** In 2026, advisories cluster on server and adapter code, for example the `/_image` endpoint SSRF, Netlify and Vercel adapter issues and Node adapter crashes. Some (View Transitions XSS, JSX/MDX script escaping) don't state their scope [[14]]. A pure static build without View Transitions avoids most of this surface.
- **Telemetry:** The CLI sends anonymous usage data by default. Disable it with `astro telemetry disable` or `ASTRO_TELEMETRY_DISABLED=1` [[13]]. This affects the build machine only, not site visitors.
- **Windows/sharp:** sharp ships prebuilt win32-x64 and arm64 binaries through optional dependencies. A `package-lock.json` shared across platforms can break installs because of npm bug #4828 [[51]]. That matters when a Windows-made lockfile is built on a Linux host.

---

## 3. Eleventy (11ty, being renamed "Build Awesome")

**What it is:** A JS static site generator that turns templates (HTML, Markdown, Nunjucks, Liquid, WebC and more) into static files. Latest stable is **3.1.7**, released 2026-10-15. v4 is still pre-release (4.0.0-alpha.10, 2026-07-01). The repo moved to `11ty/buildawesome` [[19]][[20]].

**Strengths**
- **Quality:** "Zero client-side JavaScript by default across the board" [[18]]. `.html` is a first-class template type [[30]], so the design system and the v1 page drop in almost unchanged. The image plugin's HTML transform processes every `<img>` and `<picture>` in the output (WebP, AVIF, widths) [[29]], which suits hand-written HTML well.
- **Robustness:** v3.0 shipped 2024-10-02 [[26]] and is still the stable line two years later, with maintenance releases in Mar, Jun and Oct 2026 [[20]]. Earlier majors: v2 in 2023, v3 in 2024 (2 majors in about 3 years). Core has 33 direct dependencies with `engines: node >=18` [[19]]. The project reports transitive dependencies falling from 187 to 134 and install size from 27 MB to 21 MB in 2025 [[24]]. No published security advisories [[31]].
- **i18n:** The official i18n plugin "is bundled with Eleventy and does not require separate installation" (since v2.0.0) [[27]]. Recommended layout is one folder per locale with a directory data file setting `lang` [[28]].

**Risks**
- **Governance turbulence:** Font Awesome took over stewardship in September 2024 [[25]]. In March 2026 the project announced "Eleventy v4 will be Build Awesome v4", plus a paid "Build Awesome Pro" funded by Kickstarter that "will not be required" [[21]]. The first campaign was a "false start" [[21]], and a secondary source reported the rename and fundraiser paused in March 2026 [[32]]. It resumed, with 838 backers acknowledged in May 2026 [[23]]. The final funding amount and a v4 release date are not published.
- **Bus factor:** Development is led by one person (Zach Leatherman) under a company sponsor [[21]].
- **Smaller community:** 138k weekly npm downloads [[56]], about 35 times fewer than Astro, so there is less AI training data and fewer answers online.
- **Extra package for images:** `@11ty/eleventy-img` is installed separately. v7 needs Node 22 or later and is ESM-only [[29]]. Same sharp and lockfile caveat as Astro [[51]].
- **Gotcha:** `.html` files are pre-processed as Liquid by default [[30]], so literal `{{ }}` in markup gets interpreted. It's a one-line config change.

---

## 4. Hugo

**What it is:** A static site generator written in Go [[39]], installed as one prebuilt executable (`winget install Hugo.Hugo.Extended`). It needs no Node [[36]]. Latest is **v0.168.0** (2026-10-13), with minor releases roughly monthly [[33]].

**Strengths**
- **Most complete built-in multilingual support:** Per-language config and content directories, `i18n/*.yaml` translation tables with fallback to the default language, and translation linking [[37]].
- **Built-in image processing:** Resize, Fit, Fill and WebP output, among others [[38]].
- **No npm tree:** One binary, which can be pinned forever. Apache-2.0 licensed, 90.2k GitHub stars [[35]].

**Risks**
- **Still 0.x:** Minor releases carry breaking changes. Examples: v0.167 changed the default `baseURL` and how `eq` compares numbers, and v0.166 made `{{ return }}` outside a partial an error [[33]]. v0.146 replaced the template system ("as backwards compatible as possible") [[34]]. LibSass has been deprecated since v0.153 [[36]].
- **Go templates** are the least approachable model for a non-expert or a future part-time owner.
- **Governance and funding:** No 2026 primary source found. The README lists GoLand and CloudCannon as sponsors [[35]], and development has long been led by one maintainer (bep).

---

## 5. Next.js with static export

**What it is:** The React framework with `output: 'export'`. Latest is **16.4.2**. No Next.js 17 had been released as of this date [[40]].

**Strengths**
- Best-written support policy of the group: Active LTS until the next major, then 2 years of Maintenance LTS [[44]]. Majors land yearly: 14 (2023-10-26), 15 (2024-10-21), 16 (2025-10-21) [[44]].
- Largest community: 41.1M weekly downloads [[55]].
- Static export removes most of the server attack surface. CVE-2025-29927 (middleware bypass): "Static exports were immediately ruled out" [[45]].

**Risks**
- **Quality:** Pages are React and hydrate on the client. Export also produces "a static payload for client navigation" [[42]]. That is runtime JS this one-page site doesn't need, and it eats into the 1.5 MB / LCP budget.
- **Images:** Image Optimization with the default loader is unsupported in export, so you need a custom loader and an external image service [[42]].
- **Consuming the design system:** Every section has to be rewritten as JSX (`class` becomes `className`, and so on), which goes against the design system's "no framework" premise.
- **i18n:** No built-in routing in the App Router. The docs' recipe redirects in Proxy [[43]], and Proxy, redirects and rewrites are all unsupported in static export [[42]].
- **Footprint:** 192.5 MB unpacked for `next`, plus 110 MB for the Windows SWC binary [[40]][[41]].
- **Security cadence:** Security releases in July, August, September and October 2026, including critical RCEs [[47]][[48]], after React2Shell (CVSS 10.0) in December 2025 [[46]]. Most of these affect server features that static export doesn't use. Even so, they create upgrade pressure and alert noise for a volunteer.

---

## Briefly considered

| Option | Verdict | Reason |
|---|---|---|
| SvelteKit + `adapter-static` | Dismiss | Prerenders the whole site [[50]] and is popular (2.0M weekly downloads [[57]]). But it ships the Svelte runtime and router JS, the design system must become `.svelte` components, and i18n is not built in. It offers no advantage over Astro here. |
| Hosted builder (WordPress.com / Squarespace / Wix) | Dismiss for now | It would solve "no tech volunteer", but WordPress.com Free shows ads to visitors and has no plugins or custom domain [[66]]. Squarespace costs $19 to $99 a month billed annually, with no nonprofit discount listed [[65]]. Neither can use the finished design system, and neither guarantees the no-tracker, Lighthouse 90+ or 1.5 MB targets. Revisit only if no one can run `npm run build` for 6 months or more. |

---

## Scoring

Weights: **maintenance 40, robustness 35, quality 25**. Scores run from 1 to 5. Total = Σ(weight × score) / 5, out of 100.

| Option | Quality (25) | Robustness (35) | Maintenance (40) | **Total** |
|---|---|---|---|---|
| Astro | 5 | 3 | 5 | **86** |
| Eleventy | 5 | 4 | 4 | **85** |
| Plain HTML | 4 | 5 | 3 | **79** |
| Hugo | 5 | 4 | 3 | **77** |
| Next.js export | 3 | 3 | 2 | **52** |

**Why each score**
- **Astro Q5:** Zero JS, built-in `<Picture>`, Fonts and CSP APIs. All targets can be met without extra packages [[10]][[4]][[11]].
- **Astro R3:** Well-funded full-time team [[1]], but 5 majors in about 3 years, only one prior major gets security fixes [[5]], and the dependency tree is the largest of the JS SSGs here [[7]].
- **Astro M5:** Image pipeline and i18n come in one package [[9]][[10]], the docs are very good, and the community and AI familiarity are the largest of the SSGs [[55]].
- **Eleventy Q5:** Zero JS, HTML in and out, and the image transform works directly on hand-written `<img>` [[18]][[29]].
- **Eleventy R4:** Long-lived v3 line that is still patched, small and shrinking dependency tree, no advisories [[20]][[24]][[31]]. It loses a point for single-lead governance and the rename and Kickstarter uncertainty [[21]][[32]].
- **Eleventy M4:** Simple, with bundled i18n [[27]]. It loses a point for a smaller community, a separate image package and the choice of template language.
- **Plain HTML Q4:** Output is ideal, but image optimization is manual and easy to skip.
- **Plain HTML R5:** Nothing to break.
- **Plain HTML M3:** Fine now. Four duplicated pages in phase 2.
- **Hugo Q5:** Zero JS plus built-in images [[38]].
- **Hugo R4:** Single binary and no npm, but 0.x with breaking minor releases [[33]][[34]].
- **Hugo M3:** Best i18n [[37]], but Go templates are hard to hand to a non-expert.
- **Next Q3:** Unneeded runtime JS, and no image optimization in export [[42]].
- **Next R3:** Good LTS [[44]], offset by a ~300 MB install and constant security releases [[47]][[48]].
- **Next M2:** JSX rewrite of the design system, and no static-friendly i18n routing [[43]].

**Sensitivity:** Raise robustness to 50 (with maintenance at 30 and quality at 20) and Eleventy wins 87 to 81, with plain HTML at 82. The decision depends on how you trade churn against ecosystem size.

---

## Recommendation

**Choose Astro 7.x with `output: 'static'`.**

**Why**
1. **One package covers phase 1 and phase 2:** shared layouts and partials, built-in i18n routing for `/hi/`, `/ta/` and `/te/` [[9]], and a built-in image pipeline that protects the 1.5 MB budget [[10]].
2. **The design system goes in nearly untouched:** `.astro` is HTML plus a frontmatter fence. The vanilla JS stays vanilla through `<script>` or `is:inline` [[12]].
3. **Best odds for a future part-timer or AI assistant:** a much larger community than Eleventy [[55]][[56]], strong docs, and agent-aware tooling [[3]].
4. **Lowest bus-factor risk among the SSGs:** a full-time team at Cloudflare under MIT and open governance [[1]].
5. **Output is plain files**, so the host can change at any time.

**What would change the decision**
- **Switch to Eleventy** if you want the fewest upgrades and the most literal HTML handling, or if Astro's v7 strict parsing or whitespace changes cause friction when porting the design system [[3]], or if Astro announces another breaking major within months.
- **Stay on plain HTML** if phase 2 i18n is dropped or deferred for more than a year, and someone commits to optimizing images by hand.
- **Reconsider Astro** if Cloudflare changes Astro's license or governance, or makes it favor Cloudflare hosting in ways that hurt portability. Watch the Astro blog [[2]].
- **Consider a hosted builder** if, after 6 months, nobody can run a build.

**Mitigations for Astro's main risks**

| Risk | Mitigation |
|---|---|
| Major-version churn | Pin exact versions (`"astro": "7.4.2"`, no `^`) and commit the lockfile. Upgrade deliberately once a year at most, using `npx @astrojs/upgrade` and the upgrade guide [[3]]. A static site has no runtime, so staying on an older version is safe. |
| Renovate or Dependabot noise | **Don't enable automatic dependency PRs.** A volunteer can't triage weekly majors. At most, enable GitHub security alerts and act only on advisories that affect build-time code. |
| Server-side advisories [[14]] | Use static output only. No adapter, no `/_image` endpoint (images are optimized at build time), and no View Transitions. Then most 2026 advisories don't apply. |
| v7 strict parsing / whitespace [[3]][[6]] | When porting, validate the design-system markup and either add explicit `{' '}` or set `compressHTML` to keep the old whitespace behavior. Check visually against the Claude Design reference. |
| sharp on Windows and Linux hosts [[51]] | Run `npm ci` and `npm run build` in a clean Linux CI job (GitHub Actions) before relying on host builds. If that fails, commit pre-optimized images and use `passthroughImageService()` [[10]]. |
| Node floor | Build on Node 24, which meets `>=22.23.4` [[8]] and is supported until 2028-04-30. Node 24 entered Maintenance LTS on 2026-10-20, and Node 26 becomes Active LTS on 2026-10-28 [[52]]. Pin the version in `.nvmrc` and in the host settings. |
| Telemetry | Set `ASTRO_TELEMETRY_DISABLED=1` in CI and run `astro telemetry disable` locally [[13]]. |
| Host lock-in | Use no adapter and no host-specific features. Keep redirects and headers in plain `_headers` / `_redirects` or the host's config, so `dist/` deploys anywhere. |
| No tech owner | Keep everything an admin changes a few times a year (aarti times, hours, sevas, links) in one `src/data/site.json` with a short "how to edit" note. Keep events and the raised figure in the Google Sheet CSV, fetched in the browser as today. |

---

## Hosting note

| Host | Fit | 2025 to 2026 facts to know |
|---|---|---|
| **Cloudflare (Workers static assets)** | Best | The Pages docs now carry a banner: "Start new projects with Workers", calling Workers "Cloudflare's primary platform" [[58]]. Static asset requests on Workers are "free and unlimited" [[59]]. Pages is not stated to be deprecated, and its Free plan lists 500 deploys a month [[58]][[60]]. |
| **Netlify Free** | OK with care | Credit-based: 300 credits a month with a hard limit and no auto-recharge [[63]]. Bandwidth costs 20 credits per GB and a production deploy costs 15 credits [[64]]. With nothing else running, that's roughly 15 GB a month or 20 deploys. The docs don't say exactly what happens at the limit. |
| **Vercel Hobby** | Check first | Restricted to "non-commercial personal use". "Asking for Donations does not fall under commercial usage", but "any method of requesting or processing payment from visitors" does [[62]][[61]]. The PayPal seva hand-off is donation-like, so confirm with Vercel support before using Hobby. |

Astro's static `dist/` folder works unchanged on all three.

---

## Not verified

Astro's and Next.js's total transitive dependency counts, Next.js first-load JS size for this page, the final Build Awesome Kickstarter amount and v4 date, Hugo's 2026 funding and governance, and whether Hugo encodes AVIF. Also not verified: Cloudflare Workers free-plan file count and size limits, and what Netlify Free does when credits run out. Neither was stated on the pages fetched.

---

## Sources

1. Astro blog, "The Astro Technology Company joins Cloudflare" (2026-01-16): https://astro.build/blog/joining-cloudflare/
2. Astro blog RSS (release dates for 6.0 through 7.4): https://astro.build/rss.xml
3. Astro 7.0 release post: https://astro.build/blog/astro-7/
4. Astro 6.0 release post: https://astro.build/blog/astro-6/
5. Astro docs, Upgrade Astro (support policy): https://docs.astro.build/en/upgrade-astro/
6. Astro docs, Upgrade to v7: https://docs.astro.build/en/guides/upgrade-to/v7/
7. npm registry, astro latest: https://registry.npmjs.org/astro/latest
8. astro@7.4.2 package.json (engines): https://unpkg.com/astro@7.4.2/package.json
9. Astro docs, Internationalization: https://docs.astro.build/en/guides/internationalization/
10. Astro docs, Images: https://docs.astro.build/en/guides/images/
11. Astro docs, Why Astro: https://docs.astro.build/en/concepts/why-astro/
12. Astro docs, Client-side scripts: https://docs.astro.build/en/guides/client-side-scripts/
13. Astro telemetry: https://astro.build/telemetry/
14. withastro/astro security advisories: https://github.com/withastro/astro/security/advisories
15. Astro 3.0: https://astro.build/blog/astro-3/
16. Astro 4.0: https://astro.build/blog/astro-4/
17. Astro 5.0: https://astro.build/blog/astro-5/
18. Eleventy home page: https://www.11ty.dev/
19. npm registry, @11ty/eleventy latest: https://registry.npmjs.org/@11ty/eleventy/latest
20. Eleventy / Build Awesome releases: https://github.com/11ty/eleventy/releases
21. Eleventy blog, "Eleventy is now Build Awesome" (2026-03-03): https://www.11ty.dev/blog/build-awesome/
22. Eleventy blog feed: https://www.11ty.dev/blog/feed.xml
23. Eleventy blog, New Sponsorship Tiers (2026-05-13): https://www.11ty.dev/blog/sponsorship-tiers/
24. Eleventy, 2025 in Review: https://www.11ty.dev/blog/review-2025/
25. Eleventy blog, "11ty is joining Font Awesome": https://www.11ty.dev/blog/eleventy-font-awesome/
26. Eleventy v3.0.0: https://www.11ty.dev/blog/eleventy-v3/
27. Eleventy i18n plugin: https://www.11ty.dev/docs/plugins/i18n/
28. Eleventy i18n guide: https://www.11ty.dev/docs/i18n/
29. Eleventy Image: https://www.11ty.dev/docs/plugins/image/
30. Eleventy HTML template language: https://www.11ty.dev/docs/languages/html/
31. 11ty/buildawesome security: https://github.com/11ty/buildawesome/security
32. (Secondary) "Font Awesome cans renaming plans for Eleventy": https://disassociated.com/font-awesome-cans-eleventy-renaming/
33. Hugo releases: https://github.com/gohugoio/hugo/releases
34. Hugo v0.146.0 release: https://github.com/gohugoio/hugo/releases/tag/v0.146.0
35. Hugo GitHub repo: https://github.com/gohugoio/hugo
36. Hugo, Windows installation: https://gohugo.io/installation/windows/
37. Hugo, Multilingual: https://gohugo.io/content-management/multilingual/
38. Hugo, Image processing: https://gohugo.io/content-management/image-processing/
39. Hugo, Introduction: https://gohugo.io/about/introduction/
40. npm registry, next: https://registry.npmjs.org/next/latest and https://registry.npmjs.org/next/16.4.2
41. npm registry, @next/swc-win32-x64-msvc 16.4.2: https://registry.npmjs.org/@next/swc-win32-x64-msvc/16.4.2
42. Next.js docs, Static Exports: https://nextjs.org/docs/app/guides/static-exports
43. Next.js docs, Internationalization: https://nextjs.org/docs/app/guides/internationalization
44. Next.js Support Policy: https://nextjs.org/support-policy
45. Vercel, Postmortem on Next.js middleware bypass: https://vercel.com/blog/postmortem-on-next-js-middleware-bypass
46. Next.js, CVE-2025-66478: https://nextjs.org/blog/CVE-2025-66478
47. Next.js, September 2026 Security Release: https://nextjs.org/blog/september-2026-security-release
48. Next.js, October 14 2026 Security Update: https://nextjs.org/blog/nextjs-security-update-october-14-2026
50. SvelteKit docs, adapter-static: https://svelte.dev/docs/kit/adapter-static
51. sharp, Installation: https://sharp.pixelplumbing.com/install/
52. Node.js Release schedule: https://github.com/nodejs/Release
53. web.dev, Largest Contentful Paint: https://web.dev/articles/lcp
54. W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
55. npm downloads API, astro and next (2026-10-12 to 18): https://api.npmjs.org/downloads/point/last-week/astro,next
56. npm downloads API, @11ty/eleventy: https://api.npmjs.org/downloads/point/last-week/@11ty/eleventy
57. npm downloads API, @sveltejs/kit: https://api.npmjs.org/downloads/point/last-week/@sveltejs/kit
58. Cloudflare Pages docs: https://developers.cloudflare.com/pages/
59. Cloudflare Workers static assets, billing and limitations: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
60. Cloudflare, Migrate from Pages to Workers: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
61. Vercel Hobby plan: https://vercel.com/docs/plans/hobby
62. Vercel Fair Use Guidelines: https://vercel.com/docs/limits/fair-use-guidelines
63. Netlify, Credit-based pricing plans: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
64. Netlify pricing: https://www.netlify.com/pricing/
65. Squarespace pricing: https://www.squarespace.com/pricing
66. WordPress.com pricing: https://wordpress.com/pricing/
67. Cloudflare press release (Business Wire, 2026-01-16): https://www.businesswire.com/news/home/20260116386991/en

[1]: https://astro.build/blog/joining-cloudflare/
[2]: https://astro.build/rss.xml
[3]: https://astro.build/blog/astro-7/
[4]: https://astro.build/blog/astro-6/
[5]: https://docs.astro.build/en/upgrade-astro/
[6]: https://docs.astro.build/en/guides/upgrade-to/v7/
[7]: https://registry.npmjs.org/astro/latest
[8]: https://unpkg.com/astro@7.4.2/package.json
[9]: https://docs.astro.build/en/guides/internationalization/
[10]: https://docs.astro.build/en/guides/images/
[11]: https://docs.astro.build/en/concepts/why-astro/
[12]: https://docs.astro.build/en/guides/client-side-scripts/
[13]: https://astro.build/telemetry/
[14]: https://github.com/withastro/astro/security/advisories
[15]: https://astro.build/blog/astro-3/
[16]: https://astro.build/blog/astro-4/
[17]: https://astro.build/blog/astro-5/
[18]: https://www.11ty.dev/
[19]: https://registry.npmjs.org/@11ty/eleventy/latest
[20]: https://github.com/11ty/eleventy/releases
[21]: https://www.11ty.dev/blog/build-awesome/
[22]: https://www.11ty.dev/blog/feed.xml
[23]: https://www.11ty.dev/blog/sponsorship-tiers/
[24]: https://www.11ty.dev/blog/review-2025/
[25]: https://www.11ty.dev/blog/eleventy-font-awesome/
[26]: https://www.11ty.dev/blog/eleventy-v3/
[27]: https://www.11ty.dev/docs/plugins/i18n/
[28]: https://www.11ty.dev/docs/i18n/
[29]: https://www.11ty.dev/docs/plugins/image/
[30]: https://www.11ty.dev/docs/languages/html/
[31]: https://github.com/11ty/buildawesome/security
[32]: https://disassociated.com/font-awesome-cans-eleventy-renaming/
[33]: https://github.com/gohugoio/hugo/releases
[34]: https://github.com/gohugoio/hugo/releases/tag/v0.146.0
[35]: https://github.com/gohugoio/hugo
[36]: https://gohugo.io/installation/windows/
[37]: https://gohugo.io/content-management/multilingual/
[38]: https://gohugo.io/content-management/image-processing/
[39]: https://gohugo.io/about/introduction/
[40]: https://registry.npmjs.org/next/16.4.2
[41]: https://registry.npmjs.org/@next/swc-win32-x64-msvc/16.4.2
[42]: https://nextjs.org/docs/app/guides/static-exports
[43]: https://nextjs.org/docs/app/guides/internationalization
[44]: https://nextjs.org/support-policy
[45]: https://vercel.com/blog/postmortem-on-next-js-middleware-bypass
[46]: https://nextjs.org/blog/CVE-2025-66478
[47]: https://nextjs.org/blog/september-2026-security-release
[48]: https://nextjs.org/blog/nextjs-security-update-october-14-2026
[50]: https://svelte.dev/docs/kit/adapter-static
[51]: https://sharp.pixelplumbing.com/install/
[52]: https://github.com/nodejs/Release
[53]: https://web.dev/articles/lcp
[54]: https://www.w3.org/TR/WCAG22/
[55]: https://api.npmjs.org/downloads/point/last-week/astro,next
[56]: https://api.npmjs.org/downloads/point/last-week/@11ty/eleventy
[57]: https://api.npmjs.org/downloads/point/last-week/@sveltejs/kit
[58]: https://developers.cloudflare.com/pages/
[59]: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
[60]: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
[61]: https://vercel.com/docs/plans/hobby
[62]: https://vercel.com/docs/limits/fair-use-guidelines
[63]: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
[64]: https://www.netlify.com/pricing/
[65]: https://www.squarespace.com/pricing
[66]: https://wordpress.com/pricing/
[67]: https://www.businesswire.com/news/home/20260116386991/en
