import { describe, expect, it } from 'vitest';
import { eventLd } from '../../src/lib/event-ld';
import type { SdEvent } from '../../src/lib/events';

const place = { name: 'Shirdi Sai Darbar', street: '255 San Geronimo Way', city: 'Sunnyvale', region: 'CA', postal: '94085' };
const ev = (over: Partial<SdEvent>): SdEvent => ({ id: 'event-x', title: 'X', start: '2026-10-31', end: '2026-10-31', description: 'D', pinned: false, ...over });

describe('eventLd', () => {
  it('writes temple times as UTC instants (PDT is UTC-7 on Oct 31)', () => {
    const ld = eventLd(ev({ startTime: '13:00', endTime: '18:30' }), place, 'https://shirdisaidarbar.org');
    expect(ld.startDate).toBe('2026-10-31T20:00:00.000Z');
    expect(ld.endDate).toBe('2026-11-01T01:30:00.000Z');
    expect(ld.url).toBe('https://shirdisaidarbar.org/#event-x');
  });

  it('keeps an Event without times as dates, and makes a site flyer path absolute', () => {
    const ld = eventLd(ev({ end: '2026-11-15', flyer: '/img/flyers/a.webp', signup: 'https://paybee.io/x' }), place, 'https://shirdisaidarbar.org');
    expect(ld.startDate).toBe('2026-10-31');
    expect(ld.endDate).toBe('2026-11-15');
    expect(ld.image).toEqual(['https://shirdisaidarbar.org/img/flyers/a.webp']);
    expect(ld.offers?.url).toBe('https://paybee.io/x');
  });
});
