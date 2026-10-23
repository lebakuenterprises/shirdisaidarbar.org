import { describe, expect, it } from 'vitest';
import { countdownText, nextAarti, status, windowsFor, type Schedule } from '../../src/lib/schedule';
import { zonedToUtc } from '../../src/lib/time';
import scheduleJson from '../../src/data/schedule.json';

const schedule = scheduleJson as Schedule;
// A temple-time instant: at('2026-11-09', '07:10') is Monday 7:10 AM in Sunnyvale.
const at = (ymd: string, hhmm: string) => zonedToUtc(ymd, hhmm);

describe('windowsFor', () => {
  it('gives weekends one long window and weekdays three', () => {
    expect(windowsFor(schedule, 0)).toEqual([['07:00', '21:00']]); // Sunday
    expect(windowsFor(schedule, 1)).toHaveLength(3); // Monday
  });
});

describe('nextAarti', () => {
  it('finds the next aarti today with minutes to go', () => {
    const n = nextAarti(schedule, at('2026-11-08', '11:42'));
    expect(n.aarti.id).toBe('madhyan');
    expect(n.tomorrow).toBe(false);
    expect(n.minutesAway).toBe(18);
  });

  it('rolls to tomorrow’s Kakad after Shej', () => {
    const n = nextAarti(schedule, at('2026-11-08', '21:00'));
    expect(n.aarti.id).toBe('kakad');
    expect(n.tomorrow).toBe(true);
    expect(n.minutesAway).toBe(3 * 60 + 6 * 60 + 45); // to midnight, then to 6:45
  });
});

describe('status', () => {
  it('is open inside a window, with that window’s closing time', () => {
    const s = status(schedule, at('2026-11-09', '07:50')); // Monday
    expect(s.state).toBe('open');
    expect(s.closesAt).toBe('09:00');
  });

  it('is closed between weekday windows and says when it opens next', () => {
    const s = status(schedule, at('2026-11-09', '10:00')); // Monday
    expect(s.state).toBe('closed');
    expect(s.opensAt).toEqual({ time: '12:00', when: 'today' });
  });

  it('opens tomorrow when closed for the night', () => {
    expect(status(schedule, at('2026-11-09', '22:00')).opensAt).toEqual({ time: '07:00', when: 'tomorrow' });
    expect(status(schedule, at('2026-11-10', '05:00')).opensAt).toEqual({ time: '07:00', when: 'today' });
  });

  it('is live from an aarti’s start for liveMinutes, even outside open hours', () => {
    const s = status(schedule, at('2026-11-09', '06:50')); // Kakad 6:45, temple opens 7:00
    expect(s.state).toBe('live');
    expect(s.current?.id).toBe('kakad');
    expect(status(schedule, at('2026-11-08', '18:30')).state).toBe('live');
    expect(status(schedule, at('2026-11-08', '18:30')).current?.id).toBe('dhoop');
  });

  it('is soon within soonMinutes of the next aarti, and never soon while live', () => {
    expect(status(schedule, at('2026-11-08', '11:42')).soon).toBe(true);
    expect(status(schedule, at('2026-11-08', '11:00')).soon).toBe(false);
    expect(status(schedule, at('2026-11-08', '12:10')).soon).toBe(false);
  });

  it('gives the same answer across the DST change week', () => {
    // 2026-11-01 is the fall-back Sunday; 6:50 AM is Kakad live both before and after.
    expect(status(schedule, at('2026-10-31', '06:50')).state).toBe('live');
    expect(status(schedule, at('2026-11-01', '06:50')).state).toBe('live');
  });
});

describe('countdownText', () => {
  it('reads "begins in N min", and "begins now" at a minute or less', () => {
    expect(countdownText(18)).toBe('begins in 18 min');
    expect(countdownText(1)).toBe('begins now');
  });
});
