// "Add to calendar": a one-event iCalendar file (RFC 5545), built in the browser so the site stores nothing.
import type { SdEvent } from './events';
import { addDays, toMinutes, zonedToUtc } from './time';

const utc = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Folds a content line to at most 75 octets, continuing with a leading space. */
function fold(line: string): string[] {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = '';
  for (const ch of line) {
    const limit = out.length ? 74 : 75;
    if (enc.encode(cur + ch).length > limit) { out.push(cur); cur = ch; }
    else cur += ch;
  }
  out.push(cur);
  return out.map((l, i) => (i ? ` ${l}` : l));
}

export function buildIcs(e: SdEvent, opts: { location: string; url: string; now?: Date }): string {
  let when: string[];
  if (e.startTime) {
    const start = zonedToUtc(e.start, e.startTime);
    const end = e.endTime && (e.end > e.start || toMinutes(e.endTime) > toMinutes(e.startTime))
      ? zonedToUtc(e.end, e.endTime)
      : new Date(start.getTime() + 36e5);
    when = [`DTSTART:${utc(start)}`, `DTEND:${utc(end)}`];
  } else {
    when = [`DTSTART;VALUE=DATE:${e.start.replace(/-/g, '')}`, `DTEND;VALUE=DATE:${addDays(e.end, 1).replace(/-/g, '')}`];
  }
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shirdi Sai Darbar//Events//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.id}@shirdisaidarbar.org`,
    `DTSTAMP:${utc(opts.now ?? new Date())}`,
    ...when,
    `SUMMARY:${escape(e.title)}`,
    ...(e.description ? [`DESCRIPTION:${escape(e.description)}`] : []),
    `LOCATION:${escape(opts.location)}`,
    `URL:${opts.url}`,
    'END:VEVENT', 'END:VCALENDAR',
  ];
  return lines.flatMap(fold).join('\r\n') + '\r\n';
}
