// Upcoming events: fetch the Events CSV, then show cards, the empty state or the could-not-load notice.
import { parseEvents, visibleEvents, type SdEvent } from '../lib/events';
import { buildIcs } from '../lib/ics';
import { fullAddress, site } from '../lib/site';
import { addDays, dateTile, formatDateLong, formatTime, templeNow } from '../lib/time';
import { fetchText } from './fetch-text';

type State = 'loading' | 'list' | 'empty' | 'error';

function show(root: HTMLElement, state: State) {
  root.querySelectorAll<HTMLElement>('[data-state]').forEach((el) => { el.hidden = el.dataset.state !== state; });
}

function setLink(a: HTMLAnchorElement, url: string | undefined) {
  if (url) a.href = url;
  else a.remove();
}

function downloadIcs(e: SdEvent) {
  const blob = new Blob([buildIcs(e, { location: `${site.name}, ${fullAddress}`, url: `${site.url}/#${e.id}` })], { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${e.id}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function card(tpl: HTMLTemplateElement, e: SdEvent, today: string): HTMLElement {
  const el = (tpl.content.firstElementChild as HTMLElement).cloneNode(true) as HTMLElement;
  const f = (name: string) => el.querySelector<HTMLElement>(`[data-f="${name}"]`)!;
  const tile = dateTile(e.start);
  el.id = e.id;
  el.classList.toggle('is-pinned', e.pinned);
  f('month').textContent = tile.month;
  f('day').textContent = tile.day;
  f('weekday').textContent = tile.weekday;

  const tag = e.start <= today ? 'Today' : e.start <= addDays(today, 6) ? 'This week' : '';
  if (tag) f('tag').textContent = tag;
  else f('tag').remove();

  const title = f('title') as HTMLAnchorElement;
  title.textContent = e.title;
  title.href = `#${e.id}`;
  const date = f('date');
  date.textContent = e.end > e.start ? `${formatDateLong(e.start)} to ${formatDateLong(e.end)}` : formatDateLong(e.start);
  date.setAttribute('datetime', e.start);
  if (e.startTime) f('time').textContent = e.endTime ? `${formatTime(e.startTime)} to ${formatTime(e.endTime)}` : formatTime(e.startTime);
  else f('time-wrap').remove();
  f('description').textContent = e.description;

  el.querySelector('[data-a="calendar"]')!.addEventListener('click', () => downloadIcs(e));
  setLink(el.querySelector('[data-a="whatsapp"]')!, e.whatsappGroup);
  setLink(el.querySelector('[data-a="signup"]')!, e.signup);
  if (e.signup && !/paybee\.io/.test(e.signup)) f('signup-label').textContent = 'Sign up';
  setLink(el.querySelector('[data-a="flyer"]')!, e.flyer);
  return el;
}

// The doorway's crown, as in src/components/DoorwayFrame.astro (static markup, no data in it).
const CROWN = '<svg class="sd-doorframe__crown" viewBox="0 0 160 40" aria-hidden="true" focusable="false"><path d="M0 39.5C34 39.5 52 36 66 24C72 19 76 15 80 10C84 15 88 19 94 24C108 36 126 39.5 160 39.5"></path><path d="M30 39.5C48 38 59 33 68 27C73 23.5 77 20.5 80 17C83 20.5 87 23.5 92 27C101 33 112 38 130 39.5"></path><circle cx="80" cy="4.5" r="2.5"></circle></svg>';

/** The week's big thing: the first visible event, full width, with its flyer shown whole when it has one. */
function feature(el: HTMLElement, e: SdEvent): HTMLElement {
  el.classList.add('sd-event--feature');
  if (e.flyer) {
    const fig = document.createElement('figure');
    fig.className = 'sd-event__flyer';
    const img = document.createElement('img');
    img.src = e.flyer;
    img.alt = `Flyer for ${e.title}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => fig.remove());
    // Tall flyers sit in the Dwarkamai arch; wider ones in the Darbar doorway, so no shape is forced on them.
    const shape = () => fig.classList.add(img.naturalHeight / img.naturalWidth > 1.2 ? 'is-arch' : 'sd-doorframe');
    if (img.complete && img.naturalWidth) shape(); else img.addEventListener('load', shape, { once: true });
    fig.insertAdjacentHTML('afterbegin', CROWN);
    fig.append(img);
    // Before the actions, so on phones the flyer stays with its card's words.
    el.querySelector('.sd-event__actions')!.before(fig);
  }
  return el;
}

export async function startEvents(root: HTMLElement) {
  const src = root.dataset.src;
  if (!src) return show(root, 'empty');
  try {
    const events = visibleEvents(parseEvents(await fetchText(src)));
    if (!events.length) return show(root, 'empty');
    const tpl = root.querySelector<HTMLTemplateElement>('template[data-event-card]')!;
    const today = templeNow().ymd;
    const [first, ...rest] = events;
    // Lamp light marks only the next event (the soonest), wherever it sits; every other card rests.
    const key = (e: SdEvent) => `${e.start}T${e.startTime ?? ''}`;
    const nextId = [...events].sort((a, b) => key(a).localeCompare(key(b)))[0]!.id;
    const lit = (el: HTMLElement, e: SdEvent) => { el.classList.toggle('is-next', e.id === nextId); return el; };
    root.querySelector('[data-f="featured"]')!.replaceChildren(lit(feature(card(tpl, first!, today), first!), first!));
    root.querySelector('[data-f="grid"]')!.replaceChildren(...rest.map((e) => lit(card(tpl, e, today), e)));
    show(root, 'list');
    // A WhatsApp link to /#event-... arrives before the card exists; scroll once it does.
    if (location.hash.startsWith('#event-')) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch {
    show(root, 'error');
  }
}
