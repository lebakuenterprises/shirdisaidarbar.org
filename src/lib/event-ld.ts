// Upcoming Events as schema.org Event data, so search can show them as events. Times are the temple's wall
// clock, written as UTC instants; an Event without a start time is an all-day date.
import type { SdEvent } from './events';
import { zonedToUtc } from './time';

interface Place { name: string; street: string; city: string; region: string; postal: string }

const when = (date: string, time?: string) => (time ? zonedToUtc(date, time).toISOString() : date);

export function eventLd(e: SdEvent, place: Place, siteUrl: string) {
  const abs = (u: string) => new URL(u, siteUrl).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    description: e.description,
    startDate: when(e.start, e.startTime),
    endDate: when(e.end, e.endTime ?? (e.startTime && e.end === e.start ? e.startTime : undefined)),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: place.name,
      address: { '@type': 'PostalAddress', streetAddress: place.street, addressLocality: place.city, addressRegion: place.region, postalCode: place.postal, addressCountry: 'US' },
    },
    organizer: { '@type': 'Organization', name: place.name, url: `${siteUrl}/` },
    url: `${siteUrl}/#${e.id}`,
    ...(e.flyer ? { image: [abs(e.flyer)] } : {}),
    ...(e.signup ? { offers: { '@type': 'Offer', url: e.signup, availability: 'https://schema.org/InStock' } } : {}),
  };
}
