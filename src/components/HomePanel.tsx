import { motion } from 'framer-motion'
import { MapPin, Download } from 'lucide-react'
import { profile } from '../data/profile'
import Card from './Card'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const childItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

const EYEBROW = 'font-mono text-[clamp(0.75rem,0.9vw,0.8125rem)] text-accent tracking-[0.06em] uppercase m-0 mb-3.5'

const HEADING_ROW = 'flex flex-wrap items-center justify-between gap-3 mb-4.5'

const HEADING = 'font-sora text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.015em] m-0 leading-[1.2]'

const CV_BTN = [
  'cv-btn',
  'inline-flex items-center gap-2 mt-3 sm:mt-0',
  'bg-transparent border border-panel-border rounded-lg',
  'px-4 py-2 text-[clamp(0.8125rem,1vw,0.875rem)] font-inter font-medium text-muted',
  'cursor-pointer relative z-[1]',
].join(' ')

const META_ROW = 'flex items-center gap-3 mb-[clamp(12px,1.5vw,20px)]'

const ROLE = 'font-sora text-[clamp(0.9375rem,1.1vw,1rem)] font-medium text-text m-0'

const DIVIDER = 'w-[1px] h-4 bg-panel-border'

const LOCATION = 'flex items-center gap-1 text-[clamp(0.8125rem,1vw,0.875rem)] text-muted m-0'

const LEAD = 'text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.8] text-muted max-w-[60ch] m-0 mb-[clamp(24px,3vw,40px)]'

const HOME_GRID = [
  'grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))]',
  'gap-[clamp(10px,1.5vw,16px)]',
  'sm:grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] sm:gap-[clamp(12px,1.5vw,16px)]',
].join(' ')

const STACK = 'flex gap-1.5 flex-wrap mt-3'

const CHIP = 'font-mono text-[clamp(0.65625rem,0.8vw,0.71875rem)] text-accent bg-accent-dim rounded-md px-2 py-[3px]'

export default function HomePanel() {
  return (
    <section id="home" className="section">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className={EYEBROW}>Home</p>
        <div className={HEADING_ROW}>
          <h1 className={HEADING}>
            Hey, I&apos;m {profile.name.split(' ')[0]}
          </h1>
          <a href="/Abel_Zereabruk_Teka_FlowCV_Resume_2026.pdf" download="Abel_Zereabruk_CV.pdf" className={CV_BTN}>
            <Download size={16} className="cv-icon" />
            Download CV
          </a>
        </div>
        <div className={META_ROW}>
          <p className={ROLE}>{profile.role}</p>
          <div className={DIVIDER} />
          <p className={LOCATION}>
            <MapPin size={14} className="text-accent shrink-0" />
            {profile.location}
          </p>
        </div>
        <p className={LEAD}>
          I build fast, thoughtful web and mobile experiences — from pixel-perfect UIs to rock-solid APIs.
        </p>
        <motion.div
          className={HOME_GRID}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div variants={childItem}>
            <Card spanFull>
              <p className={`${EYEBROW} !mb-2`}>
                Featured project
              </p>
              <h3 className="font-sora text-[clamp(0.9375rem,1.2vw,1rem)] font-semibold m-0 mb-[clamp(6px,0.5vw,8px)]">BMEDIS</h3>
              <p className="text-[clamp(0.8125rem,1vw,0.875rem)] text-muted m-0 leading-[1.7]">Decision support for medical equipment management in hospitals.</p>
              <div className={STACK}>
                <span className={CHIP}>Next.js</span>
                <span className={CHIP}>Supabase</span>
                <span className={CHIP}>Postgres</span>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={childItem}>
            <Card>
              <p className={`${EYEBROW} !mb-2`}>
                Experience
              </p>
              <h3 className="font-sora text-[clamp(0.9375rem,1.2vw,1rem)] font-semibold m-0 mb-[clamp(6px,0.5vw,8px)]">3+ years</h3>
              <p className="text-[clamp(0.8125rem,1vw,0.875rem)] text-muted m-0 leading-[1.7]">Across startups and freelance work.</p>
            </Card>
          </motion.div>
          <motion.div variants={childItem}>
            <Card>
              <p className={`${EYEBROW} !mb-2`}>
                Focus
              </p>
              <h3 className="font-sora text-[clamp(0.9375rem,1.2vw,1rem)] font-semibold m-0 mb-[clamp(6px,0.5vw,8px)]">Full-stack &amp; Mobile</h3>
              <p className="text-[clamp(0.8125rem,1vw,0.875rem)] text-muted m-0 leading-[1.7]">React, Nest.js, and React Native.</p>
            </Card>
          </motion.div>
          <motion.div variants={childItem}>
            <a href="#contact" className="block no-underline text-inherit">
              <Card spanFull>
                <p className={`${EYEBROW} !mb-2`}>
                  Say hello
                </p>
                <h3 className="font-sora text-[clamp(0.9375rem,1.2vw,1rem)] font-semibold m-0 mb-[clamp(6px,0.5vw,8px)]">Open to freelance &amp; full-time work</h3>
                <p className="text-[clamp(0.8125rem,1vw,0.875rem)] text-muted m-0 leading-[1.7]">Reach out any time — I usually reply within a day.</p>
              </Card>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
