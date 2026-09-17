/* ============================================================
   MOSWAY — 04. CONTENT (renders data → DOM, filters,
   lightbox, mob arena game, FAQ, ticker)
   ============================================================ */
"use strict";
(function () {
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const D = () => window.MOSWAY;
  const S = () => window.MoswaySound;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Ticker ---------- */
  function renderTicker() {
    const track = $("#tickerTrack"); if (!track) return;
    const items = D().ticker.map(t => `<span class="ticker__item"><i>▣</i>${esc(t)}</span>`).join("");
    track.innerHTML = items + items; // doubled for seamless loop
  }

  /* ---------- Hero stats ---------- */
  function renderHeroStats() {
    const box = $("#heroStats"); if (!box) return;
    box.innerHTML = D().channel.stats.map(s =>
      `<div class="hstat"><b><span data-count="${s.value}" data-suffix="${esc(s.suffix)}">0</span></b><small>${esc(s.label)}</small></div>`
    ).join("");
  }

  /* ---------- Stats band ---------- */
  function renderStatsBand() {
    const box = $("#statsBand"); if (!box) return;
    box.innerHTML = D().channel.stats.map(s =>
      `<div class="stat reveal"><span class="stat__icon" aria-hidden="true">${s.icon}</span>
       <div class="stat__num"><span data-count="${s.value}" data-suffix="${esc(s.suffix)}">0</span></div>
       <div class="stat__label">${esc(s.label)}</div></div>`
    ).join("");
  }

  /* ---------- About ---------- */
  function renderAbout() {
    const facts = $("#aboutFacts"), list = $("#aboutList");
    if (facts) facts.innerHTML = D().about.facts.map(f => `<div class="fact"><b>${esc(f.k)}</b>${esc(f.v)}</div>`).join("");
    if (list) list.innerHTML = D().about.points.map(p => `<li>${p}</li>`).join("");
  }

  /* ---------- Videos + filters ---------- */
  function videoCard(v) {
    const ch = D().channel;
    const tagCls = v.tags.includes("funny") ? "tag--gold" : v.tags.includes("challenges") ? "tag--red" : "tag--dia";
    return `
    <article class="card video-card" data-tags="${v.tags.join(" ")}" data-tilt>
      <a class="card__media" href="${ch.shortsUrl}" target="_blank" rel="noopener" aria-label="Watch ${esc(v.title)} on YouTube Shorts">
        <picture>
          <source srcset="${v.imgSm}" type="image/webp">
          <img src="${v.img}" alt="${esc(v.alt)}" loading="lazy" decoding="async" width="600" height="733">
        </picture>
        <span class="play" aria-hidden="true"><span>▶</span></span>
      </a>
      <div class="card__body">
        <div class="flex gap-1 flex-wrap">
          <span class="tag ${tagCls}">${esc(v.badge)}</span>
          <span class="tag">${esc(v.length)}</span>
          <span class="tag">👁 ${esc(v.views)}</span>
        </div>
        <h3 class="mt-1">${esc(v.title)}</h3>
        <p>${esc(v.desc)}</p>
        <a class="btn btn--red btn--sm btn--block mt-2" href="${ch.shortsUrl}" target="_blank" rel="noopener">▶ WATCH SHORT</a>
      </div>
    </article>`;
  }
  function renderVideos() {
    const grid = $("#videosGrid"), chips = $("#videoFilters");
    if (!grid || !chips) return;
    grid.innerHTML = D().videos.map(videoCard).join("");
    chips.innerHTML = D().filters.map((f, i) =>
      `<button class="chip${i === 0 ? " active" : ""}" data-filter="${f.id}" aria-pressed="${i === 0}">${esc(f.label)}</button>`).join("");
    chips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip"); if (!btn) return;
      S() && S().play("pop");
      $$(".chip", chips).forEach(c => { c.classList.remove("active"); c.setAttribute("aria-pressed", "false"); });
      btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
      const f = btn.dataset.filter;
      let n = 0;
      $$(".video-card", grid).forEach(card => {
        const show = f === "all" || card.dataset.tags.split(" ").includes(f);
        card.classList.toggle("hide", !show);
        if (show) { n++; card.style.animation = "none"; void card.offsetWidth; card.style.animation = "popIn .35s var(--ease-pop)"; }
      });
      $("#videoCount").textContent = n + " / " + D().videos.length + " shown";
    });
    $("#videoCount").textContent = D().videos.length + " / " + D().videos.length + " shown";
  }

  /* ---------- Builds + lightbox ---------- */
  const Lightbox = {
    open(img, title) {
      const lb = $("#lightbox"); if (!lb) return;
      $("#lbImg").src = img; $("#lbImg").alt = title; $("#lbTitle").textContent = title;
      lb.classList.add("open"); document.body.style.overflow = "hidden";
      S() && S().play("pop");
    },
    close() { const lb = $("#lightbox"); if (!lb) return; lb.classList.remove("open"); document.body.style.overflow = ""; }
  };
  window.MoswayLightbox = Lightbox;

  function renderBuilds() {
    const grid = $("#buildsGrid"); if (!grid) return;
    grid.innerHTML = D().builds.map(b => `
      <article class="card build-card reveal" data-tilt>
        <div class="card__media" data-full="${b.img}" data-title="${esc(b.title)} — ${esc(b.biome)}" role="button" tabindex="0" aria-label="Enlarge ${esc(b.title)}">
          <picture>
            <source srcset="${b.imgSm}" type="image/webp">
            <img src="${b.img}" alt="${esc(b.alt)}" loading="lazy" decoding="async" width="800" height="450">
          </picture>
          <div class="build-card__overlay"><b>${esc(b.title)}</b><span class="zoom">🔍</span></div>
        </div>
        <div class="card__body"><span class="tag tag--gold">${esc(b.biome)}</span></div>
      </article>`).join("");
    grid.addEventListener("click", (e) => {
      const m = e.target.closest(".card__media"); if (m) Lightbox.open(m.dataset.full, m.dataset.title);
    });
    grid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const m = e.target.closest(".card__media"); if (m) { e.preventDefault(); Lightbox.open(m.dataset.full, m.dataset.title); }
      }
    });
    $("#lightbox").addEventListener("click", (e) => { if (e.target.closest("[data-lb-close]") || e.target.id === "lightbox") Lightbox.close(); });
  }

  /* ---------- Mob Arena game ---------- */
  const Arena = { kills: 0, xp: 0 };
  function renderMobs() {
    const grid = $("#mobsGrid"); if (!grid) return;
    grid.innerHTML = D().mobs.map(m => `
      <article class="card mob" data-mob="${m.id}" data-hp="${m.hp}" data-max="${m.hp}" data-xp="${m.xp}">
        <div class="mob__stage"><div class="pixel-mob ${m.cls}" aria-hidden="true"></div></div>
        <div class="mob__hp" role="progressbar" aria-label="${esc(m.name)} health" aria-valuemin="0" aria-valuemax="${m.hp}" aria-valuenow="${m.hp}"><i></i></div>
        <h3>${m.id === "pig" ? "🐷 " : "⚔ "}${esc(m.name)}</h3>
        <p>${esc(m.desc)}</p>
        <button class="btn btn--sm mob__btn" data-attack>⚔ ATTACK</button>
      </article>`).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-attack]"); if (!btn) return;
      const card = btn.closest(".mob");
      if (card.classList.contains("dead")) return;
      attackMob(card);
    });
    $("#arenaReset").addEventListener("click", () => {
      $$(".mob", grid).forEach(card => {
        card.classList.remove("dead");
        card.dataset.hp = card.dataset.max;
        paintHp(card);
        card.querySelector("[data-attack]").disabled = false;
        card.querySelector("[data-attack]").innerHTML = "⚔ ATTACK";
      });
      S() && S().play("levelup");
      window.MoswayToast && window.MoswayToast("⟳ Arena reset", "Fresh mobs have spawned!", "gold");
    });
  }
  function paintHp(card) {
    const hp = +card.dataset.hp, max = +card.dataset.max;
    const bar = card.querySelector(".mob__hp i");
    bar.style.width = Math.max(0, (hp / max) * 100) + "%";
    card.querySelector(".mob__hp").setAttribute("aria-valuenow", Math.max(0, hp));
  }
  function attackMob(card) {
    const id = card.dataset.mob;
    let hp = +card.dataset.hp;
    const dmg = 4 + Math.floor(Math.random() * 6);
    hp -= dmg; card.dataset.hp = hp;
    paintHp(card);
    card.classList.remove("hit"); void card.offsetWidth; card.classList.add("hit");
    // damage number
    const stage = card.querySelector(".mob__stage");
    const dmgEl = document.createElement("span");
    dmgEl.className = "dmg-num"; dmgEl.textContent = "-" + dmg;
    dmgEl.style.left = (30 + Math.random() * 40) + "%"; dmgEl.style.top = "10px";
    stage.appendChild(dmgEl); setTimeout(() => dmgEl.remove(), 1000);
    if (hp <= 0) {
      card.classList.add("dead");
      const btn = card.querySelector("[data-attack]");
      btn.disabled = true; btn.innerHTML = id === "pig" ? "💀 OINK... RIP" : "💀 DEFEATED";
      Arena.kills++; Arena.xp += +card.dataset.xp;
      $("#killCount").textContent = Arena.kills;
      $("#xpCount").textContent = Arena.xp;
      if (id === "creeper") { S() && S().play("explode"); window.MoswayFX && window.MoswayFX.burst(60, "#4caf3c"); }
      else S() && S().play("hurt");
      setTimeout(() => S() && S().play("xp"), 200);
      window.MoswayToast && window.MoswayToast(
        id === "pig" ? "🐷 You monster!" : "⚔ Mob defeated!",
        `+${card.dataset.xp} XP • Total Kills: ${Arena.kills}`
      );
      if (Arena.kills === D().mobs.length) {
        setTimeout(() => {
          S() && S().play("levelup");
          window.MoswayToast && window.MoswayToast("🏆 ARENA CLEARED!", "You're the true Mosway Champion!", "gold");
          window.MoswayFX && window.MoswayFX.diamondRain();
        }, 600);
      }
    } else {
      S() && S().play("click");
    }
  }

  /* ---------- Series timeline ---------- */
  function renderSeries() {
    const tl = $("#seriesTimeline"); if (!tl) return;
    tl.innerHTML = D().series.map(s => `
      <div class="mc-panel tl-item reveal"><span class="day">${esc(s.day)}</span>
      <h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`).join("");
  }

  /* ---------- FAQ ---------- */
  function renderFaq() {
    const box = $("#faqList"); if (!box) return;
    box.innerHTML = D().faqs.map(f => `
      <details class="faq-item reveal"><summary>${esc(f.q)}<span class="plus" aria-hidden="true">+</span></summary>
      <div class="faq-a"><p>${f.a}</p></div></details>`).join("");
    // accordion: one open at a time
    box.addEventListener("toggle", (e) => {
      if (e.target.open) {
        S() && S().play("pop");
        $$("details", box).forEach(d => { if (d !== e.target) d.open = false; });
      }
    }, true);
  }

  /* ---------- Live channel-data hook ----------
     Tries public endpoints for fresh channel facts; page works
     fully offline of this — static data.js is the source of truth. */
  function initLiveData() {
    const badge = $("#liveBadge"); if (!badge) return;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    fetch("https://www.youtube.com/oembed?url=" + encodeURIComponent(D().channel.url) + "&format=json", { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => {
        clearTimeout(timer);
        if (j && j.author_name) {
          badge.innerHTML = "● LIVE LINK VERIFIED — " + esc(j.author_name).toUpperCase();
          badge.classList.add("verified");
        }
      })
      .catch(() => { /* silent fallback: static channel data remains */ });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderTicker(); renderHeroStats(); renderStatsBand(); renderAbout();
    renderVideos(); renderBuilds(); renderMobs(); renderSeries(); renderFaq();
    initLiveData();
    // Re-observe dynamically added .reveal nodes
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }), { threshold: .12 });
    $$(".reveal:not(.visible)").forEach(el => io.observe(el));
  });
})();
