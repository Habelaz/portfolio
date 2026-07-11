# Portfolio Mobile Navigation Spec

## Purpose
The current layout uses a fixed left sidebar (profile, nav tabs, socials, theme toggle footer) that works on desktop but doesn't fit below a certain viewport width. This spec defines how the sidebar collapses into a **top bar + hamburger-triggered overlay menu** on mobile, and where the theme toggle and Download CV button live at each breakpoint.

Companion to `portfolio-responsive-styling-spec.md` — that spec covers fluid typography/spacing/grids; this one covers navigation structure specifically.

---

## Breakpoint strategy

Use Tailwind's default breakpoints. Single switch point, no in-between tablet state (keeps this simple to implement and test):

| Range | Behavior |
|---|---|
| `< lg` (below 1024px) | Mobile top bar + hamburger overlay |
| `≥ lg` (1024px+) | Existing fixed sidebar, unchanged |

If in testing the sidebar feels cramped between 1024–1280px, we can push the switch to `xl` (1280px) later — flag this as a possible follow-up, don't build for it now.

---

## Mobile top bar (`< lg`)

Fixed to top of viewport, `h-16` (64px), full width, `z-50`, background matches theme bg with a subtle bottom border (`border-b border-white/10` dark / `border-black/10` light).

Layout, left to right:
1. **Left**: small avatar (32–36px) + name, truncates if needed. Tapping this scrolls to top / resets to About tab.
2. **Right, as a group**:
   - **Download CV icon button** — always visible, not hidden behind the hamburger (see rationale below)
   - **Hamburger button** — toggles the nav overlay

Page content gets `padding-top: 4rem` (or equivalent) on mobile to clear the fixed bar.

### Why the CV button stays outside the hamburger
This is a job-hunting artifact — a recruiter skimming on mobile shouldn't need an extra tap to find the CV. It stays one-tap accessible in the top bar at all times. It's also duplicated inside the overlay menu (full-width, more prominent) for users who open the menu first.

---

## Hamburger button

- Icon: `lucide-react` `Menu` (closed state) / `X` (open state)
- 40×40px tap target minimum (button itself can be smaller visually, padding makes up the difference)
- Icon swap animation: same pattern as the sun/moon theme toggle — Framer Motion crossfade + ~90° rotate, ~0.2s duration
- `aria-expanded={isOpen}`, `aria-controls="mobile-nav-overlay"`, `aria-label="Toggle navigation menu"`

```tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={isOpen ? "close" : "open"}
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    exit={{ rotate: 90, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {isOpen ? <X size={22} /> : <Menu size={22} />}
  </motion.div>
</AnimatePresence>
```

---

## Overlay menu

Full-screen panel, slides down from under the top bar. `z-40` (below top bar's `z-50` so the hamburger/X stays clickable and visible above it).

**Structure, top to bottom:**
1. Nav tabs — vertical stack, large tap targets (min 44px height each), current tab highlighted with the sage-green accent (`#7fb7a3` dark / `#4f8a72` light)
2. Divider (subtle, 1px, low-opacity border color)
3. Theme toggle row — icon + label ("Dark mode" / "Light mode"), same sun/moon swap animation as desktop, full-width tappable row
4. Download CV — full-width button, accent-colored, more prominent than the icon-only top bar version
5. Socials row — GitHub / LinkedIn / X icons, horizontally centered, near the bottom

**Animation:**
- Backdrop: `opacity 0 → 1`, semi-transparent (`bg-black/40` roughly, adjust per theme)
- Panel: slides from `translateY(-100%)` to `0`, spring or `ease-out`, ~0.3s
- Exit reverses both
- Use Framer Motion `AnimatePresence` wrapping the whole overlay so it unmounts cleanly

**Interaction / dismissal:**
- Tapping a nav item: switches tab AND closes the overlay (don't make the user close it manually)
- Tapping the backdrop: closes
- `Escape` key: closes
- Hamburger becomes X while open, tapping it closes

**Accessibility:**
- `role="dialog"` `aria-modal="true"` on the overlay panel
- Focus moves into the panel on open (first focusable element — likely first nav tab)
- Focus trapped inside while open (Tab/Shift+Tab cycle within panel)
- Focus returns to the hamburger button on close
- Body scroll locked while open (`overflow: hidden` on `<body>`, restore on close)

---

## Component reuse

Don't duplicate nav/theme-toggle/CV-button logic for mobile. Add a `layout` or `variant` prop to existing components instead:

- `NavTabs` → accepts `variant="sidebar" | "stacked"` (stacked = full-width vertical list used in overlay)
- `ThemeToggle` → accepts `variant="icon-only" | "row"` (row = icon + label used in overlay)
- `DownloadCVButton` → accepts `variant="icon" | "full"` (icon = top bar, full = overlay)

This keeps state (active tab, current theme) in one place and avoids sync bugs between desktop/mobile versions.

---

## New components to create

- `MobileTopBar.tsx` — the fixed top bar, renders avatar/name, CV icon button, hamburger
- `MobileNavOverlay.tsx` — the slide-down panel, renders `NavTabs`, `ThemeToggle`, `DownloadCVButton`, socials in their mobile variants
- Both conditionally rendered (or CSS-hidden) below `lg`; existing `Sidebar.tsx` conditionally rendered (or CSS-hidden) at `lg` and above

Prefer CSS-based show/hide (`hidden lg:flex` / `flex lg:hidden`) over JS viewport checks, so there's no layout flash on load or resize.

---

## Acceptance criteria

- [ ] Below `1024px`, sidebar is replaced by fixed top bar; above it, top bar is gone and sidebar behaves exactly as it does today
- [ ] Download CV icon is tappable directly from the top bar without opening the menu
- [ ] Hamburger opens overlay with slide-down + backdrop fade animation; icon crossfades to X
- [ ] Overlay contains nav tabs, theme toggle, full CV button, and socials, in that order
- [ ] Selecting a nav tab closes the overlay and switches content
- [ ] Backdrop tap and Escape key both close the overlay
- [ ] Body scroll is locked while overlay is open
- [ ] Focus is trapped in the overlay while open and returns to the hamburger on close
- [ ] No layout shift/flash when resizing across the `lg` breakpoint
- [ ] Theme toggle and CV button inside the overlay use the same underlying components/state as the desktop sidebar versions (just different `variant` props)