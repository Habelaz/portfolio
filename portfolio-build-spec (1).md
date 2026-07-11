# Portfolio Build Spec

Reference: attached HTML file (sidebar + tabbed content layout). Use it as the exact visual/structural source of truth — colors, fonts, spacing, layout. Rebuild it as a proper Vite + React app with the additions below.

## 1. Project setup

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
```

## 2. Packages to install

```bash
npm install framer-motion lenis lucide-react clsx
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

| Package | Purpose |
|---|---|
| `tailwindcss` | Utility CSS. Use it for layout/spacing, but keep the existing color tokens (`--bg`, `--panel`, `--accent`, etc.) as CSS variables in a global stylesheet rather than hardcoded Tailwind colors — extend `tailwind.config.js` `theme.colors` to point at those variables. |
| `framer-motion` | All animation (tab transitions, hover states, load-in). Do not use a second animation library — one is enough and mixing causes jank. |
| `lenis` | Smooth scrolling (see section 4). |
| `lucide-react` | Icons for socials (GitHub, LinkedIn, mail) and nav — matches the minimal line-icon aesthetic, don't use a filled/emoji icon set. |
| `clsx` | Conditionally join class names for active tab / active card states. |

**Skip a component library** (no MUI, no shadcn, no Chakra). The cards, nav, and layout in the reference are simple enough that a UI kit would fight the custom look and add bundle weight for no real benefit. Build `Card`, `Tab`, `SidebarNav` as small local components instead.

## 3. Folder structure

```
src/
  components/
    Sidebar.jsx
    Avatar.jsx          // props: name, avatarSrc — falls back to initials
    TabNav.jsx
    SidePagination.jsx  // fixed side dots/numbers, one per section
    HomePanel.jsx
    AboutPanel.jsx
    CareerPanel.jsx     // timeline/thread UI
    ProjectsPanel.jsx
    ContactPanel.jsx
    Card.jsx
    ProjectCard.jsx     // props: githubUrl, liveUrl (optional)
    SkillIcon.jsx        // hover tooltip + tilt animation
  data/
    profile.js          // name, handle, role, avatarSrc, socials — single config object
    projects.js
    career.js
    skills.js
  hooks/
    useLenis.js
  App.jsx
  main.jsx
  index.css      // CSS variables + Tailwind directives + font imports
```

Nav order: **Home → About → Career → Projects → Contact**.

## 4. Smooth scrolling — Lenis

Set this up once, globally, in a hook:

```js
// src/hooks/useLenis.js
import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}
```

Call `useLenis()` once at the top of `App.jsx`. That's the entire integration — don't add a second scroll library (no `react-scroll`, no manual `scroll-behavior: smooth`, they'll conflict with Lenis's rAF loop).

## 5. Animation spec — Framer Motion

Be exact about which effect goes where. Don't add motion beyond this list — the reference design is minimal on purpose.

**a) Tab content switch**
Wrap the panel area in `AnimatePresence mode="wait"`. Each panel:
```jsx
<motion.section
  key={activeTab}
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
>
```
This replaces the current CSS `.panel.active` fade — same feel, driven by React state instead of class toggling.

**b) Active tab indicator (the left accent bar)**
Use a single `layoutId` element that Framer Motion slides between nav buttons automatically:
```jsx
{isActive && (
  <motion.div layoutId="tab-indicator" className="tab-indicator" />
)}
```
Framer Motion animates its position/height automatically when it moves to a different button — no manual transform math needed.

**c) Home grid cards — load-in stagger**
Parent variants with `staggerChildren: 0.06`, each `Card` as a child variant animating `opacity 0→1` and `y: 12→0`, duration `0.35`, ease `easeOut`. Only run this once on mount of the Home panel, not on every tab revisit (use `initial`/`animate`, not a scroll trigger).

**d) Card hover**
```jsx
<motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
```
Keep it to a small lift, no scale/rotate — matches the restrained aesthetic.

**e) Availability status dot**
Keep this as pure CSS (`@keyframes pulse`, already in the reference file). It's a continuous ambient loop, not interaction-driven, so CSS is lighter than Framer Motion here — don't rewrite it in JS.

**f) Sidebar on mobile**
No extra animation. It reflows to a top bar at `<820px` per the existing CSS breakpoint — leave that as-is, don't add slide-in/hamburger motion, it's out of scope for this pass.

## 6. What NOT to change

- Color tokens (`#0a0d12`, `#10141b`, `#7fb7a3`, etc.), font stack (Sora / Inter / JetBrains Mono), and spacing should be ported as-is from the reference HTML into `index.css` as CSS variables.
- No sidebar/content divider — keep the seamless background from the reference.
- No new icon set, animation library, or component kit beyond what's listed above.

## 7. Build order (do it in this sequence)

1. Scaffold Vite + Tailwind, drop in CSS variables + fonts in `index.css`.
2. Build static `Sidebar` + all five panels as plain JSX matching the reference HTML 1:1, no animation yet, tab switching via `useState`.
3. Add Lenis smooth scroll.
4. Layer in Framer Motion: tab indicator → panel transitions → card stagger/hover, in that order.
5. Swap placeholder copy/projects for real content last.
6. Apply Improvement Pass 1 (section 8) after the base build works end-to-end.

## 8. Improvement Pass 1

Apply these on top of the base build above.

**a) Fluid sizing — no fixed dimensions**
Replace hardcoded `px` widths/heights on the sidebar, cards, and panels with fluid, content-fitted sizing: use `flex`, `fit-content`, `min-content`, percentages, and `clamp()` instead. Nothing should be pinned to an exact pixel size unless it's a fixed-size icon.

**b) Typography scale**
Base body text too small — bump to 15–16px minimum. Use `clamp()` for headings, e.g. `h1 { font-size: clamp(28px, 4vw, 40px); }`. Increase line-height slightly across body copy for readability.

**c) Sidebar — full height, flex**
Sidebar becomes a flex column: `display: flex; flex-direction: column; height: 100dvh;`. Nav sits in the natural flow; footer/socials pinned to the bottom via `margin-top: auto`. Sidebar stretches to fill the viewport regardless of content length.

**d) Dynamic avatar via props**
`Avatar` component takes `name` and optional `avatarSrc`. If `avatarSrc` is provided, render that image from the assets directory. If not, derive and render initials from `name`. All profile content (name, handle, role, status, socials) should read from `data/profile.js`, not be hardcoded per component — so swapping identity is a one-file edit.

**e) Nav: replace Achievements with Career**
New order: Home, About, Career, Projects, Contact. Career sits before Projects.

**f) Career panel — timeline/thread UI**
Vertical connecting line down the left, a dot/node at each entry, role + company + date range next to each node — like a changelog or commit history. Data-driven from `data/career.js` (array of `{ role, company, start, end, description }`). Stagger each node's fade/slide-in down the thread using the same Framer Motion stagger pattern as the Home cards (section 5c).

**g) About — skill & tool icons with hover tilt**
Add a tech-stack grid and a separate tools grid, each item a `SkillIcon` (icon + label, data-driven from `data/skills.js`). On hover:
```jsx
<motion.div
  whileHover={{ rotate: 4, y: -2 }}
  transition={{ duration: 0.15 }}
  className="skill-icon"
>
  <Icon />
  <motion.span
    className="tooltip"
    initial={{ opacity: 0, y: 4 }}
    whileHover={{ opacity: 1, y: 0 }}
  >
    {name}
  </motion.span>
</motion.div>
```
Use `lucide-react` or a devicon-style icon set for tech logos — stay consistent with the icon style already used for socials.

**h) Side pagination**
Add `SidePagination.jsx`: a thin fixed strip (dots or numbers) on one side of the viewport, one marker per section, synced to `activeTab` state. Clicking a marker switches tabs; the active marker is highlighted and animates (via the same `layoutId` pattern as the tab indicator) when the section changes.

**i) Project cards — GitHub + live link icons**
`ProjectCard` takes `githubUrl` (required) and `liveUrl` (optional) props. Always render a GitHub icon linking out to `githubUrl`. Only render the live-demo icon if `liveUrl` is present — don't show a disabled/greyed-out icon when there's no live link, just omit it.
