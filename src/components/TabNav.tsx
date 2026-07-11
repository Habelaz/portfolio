import { motion } from 'framer-motion'
import clsx from 'clsx'
import { TABS } from '../data/tabs'

interface TabNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const TABSNav = 'flex flex-row gap-3 lg:flex-col lg:w-full lg:min-h-0'

const TAB_BTN = [
  'flex items-center gap-[12px] bg-transparent border-none cursor-pointer text-left whitespace-nowrap',
  'px-4 py-3 rounded-xl lg:pl-4.5',
  'text-muted font-inter text-[clamp(0.875rem,1vw,1rem)] leading-none font-medium',
  'relative transition-colors duration-150 ease-out',
  'hover:text-text hover:bg-white/[0.03]',
  'lg:py-2 lg:px-3.5',
].join(' ')

const TAB_BTN_ACTIVE = 'text-text !bg-accent-dim'

const TAB_INDICATOR = [
  'hidden lg:block',
  'absolute left-[-10px] top-0 bottom-0 w-[3px] h-[18px] my-auto',
  'bg-accent rounded-sm',
].join(' ')

const TAB_IDX = 'font-mono text-[clamp(0.6875rem,0.8vw,0.75rem)] text-faint w-[18px]'

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className={TABSNav}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(TAB_BTN, activeTab === tab.id && TAB_BTN_ACTIVE)}
        >
          {activeTab === tab.id && (
            <motion.div layoutId="tab-indicator" className={TAB_INDICATOR} />
          )}
          <span className={TAB_IDX}>{tab.index}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
