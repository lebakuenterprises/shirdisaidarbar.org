// Static output, no adapter: see docs/adr/0001-static-astro-site.md
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://shirdisaidarbar.org',
  output: 'static',
  trailingSlash: 'ignore',
});
