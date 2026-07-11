import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const EYEBROW = 'font-mono text-[clamp(0.75rem,0.9vw,0.8125rem)] text-accent tracking-[0.06em] uppercase m-0 mb-3.5'

const LEAD = 'text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.8] text-muted max-w-[60ch] m-0 mb-[clamp(24px,3vw,40px)]'

const CARD_LIST = 'flex flex-col gap-1.5'

export default function ProjectsPanel() {
  return (
    <section id="projects" className="section">
      <div className="section-inner section-inner-scroll">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className={EYEBROW}>Selected work</p>
          <h1 className="font-sora text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.015em] m-0 mb-4.5 leading-[1.2]">
            Projects
          </h1>
          <p className={LEAD}>
            A few things I&apos;ve built,colaborated recently .
          </p>
          <div className={CARD_LIST}>
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
