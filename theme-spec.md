# Theme Switcher, Download CV Button & Functionality — Spec

## 1. Theme Switch Placement

**Recommendation: sidebar footer, below the nav links and above the copyright line.**

Reasoning:
- The sidebar is persistent across every tab (Home/About/Career/Projects/Contact), so a switch placed there is always reachable without adding chrome to the main content area.
- It sits away from the numbered nav (`01 Home`, `02 About`...) so it doesn't compete visually with primary navigation — it reads as a secondary/utility control, which is what it is.
- Keeps the main content column (where `Download CV` already lives) focused on page-specific actions only.

**Layout:**
- Place directly under the `© 2026 ... All rights reserved.` line, or directly above it — either works; above tends to read cleaner since copyright becomes the very last, quietest element.
- Render as a small horizontal row of swatch/icon buttons (not a dropdown) — 4–5 little circles or icon toggles side by side, each representing one theme. Active theme gets a thin ring/border in its own accent color.
- Alternative (if the sidebar footer feels cramped on smaller viewports): a single compact icon button (e.g. a palette icon) that expands a small popover with the swatches on click. Use this fallback only if the row of swatches doesn't fit comfortably at your smallest supported sidebar width.

## 2. Theme Palette Options

All themes keep the same minimalist dark-first structure (bg / surface / accent / text roles) so swapping themes never changes layout — only color tokens. Each is a full CSS variable set, easy to wire into a `data-theme` attribute + CSS variables approach, or a small theme context if state needs to reach React logic (e.g. chart colors).

| Theme | bg | surface (cards) | accent | text (primary) | Mood |
|---|---|---|---|---|---|
| **Midnight Sage** (current/default) | `#0a0d12` | `#12161d` | `#7fb7a3` | `#e6e8eb` | Calm, current baseline |
| **Nordic Frost** | `#0b0f14` | `#131a21` | `#6f9bd1` | `#e6e8eb` | Cooler, more technical/blue |
| **Amber Dusk** | `#0d0b0a` | `#1a1512` | `#d9a066` | `#ece7e2` | Warm contrast, editorial feel |
| **Violet Nightfall** | `#0c0a12` | `#171224` | `#a48fd9` | `#e8e6ec` | Moody, slightly more expressive |
| **Paper** (light mode) | `#f5f4f0` | `#ffffff` | `#4f8a72` | `#14181f` | Only light option — darker sage for contrast on white |

Notes:
- All dark themes share nearly the same base darkness (`#0a0d12`–`#0d0b0a`) so switching feels like "same room, different lighting," not a jarring redesign.
- `Paper` is the one true light theme; the sage accent is darkened (`#4f8a72` vs `#7fb7a3`) so it still passes contrast on a white surface.
- Keep font stack (Sora/Inter/JetBrains Mono) identical across all themes — themes only change color tokens, never typography or spacing.

## 3. Download CV Button — UI Recommendation

Current button: icon + label, likely a bordered/ghost style. Recommendation to make it feel more intentional without adding visual noise:

**"Fill-sweep" hover button:**
- Base state: transparent background, 1px border in a muted gray, icon + text in default foreground color.
- On hover: background sweeps in as a solid fill using the current theme's **accent** color (left-to-right transform, ~200ms ease), text/icon color inverts to the dark background color for contrast.
- Download icon does a small bounce (translateY loop, 2 keyframes, ~600ms, repeats while hovered) to reinforce "this downloads something" — subtle, not distracting.
- Optional secondary detail: on hover, a small caption fades in below/beside the button showing file type + size (e.g. `PDF · 245 KB`) — nice touch, skip if it feels like clutter once implemented.

This keeps the button consistent with the rest of the site's restrained, ghost-button aesthetic while giving it a distinct "primary action" feel since it's one of the few real CTAs on the page.

## 4. Download CV — Functionality

**Recommended approach: native anchor `download` attribute — no JS required.**

1. Place the actual resume file in the public folder: `/public/cv/Abel-Zereabruk-CV.pdf`.
2. Wire the button as an anchor tag (not a `<button>`):
   ```html
   <a href="/cv/Abel-Zereabruk-CV.pdf" download="Abel-Zereabruk-CV.pdf">
     Download CV
   </a>
   ```
3. The `download` attribute forces a save-to-disk instead of navigating/opening in a new tab, and works even with JS disabled — most reliable option for a static portfolio.
4. Style the anchor to look like the button (flex layout, icon + text, apply the fill-sweep hover styles from section 3) — anchors take the same classes as buttons, no functional tradeoff.

**If you want a loading/analytics hook** (e.g. track download count, or show a brief "Preparing..." state):
- Add an `onClick` handler on the anchor that fires a lightweight analytics event (if you're using one) before the browser's native download kicks in — don't `preventDefault()`, just let the event fire alongside the native behavior.
- Only reach for a full `fetch` + `blob` + manual link-click approach if you need to show real download progress (large file) or gate the download behind logic (e.g. rate limiting) — unnecessary overhead for a single CV PDF, so skip it unless a concrete need shows up.

## Integration checklist
- [ ] Add theme tokens (5 sets from section 2) as CSS variables, switched via `data-theme` attribute on `<html>` or root wrapper
- [ ] Persist selected theme in `localStorage` so it survives refresh (read on mount, write on change)
- [ ] Build the swatch-row toggle component, place in sidebar footer per section 1
- [ ] Update `Download CV` markup to an anchor with `download` attribute per section 4
- [ ] Apply fill-sweep hover treatment to the CV button per section 3