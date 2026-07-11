import type { IconType } from 'react-icons'
import {
  SiVite,
  SiNestjs,
  SiPostgresql,
  SiNextdotjs,
  SiSupabase,
  SiAppwrite,
} from 'react-icons/si'

export interface Project {
  title: string
  description: string
  stack: { name: string; icon: IconType }[]
  year: number
  liveUrl: string
}

export const projects: Project[] = [
  {
    title: 'Pickup.et',
    description: 'Delivery order management system — dispatch, tracking, and operations for a delivery startup, built to handle real-time order flow end to end.',
    stack: [
      { name: 'Vite', icon: SiVite },
      { name: 'Nest.js', icon: SiNestjs },
      { name: 'Postgres', icon: SiPostgresql },
    ],
    year: 2025,
    liveUrl: 'https://pickup.et',
  },
  {
    title: 'BMEDIS',
    description: 'Decision support system for hospital medical equipment management — helps hospitals track equipment and manage operational workflows, built as my final year project.',
    stack: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Postgres', icon: SiPostgresql },
    ],
    year: 2025,
    liveUrl: 'https://bmedis-menilik.vercel.app/',
  },
  {
    title: 'CarePulse',
    description: 'Booking platform for clinics — lets patients schedule appointments and gives clinics a streamlined way to manage bookings.',
    stack: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Appwrite', icon: SiAppwrite },
    ],
    year: 2024,
    liveUrl: 'https://hab-care-pulse.vercel.app/',
  },
]
