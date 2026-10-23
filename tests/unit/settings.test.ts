import { describe, expect, it } from 'vitest';
import { meter, parseSettings } from '../../src/lib/settings';

describe('parseSettings', () => {
  it('reads raised and goal from the Key,Value,Note tab, forgiving $ and commas', () => {
    expect(parseSettings('Key,Value,Note\nraised,"$1,240,000",monthly\ngoal,3000000,')).toEqual({ raised: 1240000, goal: 3000000 });
  });

  it('leaves a blank or non-numeric value as null', () => {
    expect(parseSettings('Key,Value\nraised,\ngoal,three million')).toEqual({ raised: null, goal: null });
  });
});

describe('meter', () => {
  it('hides when raised is blank', () => {
    expect(meter({ raised: null, goal: 3000000 })).toBeNull();
  });

  it('falls back to the default goal and clamps the percentage', () => {
    expect(meter({ raised: 1240000, goal: null }, 3000000)).toEqual({ raised: 1240000, goal: 3000000, pct: 41 });
    expect(meter({ raised: 3500000, goal: 3000000 })?.pct).toBe(100);
  });
});
