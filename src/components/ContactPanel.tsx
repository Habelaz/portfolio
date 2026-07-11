import { motion } from 'framer-motion'

const EYEBROW = 'font-mono text-[clamp(0.75rem,0.9vw,0.8125rem)] text-accent tracking-[0.06em] uppercase m-0 mb-3.5'

const LEAD = 'text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.8] text-muted max-w-[60ch] m-0 mb-[clamp(24px,3vw,40px)]'

const CONTACT_GRID = [
  'grid grid-cols-1 gap-px',
  'bg-panel-border border border-panel-border',
  'rounded-[14px] overflow-hidden',
  'sm:grid-cols-3',
].join(' ')

const CONTACT_ITEM = [
  'bg-panel p-[clamp(16px,2vw,20px)_clamp(18px,2vw,22px)]',
  'no-underline text-inherit',
  'transition-[background] duration-150 block',
  'hover:bg-[#151a21]',
].join(' ')

const CONTACT_H3 = 'font-sora text-[clamp(0.875rem,1.1vw,1rem)] font-semibold m-0 mb-[clamp(4px,0.4vw,5px)]'

const CONTACT_P = 'text-[clamp(0.78125rem,1vw,0.875rem)] text-muted m-0 leading-[1.6]'

export default function ContactPanel() {
  return (
    <section id="contact" className="section">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className={EYEBROW}>Get in touch</p>
        <h1 className="font-sora text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.015em] m-0 mb-4.5 leading-[1.2]">
          Let&apos;s talk.
        </h1>
        <p className={LEAD}>
          Reach out for freelance work, full-time roles, or just to say hi.
        </p>
        <div className={CONTACT_GRID}>
          <a className={CONTACT_ITEM} href="mailto:abelazereabruk@gmail.com">
            <h3 className={CONTACT_H3}>Email</h3>
            <p className={CONTACT_P}>abelazereabruk@gmail.com</p>
          </a>
          <a className={CONTACT_ITEM} href="https://github.com/habelaz/" target="_blank" rel="noopener noreferrer">
            <h3 className={CONTACT_H3}>GitHub</h3>
            <p className={CONTACT_P}>Browse my projects and contributions.</p>
          </a>
          <a className={CONTACT_ITEM} href="https://www.linkedin.com/in/abel-zereabruk-a6ab07295/" target="_blank" rel="noopener noreferrer">
            <h3 className={CONTACT_H3}>LinkedIn</h3>
            <p className={CONTACT_P}>Connect professionally.</p>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
