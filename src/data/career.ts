export interface CareerEntry {
  role: string
  company: string
  start: string
  end: string
  description: string
}

export const career: CareerEntry[] = [
  {
    role: 'Full-Stack & Mobile Developer',
    company: 'Pickup',
    start: '2025',
    end: 'Present',
    description: 'Building the core systems behind a delivery startup — an admin dashboard for operations, a courier-facing mobile app, and  centralized API.',
  },
  {
    role: 'Frontend Developer',
    company: 'A2SV',
    start: '2024',
    end: '2025',
    description: 'Built and maintained frontend interfaces as part of A2SV\'s development team, translating designs into responsive, production-ready UIs.',
  },
  {
    role: 'A2SV Trainee',
    company: 'A2SV',
    start: '2023',
    end: '2024',
    description: 'Trained intensively in competitive programming and software development — the foundation that shaped how I approach problem-solving and clean engineering today.',
  },
]
