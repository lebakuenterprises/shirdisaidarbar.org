// The Schedule: the four daily Aartis and the temple's weekly hours. Ported from the design system's bundle.js,
// extended for several open windows per day (weekdays have three).
import { templeNow, toMinutes, type Hhmm } from './time';

export interface Aarti { id: string; name: string; hint: string; time: Hhmm }
export interface HoursRow { label: string; /** 0 = Sunday */ days: number[]; windows: [Hhmm, Hhmm][] }
export interface Schedule { aartis: Aarti[]; hours: HoursRow[]; note?: string; liveMinutes: number; soonMinutes: number }

export interface NextAarti { aarti: Aarti; tomorrow: boolean; minutesAway: number }
export interface Status {
  state: 'open' | 'live' | 'closed';
  /** The Aarti happening now, while live. */
  current: Aarti | null;
  next: NextAarti;
  /** Within soonMinutes of the next Aarti, and not live. */
  soon: boolean;
  /** End of the open window we are in. */
  closesAt: Hhmm | null;
  /** When closed: the next opening. */
  opensAt: { time: Hhmm; when: 'today' | 'tomorrow' | number } | null;
}

export const windowsFor = (s: Schedule, day: number): [Hhmm, Hhmm][] => s.hours.find((h) => h.days.includes(day))?.windows ?? [];

export function nextAarti(s: Schedule, date?: Date): NextAarti {
  const now = templeNow(date).minutes;
  const today = s.aartis.find((a) => toMinutes(a.time) > now);
  if (today) return { aarti: today, tomorrow: false, minutesAway: toMinutes(today.time) - now };
  const first = s.aartis[0]!;
  return { aarti: first, tomorrow: true, minutesAway: 1440 - now + toMinutes(first.time) };
}

export function status(s: Schedule, date?: Date): Status {
  const { day, minutes } = templeNow(date);
  const current = s.aartis.find((a) => minutes >= toMinutes(a.time) && minutes < toMinutes(a.time) + s.liveMinutes) ?? null;
  const window = windowsFor(s, day).find(([o, c]) => minutes >= toMinutes(o) && minutes < toMinutes(c));
  const next = nextAarti(s, date);

  let opensAt: Status['opensAt'] = null;
  if (!window) {
    for (let ahead = 0; ahead < 7 && !opensAt; ahead++) {
      const w = windowsFor(s, (day + ahead) % 7).find(([o]) => ahead > 0 || toMinutes(o) > minutes);
      if (w) opensAt = { time: w[0], when: ahead === 0 ? 'today' : ahead === 1 ? 'tomorrow' : (day + ahead) % 7 };
    }
  }
  return {
    state: current ? 'live' : window ? 'open' : 'closed',
    current,
    next,
    soon: !current && next.minutesAway <= s.soonMinutes,
    closesAt: window ? window[1] : null,
    opensAt,
  };
}

/** 18 -> "begins in 18 min" */
export const countdownText = (mins: number): string => (mins <= 1 ? 'begins now' : `begins in ${mins} min`);
