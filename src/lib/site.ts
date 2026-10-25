// Values derived from src/data/site.json, shared by the page and its scripts.
import site from '../data/site.json';
import { href, isPlaceholder } from './links';

export { site };

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;

/** Attributes for a link that may still be a TODO: placeholder (rendered as "#" with a dev-only label). */
export const linkAttrs = (v: string) => (isPlaceholder(v) ? { href: href(v), 'data-todo': v.slice(5).trim() } : { href: v });
