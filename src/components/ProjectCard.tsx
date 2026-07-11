import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { IconType } from 'react-icons'

interface ProjectCardProps {
  title: string
  description: string
  stack: { name: string; icon: IconType }[]
  year: number
  liveUrl: string
}

const ITEM = [
  'bg-panel p-[clamp(16px,2vw,22px)]',
  'flex justify-between items-start gap-[clamp(12px,1.5vw,20px)]',
  'border border-transparent rounded-[14px]',
  'transition-[border-color] duration-200 hover:border-panel-border',
].join(' ')

const ITEM_H3 = 'font-sora text-[clamp(0.9375rem,1.1vw,1rem)] font-semibold m-0 mb-1.5'

const ITEM_P = 'text-[clamp(0.8125rem,1vw,0.875rem)] text-muted m-0 leading-[1.7] max-w-[50ch]'

const STACK = 'flex gap-1.5 flex-wrap mt-2.5'

const STACK_ITEM = 'flex items-center gap-1.5 bg-accent-dim rounded-md px-2 py-[3px]'

const STACK_ICON = 'text-accent'

const STACK_NAME = [
  'font-mono text-[clamp(0.65625rem,0.8vw,0.71875rem)]',
  'text-muted transition-colors duration-150',
].join(' ')

const STACK_NAME_HOVERED = '!text-faint'

const ITEM_LINKS = 'flex items-center gap-[clamp(6px,0.8vw,10px)] pt-[2px] shrink-0'

const LIVE_BTN = [
  'inline-flex items-center gap-1.5',
  'bg-transparent border border-panel-border rounded-lg',
  'px-3 py-1.5 text-[clamp(0.75rem,0.9vw,0.8125rem)] font-inter font-medium text-muted',
  'no-underline cursor-pointer',
  'transition-[border-color,color] duration-150',
  'hover:border-accent hover:text-accent',
].join(' ')

const META = 'font-mono text-[clamp(0.6875rem,0.8vw,0.75rem)] text-faint whitespace-nowrap pt-[2px]'

export default function ProjectCard({ title, description, stack, year, liveUrl }: ProjectCardProps) {
  return (
    <motion.div
      className={ITEM}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
    >
      <div>
        <h3 className={ITEM_H3}>{title}</h3>
        <p className={ITEM_P}>{description}</p>
        <div className={STACK}>
          {stack.map((tech) => (
            <StackChip key={tech.name} name={tech.name} icon={tech.icon} />
          ))}
        </div>
      </div>
      <div className={ITEM_LINKS}>
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={LIVE_BTN}>
          <ExternalLink size={14} />
          Live Demo
        </a>
        <span className={META}>{year}</span>
      </div>
    </motion.div>
  )
}

function StackChip({ name, icon: Icon }: { name: string; icon: IconType }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={STACK_ITEM}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={14} className={STACK_ICON} />
      <span className={`${STACK_NAME} ${hovered ? STACK_NAME_HOVERED : ''}`}>
        {name}
      </span>
    </div>
  )
}
