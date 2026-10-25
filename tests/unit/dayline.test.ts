import { describe, expect, it } from 'vitest';
import { pct, pctAt, shortSpan, stateSentence } from '../../src/lib/dayline';
import { status, type Schedule } from '../../src/lib/schedule';
import { zonedToUtc } from '../../src/lib/time';
import scheduleJson from '../../src/data/schedule.json';

const say = (ymd: string, hhmm: string) => stateSentence(status(scheduleJson as Schedule, zonedToUtc(ymd, hhmm)));

describe('stateSentence', () => {
  it('names the opening once when the doors open for the next aarti', () => {
    expect(say('2026-11-09', '10:00')).toBe('Closed now. The doors open at 12:00 PM today for Madhyan Aarti.'); // Monday
  });

  it('separates opening and next aarti when they differ', () => {
    expect(say('2026-11-09', '22:00')).toBe('Closed now, opening at 7:00 AM tomorrow. Next, Kakad Aarti at 6:45 AM tomorrow.');
  });

  it('reads open, soon and live states', () => {
    expect(say('2026-11-08', '09:00')).toBe('Open now until 9:00 PM. Next, Madhyan Aarti at 12:00 PM.'); // Sunday
    expect(say('2026-11-08', '11:42')).toBe('Open now. Madhyan Aarti begins in 18 min.');
    expect(say('2026-11-08', '18:40')).toBe('Live now: Dhoop Aarti, streaming on Twitch.');
  });
});

describe('day line positions', () => {
  it('places the aartis along the 6:00 AM to 9:30 PM thread', () => {
    expect(pct('06:45')).toBe(4.8);
    expect(pct('12:00')).toBe(38.7);
    expect(pct('20:30')).toBe(93.5);
  });

  it('clamps before dawn and after closing', () => {
    expect(pctAt(60)).toBe(0);
    expect(pctAt(23 * 60)).toBe(100);
  });
});

describe('shortSpan', () => {
  it('shares the meridiem when both ends have it', () => {
    expect(shortSpan('07:00', '09:00')).toBe('7 to 9 AM');
    expect(shortSpan('18:30', '21:00')).toBe('6:30 to 9 PM');
  });

  it('writes both when the span crosses noon', () => {
    expect(shortSpan('07:00', '21:00')).toBe('7 AM to 9 PM');
    expect(shortSpan('12:00', '13:00')).toBe('12 to 1 PM');
  });
});
