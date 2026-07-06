import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeSlideContainer, fadeSlideItem } from '@/constants/animations'

interface FadeSlideProps {
  children: ReactNode
  className?: string
}

export function FadeSlide({ children, className = '' }: FadeSlideProps) {
  return (
    <motion.div className={className} variants={fadeSlideItem}>
      {children}
    </motion.div>
  )
}

interface FadeSlideGroupProps {
  children: ReactNode
  className?: string
}

export function FadeSlideGroup({ children, className = '' }: FadeSlideGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={fadeSlideContainer}
    >
      {children}
    </motion.div>
  )
}
