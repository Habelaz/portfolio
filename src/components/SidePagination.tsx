import { motion } from 'framer-motion'
import { TABS } from '../data/tabs'

interface SidePaginationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const WRAPPER = 'fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 z-10 lg:bottom-auto lg:top-1/2 lg:left-auto lg:right-[clamp(6px,1vw,18px)] lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col'

const DOT = [
  'relative w-2 h-2 rounded-full bg-faint border-none cursor-pointer p-0',
  'transition-[background,transform] duration-200 hover:bg-accent hover:scale-110',
].join(' ')

const DOT_ACTIVE = 'absolute inset-[-3px] rounded-full border-2 border-accent'

export default function SidePagination({ activeTab, onTabChange }: SidePaginationProps) {
  return (
    <div className={WRAPPER}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={DOT}
          aria-label={tab.label}
        >
          {activeTab === tab.id && (
            <motion.div layoutId="pagination-dot" className={DOT_ACTIVE} />
          )}
        </button>
      ))}
    </div>
  )
}
