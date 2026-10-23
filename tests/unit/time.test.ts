import { describe, expect, it } from 'vitest';
import { addDays, dateTile, formatDateLong, formatTime, parseDate, parseTime, templeNow, zonedToUtc } from '../../src/lib/time';

describe('templeNow', () => {
  it('reads the Pacific wall clock whatever the device zone (device is Asia/Kolkata in tests)', () => {
    // 2026-11-08 18:20 PST
    expect(templeNow(new Date('2026-11-09T02:20:00Z'))).toEqual({ ymd: '2026-11-08', day: 0, minutes: 18 * 60 + 20 });
  });

  it('follows daylight saving time', () => {
    // 2026-07-01 06:45 PDT (UTC-7)
    expect(templeNow(new Date('2026-07-01T13:45:00Z')).minutes).toBe(6 * 60 + 45);
    // 2026-12-01 06:45 PST (UTC-8)
    expect(templeNow(new Date('2026-12-01T14:45:00Z')).minutes).toBe(6 * 60 + 45);
  });

  it('reports midnight as 0 minutes, not 24 hours', () => {
    expect(templeNow(new Date('2026-12-02T08:00:00Z'))).toMatchObject({ ymd: '2026-12-02', minutes: 0 });
  });
});

describe('formatting', () => {
  it('formats 24-hour times the temple way', () => {
    expect(formatTime('06:45')).toBe('6:45 AM');
    expect(formatTime('12:00')).toBe('12:00 PM');
    expect(formatTime('00:05')).toBe('12:05 AM');
    expect(formatTime('20:30')).toBe('8:30 PM');
  });

  it('writes dates as "Sunday, November 8" and date tiles as Nov / 8 / Sun', () => {
    expect(formatDateLong('2026-11-08')).toBe('Sunday, November 8');
    expect(dateTile('2026-11-08')).toEqual({ month: 'Nov', day: '8', weekday: 'Sun' });
  });

  it('adds days across month and year ends', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });
});

describe('parseDate', () => {
  it('accepts ISO and the M/D/YYYY dates Google Forms writes', () => {
    expect(parseDate('2026-11-15')).toBe('2026-11-15');
    expect(parseDate('11/15/2026')).toBe('2026-11-15');
    expect(parseDate(' 1/5/2027 ')).toBe('2027-01-05');
  });

  it('rejects impossible or empty dates', () => {
    expect(parseDate('2026-02-30')).toBeNull();
    expect(parseDate('13/1/2026')).toBeNull();
    expect(parseDate('')).toBeNull();
    expect(parseDate('next Sunday')).toBeNull();
  });
});

describe('parseTime', () => {
  it('accepts 12-hour, 24-hour and seconds forms', () => {
    expect(parseTime('10:00 AM')).toBe('10:00');
    expect(parseTime('6:30:00 PM')).toBe('18:30');
    expect(parseTime('12:00 AM')).toBe('00:00');
    expect(parseTime('12:15 pm')).toBe('12:15');
    expect(parseTime('18:30')).toBe('18:30');
  });

  it('returns null for blanks and nonsense', () => {
    expect(parseTime('')).toBeNull();
    expect(parseTime('25:00')).toBeNull();
    expect(parseTime('evening')).toBeNull();
  });
});

describe('zonedToUtc', () => {
  it('converts temple wall time to UTC in both offsets', () => {
    expect(zonedToUtc('2026-11-08', '18:30').toISOString()).toBe('2026-11-09T02:30:00.000Z');
    expect(zonedToUtc('2026-07-04', '10:00').toISOString()).toBe('2026-07-04T17:00:00.000Z');
  });
});
