# Google Sheet as the Event and meter source, read in the browser

The admin who posts Events (Ashok) is non-technical and works from a phone, and there is no developer in the loop. Events and the Temple construction "raised" figure live in one Google Sheet: a Google Form feeds the Events tab, and the Settings tab is edited by hand. Both tabs are published to the web as CSV, and the visitor's browser fetches them at page load. An edit appears within about 5 minutes with no rebuild or deploy.

## Considered options

- **Fetch at build time and rebuild on a schedule:** Events would be in the HTML (better SEO, works without JS), but it needs a cron or deploy hook and a host to run it.
- **Git-based CMS (Decap, TinaCMS):** needs a GitHub login and an understanding of commits, which is too much for the admin.
- **Hosted CMS:** another account, another bill, and another thing to break.

## Consequences

- Events are not in the initial HTML, so they don't show up in search results or in Event structured data. That can be added later with a build-time snapshot.
- The page must handle loading, empty and "could not load" states, and must hide past Events itself (end dates are compared in Pacific time).
- Anyone can read the published Sheet. Never put private data in it.
