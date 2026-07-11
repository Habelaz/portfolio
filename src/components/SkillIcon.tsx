import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { IconType } from 'react-icons'

interface SkillIconProps {
  name: string
  icon: IconType
}

const SKILL_ICON = 'relative flex items-center justify-center w-[44px] h-[44px] bg-panel border border-panel-border rounded-[10px] text-muted cursor-default'

const SKILL_TOOLTIP = [
  'absolute -top-8 left-1/2 -translate-x-1/2',
  'whitespace-nowrap font-mono text-[clamp(0.65625rem,0.8vw,0.71875rem)]',
  'text-accent bg-panel border border-panel-border',
  'rounded-md px-2 py-[3px] pointer-events-none',
].join(' ')

export default function SkillIcon({ name, icon: Icon }: SkillIconProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={SKILL_ICON}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.12 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <Icon size={20} />
      <AnimatePresence>
        {hovered && (
          <motion.span
            className={SKILL_TOOLTIP}
            initial={{ opacity: 0, y: 4, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
