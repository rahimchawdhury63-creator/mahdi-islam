# ⛏ MOSWAY — Official Minecraft Gaming Portfolio

Portfolio website for **Mosway** ([@MoswayGaming](https://www.youtube.com/@MoswayGaming) on YouTube).

> Welcome to my gaming channel. Here I will play a ton of games. So subscribe now to join this community!

## ✨ Features

- **Minecraft design system** — grass-block buttons, XP scroll bar, 3 switchable realms (Overworld / Nether / The End)
- **Playable Mob Arena** — pure-CSS pixel mobs (Creeper, Enderman, Skeleton, Zombie, Ghast, Pig) with HP bars, damage numbers & XP
- **Block-rain canvas physics**, typewriter hero, animated counters, scroll reveals, 3D tilt cards
- **8-bit WebAudio sound engine** (zero audio files) with mute toggle
- **Video Shorts gallery** with live filtering, builds lightbox, upload schedule timeline, FAQ accordion
- **Contact form** → FormSubmit AJAX to `contactwithpaarth@gmail.com` (validation, honeypot, toasts)
- **SEO**: semantic HTML, OG/Twitter cards, canonical, sitemap, robots, JSON-LD (WebSite, Brand, ItemList, FAQPage, Breadcrumbs), PWA manifest
- **Responsive 200px → 5000px+** + `prefers-reduced-motion` + print styles
- **Easter eggs**: press `T` for TNT party 🎉, click the logo 5× for diamond rain 💎

## 📁 Structure

```
mosway/
├── index.html              # SEO-optimized page (semantic + JSON-LD)
├── css/
│   ├── 01-variables.css    # Design tokens + 3 realm themes
│   ├── 02-base.css         # Reset, type, utilities, a11y
│   ├── 03-layout.css       # Nav, hero, footer, toolbar
│   ├── 04-components.css   # Buttons, cards, forms, lightbox, toasts
│   ├── 05-sections.css     # All page sections + CSS pixel mobs
│   ├── 06-animations.css   # Keyframes
│   └── 07-responsive.css   # 200px → 5000px breakpoints
├── js/
│   ├── 01-data.js          # ✏️ EDIT CONTENT HERE (videos, stats, FAQs…)
│   ├── 02-main.js          # Preloader, nav, theme, sound engine
│   ├── 03-effects.js       # Canvas rain, typewriter, counters, tilt
│   ├── 04-content.js       # Rendering, filters, lightbox, arena game
│   └── 05-form.js          # FormSubmit AJAX handler
└── assets/img/             # Optimized JPG + WebP (responsive)
```

## 🚀 Run locally

```bash
cd mosway
python3 -m http.server 8000
# → http://localhost:8000
```

## ✏️ Updating content

All channel data lives in **`js/01-data.js`** — stats, videos, builds, mobs, schedule, FAQs, ticker. Edit that one file, no HTML surgery needed.

## 📬 Contact form

Submits via `https://formsubmit.co/ajax/contactwithpaarth@gmail.com`.
First submission triggers a FormSubmit activation email to the inbox — click it once to go live.
