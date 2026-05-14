# Himanshu Kattelu — Design System

> *“This site is heavily inspired by the pause menu of the game Metaphor: ReFantazio.”*
> — Credits page, hkattelu.com

The personal portfolio and blog of **Himanshu Kattelu**, a staff‑level front‑end prototyper based in NYC who ships AI‑first product experiences end‑to‑end (UI → serving → telemetry → quality loops). Past work spans **YouTube AI** (Ask Button, Quiz Posts, Courses), **GCP Logging**, and an arcade of creator side‑projects (QuizBot.games, Gaming Wrapped, Synapse Video Editor).

The site is *not* a typical portfolio — it’s a **stylized pause menu**. Tilted serif italics. Paint‑splatter masks behind every menu option. Looping background videos of NYC, gardens, and code. A skill tree instead of a “Skills” bullet list. Hidden Konami easter‑egg. Sound effects on every selection.

This design system encodes that vibe so future designs can plug into it cleanly.

---

## Sources

- **Codebase** (mounted, read‑only) — `Hkattelu.github.io/`
  - `hugo/layouts/index.html` — the hand‑crafted homepage (the pause menu)
  - `hugo/layouts/me.html` + `hugo/content/me.md` — the long‑form About page
  - `hugo/layouts/_default/baseof.html` — blog/about chrome (with the **Webamp** music player)
  - `hugo/static/styles.css` — the home stylesheet (truth source for tokens)
  - `hugo/static/skill-tree.css` — the skill tree
  - `hugo/static/script.js` — page transitions, scramble text, skill data, audio
  - `hugo/static/css/styles.css` + `hugo/static/css/overrides.css` — blog/Hugo theme (Tailwind‑derived `digio-theme`)
  - `hugo/content/posts/*.md` — voice/tone reference
- **Live site:** https://hkattelu.com — https://github.com/Hkattelu/Hkattelu.github.io
- **Inspirations called out in the site’s Credits panel:** Metaphor: ReFantazio (Atlus), [Bryant Smith](https://bryantcodes.art/), [Hyperplexed](https://www.youtube.com/@Hyperplexed), [Coding2Go](https://www.youtube.com/@coding2go), [Sajid](https://www.youtube.com/@whosajid).

---

## Products represented

Just one — **the personal website (`hkattelu.com`)** — but it has two distinct *surfaces* that this system covers:

1. **Pause Menu (home / "/")** — the hand‑crafted, full‑viewport, 3D‑tilted single page app. Bespoke layout, paint‑mask focus states, page‑rotating transitions, Glide.js carousel, custom skill tree, Konami easter egg.
2. **Blog & Art (`/blog/`, `/art/`, `/me/`)** — Hugo + `digio-theme` (Tailwind‑based). Simple long‑form reading surface with a Webamp window pinned to the side.

A single UI kit lives at `ui_kits/personal-site/` covering both surfaces.

---

## CONTENT FUNDAMENTALS

**Voice**: First‑person, plain, self‑deprecating where it lands, but *technically dense* underneath. Himanshu writes the way an engineer talks to another engineer at a whiteboard — sentences are short, parentheticals are common, and there is usually a concrete example within two clauses.

**Pronouns**: First‑person **"I"** in long copy ("I move quickly without breaking trust"). Reader is addressed as **"you"** sparingly — mostly in keyboard‑hint chrome ("Use the ↑ and ↓ keys to navigate", "Press ESC to return home").

**Casing**:
- **MENU OPTIONS — UPPERCASE.** Always. ("ABOUT ME", "SKILLS", "PROJECTS", "CONTACT", "BLOG", "CREDITS")
- **Cartouche headings (h3) — Title Case** with the *visual* uppercase coming from CSS (`text-transform: uppercase`). Source case is human.
- **Body copy — sentence case**, with em‑dashes and casual punctuation. Smart quotes are used inconsistently in the source markdown — don’t worry about it.

**Examples that capture the voice**
- *“I’m a staff‑level front‑end prototyper who ships AI‑first product experiences end‑to‑end — from fast, delightful UI to the serving hooks, telemetry, and quality loops that make them safe and reliable.”* (hero)
- *“I live for those 3 AM production incidents where everything’s on fire and someone needs to stay cool.”* (SRE skill)
- *“If it moves, I automate it. If it doesn’t move, I automate it anyway.”* (CI/CD skill)
- *“Yes, I can code and spin fire. No, I haven’t tried doing both at once.”* (Poi skill)
- *“Speed isn’t about rushing — it’s about knowing where to focus.”* (Execution skill)

**Vibe**: Confident but not bragging — every claim is backed by a project, a number, or a self‑aware quip. Game‑y borrowed vocabulary is welcome (*“+2 bonus when armed with DevTools”*, *“Boosted when paired with strong UX intuition”*, *“stamina”*, *“buff”*). Persona JRPG character‑sheet energy is the goal.

**Emoji**: Used **inside** the skill tree as the per‑node *icon* (🛠 ⚡ 🔍 🛡 🚀 🤝 🌀 💪). Not used in body prose, not used in titles, not used in marketing copy. Treat emoji as **gameplay UI**, not as punctuation.

**Calls to action**: Almost always navigational, never sales‑y. *"Let’s Connect!"*, *"Check out more on my blog here"*, *"Press ESC to return home."* No "Sign up." No "Get started." No "Schedule a demo."

**Lists**: Heavy use of `<ul>` inside content panels. List markers are sometimes hidden (the home page) and sometimes visible disc (the skill panel). Lists frequently use sub‑lists indented inside `<li>`.

---

## VISUAL FOUNDATIONS

A complete reference of *“what makes a Himanshu Kattelu screen look like a Himanshu Kattelu screen.”* Token names are defined in [`colors_and_type.css`](./colors_and_type.css).

### Colors

The palette is **HSL‑parameterized** off a single `--hue` (220). Change one variable, repaint the site.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--primary-color` | `hsl(220 50% 90%)` pale blue‑white | `hsl(220 50% 10%)` deep navy | Ink / type on dark panels |
| `--secondary-color` | `hsl(220 50% 10%)` deep navy | `hsl(220 50% 90%)` pale blue‑white | Panel surface |
| `--tertiary-color` | `hsl(520 80% 20%)` deep grape | `hsl(520 80% 80%)` lilac | Accent text / credits |
| `--accent-color` | `hsl(300 80% 80%)` soft magenta | `hsl(300 80% 20%)` plum | Links, highlights |
| `--tree-color` | `hsl(300 80% 60%)` vivid magenta | `hsl(300 80% 40%)` purple | Skill node ring |
| `--pre-primary-color` | translucent paper | translucent ink | Code chip ground |

Per‑tab tree colors (Skill Tree): `--tree-core` cyan, `--tree-frontend` violet, `--tree-ai` mint, `--tree-devops` orange, `--tree-leadership` gold, `--tree-bonus` hot‑pink. Each tab repaints the node rings.

**Vibe of imagery**: warm grain over every video; videos themselves are *NYC golden‑hour* (Highline, Big Ben, garden, code). The Credits panel is a deliberate `radial-gradient(red, black)` — a JRPG title card. The hero background is a *muted, slightly de‑saturated* shot of Pittsburgh’s skyline.

### Typography

Three families, sharply separated by role:

- **Lust Display** (italic display serif, loaded from `fonts/lust-display-regular.otf`) — every cartouche heading, the loader script, decorative section h4s. *This is the brand voice.*
- **Roboto** (300/400/500/700/900) — all body copy, blog content. Weight 500 is the default.
- **Space Mono** (400/700, italic) — menu options, code chips, the keyboard‑hint affordances.

> **⚠️ Font substitution note** — *Lust Display* is a commercial face from Positype. The `.otf` file ships with the codebase and is used directly here. The CSS falls back to **DM Serif Display → Playfair Display → serif** if the file is unavailable. Flag this to Himanshu if you republish.

Scale ranges from a clamped `clamp(3rem, 10vh, 5rem)` for menu options down to `12px` for code chips. See `colors_and_type.css` for the semantic role variables.

### Spacing

A 4‑pixel base scale: `4, 8, 12, 16, 24, 32, 48, 64`. Layout is *not* dense — long copy gets `line-height: 1.85` and lists get `1.9`. Content panels carry **16px** internal padding and sit with **10vw** margin off the right/left edges of the viewport.

### Backgrounds

- **Full‑bleed JPGs**, one per page, *cover‑positioned, 60% centered*. The home page background ("pittsburgh.png") wobbles gently in a 4s loop via `@keyframes wobble-background`.
- **Looping muted videos** rotate based on the focused page (`garden.mp4`, `code1.mp4`, `metaphor.mp4`, `big_ben.mp4`, `highline.mp4`, `projects_0–6.mp4`).
- **Paint‑splatter masks** (`masks0–8.png`) are the soul of the brand. They serve as the focus indicator behind each menu option: when an option is focused, the mask blooms in behind the text and inverts via a `filter: invert(...) hue-rotate(...)` chain. Same masks are used as the loader plate.
- **Grain + vignette** — a fixed `.grain` overlay sits at `z-index: 2` with `mix-blend-mode: overlay`, layering an SVG `feTurbulence` noise pattern with a radial vignette toward the bottom.

### Animation

- **Page transitions** rotate a panel around a far axis: `transform-origin: 130vw 0 0; rotate3d(0, 0, 1, -90deg);` over `0.3s ease-in`. Pages fold in from the right like cards on a deck.
- **Menu option entry**: each menu item starts `translateY(-100vh)` and falls in via `@keyframes fall` over 1s. Hidden options exit via `@keyframes rise`.
- **Text scramble**: when a panel opens, the controls strip cycles its letters through a random A–Z scramble for ~6 ticks at 50ms before snapping to the real text.
- **Letter fly‑in**: section text letters fly in from random off‑screen positions (200vw/100vh) with random rotation, settling over `750ms ease-out`.
- **Selection spark**: a 6×6 dot at the click point that drifts up‑and‑right then fades over `0.42s` with a `cubic-bezier(.2,.9,.2,1)` ease and an accent drop‑shadow.
- **Subtle panel breathing**: visible `.text-section`s pulse `box-shadow` + `brightness` on a 2.6s ease cycle. Videos do the same on a 3s cycle. Both respect `prefers-reduced-motion`.
- **Background wobble**: 8s ease‑in‑out scroll of the home background by ±0.5% in each axis.
- **Skill tree node appear**: each node animates `transform: scale(0) → scale(1)` staggered by `var(--delay)`. Selected nodes get a 1.8s pulse on box‑shadow.

### Hover / Press / Focus

- **Hover**: opacity bumps from `0.7 → 1` (audio/dark toggles), or a `translateY(-2px) scale(1.02)` lift + `box-shadow` deepening (art cards). No color shift on hover for links — color shift happens on **focus** instead.
- **Focus** (the iconic state): the menu option grows a paint‑splatter mask plate behind it. The plate is rendered via `background-image: url(masks0.png)` and tinted with `filter: invert(...) hue-rotate(...) saturate(...)`. The plate is `40vw × 30vh`, positioned slightly below center.
- **Press**: no explicit press state on the menu options. The sound effect (`select.mp3`) *is* the press feedback. Bullets in the carousel use a filled vs hollow disc swap.

### Borders, Shadows, Cards

- **Borders are skinny and crisp.** `1px solid var(--primary-color)` is the default. The cartouche `h3` uses `inset 0 0 0 2px` plus `clip-path` to chop the top‑right corner into a flag.
- **Shadows come in three flavors**:
  - `--shadow-card`: `0 8px 22px -12px rgba(0,0,0,0.38)` — calm card lift
  - `--shadow-lift`: `0 18px 40px -16px rgba(0,0,0,0.50)` — pulse peak
  - `--shadow-node`: `0 6px 16px rgba(0,0,0,0.24)` — skill nodes
- **Cards** = `.text-section`. Rounded `8–10px`, solid `var(--secondary-color)` fill, `16px` padding, optional `1px` border. They sit *tilted in 3D space*: most pages translate them `-20px` horizontally and apply `rotate3d(0,-1,0,5deg)` for a 5° yaw away from the camera.

### Transparency / blur

- **Code chips** use a translucent `--pre-primary-color` (20% alpha) over the dark panel — readable, low‑contrast plate.
- **No backdrop blur anywhere.** The grain overlay (mix‑blend‑mode: overlay) is the only compositional effect.

### Layout rules

- **Fixed elements**: audio toggle (bottom‑right), dark‑mode toggle (bottom‑right, 80px left of audio). Loader (fullscreen, centered). Grain overlay (fullscreen `position: fixed`). Webamp window on blog pages (top‑left, fixed).
- **Content panel position**: most pages right‑align the panel (`margin-right: 10vw; margin-bottom: 10vh`). The video sits *behind it* on the left.
- **Mobile (`< 768px`)**: the 3D tilt is mostly stripped. Menu options become a left‑aligned vertical list. Panels expand to full width. Skill‑tree connection lines hide. Carousel bullets stay.

### Corner radii

Right‑angles are a feature. The cartouche `h3` uses `border-radius: 2px` plus a clip‑path corner. Panels use `8–10px`. The toggle buttons are perfect circles. Code chips use `4px`. Bullets are 50%.

### Visual rhythm

Tilted text, paint masks, looping videos. Nothing on this site sits on a perfect grid — *every* major element has a slight rotation, a slight offset, a slight delay. The grain + the pulse animation keep the page from feeling static even when nothing is happening.

---

## ICONOGRAPHY

The site mixes **three** icon systems. Use the appropriate one for the role.

### 1. Skill‑tree category SVGs (custom, monochrome)
Located at [`assets/icons/`](./assets/icons/). One per skill tree tab:
- `engineering.svg`
- `frontend.svg`
- `ai.svg`
- `devops.svg`
- `leadership.svg`
- `bonus.svg`

These are simple **Font Awesome** silhouettes flattened to a single path, intended to be inverted in dark mode (`filter: invert()`). They are pure‑black; color comes from the tab’s `--tree-*` token.

### 2. Font Awesome 6.7 (CDN‑loaded)
Used inline in the home page for **arrow keys, link‑out indicators, and contact icons**.

```html
<link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
  integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer" />
```

Examples in the wild:
- `<span class="fa fa-arrow-up code"></span>` — keyboard hint
- `<span class="fa fa-arrow-up-right-from-square"></span>` — external link
- `<a class="fa fa-envelope"></a>` `<a class="fa fa-brands fa-linkedin"></a>` — contact section

### 3. Emoji (as JRPG skill icons)
Inside the skill tree, every skill node carries an **emoji** as its icon (🛠 ⚡ 🔍 📊 🔐 🎞 💻 📱 🎭 🕸 🎮 📈 🎯 🧠 📡 🧪 🛡️ 🧾 🛡 🌀 🚀 🤝 📢 🧑‍🏫 💪 🎥 🧩). Emoji are *only* used in this context — never in body prose or marketing copy. Treat them like JRPG ability icons.

### Other glyphs / unicode
- The right‑facing arrow `→` is occasionally typed as `<span class="fa fa-arrow-right">` rather than a unicode character.
- The two PNG character labels (`likes.png`, `dislikes.png`, `hobbies.png`) on the About page are **rendered images** with hand‑lettered styling. Treat them as brand assets, not icons.

### Approach when adding new icons
1. **Prefer the codebase’s own SVGs** in `assets/icons/` first.
2. If not found there, **use Font Awesome 6** (already loaded; matches the existing weight).
3. If the role is "skill / ability", **use a single emoji**.
4. Never hand‑draw a new SVG — it will not match the existing visual weight.

---

## File index

| Path | What it is |
|---|---|
| [`README.md`](./README.md) | This file. |
| [`SKILL.md`](./SKILL.md) | Cross‑compatible Agent Skills manifest. |
| [`colors_and_type.css`](./colors_and_type.css) | All design tokens — colors, type roles, spacing, radii, shadows, motion. |
| [`fonts/`](./fonts/) | `lust-display-regular.otf` (display face used on the home page). |
| [`assets/`](./assets/) | Logos, masks, backgrounds, character labels, art, icons, the portrait. |
| [`assets/icons/`](./assets/icons/) | Skill‑tree category SVGs (engineering, frontend, ai, devops, leadership, bonus). |
| [`assets/masks/`](./assets/masks/) | `masks0–8.png` — paint‑splatter focus plates. |
| [`assets/backgrounds/`](./assets/backgrounds/) | Light/dark hero backgrounds + the Pittsburgh skyline. |
| [`assets/art/`](./assets/art/) | Color‑pencil character study thumbnails (Heismay, Jodio, Jotaro, …). |
| [`assets/labels/`](./assets/labels/) | Hand‑lettered PNG labels (Likes, Dislikes, Hobbies, etc). |
| [`preview/`](./preview/) | Design‑system tab cards. One small HTML per token group. |
| [`ui_kits/personal-site/`](./ui_kits/personal-site/) | The full UI kit — JSX components + `index.html` demo for the pause‑menu and the blog. |

---

## How to use this system

Open [`preview/index.html`](./preview/index.html) (if you’re inside the project) or look at the **Design System** tab in the workspace — every card lives there. For a working preview of a full screen, open [`ui_kits/personal-site/index.html`](./ui_kits/personal-site/index.html).

To **use** the system in a new artifact:

```html
<link rel="stylesheet" href="path/to/colors_and_type.css" />
<body class="dark">
  <button class="h-cartouche">Read the post</button>
  <p class="body-copy">…</p>
  <span class="code">ESC</span>
</body>
```

Read [`SKILL.md`](./SKILL.md) if you’re an agent picking this up via the Agent Skills protocol.
