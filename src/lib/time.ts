/** Temple time. Every clock and calendar reading goes through here, in Sunnyvale's zone, whatever the device's. */
export const TZ = 'America/Los_Angeles';

/** "YYYY-MM-DD" */
export type Ymd = string;
/** "HH:MM", 24-hour */
export type Hhmm = string;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const parts = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit',
});

/** Today's date, weekday (0 = Sunday) and minutes since midnight at the temple. */
export function templeNow(date: Date = new Date()): { ymd: Ymd; day: number; minutes: number } {
  const p = Object.fromEntries(parts.formatToParts(date).map((x) => [x.type, x.value]));
  return {
    ymd: `${p.year}-${p.month}-${p.day}`,
    day: WEEKDAYS.indexOf(p.weekday ?? ''),
    minutes: (Number(p.hour) % 24) * 60 + Number(p.minute),
  };
}

export const toMinutes = (t: Hhmm): number => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

/** "18:30" -> "6:30 PM" */
export function formatTime(t: Hhmm): string {
  const m = toMinutes(t), h = Math.floor(m / 60), mm = m % 60;
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

const utcNoon = (d: Ymd) => new Date(`${d}T12:00:00Z`);
const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts });
const longFmt = fmt({ weekday: 'long', month: 'long', day: 'numeric' });
const monthFmt = fmt({ month: 'short' });
const weekdayFmt = fmt({ weekday: 'short' });

/** "2026-11-08" -> "Sunday, November 8" */
export const formatDateLong = (d: Ymd): string => longFmt.format(utcNoon(d));

/** The event date tile: Nov / 8 / Sun */
export const dateTile = (d: Ymd) => ({ month: monthFmt.format(utcNoon(d)), day: String(Number(d.slice(8, 10))), weekday: weekdayFmt.format(utcNoon(d)) });

export const addDays = (d: Ymd, n: number): Ymd => new Date(utcNoon(d).getTime() + n * 864e5).toISOString().slice(0, 10);

function validYmd(y: number, m: number, d: number): Ymd | null {
  const iso = `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const back = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(back.getTime()) && back.toISOString().slice(0, 10) === iso ? iso : null;
}

/** "2026-11-15" or Google Forms' "11/15/2026" -> "2026-11-15"; anything else -> null. */
export function parseDate(raw: string): Ymd | null {
  const s = raw.trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return validYmd(+m[1]!, +m[2]!, +m[3]!);
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return validYmd(+m[3]!, +m[1]!, +m[2]!);
  return null;
}

/** "6:30 PM", "6:30:00 PM" or "18:30" -> "18:30"; anything else -> null. */
export function parseTime(raw: string): Hhmm | null {
  const m = raw.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?$/);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ampm = m[3]?.toUpperCase();
  if (ampm) {
    if (h < 1 || h > 12) return null;
    h = (h % 12) + (ampm === 'PM' ? 12 : 0);
  }
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

/** The instant when the temple's wall clock reads `date` `time`. */
export function zonedToUtc(date: Ymd, time: Hhmm): Date {
  const wanted = Date.parse(`${date}T${time}:00Z`);
  let guess = wanted;
  // Two passes settle the zone offset, including across a DST change.
  for (let i = 0; i < 2; i++) {
    const t = templeNow(new Date(guess));
    const seen = Date.parse(`${t.ymd}T00:00:00Z`) + t.minutes * 6e4;
    guess += wanted - seen;
  }
  return new Date(guess);
}
