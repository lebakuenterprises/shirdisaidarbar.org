// The Sheet's Settings tab (Key, Value, Note): the Temple construction meter.
import { parseCsv, rowsToRecords } from './csv';

export interface Settings { raised: number | null; goal: number | null }

const amount = (raw: string | undefined): number | null => {
  const s = (raw ?? '').replace(/[$,\s]/g, '');
  return /^\d+(\.\d+)?$/.test(s) ? Number(s) : null;
};

export function parseSettings(csv: string): Settings {
  const byKey = new Map(rowsToRecords(parseCsv(csv)).map((r) => [(r['key'] ?? '').toLowerCase(), r['value']]));
  return { raised: amount(byKey.get('raised')), goal: amount(byKey.get('goal')) };
}

/** What the meter shows, or null to hide it (raised left blank). */
export function meter(s: Settings, defaultGoal = 3_000_000): { raised: number; goal: number; pct: number } | null {
  const goal = s.goal || defaultGoal;
  if (s.raised == null || !goal) return null;
  return { raised: s.raised, goal, pct: Math.max(0, Math.min(100, Math.round((s.raised / goal) * 100))) };
}
