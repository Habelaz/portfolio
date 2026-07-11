import type { IconType } from 'react-icons'
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiNextdotjs,
  SiVite,
  SiNestjs,
  SiGo,
  SiTailwindcss,
  SiPrisma,
  SiGit,
  SiDocker,
  SiFigma,
} from 'react-icons/si'

export interface Skill {
  name: string
  icon: IconType
}

export interface SkillsData {
  tech: Skill[]
  tools: Skill[]
}

export const skills: SkillsData = {
  tech: [
    { name: 'React', icon: SiReact },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Nest.js', icon: SiNestjs },
    { name: 'Python', icon: SiPython },
    { name: 'Go', icon: SiGo },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Vite', icon: SiVite },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'Prisma', icon: SiPrisma },
  ],
  tools: [
    { name: 'Git', icon: SiGit },
    { name: 'Docker', icon: SiDocker },
    { name: 'Figma', icon: SiFigma },
  ],
}
