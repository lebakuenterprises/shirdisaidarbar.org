import { describe, expect, it } from 'vitest';
import { collectPlaceholders, href, isPlaceholder } from '../../src/lib/links';

describe('placeholders', () => {
  it('recognises TODO: values', () => {
    expect(isPlaceholder('TODO:WhatsApp Community invite')).toBe(true);
    expect(isPlaceholder('https://chat.whatsapp.com/x')).toBe(false);
    expect(isPlaceholder(undefined)).toBe(false);
  });

  it('finds every placeholder in nested data with its path and label', () => {
    const data = { links: { whatsapp: 'TODO:WhatsApp Community invite', paypal: 'https://paypal.com/x' }, sevas: [{ paypal: 'TODO:Robe link' }] };
    expect(collectPlaceholders(data)).toEqual([
      { path: 'links.whatsapp', label: 'WhatsApp Community invite' },
      { path: 'sevas[0].paypal', label: 'Robe link' },
    ]);
  });

  it('turns a placeholder into a harmless href', () => {
    expect(href('TODO:Volunteer form')).toBe('#');
    expect(href('https://forms.gle/x')).toBe('https://forms.gle/x');
  });
});
