import { useEffect, useState, type RefObject } from 'react'

export function useActiveSection(sectionIds: string[], containerRef: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.id
            if (sectionIds.includes(id)) setActive(id)
          }
        })
      },
      { root, threshold: 0.5 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, containerRef])

  return active
}
