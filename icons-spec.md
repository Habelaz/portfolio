# Tech Stack Icons — Build Spec

## Goal
Add a tech stack icon grid to the portfolio. Icons are monochrome brand logos in a single consistent color. On hover, the icon tilts slightly and a tooltip with the tech name (e.g. "React") appears above it — no color change on hover.

## Package

Use **`react-icons`** (the `Si` / Simple Icons subset).

```bash
npm install react-icons
```

Why this over alternatives:
- Icons are single-color SVGs rendered with `fill="currentColor"` — they inherit whatever text/color class or inline color you give them, so recoloring for hover is just a style change, no filters or asset swaps.
- Ships as tree-shakeable React components — only the icons you import get bundled.
- Covers all needed logos: C++, Python, Zig, TypeScript, Bun, Next.js, React, Tailwind CSS, Prisma, Svelte, Anthropic/Claude, Vercel, Angular, Solid, AWS.
- Skip `devicon` — its icons come pre-colored or as a font, which fights a monochrome/theme-driven design instead of working with it.
- Skip raw `simple-icons` — same icon data as `react-icons/si`, but you'd hand-manage SVG paths yourself for no benefit here.

**Version check:** `SiZig`, `SiBun`, `SiSolid`, and `SiAnthropic` were added to Simple Icons relatively recently. Run `npm install react-icons@latest` and confirm these exports exist before building — if any are missing, fall back to a raw SVG for that one icon rather than blocking on the package.

## Icon imports

```js
import {
  SiCplusplus,
  SiPython,
  SiZig,
  SiTypescript,
  SiBun,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPrisma,
  SiSvelte,
  SiAnthropic,
  SiVercel,
  SiAngular,
  SiSolid,
  SiAmazonaws,
} from "react-icons/si";
```

## Data structure

Keep icons in a config array so the grid stays declarative:

```js
const TECH_STACK = [
  { icon: SiCplusplus, label: "C++" },
  { icon: SiPython, label: "Python" },
  { icon: SiZig, label: "Zig" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiBun, label: "Bun" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiReact, label: "React" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiSvelte, label: "Svelte" },
  { icon: SiAnthropic, label: "Claude" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiAngular, label: "Angular" },
  { icon: SiSolid, label: "Solid" },
  { icon: SiAmazonaws, label: "AWS" },
];
```

## Component behavior

### `TechIcon` (single icon + tooltip)
- Local `hovered` state, toggled on `onMouseEnter` / `onMouseLeave`.
- **Tooltip**: absolutely positioned above the icon (`-top-8`, centered via `left-1/2 -translate-x-1/2`), shown/hidden with Framer Motion `AnimatePresence`:
  - `initial`: `{ opacity: 0, y: 4, scale: 0.94 }`
  - `animate`: `{ opacity: 1, y: 0, scale: 1 }`
  - `exit`: same as initial
  - Style: small pill, `font-mono` (JetBrains Mono), dark surface background, sage-accent text, thin sage border at low opacity. `pointer-events-none` so it never blocks the hover target.
- **Icon tilt**: animate the icon wrapper (not the SVG directly) via Framer Motion. Color stays the same base icon color at all times — only rotation/scale change on hover:
  - Default: `{ rotate: 0, scale: 1 }`
  - Hovered: `{ rotate: -8, scale: 1.12 }`
  - Transition: spring, `stiffness: 300, damping: 15` — gives a slight snappy overshoot rather than a linear ease.
  - Icon color is set once (base color) and left untouched by the hover state — the tilt + tooltip are what communicate "hovered," not a color swap.

### `TechStack` (grid wrapper)
- CSS grid, centered items: `grid-cols-5` on mobile, stepping up to `grid-cols-8` on desktop (`sm:grid-cols-6 md:grid-cols-8`).
- Gap: horizontal a bit tighter than vertical (e.g. `gap-x-6 gap-y-8`) so tooltips have room without the grid feeling sparse.
- Maps over `TECH_STACK`, rendering one `TechIcon` per entry, keyed by `label`.

## Theming — plug in your actual tokens

Replace these placeholders with your real design-token values before shipping:

| Placeholder used above | Replace with |
|---|---|
| Base icon color (`#7fb7a3`-ish ) | Your default icon/foreground token — stays constant, no hover variant needed |
| Tooltip background (`#141922`-ish) | Your actual card/surface color |
| Tooltip border | Sage accent at ~20% opacity |
| Tooltip text | Sage accent (this is now the only place the accent color shows up on hover) |
| Tooltip font | JetBrains Mono (matches existing type stack) |

## Integration notes
- Icon size: `28px` is a reasonable default for a dense grid; scale with `clamp()` if you want it fluid across breakpoints, consistent with the responsive spec already in place.
- This is a self-contained component — drop it into whichever tab/section of the sidebar layout currently holds skills/stack info.
- No external state needed; each icon manages its own hover state independently, so no need to lift state up.