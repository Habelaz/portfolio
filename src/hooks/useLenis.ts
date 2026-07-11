import { useEffect, useRef, type RefObject } from 'react'
import Lenis from 'lenis'

const MOBILE_QUERY = '(max-width: 899px)'

export function useLenis(containerRef: RefObject<HTMLDivElement | null>) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    let rafId = 0

    function destroyLenis() {
      if (!lenisRef.current) return
      cancelAnimationFrame(rafId)
      lenisRef.current.destroy()
      lenisRef.current = null
    }

    function initLenis() {
      if (mobileQuery.matches || lenisRef.current) return

      const lenis = new Lenis({
        wrapper: el,
        content: el,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    function syncLenis() {
      if (mobileQuery.matches) destroyLenis()
      else initLenis()
    }

    syncLenis()
    mobileQuery.addEventListener('change', syncLenis)

    return () => {
      mobileQuery.removeEventListener('change', syncLenis)
      destroyLenis()
    }
  }, [containerRef])

  return lenisRef
}
