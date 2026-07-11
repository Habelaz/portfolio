# Scroll-Snap Section Transitions — Spec

## Chosen approach: Snap + Fade
CSS scroll-snap handles section positioning; Framer Motion handles content entrance animation within each section as it becomes active. IntersectionObserver drives the sidebar's active-tab and dot-pagination state.

## 1. Outer scroll container (section snapping)

```css
.scroll-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth; /* fallback if Lenis isn't handling this */
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always; /* prevents skipping past a section on fast scroll/trackpad flick */
}
```

- If Lenis is already managing smooth scroll globally, verify it's configured to respect `scroll-snap-type` — some Lenis configs need `syncTouch` / native snap passthrough enabled, otherwise it can fight the browser's snap points. Test scroll-snap with Lenis active before building on top of it, not after.

## 2. The nested-scroll problem

Some sections (Projects list, Career timeline, possibly a long About section) may have more content than fits in one viewport height. Two bad outcomes to avoid:
- User tries to scroll inner content, but the outer snap container hijacks the scroll and jumps to the next section before they've read everything.
- User finishes scrolling inner content to its end, but nothing happens — outer container doesn't pick up the scroll to advance.

**Solution: `overscroll-behavior: contain` on inner scrollable elements — no custom JS/wheel-event handling needed.**

```css
.section-inner-scroll {
  max-height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain; /* stops scroll from chaining to the outer snap container */
}
```

How this solves it natively:
- While the user scrolls *inside* a section's inner scrollable area and hasn't hit the top/bottom edge yet, the scroll stays contained there — the outer snap container never sees the scroll event, so it can't jump sections mid-read.
- Once the inner content reaches its scroll boundary (top or bottom), the *next* scroll gesture is free to bubble up to the outer container as normal, which then snaps to the adjacent section.
- This is native CSS behavior (well-supported in all modern browsers) — no wheel-event interception, no manual scroll-position math, no edge cases to hand-maintain.

**Only sections that actually overflow need `.section-inner-scroll`** — apply it conditionally (e.g. wrap Projects/Career content in it), not globally on every section, so simple sections (Home, Contact) keep plain natural layout with no extra scroll container.

## 3. Active section tracking (for sidebar nav + dot pagination)

Use `IntersectionObserver` on each `.section`, not scroll-position math:

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        setActiveSection(entry.target.id);
      }
    });
  },
  { threshold: 0.5 } // section must be at least 50% visible to count as "active"
);

sections.forEach((section) => observer.observe(section));
```

- Drives both the sidebar nav highlight (`01 Home` bold/underlined state) and the dot pagination indicator on the right edge.
- `threshold: 0.5` avoids flickering between two sections when they're both partially visible during the snap transition.

## 4. Content entrance animation (Framer Motion)

Within each section, animate content in as it becomes visible:

```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.4 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* section content */}
</motion.div>
```

- `viewport={{ once: false }}` lets the animation replay if the user scrolls back up to a previous section — keeps it feeling alive on repeat visits, not just first load.
- `amount: 0.4` triggers the animation once 40% of the content is in view — avoids overly late/early triggers relative to the snap point.
- Stagger child elements (heading → subtext → cards) with a small `delayChildren`/`staggerChildren` on a parent variant if you want a more choreographed reveal rather than everything fading in at once — optional, adds polish but not required.

## 5. Sidebar click-to-navigate

Clicking a sidebar nav item (`02 About`) should scroll the outer container to that section, respecting snap:

```js
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

- `scrollIntoView` respects `scroll-snap-align` automatically, so no extra snapping logic needed here.
- If Lenis is active, use its own `scrollTo` method instead of native `scrollIntoView` for consistency with the rest of the smooth-scroll behavior.

## Integration checklist
- [ ] Confirm Lenis config doesn't conflict with native `scroll-snap-type` (test early)
- [ ] Apply `.section` snap styles to all 5 top-level sections
- [ ] Identify which sections overflow their viewport (likely Projects, Career) and wrap only those in `.section-inner-scroll` with `overscroll-behavior: contain`
- [ ] Wire IntersectionObserver to drive sidebar active state + dot pagination
- [ ] Add Framer Motion `whileInView` entrance animation to section content
- [ ] Wire sidebar nav clicks to `scrollIntoView` (or Lenis's `scrollTo`) for direct navigation