import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  spanFull?: boolean
}

const CARD = 'bg-panel border border-panel-border rounded-[14px] p-[clamp(16px,2vw,22px)]'
const CARD_SPAN = 'lg:col-span-full'

export default function Card({ children, className = '', spanFull = false }: CardProps) {
  return (
    <motion.div
      className={clsx(CARD, spanFull && CARD_SPAN, className)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  )
}
