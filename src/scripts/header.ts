// Header behaviour: the Day/Night switch, closing the Menu after a pick, and lighting the section being read.

export function startTheme(button: HTMLButtonElement) {
  const root = document.documentElement;
  const meta = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  const apply = (t: 'day' | 'night') => {
    root.dataset.theme = t;
    button.setAttribute('aria-label', t === 'day' ? 'Switch to the night theme' : 'Switch to the day theme');
    meta.forEach((m) => { m.content = t === 'day' ? '#FBF7EF' : '#140E0B'; m.removeAttribute('media'); });
  };
  apply(root.dataset.theme === 'night' ? 'night' : 'day');
  button.addEventListener('click', () => {
    const t = root.dataset.theme === 'night' ? 'day' : 'night';
    apply(t);
    try { localStorage.setItem('sd-theme', t); } catch { /* private mode: the switch still works for this visit */ }
  });
  // Follow the device while the visitor has not chosen.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let chosen: string | null = null;
    try { chosen = localStorage.getItem('sd-theme'); } catch { /* ignore */ }
    if (!chosen) apply(e.matches ? 'night' : 'day');
  });
}

export function startMenu(menu: HTMLDetailsElement) {
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { menu.open = false; }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); } });
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target as Node)) menu.open = false; });
}

export function startScrollSpy() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-spy]')];
  const ids = [...new Set(links.map((a) => a.dataset.spy!))];
  const sections = ids.map((id) => document.getElementById(id)).filter((s): s is HTMLElement => !!s);
  if (!sections.length) return;
  const mark = (id: string | null) => links.forEach((a) => (a.dataset.spy === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible) mark(visible.target.id);
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => io.observe(s));
  // Back at the hero, no section is current.
  const hero = document.querySelector('.sd-sannidhi');
  if (hero) new IntersectionObserver(([e]) => { if (e?.isIntersecting) mark(null); }, { rootMargin: '-40% 0px -55% 0px' }).observe(hero);
}
