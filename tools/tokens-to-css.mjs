// Compiles design-system/tokens.json into src/styles/tokens.css, following the design system's
// documented tokens.css shape (format.md): first-theme colours on :root, a block per further theme,
// non-colour tokens on :root, one class per type style. Night also follows prefers-color-scheme.
// Run: node tools/tokens-to-css.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const src = new URL('../design-system/tokens.json', import.meta.url);
const out = new URL('../src/styles/tokens.css', import.meta.url);
const t = JSON.parse(readFileSync(src, 'utf8'));

const [first, ...others] = t.color.themes.map((th) => th.id);
const alias = (v) => (typeof v === 'string' && /^\{.+\}$/.test(v) ? `var(--${v.slice(1, -1)})` : v);
const valueFor = (value, theme) => alias(typeof value === 'object' ? value[theme] ?? value[first] : value);
const themed = [...t.color.tokens, ...(t.shadow?.tokens ?? [])];
const block = (sel, theme) =>
  `${sel} {\n${themed.map((tok) => `  --${tok.name}: ${valueFor(tok.value, theme)};`).join('\n')}\n}`;

const plain = ['spacing', 'radius', 'layout', 'breakpoint', 'duration', 'easing', 'zIndex']
  .flatMap((fam) => t[fam]?.tokens ?? [])
  .map((tok) => `  --${tok.name.replace(/\./g, '\\.')}: ${tok.value};`);
const fonts = Object.entries(t.type.families).map(([k, v]) => `  --font-${k}: ${v};`);

const px = (v) => (typeof v === 'number' ? `${v}px` : v);
const styles = t.type.groups.flatMap((g) =>
  g.styles.map((s) => {
    const decl = [
      `font-family: var(--font-${s.family ?? g.family})`,
      `font-size: ${px(s.fontSize)}`,
      s.lineHeight != null && `line-height: ${px(s.lineHeight)}`,
      s.fontWeight != null && `font-weight: ${s.fontWeight}`,
      s.fontStyle && `font-style: ${s.fontStyle}`,
      s.letterSpacing && `letter-spacing: ${px(s.letterSpacing)}`,
    ].filter(Boolean);
    return `.${s.name} { ${decl.join('; ')}; }`;
  }),
);

const css = [
  `/* ${t.name} — generated from tokens.json by tools/tokens-to-css.mjs. Do not edit. */`,
  block(`:root, [data-theme="${first}"]`, first),
  ...others.map((th) => block(`[data-theme="${th}"]`, th)),
  ...others.slice(0, 1).map((th) =>
    `@media (prefers-color-scheme: dark) {\n${block(`  :root:not([data-theme="${first}"])`, th).replace(/\n/g, '\n  ')}\n  :root:not([data-theme="${first}"]) { color-scheme: dark; }\n}`,
  ),
  `:root {\n${[...plain, ...fonts].join('\n')}\n}`,
  ...styles,
  '',
].join('\n\n');

writeFileSync(out, css);
console.log(`wrote ${out.pathname} (${themed.length} themed, ${plain.length + fonts.length} plain, ${styles.length} styles)`);
