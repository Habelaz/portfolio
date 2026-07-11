import Avatar from './Avatar'
import TabNav from './TabNav'
import ThemeSwitcher from './ThemeSwitcher'
import { BadgeCheck } from 'lucide-react'
import { profile } from '../data/profile'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const SIDEBAR = [
  'flex flex-row items-center',
  'gap-[clamp(12px,2vw,18px)]',
  'bg-bg p-[clamp(16px,2vw,20px)_clamp(16px,2vw,24px)]',
  'h-auto relative overflow-hidden',
  'lg:w-[clamp(220px,22vw,300px)] lg:flex-col lg:items-center lg:gap-[clamp(6px,0.6vw,10px)] lg:h-[calc(100dvh-clamp(48px,6vw,96px))] lg:sticky lg:top-[clamp(24px,3vw,48px)] lg:shrink-0',
  'lg:p-[clamp(20px,2vw,28px)_clamp(16px,2vw,24px)_clamp(20px,2vw,28px)_clamp(16px,2vw,24px)]',
].join(' ')

const SIDEBAR_TOP = 'hidden lg:flex w-full flex-col items-center gap-[clamp(2px,0.3vw,6px)]'

const SIDEBAR_DIVIDER = 'hidden lg:block w-full border-t border-panel-border my-1'

const NAME_ROW = 'flex items-center justify-center gap-1 m-0'

const NAME = 'hidden lg:block font-sora text-[clamp(1.25rem,1.6vw,1.5rem)] font-semibold tracking-tight m-0'

const HANDLE = 'hidden lg:block font-mono text-[clamp(0.9375rem,1.1vw,1rem)] text-accent m-0'

const SIDEBAR_FOOTER = [
  'hidden lg:flex flex-col items-center justify-center mt-auto',
  'pt-[clamp(6px,0.8vw,10px)]',
  'border-t border-panel-border',
].join(' ')

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className={SIDEBAR}>
      <div className={SIDEBAR_TOP}>
        <Avatar name={profile.name} avatarSrc={profile.avatarSrc} />
        <div className={NAME_ROW}>
          <p className={NAME}>{profile.name}</p>
          <BadgeCheck size={16} className="text-[#1d9bf0] shrink-0" />
        </div>
        <p className={HANDLE}>{profile.handle}</p>
        <ThemeSwitcher />
      </div>
      <div className={SIDEBAR_DIVIDER} />
      <TabNav activeTab={activeTab} onTabChange={onTabChange} />
      <div className={SIDEBAR_FOOTER}>
        <p className="text-faint text-[clamp(0.75rem,0.9vw,0.8125rem)] font-mono m-0 text-center">&copy; 2026</p>
        <p className="text-faint text-[clamp(0.75rem,0.9vw,0.8125rem)] font-mono m-0 text-center">Abel Zereabruk. All rights reserved.</p>
      </div>
    </aside>
  )
}
