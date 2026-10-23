import { describe, expect, it } from 'vitest';
import { buildIcs } from '../../src/lib/ics';
import type { SdEvent } from '../../src/lib/events';

const base: SdEvent = {
  id: 'event-diwali-2026-11-08', title: 'Diwali Lakshmi Puja', start: '2026-11-08', end: '2026-11-08',
  description: 'Lakshmi puja, aarti; and prasad.', pinned: false,
};
const opts = { location: '255 San Geronimo Way, Sunnyvale, CA 94085', url: 'https://shirdisaidarbar.org/#x', now: new Date('2026-10-23T12:00:00Z') };
const lines = (s: string) => s.split('\r\n');

describe('buildIcs', () => {
  it('writes a timed event in UTC, one hour long when no end time is given', () => {
    const l = lines(buildIcs({ ...base, startTime: '18:30' }, opts));
    expect(l).toContain('DTSTART:20261109T023000Z');
    expect(l).toContain('DTEND:20261109T033000Z');
    expect(l).toContain('UID:event-diwali-2026-11-08@shirdisaidarbar.org');
    expect(l).toContain('DTSTAMP:20261023T120000Z');
  });

  it('writes an untimed event as all-day, ending the day after its end date', () => {
    const l = lines(buildIcs({ ...base, start: '2026-11-10', end: '2026-11-15' }, opts));
    expect(l).toContain('DTSTART;VALUE=DATE:20261110');
    expect(l).toContain('DTEND;VALUE=DATE:20261116');
  });

  it('uses the end date and time when given', () => {
    const l = lines(buildIcs({ ...base, startTime: '10:00', endTime: '12:00' }, opts));
    expect(l).toContain('DTEND:20261108T200000Z');
  });

  it('escapes text and uses CRLF line endings', () => {
    const s = buildIcs(base, opts);
    expect(s).toContain('DESCRIPTION:Lakshmi puja\\, aarti\\; and prasad.');
    expect(s.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(s.endsWith('END:VCALENDAR\r\n')).toBe(true);
  });

  it('folds lines longer than 75 octets', () => {
    const s = buildIcs({ ...base, description: 'a'.repeat(200) }, opts);
    expect(lines(s).every((line) => new TextEncoder().encode(line).length <= 75)).toBe(true);
  });
});
