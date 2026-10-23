// Shirdi Sai Darbar: the components are plain HTML with classes from bundle.css.
// bundle.js adds window.SaiDarbar, the small amount of logic that keeps the page correct without edits.

export interface Aarti { id: string; name: string; hint: string; /** 24h "HH:MM", temple time */ time: string }

export interface Timings {
  aartis: Aarti[];
  /** [open, close] in 24h "HH:MM", Sunday first */
  hours: [string, string][];
  /** minutes an aarti counts as live after it starts */
  liveMinutes: number;
  /** within this many minutes the page counts down and Watch live leads (30) */
  soonMinutes: number;
}

export interface Status {
  state: "open" | "live" | "closed";
  current: Aarti | null;
  next: { aarti: Aarti; tomorrow: boolean; minutesAway: number };
  /** true within soonMinutes of the next aarti (and not live) */
  soon: boolean;
  /** today's closing time, "HH:MM" */
  closesAt: string | null;
}

/** One row of the events list: the whole events "CMS". */
export interface SdEvent {
  title: string;
  /** "YYYY-MM-DDTHH:MM" temple time */
  start: string;
  /** "YYYY-MM-DD", required; the card hides after this day */
  end: string;
  description: string;
  flyer?: string;
  whatsappGroup?: string;
  /** Google Form or Paybee link */
  signup?: string;
  pinned?: boolean;
}

/** One slide of the Highlights carousel: one row of the "Highlights" tab in the temple's Google Sheet. */
export interface Highlight {
  kind: "Event" | "Campaign" | "Update" | "Highlight";
  /** 60 characters at most */
  title: string;
  /** one sentence, 120 characters at most */
  line: string;
  /** optional date and time text, e.g. "Sunday, November 8 · 6:30 PM" */
  when?: string;
  /** https link to the picture; any shape */
  image?: string;
  /** required with an image; for a flyer, its key words */
  alt?: string;
  /** one of: Donate, Sponsor, Add to calendar, Join on WhatsApp, Watch live, Get directions, See photos, Read more */
  button?: string;
  /** http(s), mailto, tel or sms */
  link?: string;
  /** "YYYY-MM-DD"; optional first day */
  start?: string;
  /** "YYYY-MM-DD"; required last day */
  end: string;
  order?: number;
  pinned?: boolean;
}

export interface SaiDarbar {
  timings: Timings;
  templeNow(date?: Date): { day: number; minutes: number };
  /** "18:30" -> "6:30 PM" */
  formatTime(hhmm: string): string;
  nextAarti(date?: Date): { aarti: Aarti; tomorrow: boolean; minutesAway: number };
  /** 18 -> "begins in 18 min" */
  countdownText(minutes: number): string;
  status(date?: Date): Status;
  visibleEvents(events: SdEvent[], date?: Date): SdEvent[];
  /** Replace the LiveDarshan poster button with the Twitch player; call on click only. */
  loadLiveDarshan(button: HTMLElement, channel?: string, parentHost?: string): HTMLIFrameElement;
  /** Fill [data-sd-status] chips, [data-sd-aarti] lists and [data-sd-today] strips, and swap [data-sd-cta] hero buttons. Pass a date to preview another time. */
  hydrate(root?: ParentNode, date?: Date): void;
  /** Highlights rows that show today: start <= today <= end, pinned first, then order; eight at most. */
  visibleHighlights(rows: Highlight[], date?: Date): Highlight[];
  /** Build the slides from sheet rows into a [data-sd-highlights] element (text only, safe links). Hides the band when empty. */
  renderHighlights(el: HTMLElement, rows: Highlight[], date?: Date): Highlight[];
  /** Wire one [data-sd-highlights]: image fit, Previous and Next, dots, swipe, optional autoplay (data-autoplay ms) with Pause. */
  highlights(el: HTMLElement): void;
  /** Wire one [data-sd-vachan]: the eleven assurances, starting on the day's, crossfading every data-interval ms (9000) with Pause, Previous and Next. Still under reduced motion. */
  vachan(el: HTMLElement): void;
  /** hydrate now, refresh every 30 seconds, and wire every Highlights carousel and BabaVachan. Call once per page. */
  start(root?: ParentNode): void;
}

declare global { interface Window { SaiDarbar: SaiDarbar } }
