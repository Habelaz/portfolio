import { motion } from 'framer-motion'
import SkillIcon from './SkillIcon'
import { skills } from '../data/skills'

const EYEBROW = 'font-mono text-[clamp(0.75rem,0.9vw,0.8125rem)] text-accent tracking-[0.06em] uppercase m-0 mb-3.5'

const LEAD = 'text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.8] text-muted max-w-[60ch] m-0 mb-[clamp(24px,3vw,40px)]'

const SECTION_TITLE = 'font-sora text-[clamp(1rem,2vw,1.25rem)] font-semibold m-0 mb-[clamp(10px,1.5vw,14px)] text-text'

const SKILL_GRID = 'flex flex-wrap gap-[clamp(8px,1vw,12px)] mb-2'

export default function AboutPanel() {
  return (
    <section id="about" className="section">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className={EYEBROW}>About</p>
        <h1 className="font-sora text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.015em] m-0 mb-4.5 leading-[1.2]">
          I build things that feel obvious in hindsight.
        </h1>
        <p className={LEAD}>
          I&apos;m Abel Zereabruk, a full-stack and mobile developer based in Ethiopia. I build with Next.js and Nest.js on the web, and React Native on mobile  turning ideas into products that are fast, scalable, and actually enjoyable to use. <br/>
          <br/>
          3+ years in, I've learned that good software is less about clever code and more about clear systems: intuitive interfaces, solid APIs, and architecture that doesn't fall apart under real-world use.
          <br/>
          When I'm not shipping features, I'm probably tweaking some UI detail nobody else notices  or breaking something in a way that teaches me more than the last five things that worked.
        </p>

        <h2 className={SECTION_TITLE}>works with</h2>
        <div className={SKILL_GRID}>
          {skills.tech.map((skill) => (
            <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} />
          ))}
        </div>

        <div className={`${SKILL_GRID} mt-4`}>
          {skills.tools.map((tool) => (
            <SkillIcon key={tool.name} name={tool.name} icon={tool.icon} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
