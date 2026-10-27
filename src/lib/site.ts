// Values derived from src/data/site.json, shared by the page and its scripts.
import site from '../data/site.json';
import { href, isPlaceholder, opensNewTab } from './links';

export { site };

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;

/** Attributes for every link on the page: a TODO: placeholder renders as "#" with a dev-only label, and a link away
 * from this page opens in a new tab (opensNewTab in ./links). */
export const linkAttrs = (v: string) => {
  if (isPlaceholder(v)) return { href: href(v), 'data-todo': v.slice(5).trim() };
  return opensNewTab(v) ? { href: v, target: '_blank', rel: 'noopener' } : { href: v };
};
