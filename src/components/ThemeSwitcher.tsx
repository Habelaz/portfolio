import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface ThemeSwitcherProps {
  variant?: 'icon-only' | 'row'
}

const ICON_BTN = [
  'relative flex items-center justify-center w-8 h-8 rounded-lg',
  'bg-transparent border border-panel-border',
  'text-muted cursor-pointer overflow-hidden',
  'transition-[border-color] duration-150',
  'hover:border-accent',
].join(' ')

const ROW_BTN = [
  'relative flex items-center gap-2.5 px-3 py-2 rounded-lg',
  'bg-transparent border border-panel-border',
  'text-muted cursor-pointer overflow-hidden',
  'transition-[border-color] duration-150',
  'hover:border-accent',
].join(' ')

const ROW_LABEL = 'text-sm font-inter'

export default function ThemeSwitcher({ variant = 'icon-only' }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme()
  const isRow = variant === 'row'

  return (
    <button
      onClick={toggleTheme}
      className={isRow ? ROW_BTN : ICON_BTN}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Moon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Sun size={16} />
          </motion.span>
        )}
      </AnimatePresence>
      {isRow && (
        <span className={ROW_LABEL}>
          {theme === 'dark' ? 'Dark mode' : 'Light mode'}
        </span>
      )}
    </button>
  )
}
