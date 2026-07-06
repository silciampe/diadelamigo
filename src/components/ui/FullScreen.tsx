import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE } from '@/constants/animations'

interface FullScreenProps {
  children: ReactNode
  className?: string
  instantExit?: boolean
}

export function FullScreen({ children, className = '', instantExit = false }: FullScreenProps) {
  return (
    <motion.section
      className={[
        'relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={instantExit ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: instantExit ? 0 : DURATION.normal, ease: EASE }}
    >
      {children}
    </motion.section>
  )
}
