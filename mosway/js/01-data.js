/* ============================================================
   MOSWAY — 01. DATA (single source of truth)
   Channel: Mosway • @MoswayGaming
   ============================================================ */
"use strict";

window.MOSWAY = {
  channel: {
    name: "Mosway",
    handle: "@MoswayGaming",
    tagline: "Welcome to my gaming channel. Here I will play a ton of games.",
    mission: "So subscribe now to join this community!!!",
    url: "https://www.youtube.com/@MoswayGaming",
    shortsUrl: "https://www.youtube.com/@MoswayGaming/shorts",
    subscribeUrl: "https://www.youtube.com/@MoswayGaming?sub_confirmation=1",
    contactEmail: "contactwithpaarth@gmail.com",
    // Milestone stats (animated counters; update as the channel grows)
    stats: [
      { icon: "❤️", value: 1000, suffix: "+", label: "Subscribers Goal", live: false },
      { icon: "🎬", value: 50, suffix: "+", label: "Epic Shorts", live: false },
      { icon: "👾", value: 20, suffix: "+", label: "Games Played", live: false },
      { icon: "💎", value: 999, suffix: "+", label: "Diamonds Mined", live: false }
    ]
  },

  ticker: [
    "WELCOME TO MOSWAY", "NEW SHORTS EVERY WEEK", "MINECRAFT • CHALLENGES • FUNNY MOMENTS",
    "SUBSCRIBE TO JOIN THE COMMUNITY", "NOOB → PRO JOURNEY", "1000 SUBS GOAL — LET'S GO",
    "COMMENT YOUR GAME IDEAS", "PRESS T FOR TNT PARTY"
  ],

  typewriter: [
    "⛏ Mining epic Minecraft Shorts...",
    "⚔ Noob → Pro gaming journey...",
    "💎 New videos every single week...",
    "🔥 Join the Mosway community!"
  ],

  videos: [
    {
      id: "v1", title: "NOOB vs PRO: Minecraft in 60 Seconds!",
      desc: "From dirt hut to diamond armor — the ultimate glow-up. Which side are you on?",
      img: "assets/img/short-noob-pro.jpg", imgSm: "assets/img/short-noob-pro-sm.webp",
      alt: "Mosway Minecraft short thumbnail — noob vs pro diamond armor transformation",
      tags: ["shorts", "minecraft"], badge: "SHORT", views: "12K", length: "0:58"
    },
    {
      id: "v2", title: "I Built the DEADLIEST TNT Trap Ever!",
      desc: "One lever. One bridge. One very unlucky creeper. You have to see this ending!",
      img: "assets/img/short-trap.jpg", imgSm: "assets/img/short-trap-sm.webp",
      alt: "Mosway gaming short — giant TNT trap prank on a jungle bridge",
      tags: ["shorts", "funny"], badge: "SHORT", views: "8.4K", length: "0:47"
    },
    {
      id: "v3", title: "Insane Lava Parkour SPEEDRUN!",
      desc: "No checkpoints. No mercy. Just pure speed over a lake of lava. Can I survive?",
      img: "assets/img/short-speedrun.jpg", imgSm: "assets/img/short-speedrun-sm.webp",
      alt: "Mosway Minecraft speedrun short — lava parkour challenge",
      tags: ["shorts", "challenges"], badge: "SHORT", views: "21K", length: "0:59"
    },
    {
      id: "v4", title: "Surviving 100 Days in HARDCORE!",
      desc: "One life. Zero respawns. Day-by-day hardcore survival series starts here.",
      img: "assets/img/build-caves.jpg", imgSm: "assets/img/build-caves-sm.webp",
      alt: "Mosway hardcore survival series — diamond cave expedition",
      tags: ["minecraft", "challenges"], badge: "SERIES", views: "5.1K", length: "12:24"
    },
    {
      id: "v5", title: "Nether Fortress RAID with Nothing!",
      desc: "No armor challenge in the Nether. Blazes, ghasts and pure chaos!",
      img: "assets/img/build-nether.jpg", imgSm: "assets/img/build-nether-sm.webp",
      alt: "Mosway Nether raid challenge with no armor",
      tags: ["minecraft", "challenges"], badge: "VIDEO", views: "3.8K", length: "9:17"
    },
    {
      id: "v6", title: "Ender Dragon FINALE — Epic Ending!",
      desc: "The journey ends where it began: the void. Dragon fight season finale!",
      img: "assets/img/build-end.jpg", imgSm: "assets/img/build-end-sm.webp",
      alt: "Mosway Ender Dragon final battle episode",
      tags: ["minecraft", "funny"], badge: "VIDEO", views: "9.9K", length: "14:02"
    }
  ],

  filters: [
    { id: "all", label: "⛏ ALL" },
    { id: "shorts", label: "▶ SHORTS" },
    { id: "minecraft", label: "🟩 MINECRAFT" },
    { id: "challenges", label: "⚔ CHALLENGES" },
    { id: "funny", label: "😂 FUNNY" }
  ],

  builds: [
    {
      title: "Sunset Cliff Castle", biome: "Overworld • Creative",
      img: "assets/img/build-castle.jpg", imgSm: "assets/img/build-castle-sm.webp",
      alt: "Mosway Minecraft build — stone brick castle on a cliff at sunset"
    },
    {
      title: "Diamond Deep Caves", biome: "Overworld • Survival",
      img: "assets/img/build-caves.jpg", imgSm: "assets/img/build-caves-sm.webp",
      alt: "Mosway Minecraft build — glowing diamond cave with lava and minecart rails"
    },
    {
      title: "Nether Fortress Siege", biome: "The Nether • Hardcore",
      img: "assets/img/build-nether.jpg", imgSm: "assets/img/build-nether-sm.webp",
      alt: "Mosway Minecraft build — Nether fortress bridge over lava with blazes"
    },
    {
      title: "End Dragon Arena", biome: "The End • Finale",
      img: "assets/img/build-end.jpg", imgSm: "assets/img/build-end-sm.webp",
      alt: "Mosway Minecraft build — End dimension dragon battle arena"
    }
  ],

  mobs: [
    { id: "creeper", name: "Creeper", cls: "mob-creeper", hp: 20, xp: 5, desc: "Hiss... BOOM! Handle with care.", sound: "hiss" },
    { id: "enderman", name: "Enderman", cls: "mob-enderman", hp: 40, xp: 8, desc: "Don't look it in the eyes.", sound: "teleport" },
    { id: "skeleton", name: "Skeleton", cls: "mob-skeleton", hp: 20, xp: 6, desc: "Spooky, scary, great aim.", sound: "rattle" },
    { id: "zombie", name: "Zombie", cls: "mob-zombie", hp: 25, xp: 6, desc: "Brains... and subscriber buttons.", sound: "groan" },
    { id: "ghast", name: "Ghast", cls: "mob-ghast", hp: 15, xp: 7, desc: "Cries a lot. Shoots fireballs.", sound: "cry" },
    { id: "pig", name: "Peaceful Pig", cls: "mob-pig", hp: 10, xp: 2, desc: "Oink. (Please don't hurt it.)", sound: "oink" }
  ],

  series: [
    { day: "MON", title: "Shorts Blast", desc: "A fresh 60-second banger to start your week — fails, wins and traps." },
    { day: "WED", title: "Minecraft Survival", desc: "The ongoing hardcore world series. Every heart matters." },
    { day: "FRI", title: "Challenge Friday", desc: "No-armor Nether, lucky blocks, parkour races — you vote, I suffer." },
    { day: "SUN", title: "Community Day", desc: "Your comments, your game ideas, subscriber builds showcase!" }
  ],

  faqs: [
    {
      q: "What games does Mosway play?",
      a: "A ton of games! The channel started with <strong>Minecraft Shorts</strong> — survival, builds, traps and challenges — and keeps expanding into new games based on what the community votes for. New ideas? Drop them in the comments or via the <a href=\"#contact\">contact form</a>."
    },
    {
      q: "When are new videos uploaded?",
      a: "Fresh <strong>Shorts every week</strong> plus longer videos: Survival on Wednesday, Challenge Friday and Community Day on Sunday. Hit <strong>Subscribe + the bell</strong> so you never miss a drop."
    },
    {
      q: "How can I join the Mosway community?",
      a: "Easy: 1) <strong>Subscribe</strong> on YouTube, 2) comment your game ideas, 3) share your builds for Community Day. Every subscriber gets us closer to the <strong>1,000 subs goal</strong>!"
    },
    {
      q: "Can I suggest a video idea or collaboration?",
      a: "Absolutely! Use the <a href=\"#contact\">contact form below</a> or email <strong>contactwithpaarth@gmail.com</strong> for collabs, ideas and business enquiries. I read everything."
    },
    {
      q: "Is this website really Minecraft themed?",
      a: "100%! Grass-block buttons, XP progress bar, three switchable realms (Overworld / Nether / The End), a playable mob arena, block-rain physics and 8-bit sounds. Press <span class=\"kbd\">T</span> anywhere for a TNT party."
    }
  ],

  about: {
    facts: [
      { k: "CHANNEL", v: "Mosway" },
      { k: "HANDLE", v: "@MoswayGaming" },
      { k: "CONTENT", v: "Gaming Shorts + Videos" },
      { k: "MAIN GAME", v: "Minecraft ⛏" },
      { k: "UPLOADS", v: "Every Week" },
      { k: "MISSION", v: "1,000 Subscribers" }
    ],
    points: [
      "<strong>A ton of games</strong> — Minecraft first, new worlds unlocked by your votes.",
      "<strong>Shorts-first format</strong> — maximum fun in under 60 seconds.",
      "<strong>Community powered</strong> — your ideas become real videos.",
      "<strong>Zero boring moments</strong> — traps, speedruns, hardcore and chaos."
    ]
  }
};
