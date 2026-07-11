import { motion } from 'framer-motion'
import { TABS } from '../data/tabs'

interface SidePaginationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const WRAPPER = 'hidden lg:flex fixed right-[clamp(6px,1vw,18px)] top-1/2 -translate-y-1/2 flex-col items-center gap-2 z-10'

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
