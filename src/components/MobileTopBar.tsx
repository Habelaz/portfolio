import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import ThemeSwitcher from './ThemeSwitcher'
import MobileNavOverlay from './MobileNavOverlay'

const TOP_BAR = 'fixed top-0 left-0 right-0 h-16 bg-bg border-b border-panel-border z-50 flex items-center justify-between px-4 lg:hidden'

const LEFT = 'flex items-center gap-2.5 min-w-0'

const AVATAR = 'w-9 h-9 rounded-full bg-panel border border-panel-border flex items-center justify-center text-accent font-sora font-semibold text-sm shrink-0'

const NAME = 'font-sora text-sm font-semibold text-text truncate'

const RIGHT = 'flex items-center gap-2'

const HAMBURGER_BTN = [
  'flex items-center justify-center w-10 h-10 rounded-lg',
  'bg-transparent border border-panel-border',
  'text-muted cursor-pointer',
  'transition-[border-color,color] duration-150',
  'hover:border-accent hover:text-accent',
].join(' ')

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

interface MobileTopBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function MobileTopBar({ activeTab, onTabChange }: MobileTopBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen])

  const handleTabChange = (tab: string) => {
    onTabChange(tab)
    setIsOpen(false)
  }

  return (
    <>
      <div className={TOP_BAR}>
        <div className={LEFT}>
          <div className={AVATAR}>{getInitials(profile.name)}</div>
          <span className={NAME}>{profile.name}</span>
        </div>
        <div className={RIGHT}>
          <ThemeSwitcher />
          <button
            className={HAMBURGER_BTN}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-overlay"
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <MobileNavOverlay
        isOpen={isOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
