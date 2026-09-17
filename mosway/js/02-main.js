/* ============================================================
   MOSWAY — 02. MAIN (preloader, nav, theme, sound, chrome)
   ============================================================ */
"use strict";
(function () {
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 8-bit sound engine (WebAudio, no files) ---------- */
  const Sound = {
    ctx: null, muted: localStorage.getItem("mosway-muted") === "1",
    ensure() {
      if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* no audio */ } }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    },
    tone(freq, dur, type, vol, when, slide) {
      if (this.muted) return;
      const ctx = this.ensure(); if (!ctx) return;
      const t = ctx.currentTime + (when || 0);
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || "square"; o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
      g.gain.setValueAtTime(vol || .06, t);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + dur + .02);
    },
    play(name) {
      if (this.muted) return;
      switch (name) {
        case "click": this.tone(600, .07, "square", .05); break;
        case "hover": this.tone(900, .04, "square", .025); break;
        case "pop": this.tone(400, .12, "square", .06, 0, 900); break;
        case "levelup": [523, 659, 784, 1046].forEach((f, i) => this.tone(f, .14, "square", .055, i * .09)); break;
        case "explode": this.tone(120, .5, "sawtooth", .09, 0, 30); this.tone(60, .6, "square", .07, .02, 25); break;
        case "hurt": this.tone(220, .12, "sawtooth", .07, 0, 90); break;
        case "xp": this.tone(1200, .1, "sine", .06, 0, 1800); break;
        case "success": [659, 784, 1046, 1318].forEach((f, i) => this.tone(f, .16, "triangle", .07, i * .1)); break;
        case "error": this.tone(180, .25, "sawtooth", .07, 0, 90); break;
        case "teleport": this.tone(300, .3, "sine", .06, 0, 1400); break;
      }
    },
    toggle() { this.muted = !this.muted; localStorage.setItem("mosway-muted", this.muted ? "1" : "0"); return this.muted; }
  };
  window.MoswaySound = Sound;

  /* ---------- Toasts ---------- */
  function toast(title, msg, kind) {
    const box = $("#toasts"); if (!box) return;
    const el = document.createElement("div");
    el.className = "toast" + (kind ? " toast--" + kind : "");
    el.setAttribute("role", "status");
    el.innerHTML = "<div><b></b><span></span></div>";
    el.querySelector("b").textContent = title;
    el.querySelector("span").textContent = msg;
    box.appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 350); }, 4200);
  }
  window.MoswayToast = toast;

  /* ---------- Preloader ---------- */
  const tips = [
    "Tip: Press T anywhere for a TNT party...",
    "Tip: Creepers fear cats. You're welcome.",
    "Tip: Punch trees. Get diamonds. Simple.",
    "Tip: Subscribe to gain +100 luck...",
    "Tip: Don't dig straight down!"
  ];
  function runPreloader() {
    const pre = $("#preloader"); if (!pre) return;
    const fill = $("#preFill"), pct = $("#prePct"), tip = $("#preTip");
    tip.textContent = tips[Math.floor(Math.random() * tips.length)];
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.random() * 22);
      fill.style.width = p + "%"; pct.textContent = Math.floor(p) + "%";
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => { pre.classList.add("done"); document.body.classList.add("loaded"); }, 250);
      }
    }, 140);
    // Safety: never trap the user
    setTimeout(() => pre.classList.add("done"), 5000);
  }

  /* ---------- Navbar / drawer ---------- */
  function initNav() {
    const nav = $("#nav"), burger = $("#hamburger"), drawer = $("#drawer"), scrim = $("#scrim");
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 300 && y > lastY + 4 && !drawer.classList.contains("open")) nav.classList.add("nav--hidden");
      else if (y < lastY - 4 || y < 300) nav.classList.remove("nav--hidden");
      lastY = y;
      // XP progress
      const h = document.documentElement.scrollHeight - innerHeight;
      const pct = h > 0 ? Math.min(100, (y / h) * 100) : 0;
      $("#xpFill").style.width = pct + "%";
      $("#xpLevel").textContent = Math.floor(pct / 10);
      // to-top
      $("#toTop").classList.toggle("show", y > 600);
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const setDrawer = (open) => {
      drawer.classList.toggle("open", open);
      scrim.classList.toggle("show", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => { Sound.play("click"); setDrawer(!drawer.classList.contains("open")); });
    scrim.addEventListener("click", () => setDrawer(false));
    $$(".drawer__link, .drawer__cta a", drawer).forEach(a => a.addEventListener("click", () => setDrawer(false)));
    addEventListener("keydown", e => { if (e.key === "Escape") { setDrawer(false); window.MoswayLightbox && window.MoswayLightbox.close(); } });

    // Active link spy
    const links = $$(".nav__links a, .drawer__link");
    const map = new Map();
    links.forEach(a => { const id = a.getAttribute("href"); if (id && id.startsWith("#")) { if (!map.has(id)) map.set(id, []); map.get(id).push(a); } });
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a => a.classList.remove("active"));
          (map.get("#" + en.target.id) || []).forEach(a => a.classList.add("active"));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["home", "about", "videos", "builds", "arena", "series", "faq", "contact"].forEach(id => {
      const el = document.getElementById(id); if (el) spy.observe(el);
    });

    // Click blips
    $$(".btn, .chip, .icon-btn, .socials a").forEach(el => {
      el.addEventListener("click", () => Sound.play("click"));
    });

    $("#toTop").addEventListener("click", () => { Sound.play("pop"); scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });
  }

  /* ---------- Realm (theme) switcher ---------- */
  const REALMS = ["overworld", "nether", "end"];
  const REALM_ICON = { overworld: "🟩", nether: "🔥", end: "🌌" };
  const REALM_NAME = { overworld: "Overworld", nether: "The Nether", end: "The End" };
  function initRealm() {
    const btn = $("#realmBtn"); if (!btn) return;
    let realm = localStorage.getItem("mosway-realm") || "overworld";
    const apply = (r) => {
      realm = r;
      document.documentElement.setAttribute("data-realm", r);
      try { document.querySelector('meta[name="theme-color"]').setAttribute("content", r === "nether" ? "#1a090b" : r === "end" ? "#0f0a1e" : "#10141c"); } catch (e) {}
      btn.querySelector(".icon").textContent = REALM_ICON[r];
      btn.querySelector(".tip").textContent = "Realm: " + REALM_NAME[r] + " (switch)";
      localStorage.setItem("mosway-realm", r);
    };
    apply(REALMS.includes(realm) ? realm : "overworld");
    btn.addEventListener("click", () => {
      const next = REALMS[(REALMS.indexOf(realm) + 1) % REALMS.length];
      apply(next); Sound.play("teleport");
      toast("⛏ Realm changed", "Welcome to " + REALM_NAME[next] + "!", "gold");
    });
  }

  /* ---------- Sound toggle ---------- */
  function initSoundToggle() {
    const btn = $("#soundBtn"); if (!btn) return;
    const paint = () => {
      btn.querySelector(".icon").textContent = Sound.muted ? "🔇" : "🔊";
      btn.querySelector(".tip").textContent = Sound.muted ? "Unmute 8-bit sounds" : "Mute 8-bit sounds";
    };
    paint();
    btn.addEventListener("click", () => { const m = Sound.toggle(); paint(); if (!m) Sound.play("pop"); });
  }

  /* ---------- Footer year + misc ---------- */
  function initMisc() {
    $("#year").textContent = new Date().getFullYear();
    // Logo easter egg: 5 clicks → diamond rain
    let clicks = 0, timer;
    $$(".brand").forEach(b => b.addEventListener("click", () => {
      clicks++; clearTimeout(timer); timer = setTimeout(() => clicks = 0, 1200);
      if (clicks >= 5) { clicks = 0; Sound.play("levelup"); window.MoswayFX && window.MoswayFX.diamondRain(); toast("💎 ACHIEVEMENT", "Diamond Rain summoned!", "gold"); }
    }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    runPreloader(); initNav(); initRealm(); initSoundToggle(); initMisc();
  });
})();
