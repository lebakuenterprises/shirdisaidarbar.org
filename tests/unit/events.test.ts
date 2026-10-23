import { describe, expect, it } from 'vitest';
import { parseEvents, visibleEvents, type SdEvent } from '../../src/lib/events';
import { zonedToUtc } from '../../src/lib/time';

const HEAD = 'Timestamp,Title,Start date,Start time,End date,End time,Description,Flyer image link,WhatsApp group link,Signup or sponsor link,Pin to top';

const ev = (over: Partial<SdEvent>): SdEvent => ({
  id: 'x', title: 'X', start: '2026-11-15', end: '2026-11-15', description: '', pinned: false, ...over,
});

describe('parseEvents', () => {
  it('reads Form-linked rows by header name, in any column order', () => {
    const csv = `${HEAD}\n10/20/2026 9:01:00,Diwali Lakshmi Puja,11/8/2026,6:30:00 PM,11/8/2026,,"Lakshmi puja, aarti and prasad.",,https://chat.whatsapp.com/abc,https://paybee.io/x,Yes\n`;
    expect(parseEvents(csv)).toEqual([
      {
        id: 'event-diwali-lakshmi-puja-2026-11-08',
        title: 'Diwali Lakshmi Puja',
        start: '2026-11-08',
        startTime: '18:30',
        end: '2026-11-08',
        description: 'Lakshmi puja, aarti and prasad.',
        whatsappGroup: 'https://chat.whatsapp.com/abc',
        signup: 'https://paybee.io/x',
        pinned: true,
      },
    ]);
  });

  it('drops rows without a title, start date or valid end date', () => {
    const csv = `Title,Start date,End date\n,2026-11-08,2026-11-08\nNo end,2026-11-08,\nBad end,2026-11-08,soon\nOk,2026-11-08,2026-11-09`;
    expect(parseEvents(csv).map((e) => e.title)).toEqual(['Ok']);
  });

  it('treats an end before the start as a one-day event', () => {
    const [e] = parseEvents('Title,Start date,End date\nPuja,2026-11-15,2026-11-10');
    expect(e?.end).toBe('2026-11-15');
  });

  it('keeps only http(s) links', () => {
    const [e] = parseEvents('Title,Start date,End date,Flyer image link,Signup or sponsor link\nPuja,2026-11-15,2026-11-15,javascript:alert(1),www.example.org');
    expect(e?.flyer).toBeUndefined();
    expect(e?.signup).toBeUndefined();
  });

  it('gives repeated titles distinct anchors by date (one row per occurrence)', () => {
    const csv = 'Title,Start date,End date\nMonthly Group Satyanarayana Puja,2026-11-15,2026-11-15\nMonthly Group Satyanarayana Puja,2026-12-13,2026-12-13';
    expect(parseEvents(csv).map((e) => e.id)).toEqual([
      'event-monthly-group-satyanarayana-puja-2026-11-15',
      'event-monthly-group-satyanarayana-puja-2026-12-13',
    ]);
  });

  it('returns nothing for an empty or header-only sheet', () => {
    expect(parseEvents('')).toEqual([]);
    expect(parseEvents(HEAD)).toEqual([]);
  });
});

describe('visibleEvents', () => {
  const now = zonedToUtc('2026-11-12', '20:00');

  it('keeps a multi-day event through its end date and hides it the day after (temple time)', () => {
    const shashti = ev({ id: 's', start: '2026-11-10', end: '2026-11-15' });
    expect(visibleEvents([shashti], zonedToUtc('2026-11-15', '23:59'))).toHaveLength(1);
    expect(visibleEvents([shashti], zonedToUtc('2026-11-16', '00:00'))).toHaveLength(0);
  });

  it('uses the Pacific date, not the device date (device is already the next day in India)', () => {
    // 2026-11-15 20:00 PST is 2026-11-16 09:30 in Kolkata.
    expect(visibleEvents([ev({ end: '2026-11-15' })], zonedToUtc('2026-11-15', '20:00'))).toHaveLength(1);
  });

  it('puts pinned events first, then sorts by start date and time', () => {
    const list = visibleEvents(
      [
        ev({ id: 'late', start: '2026-11-20' }),
        ev({ id: 'evening', start: '2026-11-15', startTime: '18:00' }),
        ev({ id: 'pinned', start: '2026-12-01', end: '2026-12-01', pinned: true }),
        ev({ id: 'morning', start: '2026-11-15', startTime: '09:00' }),
        ev({ id: 'allday', start: '2026-11-15' }),
      ],
      now,
    );
    expect(list.map((e) => e.id)).toEqual(['pinned', 'allday', 'morning', 'evening', 'late']);
  });

  it('shows at most six', () => {
    const many = Array.from({ length: 9 }, (_, i) => ev({ id: `e${i}`, start: `2026-11-${20 + i}`, end: `2026-11-${20 + i}` }));
    expect(visibleEvents(many, now)).toHaveLength(6);
  });
});
