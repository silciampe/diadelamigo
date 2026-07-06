import { motion } from 'framer-motion'
import { DURATION, EASE } from '@/constants/animations'

interface PhotoFrameProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  onClick?: () => void
  isActive?: boolean
  isDimmed?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-24 h-24 sm:w-28 sm:h-28',
  md: 'w-32 h-32 sm:w-40 sm:h-40',
  lg: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64',
  hero: 'w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80',
}

export function PhotoFrame({
  src,
  alt,
  size = 'md',
  onClick,
  isActive = false,
  isDimmed = false,
  className = '',
}: PhotoFrameProps) {
  const isInteractive = Boolean(onClick)

  return (
    <motion.figure
      className={[
        'relative overflow-hidden rounded-2xl bg-cream-dark',
        sizeClasses[size],
        isInteractive ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        scale: isActive ? 1.02 : 1,
        filter: isDimmed ? 'blur(2px)' : 'blur(0px)',
      }}
      whileHover={
        isInteractive && !isDimmed
          ? { scale: 1.03 }
          : undefined
      }
      transition={{ duration: DURATION.normal, ease: EASE }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <div
        className={[
          'pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5',
          isActive ? 'ring-warm/30' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden
      />
    </motion.figure>
  )
}
