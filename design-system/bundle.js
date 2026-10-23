/* @ds-bundle: {"format":4,"namespace":"SaiDarbar","components":[{"name":"HomePage"},{"name":"SiteHeader"},{"name":"Hero"},{"name":"TodayStrip"},{"name":"MobileHome"},{"name":"Toran"},{"name":"FlameMark"},{"name":"SectionHeading"},{"name":"Bands"},{"name":"SanctumBand"},{"name":"Highlights"},{"name":"DarshanFrame"},{"name":"LogoSeal"},{"name":"StatusChip"},{"name":"Button"},{"name":"BabaVachan"},{"name":"Languages"},{"name":"LotusDivider"},{"name":"AartiSchedule"},{"name":"EventCard"},{"name":"FundraisingMeter"},{"name":"SevaChoice"},{"name":"LiveDarshan"},{"name":"WhatsAppConnect"},{"name":"PlanVisit"},{"name":"MobileActionBar"},{"name":"Footer"}]} */
(function () {
  "use strict";
  var TZ = "America/Los_Angeles";

  // The one timings block. Edit here (or feed from the content file); the chip, schedule and hours all read it.
  var timings = {
    aartis: [
      { id: "kakad", name: "Kakad Aarti", hint: "Morning awakening", time: "06:45" },
      { id: "madhyan", name: "Madhyan Aarti", hint: "Midday", time: "12:00" },
      { id: "dhoop", name: "Dhoop Aarti", hint: "Evening", time: "18:30" },
      { id: "shej", name: "Shej Aarti", hint: "Night rest", time: "20:30" }
    ],
    // Sample hours: the temple confirms these. [open, close] in 24h, Sunday first.
    hours: [["06:30", "21:00"], ["06:30", "21:00"], ["06:30", "21:00"], ["06:30", "21:00"], ["06:30", "21:00"], ["06:30", "21:00"], ["06:30", "21:00"]],
    liveMinutes: 45,
    // Within this many minutes of an aarti the page counts down and Watch live becomes the primary hero button.
    soonMinutes: 30
  };

  function templeNow(date) {
    var d = date || new Date();
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23", weekday: "short", hour: "2-digit", minute: "2-digit" }).formatToParts(d);
    var get = function (t) { var p = parts.find(function (x) { return x.type === t; }); return p ? p.value : ""; };
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return { day: days.indexOf(get("weekday")), minutes: (+get("hour")) * 60 + (+get("minute")) };
  }
  function toMinutes(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function formatTime(hhmm) {
    var m = toMinutes(hhmm), h = Math.floor(m / 60), mm = m % 60;
    return ((h + 11) % 12 + 1) + ":" + (mm < 10 ? "0" : "") + mm + " " + (h < 12 ? "AM" : "PM");
  }

  // Next aarti after now; after Shej it rolls to tomorrow's Kakad. minutesAway counts down to it.
  function nextAarti(date) {
    var now = templeNow(date).minutes;
    for (var i = 0; i < timings.aartis.length; i++) {
      var at = toMinutes(timings.aartis[i].time);
      if (at > now) return { aarti: timings.aartis[i], tomorrow: false, minutesAway: at - now };
    }
    return { aarti: timings.aartis[0], tomorrow: true, minutesAway: 1440 - now + toMinutes(timings.aartis[0].time) };
  }
  function countdownText(mins) { return mins <= 1 ? "begins now" : "begins in " + mins + " min"; }

  // "open" | "live" | "closed", plus the next aarti, for the StatusChip.
  function status(date) {
    var t = templeNow(date), h = timings.hours[t.day];
    var live = timings.aartis.find(function (a) { var s = toMinutes(a.time); return t.minutes >= s && t.minutes < s + timings.liveMinutes; });
    var open = h && t.minutes >= toMinutes(h[0]) && t.minutes < toMinutes(h[1]);
    var next = nextAarti(date);
    return { state: live ? "live" : open ? "open" : "closed", current: live || null, next: next, soon: !live && next.minutesAway <= timings.soonMinutes, closesAt: h ? h[1] : null };
  }

  // Events hide themselves after their end date (inclusive), in temple time. At most six, pinned first, then by date.
  function visibleEvents(events, date) {
    var today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date || new Date());
    return (events || [])
      .filter(function (e) { return e.end && e.end >= today; })
      .sort(function (a, b) { return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (a.start < b.start ? -1 : 1); })
      .slice(0, 6);
  }

  // Swap the LiveDarshan poster button for the Twitch player, only on tap.
  function loadLiveDarshan(button, channel, parentHost) {
    var src = "https://player.twitch.tv/?channel=" + encodeURIComponent(channel || "shirdisaidarbarsunnyvale") + "&parent=" + encodeURIComponent(parentHost || location.hostname) + "&autoplay=true";
    var frame = document.createElement("iframe");
    frame.src = src; frame.title = "Live darshan from Shirdi Sai Darbar"; frame.allow = "autoplay; fullscreen";
    frame.className = button.className; frame.style.border = "0";
    button.replaceWith(frame); frame.focus();
    return frame;
  }

  function setText(root, sel, text) { var el = root.querySelector(sel); if (el && el.textContent !== text) el.textContent = text; }

  // Fill any [data-sd-status] chip, [data-sd-aarti] list, [data-sd-today] strip and [data-sd-cta] hero buttons.
  function hydrate(root, date) {
    root = root || document;
    var s = status(date);
    var nextName = s.next.aarti.name, nextTime = formatTime(s.next.aarti.time);
    root.querySelectorAll("[data-sd-aarti] li[data-t]").forEach(function (li) {
      var isNext = li.dataset.t === s.next.aarti.time;
      li.classList.toggle("is-next", isNext);
      li.classList.toggle("is-soon", isNext && s.soon);
      var flame = li.querySelector(".sd-flame"); if (flame) flame.classList.toggle("is-lit", isNext && s.soon);
      var tag = li.querySelector(".sd-tag"); if (tag) tag.textContent = isNext && s.soon ? "In " + s.next.minutesAway + " min" : "Next";
      if (isNext) li.setAttribute("aria-current", "time"); else li.removeAttribute("aria-current");
    });
    root.querySelectorAll("[data-sd-today]").forEach(function (t) {
      t.classList.toggle("is-live", s.state === "live");
      t.classList.toggle("is-closed", s.state === "closed");
      t.classList.toggle("is-soon", s.soon);
      setText(t, '[data-f="state"]', s.state === "live" ? "Live now" : s.state === "open" ? "Open now" : "Closed now");
      setText(t, '[data-f="hours"]', s.state === "closed" ? "Opens at " + formatTime(timings.hours[(templeNow(date).day + (templeNow(date).minutes > 600 ? 1 : 0)) % 7][0]) : "Until " + formatTime(s.closesAt) + " today");
      setText(t, '[data-f="next-name"]', s.state === "live" ? s.current.name : nextName);
      setText(t, '[data-f="next-when"]', s.state === "live" ? "Happening now" : s.soon ? "Next, " + countdownText(s.next.minutesAway) : "Next, at " + nextTime + (s.next.tomorrow ? " tomorrow" : ""));
      setText(t, '[data-f="live"]', s.state === "live" ? "Streaming now, tap to watch" : "During all four aartis");
      t.querySelectorAll(".sd-flame").forEach(function (f) { f.classList.toggle("is-lit", s.soon || s.state === "live"); });
    });
    // Within soonMinutes of an aarti (or while live), Watch live becomes the primary hero button.
    var watchFirst = s.soon || s.state === "live";
    root.querySelectorAll("[data-sd-cta]").forEach(function (b) {
      var primary = (b.dataset.sdCta === "watch") === watchFirst;
      b.classList.toggle("sd-btn--glow", primary);
      b.classList.toggle("sd-btn--ghost", !primary);
    });
    root.querySelectorAll("[data-sd-status]").forEach(function (chip) {
      chip.classList.remove("sd-chip--open", "sd-chip--live", "sd-chip--closed");
      chip.classList.add("sd-chip--" + s.state);
      var state = chip.querySelector(".sd-chip__state"), detail = chip.querySelector(".sd-chip__detail");
      if (state) state.textContent = s.state === "live" ? "Live now" : s.state === "open" ? "Open now" : "Closed now";
      if (detail) detail.textContent = s.state === "live" ? s.current.name : "Next aarti: " + s.next.aarti.name.replace(" Aarti", "") + (s.soon ? " " + countdownText(s.next.minutesAway) : " at " + formatTime(s.next.aarti.time) + (s.next.tomorrow ? " tomorrow" : ""));
    });
  }

  // ---------------------------------------------------------------- Highlights
  // The admin's slides (event, campaign, update, highlight), one row each in the temple's Google Sheet.
  var KINDS = { event: "Event", campaign: "Campaign", update: "Update", highlight: "Highlight" };
  var LABELS = ["Donate", "Sponsor", "Add to calendar", "Join on WhatsApp", "Watch live", "Get directions", "See photos", "Read more"];
  function ymd(date) { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date || new Date()); }
  function safeUrl(u) {
    if (!u) return null;
    try { var x = new URL(String(u), location.href); return /^(https?|mailto|tel|sms):$/.test(x.protocol) ? x.href : null; } catch (e) { return null; }
  }
  // Rows that show today: start (optional) <= today <= end (required). Pinned first, then by order, then by start. Eight at most.
  function visibleHighlights(rows, date) {
    var today = ymd(date);
    return (rows || [])
      .filter(function (r) { return r && r.title && r.end && r.end >= today && (!r.start || r.start <= today); })
      .sort(function (a, b) { return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (+a.order || 99) - (+b.order || 99) || String(a.start || "").localeCompare(String(b.start || "")); })
      .slice(0, 8);
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  // Build the slides from sheet rows into a [data-sd-highlights] element. All text goes in as text, never as HTML.
  function renderHighlights(root, rows, date) {
    var list = visibleHighlights(rows, date), track = root.querySelector(".sd-hl__track");
    root.hidden = list.length === 0;
    if (!track) return list;
    track.textContent = "";
    list.forEach(function (r, i) {
      var kind = KINDS[String(r.kind || "").toLowerCase()] ? String(r.kind).toLowerCase() : "highlight";
      var li = el("li", "sd-hl__slide");
      li.setAttribute("aria-roledescription", "slide");
      li.setAttribute("aria-label", (i + 1) + " of " + list.length + ": " + r.title);
      var text = el("div", "sd-hl__text");
      text.appendChild(el("span", "sd-tag sd-tag--" + kind, KINDS[kind]));
      text.appendChild(el("h3", "sd-hl__title", r.title));
      if (r.line) text.appendChild(el("p", "sd-hl__line", r.line));
      if (r.when) text.appendChild(el("p", "sd-hl__when", r.when));
      var href = safeUrl(r.link), label = LABELS.indexOf(r.button) >= 0 ? r.button : "Read more";
      if (href) { var a = el("a", "sd-btn sd-btn--primary", label); a.href = href; if (/^https?:/.test(href) && new URL(href).host !== location.host) { a.target = "_blank"; a.rel = "noopener"; } text.appendChild(a); }
      li.appendChild(text);
      var fig = el("figure", "sd-hl__stage"), src = safeUrl(r.image);
      if (src) { var img = el("img"); img.src = src; img.alt = r.alt || ""; img.loading = i === 0 ? "eager" : "lazy"; img.decoding = "async"; fig.appendChild(img); }
      li.appendChild(fig);
      track.appendChild(li);
    });
    return list;
  }
  // Wire one [data-sd-highlights]: fit each image, Previous and Next, dots, swipe, keyboard, optional autoplay with Pause.
  function highlights(root) {
    var track = root.querySelector(".sd-hl__track"); if (!track) return;
    var slides = [].slice.call(track.querySelectorAll(".sd-hl__slide")); if (!slides.length) { root.hidden = true; return; }
    var prev = root.querySelector("[data-dir='prev']"), next = root.querySelector("[data-dir='next']");
    var dotsBox = root.querySelector(".sd-hl__dots"), pauseBtn = root.querySelector(".sd-hl__pause");
    var current = 0, timer = null, held = false;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Fit: cover when the image's shape is close to the stage's, contain (with sanctum around it) when not, so flyers are never cropped.
    slides.forEach(function (s) {
      var fig = s.querySelector(".sd-hl__stage"), img = fig && fig.querySelector("img");
      function fit() { var r = img.naturalWidth / img.naturalHeight, f = fig.clientWidth / Math.max(1, fig.clientHeight); s.classList.toggle("is-cover", Math.abs(Math.log(r / f)) < 0.2); }
      if (!img) { s.classList.add("is-noimage"); return; }
      img.addEventListener("error", function () { s.classList.add("is-noimage"); img.remove(); });
      if (img.complete && img.naturalWidth) fit(); else img.addEventListener("load", fit);
    });
    var dots = [];
    if (dotsBox) {
      dotsBox.textContent = "";
      slides.forEach(function (s, i) {
        var d = el("button", "sd-hl__dot"); d.type = "button";
        d.setAttribute("aria-label", "Show slide " + (i + 1) + " of " + slides.length);
        d.addEventListener("click", function () { stop(); go(i); });
        dotsBox.appendChild(d); dots.push(d);
      });
    }
    function go(i) { current = (i + slides.length) % slides.length; track.scrollTo({ left: slides[current].offsetLeft - slides[0].offsetLeft, behavior: reduce ? "auto" : "smooth" }); }
    function mark(i) {
      current = i;
      dots.forEach(function (d, k) { if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      slides.forEach(function (s, k) { s.inert = k !== i; });
      if (prev) prev.disabled = !timer && i === 0;
      if (next) next.disabled = !timer && i === slides.length - 1;
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.intersectionRatio > 0.6) mark(slides.indexOf(e.target)); }); }, { root: track, threshold: [0.6] });
      slides.forEach(function (s) { io.observe(s); });
    }
    if (prev) prev.addEventListener("click", function () { stop(); go(current - 1); });
    if (next) next.addEventListener("click", function () { stop(); go(current + 1); });
    // Optional autoplay: data-autoplay="8000". Visible Pause, pauses on hover and focus, stops on any use, never under reduced motion.
    var every = +root.dataset.autoplay || 0;
    function tick() { if (!held) go(current + 1); }
    function play() { if (reduce || !every || timer) return; timer = setInterval(tick, every); if (pauseBtn) { pauseBtn.setAttribute("aria-pressed", "false"); pauseBtn.querySelector("span").textContent = "Pause"; } }
    function stop() { if (timer) { clearInterval(timer); timer = null; } if (pauseBtn) { pauseBtn.setAttribute("aria-pressed", "true"); pauseBtn.querySelector("span").textContent = "Play"; } mark(current); }
    if (pauseBtn) {
      pauseBtn.hidden = !every || reduce;
      pauseBtn.addEventListener("click", function () { if (timer) stop(); else { play(); mark(current); } });
    }
    root.addEventListener("pointerenter", function () { held = true; });
    root.addEventListener("pointerleave", function () { held = false; });
    root.addEventListener("focusin", function () { held = true; });
    root.addEventListener("focusout", function () { held = false; });
    track.addEventListener("pointerdown", stop);
    mark(0); play(); mark(0);
  }

  // Baba's eleven assurances: [data-sd-vachan]. Starts on the day's assurance, crossfades every data-interval ms (9000)
  // with a visible Pause; pauses on hover and focus; Previous or Next stop it; never rotates under reduced motion.
  function vachan(root) {
    var items = [].slice.call(root.querySelectorAll(".sd-vachan__item")); if (items.length < 2) return;
    var list = root.querySelector(".sd-vachan__list"), num = root.querySelector("[data-sd-vachan-n]"), bar = root.querySelector(".sd-vachan__bar");
    var pauseBtn = root.querySelector(".sd-vachan__pause"), every = +root.dataset.interval || 9000;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dayIndex = Math.floor(Date.parse(ymd(new Date()) + "T00:00:00Z") / 864e5);
    var current = dayIndex % items.length, timer = null, held = false;
    function show(i, announce) {
      current = (i + items.length) % items.length;
      items.forEach(function (it, k) { it.classList.toggle("is-current", k === current); });
      if (num) num.textContent = current + 1;
      if (list) list.setAttribute("aria-live", announce ? "polite" : "off");
    }
    function label(t) { if (!pauseBtn) return; pauseBtn.setAttribute("aria-pressed", t ? "false" : "true"); pauseBtn.querySelector("span").textContent = t ? "Pause" : "Play"; var ics = pauseBtn.querySelectorAll(".sd-ic"); if (ics[0]) ics[0].style.display = t ? "" : "none"; if (ics[1]) ics[1].style.display = t ? "none" : ""; }
    function play() { if (reduce || timer) return; timer = setInterval(function () { if (!held) show(current + 1, false); }, every); label(true); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } label(false); }
    root.classList.add("is-ready");
    if (bar) bar.hidden = false;
    if (pauseBtn) { pauseBtn.hidden = reduce; pauseBtn.addEventListener("click", function () { if (timer) stop(); else play(); }); }
    root.querySelectorAll("[data-dir]").forEach(function (b) {
      b.addEventListener("click", function () { stop(); show(current + (b.dataset.dir === "prev" ? -1 : 1), true); });
    });
    root.addEventListener("pointerenter", function () { held = true; });
    root.addEventListener("pointerleave", function () { held = false; });
    root.addEventListener("focusin", function () { held = true; });
    root.addEventListener("focusout", function () { held = false; });
    show(current, false); play();
  }

  // One call for a page: hydrate now, refresh every 30 seconds (the countdown), and wire every Highlights carousel and BabaVachan.
  function start(root) {
    root = root || document;
    hydrate(root);
    setInterval(function () { hydrate(root); }, 30000);
    root.querySelectorAll("[data-sd-highlights]").forEach(highlights);
    root.querySelectorAll("[data-sd-vachan]").forEach(vachan);
  }

  var api = { timings: timings, templeNow: templeNow, formatTime: formatTime, nextAarti: nextAarti, countdownText: countdownText, status: status, visibleEvents: visibleEvents, loadLiveDarshan: loadLiveDarshan, hydrate: hydrate, visibleHighlights: visibleHighlights, renderHighlights: renderHighlights, highlights: highlights, vachan: vachan, start: start };
  window.SaiDarbar = Object.assign(window.SaiDarbar || {}, api);
})();
