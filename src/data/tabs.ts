export type TabId = 'home' | 'about' | 'career' | 'projects' | 'contact'

export interface Tab {
  id: TabId
  index: string
  label: string
}

export const TABS: Tab[] = [
  { id: 'home', index: '01', label: 'Home' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'career', index: '03', label: 'Career' },
  { id: 'projects', index: '04', label: 'Projects' },
  { id: 'contact', index: '05', label: 'Contact' },
]
