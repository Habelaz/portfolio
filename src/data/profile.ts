export interface Social {
  label: string
  url: string
}

export interface Profile {
  name: string
  handle: string
  role: string
  location: string
  avatarSrc: string | null
  status: string
  socials: Social[]
}

export const profile: Profile = {
  name: 'Abel Zereabruk',
  handle: '@Habelaz',
  role: 'Full-stack & mobile developer',
  location: 'Addis Ababa, Ethiopia',
  avatarSrc: null,
  status: 'Available for work',
  socials: [
    { label: 'GitHub', url: 'https://github.com/jordandoe' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jordandoe' },
    { label: 'Email', url: 'mailto:jordan@example.com' },
  ],
}
