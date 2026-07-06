import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeVariants } from '@/constants/animations'

interface ScreenWrapperProps {
  children: ReactNode
  className?: string
}

export function ScreenWrapper({ children, className = '' }: ScreenWrapperProps) {
  return (
    <motion.section
      className={[
        'relative flex min-h-dvh flex-col items-center justify-center py-16 sm:py-20',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.section>
  )
}
