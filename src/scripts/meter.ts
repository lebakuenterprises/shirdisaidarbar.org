// Temple construction meter: fetch the Settings CSV; stays hidden when "raised" is blank or the Sheet is unreachable.
import { meter, parseSettings } from '../lib/settings';
import { fetchText } from './fetch-text';

const dollars = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
const millions = (n: number) => `$${(n / 1e6).toFixed(n % 1e6 ? 2 : 0).replace(/\.?0+$/, '')} million`;

export async function startMeter(el: HTMLElement) {
  if (!el.dataset.src) return;
  try {
    const m = meter(parseSettings(await fetchText(el.dataset.src)), Number(el.dataset.goal));
    if (!m) return;
    el.querySelector('[data-f="raised"]')!.textContent = dollars(m.raised);
    el.querySelector('[data-f="pct"]')!.textContent = `${m.pct}% of the immediate goal`;
    const track = el.querySelector<HTMLElement>('[role="meter"]')!;
    track.setAttribute('aria-valuemax', String(m.goal));
    track.setAttribute('aria-valuenow', String(m.raised));
    track.setAttribute('aria-valuetext', `${millions(m.raised)} raised of ${millions(m.goal)}, ${m.pct} percent`);
    el.querySelector<HTMLElement>('.sd-meter__fill')!.style.setProperty('--pct', `${m.pct}%`);
    el.hidden = false;
  } catch {
    // The appeal still reads well without the meter.
  }
}
