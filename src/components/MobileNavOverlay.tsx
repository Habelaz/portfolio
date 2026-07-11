import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'
import TabNav from './TabNav'
import ThemeSwitcher from './ThemeSwitcher'
import { profile } from '../data/profile'

interface MobileNavOverlayProps {
  isOpen: boolean
  activeTab: string
  onTabChange: (tab: string) => void
  onClose: () => void
}

const BACKDROP = 'fixed inset-0 bg-black/40 z-40 lg:hidden'

const PANEL = [
  'fixed top-16 left-0 right-0 bottom-0 z-40 lg:hidden',
  'bg-bg flex flex-col',
].join(' ')

const INNER = 'flex flex-col flex-1 overflow-y-auto p-6'

const CV_BTN = [
  'flex items-center justify-center gap-2 w-full mt-auto mb-4',
  'bg-accent text-bg border-none rounded-lg',
  'px-4 py-3 font-inter font-semibold text-sm',
  'no-underline cursor-pointer',
].join(' ')

const SOCIALS = 'flex items-center justify-center gap-4 pb-6'

const SOCIAL_LINK = 'text-muted transition-colors duration-150 hover:text-accent'

export default function MobileNavOverlay({ isOpen, activeTab, onTabChange, onClose }: MobileNavOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLElement>('button, a')
      first?.focus()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={BACKDROP}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            id="mobile-nav-overlay"
            ref={panelRef}
            className={PANEL}
            role="dialog"
            aria-modal="true"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={INNER}>
              <TabNav
                activeTab={activeTab}
                onTabChange={onTabChange}
                variant="stacked"
              />

              <div className="flex items-center justify-between py-4 border-t border-panel-border mt-4">
                <span className="text-sm text-muted font-inter">
                  {profile.status}
                </span>
                <ThemeSwitcher variant="row" />
              </div>

              <a
                href="/Abel_Zereabruk_Teka_FlowCV_Resume_2026.pdf"
                download="Abel_Zereabruk_CV.pdf"
                className={CV_BTN}
              >
                <Download size={16} />
                Download CV
              </a>

              <div className={SOCIALS}>
                <a href="https://github.com/habelaz/" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/abel-zereabruk-a6ab07295/" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="mailto:abelazereabruk@gmail.com" className={SOCIAL_LINK} aria-label="Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
