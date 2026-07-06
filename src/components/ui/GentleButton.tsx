import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE } from '@/constants/animations'

interface GentleButtonProps {
  children: ReactNode
  variant?: 'text' | 'ghost'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function GentleButton({
  children,
  variant = 'text',
  className = '',
  onClick,
  disabled = false,
}: GentleButtonProps) {
  const variants = {
    text: 'text-ink-muted hover:text-ink border-b border-transparent hover:border-warm/40 pb-0.5',
    ghost:
      'text-ink-muted hover:text-ink border border-ink-faint/30 hover:border-warm/50 rounded-full px-6 py-2.5',
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'cursor-pointer bg-transparent text-sm font-normal tracking-wide transition-colors duration-500',
        variants[variant],
        disabled ? 'pointer-events-none opacity-40' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      whileHover={disabled ? undefined : { opacity: 0.85 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      {children}
    </motion.button>
  )
}
