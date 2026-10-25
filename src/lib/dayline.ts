// The day line: positions on a thread from DAY_START to DAY_END, shared by the page (build) and live.ts (browser).
import { countdownText, type Status } from './schedule';
import { formatTime, toMinutes, type Hhmm } from './time';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** The day line's one sentence of state, read under the thread. Never states a time twice. */
export function stateSentence(s: Status): string {
  const next = s.next.aarti.name;
  const nextAt = `${formatTime(s.next.aarti.time)}${s.next.tomorrow ? ' tomorrow' : ''}`;
  if (s.state === 'live') return `Live now: ${s.current!.name}, streaming on Twitch.`;
  if (s.state === 'open') {
    return s.soon
      ? `Open now. ${next} ${countdownText(s.next.minutesAway)}.`
      : `Open now until ${formatTime(s.closesAt!)}. Next, ${next} at ${nextAt}.`;
  }
  if (!s.opensAt) return `Closed now. Next, ${next} at ${nextAt}.`;
  const { time, when } = s.opensAt;
  const day = when === 'today' ? 'today' : when === 'tomorrow' ? 'tomorrow' : `on ${DAYS[when]}`;
  if (s.soon) return `Closed now. ${next} ${countdownText(s.next.minutesAway)}.`;
  if (time === s.next.aarti.time && (when === 'tomorrow') === s.next.tomorrow) return `Closed now. The doors open at ${formatTime(time)} ${day} for ${next}.`;
  return `Closed now, opening at ${formatTime(time)} ${day}. Next, ${next} at ${nextAt}.`;
}

export const DAY_START = 6 * 60; // 6:00 AM, just before Kakad
export const DAY_END = 21 * 60 + 30; // 9:30 PM, after the temple closes

/** Percentage along the thread for minutes since midnight, clamped to the line's ends. */
export const pctAt = (minutes: number): number =>
  Math.round(Math.max(0, Math.min(1, (minutes - DAY_START) / (DAY_END - DAY_START))) * 1000) / 10;

export const pct = (t: Hhmm): number => pctAt(toMinutes(t));

/** "7:00", "9:00" -> "7 to 9 AM"; "07:00", "21:00" -> "7 AM to 9 PM". Short enough for an arch tile. */
export function shortSpan(open: Hhmm, close: Hhmm): string {
  const part = (t: Hhmm) => {
    const m = toMinutes(t), h = Math.floor(m / 60), mm = m % 60;
    return { text: `${((h + 11) % 12) + 1}${mm ? `:${String(mm).padStart(2, '0')}` : ''}`, ap: h < 12 ? 'AM' : 'PM' };
  };
  const a = part(open), b = part(close);
  return a.ap === b.ap ? `${a.text} to ${b.text} ${b.ap}` : `${a.text} ${a.ap} to ${b.text} ${b.ap}`;
}
