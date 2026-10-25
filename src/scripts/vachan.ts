// Baba's eleven assurances: start on the day's (temple date), crossfade every data-interval ms with a visible
// Pause; pause on hover and focus; Previous or Next stop it; still under reduced motion. Port of the DS vachan().
import { templeNow } from '../lib/time';

export function startVachan(root: HTMLElement) {
  const items = [...root.querySelectorAll<HTMLElement>('.sd-vachan__item')];
  if (items.length < 2) return;
  const list = root.querySelector('.sd-vachan__list');
  const num = root.querySelector('[data-sd-vachan-n]');
  const bar = root.querySelector<HTMLElement>('.sd-vachan__bar');
  const pause = root.querySelector<HTMLButtonElement>('.sd-vachan__pause');
  const every = Number(root.dataset.interval) || 9000;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dayIndex = Math.floor(Date.parse(`${templeNow().ymd}T00:00:00Z`) / 864e5);
  let current = dayIndex % items.length;
  let timer: ReturnType<typeof setInterval> | null = null;
  let held = false;

  function show(i: number, announce: boolean) {
    current = (i + items.length) % items.length;
    items.forEach((it, k) => it.classList.toggle('is-current', k === current));
    if (num) num.textContent = String(current + 1);
    list?.setAttribute('aria-live', announce ? 'polite' : 'off');
  }
  function label(playing: boolean) {
    if (!pause) return;
    pause.setAttribute('aria-pressed', playing ? 'false' : 'true');
    pause.querySelector('span')!.textContent = playing ? 'Pause' : 'Play';
    const [pauseIc, playIc] = pause.querySelectorAll<SVGElement>('.sd-ic');
    if (pauseIc) pauseIc.style.display = playing ? '' : 'none';
    if (playIc) playIc.style.display = playing ? 'none' : '';
  }
  function play() {
    if (reduce || timer) return;
    timer = setInterval(() => { if (!held) show(current + 1, false); }, every);
    label(true);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
    label(false);
  }

  root.classList.add('is-ready');
  if (bar) bar.hidden = false;
  if (pause) {
    pause.hidden = reduce;
    pause.addEventListener('click', () => (timer ? stop() : play()));
  }
  root.querySelectorAll<HTMLElement>('[data-dir]').forEach((b) => b.addEventListener('click', () => {
    stop();
    show(current + (b.dataset.dir === 'prev' ? -1 : 1), true);
  }));
  root.addEventListener('pointerenter', () => { held = true; });
  root.addEventListener('pointerleave', () => { held = false; });
  root.addEventListener('focusin', () => { held = true; });
  root.addEventListener('focusout', () => { held = false; });
  show(current, false);
  play();
}
