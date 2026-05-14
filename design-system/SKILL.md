# SKILL.md — Himanshu Kattelu Design System

> **What this is.** A loadable description of the visual & content
> system that powers [hkattelu.com](https://hkattelu.com): a JRPG
> pause-menu portfolio inspired by *Metaphor: ReFantazio*, plus a
> Hugo-based blog/art surface. Use it whenever you’re designing
> something that should look or sound like Himanshu’s work.

---

## When to use this skill

Reach for this system when any of the following are true:

- The user explicitly references **Himanshu Kattelu**, **hkattelu.com**, or the look of *Metaphor: ReFantazio*-style menus.
- You’re extending the personal portfolio with a new page, a new project card, an additional skill node, or a new blog template.
- You’re asked to mock a JRPG-style pause-menu UI in **any** product (the system is opinionated enough to work as a reference, even when the wordmark changes).
- You’re building an interactive prototype that wants the same vocabulary: paint-splatter focus plates, tilted 3D panels, looping background video, mono-uppercase menu options, italic display cartouches.

Do **not** use this system when:

- The user is asking for a clean enterprise UI, a minimal landing page, or anything that wants to feel “neutral.” Defer to a different system or build from scratch.
- The brief mentions a different brand (Apple, Material, Anthropic, etc.) — those have their own systems.

---

## Files at a glance

| File | What it does |
|---|---|
| `README.md` | Long-form description, voice rules, visual foundations, asset index. **Read this first.** |
| `colors_and_type.css` | All tokens (color, type, spacing, radii, shadows, motion). Import this into any artifact. |
| `fonts/lust-display-regular.otf` | The display face. Italic 400 only — never ask for bold (browsers will faux-bold and it goes muddy). |
| `assets/` | All raw imagery: paint masks, hero backgrounds, skill icons, hand-lettered labels, color-pencil art studies, portrait. |
| `preview/*.html` | One small standalone HTML per design-system token group — for the Design System review tab. |
| `ui_kits/personal-site/` | The full working UI kit: React + JSX components for the home page, panels, skill tree, projects carousel, toggles. Self-contained. |

---

## Quick-start recipe

```html
<!doctype html>
<html>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="colors_and_type.css">
</head>
<body class="dark">
  <h1 class="h-cartouche">Recent Work</h1>
  <h4 class="h-section">Hi, I’m Himanshu.</h4>
  <p class="body-copy">…</p>
  <span class="code">ESC</span>
</body>
</html>
```

That gives you correct fonts, tokens, and the two main heading treatments. For anything richer (menu options, skill nodes, tilted panels, paint masks), reuse the components in `ui_kits/personal-site/`.

---

## Hard rules

These are the things that will make output stop looking like Himanshu’s site if you ignore them.

1. **Three families only.**
   - **Lust Display italic** for cartouche h3, h4 section labels, the loader. *Display only.* Don’t use under 20px. Don’t set `font-weight: 700` — the font ships in 400 only, browsers will faux-bold and it looks muddy.
   - **Space Mono** for menu options, code chips, eyebrow labels — always uppercase.
   - **Roboto 500** for everything else.

2. **HSL-parameterized palette.** Don’t introduce new hex colors. Re-theme by changing `--hue` instead. Stay inside the five base tokens (`primary`, `secondary`, `tertiary`, `accent`, `tree`) + the per-mode dark/light shifts.

3. **The skill tree categories all share one color** (`--tree-color`). They are differentiated by *icon*, never by hue. The old per-category tokens (`--tree-core`, `--tree-frontend`, …) still exist but are now aliased to `--tree-color`.

4. **Paint masks are the focus indicator.** When showing a focused menu option, render `assets/masks/masks0–8.png` behind it and tint via the `filter: invert(…) hue-rotate(…)` chain in `styles.css`. Never invent a different focus style.

5. **No emoji in body or marketing copy.** Emoji are only used as skill-tree node icons (🛠 ⚡ 🛡 🌀 etc) — they’re ability icons, not punctuation.

6. **Almost everything tilts.** Content panels yaw by ~5° on the Y axis. Menu options rotate progressively (23° → -6° down the stack). The grid is intentionally not rigid.

7. **Grain + vignette overlay** belongs on every full-bleed screen (`.grain` in `styles.css`). It’s the connective tissue.

8. **Pages enter via a 90° rotation around a far axis**, not via fade or slide. `transform-origin: 130vw 0 0; rotate3d(0,0,1,-90deg) → rotate3d(0,0,0,0deg)` over 0.3s.

9. **Cartouche heading is now a Space-Mono-bold stamp with a small accent corner tab.** It used to be an italic Lust Display block with a clipped-corner; that was hard to read and the clip looked broken. The corner tab is the new brand mark.

10. **Voice is self-aware engineer.** Confident, first-person, plain, with the occasional self-deprecating joke. No corporate “We empower teams to…” copy. See README for examples.

---

## Soft rules (preferences, not laws)

- Prefer one looping video stand-in per page over a static background. Use `ken-burns` drift if you can’t use video.
- Subtle panel-breathing animation (`box-shadow` + `brightness` pulse, 2.6–3s loop) keeps things from feeling static. Respect `prefers-reduced-motion`.
- Right-angle borders > rounded chrome. Bullets are 50%, code chips are 4px, panels are 8–10px, cartouches are 2px.
- Use Font Awesome 6 for inline glyphs (arrows, external-link indicator, contact icons). Don’t hand-draw new SVGs.

---

## Common moves

| You want to… | Reach for… |
|---|---|
| Add a new skill | Add an entry to `SkillTree.jsx`’s `TREE_TABS[].skills`. Pick an emoji. Pick a `points` (`"8/10"` → 8 pips). |
| Add a new project | Add an entry to `Pages.jsx`’s `PROJECTS[]`. Title goes in a cartouche `h3`. Sub goes in a section `h4`. |
| Make a new screen | Use `<PageWrapper kind="new-screen-name">`. Add a `data-screen-label`. Drop in a `<Controls>` strip + a `<TextPanel>`. |
| Re-theme the whole site | Change `--hue` in `colors_and_type.css`. Done. Recompute the focus-state filter at https://codepen.io/sosuke/pen/Pjoqqp if you want pixel-perfect mask tints. |
| Add a new blog post | Drop a Markdown file in `hugo/content/posts/`. The Hugo `digio-theme` handles the rest. Don’t style it here. |

---

## Anti-patterns

- ❌ Using emoji in body copy or as substitutes for icons.
- ❌ Making the cartouche heading large + italic (it’s now mono + bold + small).
- ❌ Per-category colors in the skill tree.
- ❌ A glow halo around skill nodes (use an offset outline ring instead).
- ❌ Sans-serif on every heading (`Lust Display` does carry weight in this system — at h3+ cartouches we’ve moved to mono, but `h4.h-section` and the loader still want italic display).
- ❌ A static grid layout. Nothing on this site sits on a perfect grid; everything has a slight rotation.
- ❌ “Sign up” / “Get started” / “Schedule a demo.” The CTAs here are navigational and a little playful: *Let’s Connect!*, *Press ESC to return home.*

---

## How to hand this off to a developer

The blog/art side is **Hugo + a fork of `digio-theme`** (Tailwind-derived). The home page is **hand-crafted plain HTML/CSS/JS** (no framework). Webamp is loaded from a CDN for the blog music player. Everything else is in `hugo/static/`.

When delivering a new prototype built with this system, point the dev at `colors_and_type.css` as the canonical token source, and the `ui_kits/personal-site/` JSX as a working reference implementation. The CSS is identical to what ships in `hkattelu/hugo/static/styles.css` except where this design system has corrected the original (cartouche, skill-tree color unification, h4 weight).
