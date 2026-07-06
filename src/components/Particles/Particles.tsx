import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { EASE } from '@/constants/animations'

interface ParticlesProps {
  count?: number
}

export function Particles({ count = 18 }: ParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 25,
        delay: Math.random() * 5,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-warm/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

interface GlowProps {
  className?: string
}

export function Glow({ className = '' }: GlowProps) {
  return (
    <motion.div
      className={['pointer-events-none absolute rounded-full bg-warm-glow blur-3xl', className]
        .filter(Boolean)
        .join(' ')}
      animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: EASE }}
      aria-hidden
    />
  )
}
