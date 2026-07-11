import { motion } from 'framer-motion'
import { career } from '../data/career'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

const EYEBROW = 'font-mono text-[clamp(0.75rem,0.9vw,0.8125rem)] text-accent tracking-[0.06em] uppercase m-0 mb-3.5'

const LEAD = 'text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.8] text-muted max-w-[60ch] m-0 mb-[clamp(24px,3vw,40px)]'

const TIMELINE = 'relative pl-[clamp(20px,2.5vw,28px)]'

const TIMELINE_LINE = 'absolute left-[9px] top-1 bottom-1 w-[2px] bg-panel-border'

const TIMELINE_ITEM = 'relative pb-[clamp(20px,3vw,28px)] last:pb-0'

const TIMELINE_NODE = 'absolute left-[-19px] top-1 w-[10px] h-[10px] rounded-full bg-accent border-2 border-bg shadow-[0_0_0_2px_var(--panel-border)]'

const TIMELINE_H3 = 'font-sora text-[clamp(0.9375rem,1.1vw,1rem)] font-semibold m-0 mb-[2px]'

const COMPANY = 'text-[clamp(0.8125rem,1vw,0.875rem)] text-accent m-0 mb-[2px] font-medium'

const META = 'font-mono text-[clamp(0.6875rem,0.8vw,0.75rem)] text-faint'

const TIMELINE_P = 'text-[clamp(0.8125rem,1vw,0.875rem)] text-muted leading-[1.7] mt-[clamp(4px,0.5vw,6px)] mb-0'

export default function CareerPanel() {
  return (
    <section id="career" className="section">
      <div className="section-inner section-inner-scroll">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className={EYEBROW}>Career</p>
          <h1 className="font-sora text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.015em] m-0 mb-4.5 leading-[1.2]">
            Professional journey
          </h1>
          <p className={LEAD}>
            A timeline of roles, projects, and growth — from first commit to
            shipped products.
          </p>
          <motion.div
            className={TIMELINE}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className={TIMELINE_LINE} />
            {career.map((entry) => (
              <motion.div key={`${entry.role}-${entry.company}`} variants={item} className={TIMELINE_ITEM}>
                <div className={TIMELINE_NODE} />
                <div>
                  <h3 className={TIMELINE_H3}>{entry.role}</h3>
                  <p className={COMPANY}>{entry.company}</p>
                  <span className={META}>{entry.start} — {entry.end}</span>
                  <p className={TIMELINE_P}>{entry.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
