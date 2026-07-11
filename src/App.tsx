import { useRef, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import MobileTopBar from './components/MobileTopBar'
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
  useLenis(scrollRef)
  const activeTab = useActiveSection(SECTION_IDS, scrollRef) as TabId

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      const container = scrollRef.current
      if (container) {
        container.scrollTo({ top: el.offsetTop, behavior: 'instant' })
      }
    },
    []
  )

  return (
    <ThemeProvider>
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={scrollTo} />
      </div>
      <MobileTopBar activeTab={activeTab} onTabChange={scrollTo} />
      <div ref={scrollRef} className="scroll-container pt-16 lg:pt-0">
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
