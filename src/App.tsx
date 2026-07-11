import { useRef, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import SidePagination from './components/SidePagination'
import HomePanel from './components/HomePanel'
import AboutPanel from './components/AboutPanel'
import CareerPanel from './components/CareerPanel'
import ProjectsPanel from './components/ProjectsPanel'
import ContactPanel from './components/ContactPanel'
import { useLenis } from './hooks/useLenis'
import { useActiveSection } from './hooks/useActiveSection'
import { TABS, type TabId } from './data/tabs'

const SECTION_IDS = TABS.map((t) => t.id)

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const lenisRef = useLenis(scrollRef)
  const activeTab = useActiveSection(SECTION_IDS, scrollRef) as TabId

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.0 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [lenisRef]
  )

  return (
    <ThemeProvider>
      <Sidebar activeTab={activeTab} onTabChange={scrollTo} />
      <div ref={scrollRef} className="scroll-container">
        <HomePanel />
        <AboutPanel />
        <CareerPanel />
        <ProjectsPanel />
        <ContactPanel />
      </div>
      <SidePagination activeTab={activeTab} onTabChange={scrollTo} />
    </ThemeProvider>
  )
}

export default App
