/* ============================================================
   MOSWAY — 03. EFFECTS (block rain canvas, typewriter,
   counters, reveals, tilt, TNT party)
   ============================================================ */
"use strict";
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D = () => window.MOSWAY;

  /* ---------- Block-rain canvas ---------- */
  const FX = { burst: null, diamondRain: null };
  window.MoswayFX = FX;

  function initCanvas() {
    const cv = $("#blockCanvas"); if (!cv || reduced) return;
    const ctx = cv.getContext("2d");
    let W, H, parts = [];
    const COLORS = ["#5d9c37", "#7cbf4e", "#4aedd9", "#fcdb05", "#ff3b3b", "#a55eea", "#8a5a2b", "#9aa0a8"];
    const GLYPHS = ["▣", "◆", "✦"];

    function resize() {
      const r = cv.parentElement.getBoundingClientRect();
      W = cv.width = Math.floor(r.width); H = cv.height = Math.floor(r.height);
    }
    resize(); addEventListener("resize", resize);

    function spawn(n, opts) {
      opts = opts || {};
      for (let i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * W,
          y: opts.fromTop ? -20 : Math.random() * H,
          s: 4 + Math.random() * (opts.big ? 16 : 9),
          vy: .4 + Math.random() * 1.4,
          vx: (Math.random() - .5) * .6,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - .5) * .04,
          c: opts.color || COLORS[(Math.random() * COLORS.length) | 0],
          glyph: Math.random() < .18 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null,
          a: .35 + Math.random() * .55
        });
      }
      if (parts.length > 320) parts = parts.slice(-320);
    }
    spawn(70);

    FX.burst = (n, color) => spawn(n || 80, { fromTop: true, big: true, color });
    FX.diamondRain = () => { for (let k = 0; k < 3; k++) setTimeout(() => spawn(50, { fromTop: true, big: true, color: "#4aedd9" }), k * 250); };

    // TNT party!
    addEventListener("keydown", (e) => {
      if ((e.key === "t" || e.key === "T") && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        window.MoswaySound && window.MoswaySound.play("explode");
        spawn(120, { fromTop: true, big: true, color: "#ff3b3b" });
        setTimeout(() => spawn(60, { fromTop: true, big: true, color: "#fcdb05" }), 300);
        window.MoswayToast && window.MoswayToast("💥 TNT PARTY", "Kaboom! The chat goes wild!", "gold");
      }
    });

    let visible = true;
    new IntersectionObserver(en => visible = en[0].isIntersecting).observe(cv.parentElement);

    (function loop() {
      requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.y += p.vy; p.x += p.vx + Math.sin(p.y / 60) * .3; p.rot += p.vr;
        if (p.y > H + 30) { parts.splice(i, 1); if (Math.random() < .5) spawn(1, { fromTop: true }); continue; }
        ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        if (p.glyph) {
          ctx.fillStyle = p.c; ctx.font = (p.s * 2) + "px monospace";
          ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(p.glyph, 0, 0);
        } else {
          ctx.fillStyle = "#000"; ctx.fillRect(-p.s / 2 - 2, -p.s / 2 - 2, p.s + 4, p.s + 4);
          ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
          ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s / 3);
        }
        ctx.restore();
      }
    })();
  }

  /* ---------- Typewriter ---------- */
  function initTypewriter() {
    const el = $("#typeText"); if (!el) return;
    const lines = D().typewriter;
    if (reduced) { el.textContent = lines[0]; return; }
    let li = 0, ci = 0, del = false;
    (function tick() {
      const line = lines[li];
      el.textContent = line.slice(0, ci);
      let wait = del ? 28 : 55;
      if (!del && ci === line.length) { wait = 1700; del = true; }
      else if (del && ci === 0) { del = false; li = (li + 1) % lines.length; wait = 350; }
      else ci += del ? -1 : 1;
      setTimeout(tick, wait);
    })();
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0).replace(/\.0$/, "") + "K" : String(n);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
        if (reduced) { el.textContent = fmt(target) + suffix; return; }
        const t0 = performance.now(), dur = 1600;
        (function step(t) {
          const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
          el.textContent = fmt(Math.round(target * e)) + suffix;
          if (k < 1) requestAnimationFrame(step);
          else { window.MoswaySound && window.MoswaySound.play("xp"); }
        })(t0);
      });
    }, { threshold: .4 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduced) { els.forEach(el => el.classList.add("visible")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(el => io.observe(el));
  }

  /* ---------- 3D tilt cards ---------- */
  function initTilt() {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach(card => {
      let raf = null;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-6px)`;
        });
      });
      card.addEventListener("mouseleave", () => { cancelAnimationFrame(raf); card.style.transform = ""; });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCanvas(); initTypewriter(); initCounters(); initReveals(); initTilt();
  });
})();
