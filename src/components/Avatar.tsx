interface AvatarProps {
  name: string
  avatarSrc?: string | null
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const AVATAR_WRAP = [
  'rounded-full p-[3px] shrink-0',
  'bg-[conic-gradient(from_180deg,var(--accent),transparent_40%,var(--accent)_100%)]',
  'w-[52px] lg:w-[clamp(88px,8vw,120px)] lg:mb-[2px] lg:self-center',
  'aspect-square',
].join(' ')

const AVATAR_IMG = 'w-full h-full rounded-full object-cover'

const AVATAR_INITIALS = [
  'w-full h-full rounded-full',
  'bg-panel',
  'flex items-center justify-center',
  'font-sora font-bold text-[clamp(1rem,2vw,1.4rem)] text-accent',
].join(' ')

export default function Avatar({ name, avatarSrc }: AvatarProps) {
  return (
    <div className={AVATAR_WRAP}>
      {avatarSrc ? (
        <img src={avatarSrc} alt={name} className={AVATAR_IMG} />
      ) : (
        <div className={AVATAR_INITIALS}>{getInitials(name)}</div>
      )}
    </div>
  )
}
