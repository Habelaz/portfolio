import { useEffect, useRef, type RefObject } from 'react'
import Lenis from 'lenis'

export function useLenis(containerRef: RefObject<HTMLDivElement | null>) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

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
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [containerRef])

  return lenisRef
}
