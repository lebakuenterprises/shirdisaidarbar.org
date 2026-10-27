// Links not supplied yet are written "TODO:<what is missing>" in src/data. They render as "#" with a dev-only
// badge, and a production build refuses to run while any remain.
export const PLACEHOLDER = 'TODO:';

export const isPlaceholder = (v: unknown): v is string => typeof v === 'string' && v.startsWith(PLACEHOLDER);

export const href = (v: string): string => (isPlaceholder(v) ? '#' : v);

/** Every link opens in a new tab, except a place on this page (#..., /#...), the home page, and sms:, mailto: or tel:. */
export const opensNewTab = (v: string): boolean => !/^(#|\/#|\/$|sms:|mailto:|tel:)/.test(v);

export function collectPlaceholders(data: unknown, path = ''): { path: string; label: string }[] {
  if (isPlaceholder(data)) return [{ path, label: data.slice(PLACEHOLDER.length).trim() }];
  if (Array.isArray(data)) return data.flatMap((v, i) => collectPlaceholders(v, `${path}[${i}]`));
  if (data && typeof data === 'object') {
    return Object.entries(data).flatMap(([k, v]) => collectPlaceholders(v, path ? `${path}.${k}` : k));
  }
  return [];
}
