// Events: dated, one-off happenings from the Sheet's Events tab (fed by the Google Form). See docs/adr/0002.
import { parseCsv, rowsToRecords } from './csv';
import { parseDate, parseTime, templeNow, type Hhmm, type Ymd } from './time';

export interface SdEvent {
  /** Anchor id, e.g. "event-diwali-lakshmi-puja-2026-11-08" */
  id: string;
  title: string;
  start: Ymd;
  startTime?: Hhmm;
  /** Last day shown; the Event hides the day after. */
  end: Ymd;
  endTime?: Hhmm;
  description: string;
  flyer?: string;
  whatsappGroup?: string;
  /** Google Form or the Event's Paybee Sponsorship link */
  signup?: string;
  pinned: boolean;
}

export const MAX_EVENTS = 6;

const slug = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** An http(s) link, or a path on this site (for flyers kept in public/). */
function httpUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  if (/^\/(?!\/)/.test(raw)) return raw;
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : undefined;
  } catch {
    return undefined;
  }
}

/** Sheet CSV -> Events. Rows missing a title, a start date or a valid end date are left out. */
export function parseEvents(csv: string): SdEvent[] {
  const out: SdEvent[] = [];
  for (const r of rowsToRecords(parseCsv(csv))) {
    const title = r['title'] ?? '';
    const start = parseDate(r['start date'] ?? '');
    const endRaw = parseDate(r['end date'] ?? '');
    if (!title || !start || !endRaw) continue;
    const startTime = parseTime(r['start time'] ?? '') ?? undefined;
    const endTime = parseTime(r['end time'] ?? '') ?? undefined;
    const e: SdEvent = {
      id: `event-${slug(title)}-${start}`,
      title,
      start,
      end: endRaw < start ? start : endRaw,
      description: r['description'] ?? '',
      pinned: /^(yes|y|true|1)$/i.test(r['pin to top'] ?? ''),
    };
    if (startTime) e.startTime = startTime;
    if (endTime) e.endTime = endTime;
    const flyer = httpUrl(r['flyer image link']);
    const whatsappGroup = httpUrl(r['whatsapp group link']);
    const signup = httpUrl(r['signup or sponsor link']);
    if (flyer) e.flyer = flyer;
    if (whatsappGroup) e.whatsappGroup = whatsappGroup;
    if (signup) e.signup = signup;
    out.push(e);
  }
  return out;
}

/** Events still showing today (temple date): pinned first, then by start date and time, six at most. */
export function visibleEvents(events: SdEvent[], date?: Date): SdEvent[] {
  const today = templeNow(date).ymd;
  const key = (e: SdEvent) => `${e.start}T${e.startTime ?? ''}`;
  return events
    .filter((e) => e.end >= today)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || key(a).localeCompare(key(b)))
    .slice(0, MAX_EVENTS);
}
