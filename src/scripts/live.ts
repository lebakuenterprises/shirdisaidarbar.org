// Keeps the page's sense of time current from the Schedule: the day line, this week's hours,
// the live note and the hero buttons. Port of the design system's hydrate(), with several open windows per day.
import scheduleJson from '../data/schedule.json';
import { pctAt, stateSentence } from '../lib/dayline';
import { status, type Schedule } from '../lib/schedule';
import { formatTime, templeNow, toMinutes } from '../lib/time';

const schedule = scheduleJson as Schedule;

function setText(root: ParentNode, sel: string, text: string) {
  const el = root.querySelector(sel);
  if (el && el.textContent !== text) el.textContent = text;
}

export function hydrate(root: ParentNode = document, date?: Date) {
  const s = status(schedule, date);
  const now = templeNow(date);
  const live = s.state === 'live';
  const nextAt = `${formatTime(s.next.aarti.time)}${s.next.tomorrow ? ' tomorrow' : ''}`;

  root.querySelectorAll<HTMLElement>('[data-sd-today]').forEach((t) => {
    t.classList.toggle('is-live', live);
    t.classList.toggle('is-closed', s.state === 'closed');
    t.classList.toggle('is-soon', s.soon);
    setText(t, '[data-f="say"]', stateSentence(s));

    // The thread: today's open hours, the elapsed part, and the lamp at now. Before dawn or after close the lamp rests at an end.
    t.querySelectorAll<HTMLElement>('.sd-dayline__bands').forEach((b) => { b.hidden = !b.dataset.days!.split(' ').includes(String(now.day)); });
    const at = `${pctAt(now.minutes)}%`;
    t.querySelectorAll<HTMLElement>('.sd-dayline__elapsed, .sd-dayline__lamp').forEach((el) => el.style.setProperty('--now', at));
    const lamp = t.querySelector<HTMLElement>('.sd-dayline__lamp');
    if (lamp) lamp.hidden = false;
    // Lamp light marks only what is now or next; every other diya rests.
    t.querySelectorAll<HTMLElement>('.sd-dayline__stop').forEach((stop) => {
      const isNext = stop.dataset.t === (live ? s.current!.time : s.next.aarti.time) && !(s.next.tomorrow && !live);
      stop.classList.toggle('is-next', isNext);
      stop.classList.toggle('is-past', toMinutes(stop.dataset.t!) < now.minutes && !isNext);
      stop.querySelector('.sd-flame')?.classList.toggle('is-lit', isNext && (s.soon || live));
    });
  });

  root.querySelectorAll<HTMLElement>('[data-sd-week] [data-day]').forEach((d) => {
    const today = d.dataset.day === String(now.day);
    d.classList.toggle('is-today', today);
    if (today) d.setAttribute('aria-current', 'date');
    else d.removeAttribute('aria-current');
  });

  setText(root, '[data-f="live-next"]', live
    ? `Live now: ${s.current!.name}.`
    : `Not live right now? The next stream is ${s.next.aarti.name} at ${nextAt}.`);

  // Within soonMinutes of an Aarti, or while live, Watch live becomes the primary hero button.
  const watchFirst = s.soon || live;
  root.querySelectorAll<HTMLElement>('[data-sd-cta]').forEach((b) => {
    const primary = (b.dataset.sdCta === 'watch') === watchFirst;
    b.classList.toggle('sd-btn--glow', primary);
    b.classList.toggle('sd-btn--ghost', !primary);
  });
}

export function startLive() {
  hydrate();
  document.documentElement.classList.add('is-live-ready');
  setInterval(() => hydrate(), 30_000);
}
