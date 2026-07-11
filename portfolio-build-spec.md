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
    Avatar.jsx
    TabNav.jsx
    HomePanel.jsx
    AboutPanel.jsx
    ProjectsPanel.jsx
    AchievementsPanel.jsx
    ContactPanel.jsx
    Card.jsx
  hooks/
    useLenis.js
  App.jsx
  main.jsx
  index.css      // CSS variables + Tailwind directives + font imports
```

Each panel is its own component; `App.jsx` holds the active-tab state and renders the current panel through `AnimatePresence` (see below).

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
