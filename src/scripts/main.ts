// The page's one script entry. Each part finds its own elements and does nothing if they are absent.
import { startEvents } from './events';
import { startMenu, startScrollSpy, startTheme } from './header';
import { startLive } from './live';
import { startMeter } from './meter';
import { startVachan } from './vachan';
import { site } from '../lib/site';

document.querySelectorAll<HTMLButtonElement>('[data-sd-theme]').forEach(startTheme);
document.querySelectorAll<HTMLDetailsElement>('[data-sd-menu]').forEach(startMenu);
startScrollSpy();
startLive();
document.querySelectorAll<HTMLElement>('[data-sd-events]').forEach(startEvents);
document.querySelectorAll<HTMLElement>('[data-sd-meter]').forEach(startMeter);
document.querySelectorAll<HTMLElement>('[data-sd-vachan]').forEach(startVachan);

// Beta feedback: pre-fill the form's "Phone or computer?" answer from the screen. Nothing is sent unless the tester submits.
const device = matchMedia('(pointer: coarse)').matches ? (Math.min(screen.width, screen.height) >= 600 ? 'Tablet' : 'Phone') : 'Computer';
document.querySelectorAll<HTMLAnchorElement>('[data-sd-feedback]').forEach((a) => {
  const url = new URL(site.feedback.form);
  url.searchParams.set('usp', 'pp_url');
  url.searchParams.set(site.feedback.deviceEntry, device);
  a.href = url.toString();
});
// The floating button stays away while the hero is on screen, so nothing covers Baba's murti.
const fab = document.querySelector<HTMLElement>('[data-sd-fab]');
const hero = document.querySelector('.sd-sannidhi');
if (fab && hero) {
  fab.classList.add('is-away');
  new IntersectionObserver(([e]) => fab.classList.toggle('is-away', e!.isIntersecting), { threshold: 0.05 }).observe(hero);
}

// Live darshan: swap the poster for the Twitch player, only on tap.
document.querySelectorAll<HTMLButtonElement>('[data-sd-live]').forEach((button) => {
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://player.twitch.tv/?channel=${encodeURIComponent(button.dataset.sdLive!)}&parent=${encodeURIComponent(location.hostname)}&autoplay=true`;
    frame.title = 'Live darshan from Shirdi Sai Darbar';
    frame.allow = 'autoplay; fullscreen';
    frame.className = button.className;
    frame.style.border = '0';
    button.replaceWith(frame);
    frame.focus();
  }, { once: true });
});

// Temple tour: swap our poster for the YouTube player (no-cookie domain), only on tap.
document.querySelectorAll<HTMLButtonElement>('[data-sd-video]').forEach((button) => {
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.sdVideo!)}?start=${Number(button.dataset.start) || 0}&autoplay=1&rel=0`;
    frame.title = button.dataset.title ?? 'Video';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.className = button.className;
    frame.style.border = '0';
    button.replaceWith(frame);
    frame.focus();
  }, { once: true });
});

// Ways to give: the PayPal button follows the chosen Seva or Donation.
document.querySelectorAll<HTMLFormElement>('[data-sd-seva]').forEach((form) => {
  const give = form.querySelector<HTMLAnchorElement>('[data-sd-give]')!;
  const label = give.querySelector('[data-f="give-label"]')!;
  const update = () => {
    const picked = form.querySelector<HTMLInputElement>('input[name="seva"]:checked');
    if (!picked) return;
    if (!give.dataset.todo) give.href = picked.dataset.paypal!;
    const name = picked.closest('label')?.querySelector('.sd-seva__name')?.textContent;
    label.textContent = picked.value === 'general' || !name ? 'Donate with PayPal' : `Donate for ${name} with PayPal`;
  };
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => e.preventDefault());
  update();
  // "Donate" in the construction appeal lands here with Build Baba's temple chosen.
  document.querySelectorAll<HTMLAnchorElement>('[data-seva-pick]').forEach((a) => a.addEventListener('click', () => {
    const input = form.querySelector<HTMLInputElement>(`input[value="${a.dataset.sevaPick}"]`);
    if (input) { input.checked = true; update(); }
  }));
});
